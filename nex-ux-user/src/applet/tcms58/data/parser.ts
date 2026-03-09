// parser.ts
import { MonitoringPacket, FaultStatus } from './types';

export class TdrProtocolParser {
    private view: DataView;
    private offset: number = 0;
    private littleEndian: boolean = true; // 서버 명세에 따라 설정 (Intel/ARM 계열은 주로 true)

    constructor(buffer: ArrayBuffer) {
        this.view = new DataView(buffer);
    }

    // 데이터 파싱 실행
    public parse(): MonitoringPacket | null {
        try {
            const header = this.parseHeader();
            const info = this.parseInfo();
            const faults = this.parseFaults();

            return { header, info, faults };
        } catch (error) {
            console.error("바이너리 파싱 중 오류 발생:", error);
            return null;
        }
    }

    private parseHeader() {
        const stx = this.view.getUint8(this.offset); this.offset += 1;
        const messageId = this.view.getUint16(this.offset, this.littleEndian); this.offset += 2;
        const payloadLength = this.view.getUint32(this.offset, this.littleEndian); this.offset += 4;
        return { stx, messageId, payloadLength };
    }

    private parseInfo() {
        // 문자열 파싱 (예: 8바이트 고정 길이)
        const idBuffer = new Uint8Array(this.view.buffer, this.offset, 8);
        const deviceId = new TextDecoder().decode(idBuffer).replace(/\0/g, ''); // 널 문자 제거
        this.offset += 8;

        const voltage = this.view.getFloat32(this.offset, this.littleEndian); this.offset += 4;
        const current = this.view.getFloat32(this.offset, this.littleEndian); this.offset += 4;
        const temperature = this.view.getInt16(this.offset, this.littleEndian); this.offset += 2;

        return { deviceId, voltage, current, temperature };
    }

    private parseFaults(): FaultStatus {
        // 1바이트(또는 4바이트)의 상태 코드를 읽어 비트 단위로 분리합니다.
        const faultBits = this.view.getUint8(this.offset); this.offset += 1;

        // 비트 AND 연산(&)을 통해 각 자리의 고장 여부를 판별
        return {
            isOverVoltage: (faultBits & (1 << 0)) !== 0, // 0번째 비트
            isOverCurrent: (faultBits & (1 << 1)) !== 0, // 1번째 비트
            isOverTemp: (faultBits & (1 << 2)) !== 0, // 2번째 비트
            isCommError: (faultBits & (1 << 3)) !== 0, // 3번째 비트
        };
    }
}