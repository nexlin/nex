import { NexFieldDef } from "./dataDefs";

/**
 * BCD(Binary-Coded Decimal) 바이트 값을 정수로 변환합니다.
 */
function bcdToDec(bcdValue: number, size: number): number {
    if (size === 1) {
        return ((bcdValue >> 4) & 0x0f) * 10 + (bcdValue & 0x0f);
    } else if (size === 2) {
        return ((bcdValue >> 12) & 0x0f) * 1000 +
            ((bcdValue >> 8) & 0x0f) * 100 +
            ((bcdValue >> 4) & 0x0f) * 10 +
            (bcdValue & 0x0f);
    }
    return bcdValue;
}

/**
 * 바이너리 데이터(Uint8Array)를 JSON 객체로 변환합니다.
 * @param binaryData 변환할 바이너리 데이터
 * @returns 파싱된 JSON 형태의 정보
 */
export function convertTrainBinaryToJson(binaryData: Uint8Array, dataDefs: NexFieldDef[]): Record<string, any> {
    const dataView = new DataView(binaryData.buffer, binaryData.byteOffset, binaryData.byteLength);
    const result: Record<string, any> = {};

    // 시간 조립용 임시 저장소
    const timeParts: Record<string, number> = {};

    for (const def of dataDefs) {
        // 바이너리 데이터가 부족한 경우 넘어갑니다.
        if (def.offset + def.size > dataView.byteLength) {
            continue;
        }

        let value: any = 0;
        let rawValue = 0;
        try {
            if (def.size === 1) {
                rawValue = dataView.getUint8(def.offset);
            } else if (def.size === 2) {
                rawValue = dataView.getUint16(def.offset, false);
            } else if (def.size === 4) {
                rawValue = dataView.getUint32(def.offset, false);
            } else {
                continue;
            }

            // 데이터 속성 디코딩
            if (def.bitFlags && Object.keys(def.bitFlags).length > 0) {
                const flagsObj: Record<string, number | boolean> = {};
                for (const bitStr of Object.keys(def.bitFlags)) {
                    const bitNum = parseInt(bitStr, 10);
                    const flagName = def.bitFlags[bitNum];
                    flagsObj[flagName] = (rawValue & (1 << bitNum)) !== 0 ? 1 : 0;
                }
                value = flagsObj;
            } else if (def.bitFields && def.bitFields.length > 0) {
                const bitFieldObj: any = {};
                for (const bf of def.bitFields) {
                    const mask = (1 << bf.size) - 1;
                    const extracted = (rawValue >> bf.offset) & mask;
                    const mappedValue = (bf.valueMap && bf.valueMap[extracted] !== undefined) 
                        ? bf.valueMap[extracted] 
                        : extracted;
                    
                    let bfCurrent = bitFieldObj;
                    for (let j = 0; j < bf.keys.length; j++) {
                        const bKey = bf.keys[j];
                        if (j === bf.keys.length - 1) {
                            bfCurrent[bKey] = mappedValue;
                        } else {
                            if (!bfCurrent[bKey]) bfCurrent[bKey] = {};
                            bfCurrent = bfCurrent[bKey];
                        }
                    }
                }
                value = bitFieldObj;
            } else {
                if (def.encoding === "ASCII") {
                    if (rawValue >= 32 && rawValue <= 126) {
                        value = String.fromCharCode(rawValue);
                    } else {
                        value = "";
                    }
                } else if (def.encoding === "BCD") {
                    const dec = bcdToDec(rawValue, def.size);
                    if (def.concat) {
                        // BCD를 concat 할 때는 0을 패딩하여 문자열로 유지합니다.
                        value = String(dec).padStart(def.size * 2, '0');
                    } else {
                        value = dec;
                    }
                } else {
                    value = rawValue;
                }
            }

            // 시간정보 조립을 위한 저장
            if (def.timeComponent) {
                timeParts[def.timeComponent] = value;
                continue; // 배열 추가 안함
            }

            // 계층화 트리 자동 생성 (keys 배열 사용)
            let currentObj = result;
            
            // 마지막 키를 제외한 모든 상위 계층에 대해 객체를 초기화하며 이동
            for (let i = 0; i < def.keys.length - 1; i++) {
                const k = def.keys[i];
                if (!currentObj[k]) {
                    currentObj[k] = {};
                } else if (typeof currentObj[k] !== 'object' || Array.isArray(currentObj[k])) {
                    // 단일 값이 이미 존재한다면 객체로 감싸고 "_old"로 우회
                    const oldVal = currentObj[k];
                    currentObj[k] = { "_old": oldVal };
                }
                currentObj = currentObj[k];
            }

            const lastKey = def.keys[def.keys.length - 1];

            // 데이터의 concat 플래그 여부에 따라 마지막 깊이 값 할당 방식 결정
            if (def.concat) {
                if (currentObj[lastKey] === undefined) {
                    currentObj[lastKey] = "";
                }
                if (Array.isArray(currentObj[lastKey])) {
                    currentObj[lastKey] = currentObj[lastKey].join("");
                }
                currentObj[lastKey] += String(value);
            } else {
                if (Object.prototype.hasOwnProperty.call(currentObj, lastKey)) {
                    if (Array.isArray(currentObj[lastKey])) {
                        currentObj[lastKey].push(value);
                    } else {
                        currentObj[lastKey] = [currentObj[lastKey], value];
                    }
                } else {
                    currentObj[lastKey] = value;
                }
            }
        } catch (e) {
            console.warn(`[Offset: ${def.offset}] 파싱 중 에러`, e);
        }
    }

    // 시간 정보 조합
    if (Object.keys(timeParts).length > 0) {
        const yy = timeParts["년(YY)"] ?? 0;
        const mm = timeParts["월(MM)"] ?? 1;
        const dd = timeParts["일(DD)"] ?? 1;
        const hh = timeParts["시(hh)"] ?? 0;
        const minu = timeParts["분(mm)"] ?? 0;
        const ss = timeParts["초(ss)"] ?? 0;

        const year = 2000 + yy;

        const pad = (n: number) => n.toString().padStart(2, '0');
        const formattedTime = `${year}-${pad(mm)}-${pad(dd)} ${pad(hh)}:${pad(minu)}:${pad(ss)}`;

        result["시간정보"] = formattedTime;
    }

    return result;
}
