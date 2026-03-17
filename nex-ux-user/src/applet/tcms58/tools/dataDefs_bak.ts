// 열차정보 데이터 파싱을 위한 정의
export interface NexFieldDef {
    offset: number;
    name: string;
    size: number;
    description: string;
    keys: string[]; // 계층적 키 배열 (예: ["호차별 DCU", "1", "L1"])
    bitFlags?: Record<number, string>; // bit 인덱스(0~15 등)에 해당하는 이름 매핑
    encoding?: "BCD" | "ASCII"; // 인코딩 방식 지정
    timeComponent?: string; // 시간정보 조립을 위한 컴포넌트 이름 
    concat?: boolean; // 동일한 키를 가질 경우 배열이 아닌 문자열로 결합할지 여부
}

/*
const keysList = {
    seq: ["seq"],
    year: ["time", "year"],
    month: ["time", "month"],
    day: ["time", "day"],
    hour: ["time", "hour"],
    minute: ["time", "minute"],
    second: ["time", "second"],

    train_id: ["train", "train_id"],

    speed: ["train", "speed"],
    target_speed: ["train", "target_speed"], // ATC Target Speed
    inter_acc_distance: ["traind", "inter_acc_distance"], //역간 적산거리
    atc_code: ["atc_code"],
    ats_code: ["ats_code"],
    atc_ats_mode: ["atc_ats_mode"],

}
*/


export const tcms58MonitoringDataDefs: NexFieldDef[] = [
    {
        "offset": 0,
        "name": "sequence counter",
        "size": 2,
        "description": "Sequence Counter(1~65535)",
        "keys": [
            "일련번호"
        ]
    },
    {
        "offset": 2,
        "name": "년(YY)",
        "size": 1,
        "description": "(BCD) 00~99",
        "encoding": "BCD",
        "timeComponent": "년(YY)",
        "keys": [
            "time", "year"
        ]
    },
    {
        "offset": 3,
        "name": "월(MM)",
        "size": 1,
        "description": "(BCD) 01~12",
        "encoding": "BCD",
        "timeComponent": "월(MM)",
        "keys": [
            "time", "month"
        ]
    },
    {
        "offset": 4,
        "name": "일(DD)",
        "size": 1,
        "description": "(BCD) 01~31",
        "encoding": "BCD",
        "timeComponent": "일(DD)",
        "keys": [
            "time", "day"
        ]
    },
    {
        "offset": 5,
        "name": "시(hh)",
        "size": 1,
        "description": "(BCD) 00~23",
        "encoding": "BCD",
        "timeComponent": "시(hh)",
        "keys": [
            "time", "hour"
        ]
    },
    {
        "offset": 6,
        "name": "분(mm)",
        "size": 1,
        "description": "(BCD) 00~59",
        "encoding": "BCD",
        "timeComponent": "분(mm)",
        "keys": [
            "time", "minute"
        ]
    },
    {
        "offset": 7,
        "name": "초(ss)",
        "size": 1,
        "description": "(BCD) 00~59",
        "encoding": "BCD",
        "timeComponent": "초(ss)",
        "keys": [
            "time", "second"
        ]
    },
    {
        "offset": 8,
        "name": "호선차량조성정보",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "8칸",
            "1": "6칸",
            "4": "8호선"
        },
        "keys": [
            "호선차량조성정보"
        ]
    },
    {
        "offset": 10,
        "name": "열차 번호(XXXX)",
        "size": 2,
        "description": "BCD포맷 4자리 숫자",
        "encoding": "BCD",
        "keys": ["train_num"]
    },
    {
        "offset": 12,
        "name": "편성번호",
        "size": 1,
        "description": "BCD포맷 2자리 숫자",
        "encoding": "BCD",
        "keys": ["train"]
    },
    {
        "offset": 14,
        "name": "현재역 코드",
        "size": 1,
        "description": "현재역 코드",
        "keys": ["current_station"]
    },
    {
        "offset": 15,
        "name": "다음역 코드",
        "size": 1,
        "description": "",
        "keys": ["next_station"]
    },
    {
        "offset": 16,
        "name": "종착역 코드",
        "size": 1,
        "description": "종착역 코드",
        "keys": ["terminal_station"]
    },
    {
        "offset": 18,
        "name": "적산주행거리(m)",
        "size": 4,
        "description": "적산주행거리(m) / Big Endian",
        "keys": [
            "acc_distance"
        ]
    },
    {
        "offset": 22,
        "name": "속도(Km/h)",
        "size": 2,
        "description": "속도(0~255Km/h) /  Big Endian",
        "keys": [
            "speed"
        ]
    },
    {
        "offset": 24,
        "name": "ATC 목표속도",
        "size": 2,
        "description": "ATC 목표 속도(0~255Km/h) / Big Endian",
        "keys": [
            "atc_target_speed"
        ]
    },
    {
        "offset": 26,
        "name": "역간 적산 거리(m)",
        "size": 2,
        "description": "역간 적산 거리(5m/bit) / Big Endian",
        "keys": [
            "inter_acc_distance"
        ]
    },
    {
        "offset": 28,
        "name": "역간 거리(m)",
        "size": 2,
        "description": "역간 거리(m) / Big Endian",
        "keys": [
            "inter_distance"
        ]
    },
    {
        "offset": 30,
        "name": "역행",
        "size": 1,
        "description": "역행(0~100%)",
        "keys": ["역행"]
    },
    {
        "offset": 31,
        "name": "제동",
        "size": 1,
        "description": "제동(0~100%)",
        "keys": ["제동"]
    },
    {
        "offset": 32,
        "name": "1호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "1호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["1호차", "탑승률"]
    },
    {
        "offset": 33,
        "name": "2호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "2호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["2호차", "탑승률"]
    },
    {
        "offset": 34,
        "name": "3호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "3호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["3호차", "탑승률"]
    },
    {
        "offset": 35,
        "name": "4호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "4호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["4호차", "탑승률"]
    },
    {
        "offset": 36,
        "name": "5호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "5호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["5호차", "탑승률"]
    },
    {
        "offset": 37,
        "name": "6호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "6호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["6호차", "탑승률"]
    },
    {
        "offset": 38,
        "name": "7호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "7호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["7호차", "탑승률"]
    },
    {
        "offset": 39,
        "name": "0호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "0호차 탑승률(0~200%/0x00~0xC8)",
        "keys": ["0호차", "탑승률"]
    },

    {
        "offset": 42,
        "name": "HCR_구원운전",
        "size": 1,
        "description": "bit0(1호차 HCR) bit1(0호차 HCR) bit4(1호차 구원운전) bit5(0호차 구원운전)",
        "bitFlags": {
            "0": "1호차 HCR",
            "1": "0호차 HCR",
            "4": "1호차 구원운전",
            "5": "0호차 구원운전",
        },
        "keys": ["HCR_구원운전"]
    },

    {
        "offset": 43,
        "name": "CSB_FSB_상태",
        "size": 1,
        "description": "bit0(후진모드) bit1(후진모드 속도초과) bit3(EB CUT) bit4(HBCOS 상태) bit5(CSB 상태) bit6(FSB 상태) bit7(정차제동 상태)",
        "bitFlags": {
            "0": "후진모드",
            "1": "후진모드 속도초과",
            "3": "EB CUT",
            "4": "HBCOS 상태",
            "5": "CSB 상태",
            "6": "FSB 상태",
            "7": "정차제동 상태",
        },
        "keys": ["CSB_FSB_상태"]
    },
    {
        "offset": 44,
        "name": "역전기_마스콘위치",
        "size": 1,
        "description": "bit0(역전기후진위치) bit1(역전기전진위치) bit2(마스콘제동위치) bit3(마스콘역행위치)",
        "bitFlags": {
            "0": "역전기후진위치",
            "1": "역전기전진위치",
            "2": "마스콘제동위치",
            "3": "마스콘역행위치",
        },
        "keys": ["역전기_마스콘위치"]
    },
    {
        "offset": 45,
        "name": "제동_ATO_ATC",
        "size": 1,
        "description": "bit0(보안제동 상태) bit1(비상제동 상태) bit2(주차제동 상태) bit3(ATO모드) bit4(ATC모드) bit6(stop_proceed_mdoe) bit7(yard_mode)",
        "bitFlags": {
            "0": "보안제동 상태",
            "1": "비상제동 상태",
            "2": "주차제동 상태",
            "3": "ATO모드",
            "4": "ATC모드",
            "6": "stop_proceed_mdoe",
            "7": "yard_mode"
        },
        "keys": [
            "제동_ATO_ATC"
        ]
    },
    {
        "offset": 46,
        "name": "고장 상하선 정보",
        "size": 1,
        "description": "bit0~1(현재 출입문 열림 상태) bit2~3(출입문 열림 예정 방향) bit6(하선정보) bit7(상선정보)",
        "bitFlags": {
            "0": "현재 출입문 열림 상태",
            "1": "현재 출입문 열림 상태",
            "3": "출입문 열림 예정 방향",
            "4": "출입문 열림 예정 방향",
            "6": "하선정보", // 상행 : 1, None : 0
            "7": "상선정보" // 하행 : 1, None : 0
        },
        "keys": ["고장 상하선 정보 플래그"]
    },
    {
        "offset": 47,
        "name": "SIVK_ESK",
        "size": 1,
        "description": "bit0(SIVK1) bit3(ESK) bit7(SIVK2)",
        "bitFlags": {
            "0": "SIVK1",
            "3": "ESK",
            "7": "SIVK2"
        },
        "keys": [
            "SIVK_ESK"
        ]
    },
    {
        "offset": 48,
        "name": "화재감지",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 화재감지",
            "1": "2호차 화재감지",
            "2": "3호차 화재감지",
            "3": "4호차 화재감지",
            "4": "5호차 화재감지",
            "5": "6호차 화재감지",
            "6": "7호차 화재감지",
            "7": "0호차 화재감지",
            "14": "1호차 운전실 화재감지",
            "15": "0호차 운전실 화재감지"
        },
        "keys": ["화재감지"]
    },
    {
        "offset": 50,
        "name": "1번 비상인터폰 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 비상인터폰 1번 감지",
            "1": "2호차 비상인터폰 1번 감지",
            "2": "3호차 비상인터폰 1번 감지",
            "3": "4호차 비상인터폰 1번 감지",
            "4": "5호차 비상인터폰 1번 감지",
            "5": "6호차 비상인터폰 1번 감지",
            "6": "7호차 비상인터폰 1번 감지",
            "7": "0호차 비상인터폰 1번 감지",
        },
        "keys": ["비상인터폰", "1번"]
    },
    {
        "offset": 52,
        "name": "1번 비상인터폰 통화중",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 비상인터폰 1번 통화중",
            "1": "2호차 비상인터폰 1번 통화중",
            "2": "3호차 비상인터폰 1번 통화중",
            "3": "4호차 비상인터폰 1번 통화중",
            "4": "5호차 비상인터폰 1번 통화중",
            "5": "6호차 비상인터폰 1번 통화중",
            "6": "7호차 비상인터폰 1번 통화중",
            "7": "0호차 비상인터폰 1번 통화중",
        },
        "keys": ["비상인터폰", "1번"]
    },
    {
        "offset": 54,
        "name": "2번 비상인터폰 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 비상인터폰 2번 감지",
            "1": "2호차 비상인터폰 2번 감지",
            "2": "3호차 비상인터폰 2번 감지",
            "3": "4호차 비상인터폰 2번 감지",
            "4": "5호차 비상인터폰 2번 감지",
            "5": "6호차 비상인터폰 2번 감지",
            "6": "7호차 비상인터폰 2번 감지",
            "7": "0호차 비상인터폰 2번 감지",
        },
        "keys": ["비상인터폰", "2번"]
    },
    {
        "offset": 56,
        "name": "2번 비상인터폰 통화중",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 비상인터폰 2번 통화중",
            "1": "2호차 비상인터폰 2번 통화중",
            "2": "3호차 비상인터폰 2번 통화중",
            "3": "4호차 비상인터폰 2번 통화중",
            "4": "5호차 비상인터폰 2번 통화중",
            "5": "6호차 비상인터폰 2번 통화중",
            "6": "7호차 비상인터폰 2번 통화중",
            "7": "0호차 비상인터폰 2번 통화중",
        },
        "keys": ["비상인터폰", "2번"]
    },
    {
        "offset": 57,
        "name": "내부비상핸들 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "1호차 내부비상핸들 감지",
            "1": "2호차 내부비상핸들 감지",
            "2": "3호차 내부비상핸들 감지",
            "3": "4호차 내부비상핸들 감지",
            "4": "5호차 내부비상핸들 감지",
            "5": "6호차 내부비상핸들 감지",
            "6": "7호차 내부비상핸들 감지",
            "7": "0호차 내부비상핸들 감지",
        },
        "keys": ["내부비상핸들", "감지"]
    },

    {
        "offset": 59,
        "name": "NOTCH_AUTO_PWM",
        "size": 1,
        "description": "",
        "bitFlags": {
            "0": "NOTCH",
            "1": "NOTCH",
            "2": "NOTCH",
            "3": "NOTCH",
            "4": "AUTO_PWM 상태",

        },
        "keys": ["NOTCH_AUTO_PWM"]
    },

    /*
        ATC_limit_speed
        1) ATCCODE
            1: Key Down / 2: 정지(01) /
            3: 25km/h / 4: 35km/h /
            5: 45km/h / 6: 55km/h /
            7: 60km/h / 8: 좌측 문 열림 /
            9: Key Up / 10: 기지모드(25 km/h) /
            11: 65km/h / 12: 70km/h /
            13: 75km/h / 14: 80km/h /
            15: 90km/h / 16: 우측 문 열림 /
            default::""
    */
    {
        "offset": 71,
        "name": "ATC_limit_speed",
        "size": 1,
        "description": "",
        "keys": [
            "ATC_limit_speed"
        ]
    },

    /*
        "1) ATC Active
        주 ATC Active : 1 = 주 ATC
        보조 ATC Active : 1 = 보조 ATC
        둘 다 0 = -

        2)속도 버튼 모드 표시
        0: DRVM_NON = -
        2: DRVM_RESQ_MAIN = 구원
        4: DRVM_INSP = 검수
        5: DRVM_FA = FA
        6: DRVM_AUTO = A
        7: DRVM_YARD = Y
        8: DRVM_MAN = M
        9: DRVM_EM = F
        10: DRVM_RESQ_SLAVE = 피구원
        이 외, 값 '-'"
    */
    {
        "offset": 72,
        "name": "ATC_SPEED_MODE",
        "size": 1,
        "description": "",
        "bitFlags": {
            "0": "속도 버튼 모드 표시",
            "1": "속도 버튼 모드 표시",
            "2": "속도 버튼 모드 표시",
            "3": "속도 버튼 모드 표시",

            "6": "주 ATC Active",
            "7": "보조 ATC Active"
        },
        "keys": [
            "ATC_SPEED_MODE"
        ]
    },
    {
        "offset": 73,
        "name": "고장표시",
        "size": 1,
        "description": "bit0(고장 Clear) bit1(고장 Set)",
        "bitFlags": {
            "0": "고장 Clear",
            "1": "고장 Set"
        },
        "keys": ["고장표시"]
    },
    {
        "offset": 80,
        "name": "1호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "1호차",
            "HVAC"
        ]
    },
    {
        "offset": 81,
        "name": "2호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "2호차",
            "HVAC"
        ]
    },
    {
        "offset": 82,
        "name": "3호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "3호차",
            "HVAC"
        ]
    },
    {
        "offset": 83,
        "name": "4호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "4호차",
            "HVAC"
        ]
    },
    {
        "offset": 84,
        "name": "5호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "5호차",
            "HVAC"
        ]
    },
    {
        "offset": 85,
        "name": "6호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "6호차",
            "HVAC"
        ]
    },
    {
        "offset": 86,
        "name": "7호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "7호차",
            "HVAC"
        ]
    },
    {
        "offset": 87,
        "name": "0호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "0호차",
            "HVAC"
        ]
    },
    {
        "offset": 88,
        "name": "온도센서 이상",
        "size": 1,
        "description": "bit0(온도센서 이상)",
        "bitFlags": {
            "0": "온도센서 이상",
        },
        "keys": [
            "온도센서 이상"
        ]
    },
    /*
        값 뒤에 "℃" 붙여 현시.

        HVAC 상태(TEXT75~82)
        고장 bit 값과 통신고장 bit 값이
        둘 다 1이면 " - ℃"로 현시
    */
    {
        "offset": 89,
        "name": "운전실 온도",
        "size": 1,
        "description": "운전실 온도(℃)",
        "keys": [
            "온도센서 이상"
        ]
    },
    /*
        값 뒤에 ""℃"" 붙여 현시.
        온도센서 이상(TEXT83) 값이 1일 때
        "" - ℃""로 현시
    */
    {
        "offset": 90,
        "name": "외기 온도",
        "size": 1,
        "description": "외기 온도(℃)",
        "keys": [
            "외기 온도"
        ]
    },


    /*
        "1) 열차구성_바퀴 사이 온도표시

        Mode 값이 1 이상 9 이하일 시,
        청록색(#00D8FF) 표기
        Mode 값이 11 이상 19 이하일 시,
        주황색(#F7981D) 표기
        이 외 값은 흰색으로 표기

        HVAC 상태(TEXT75~82) 값이
        1(정상)일 때 실내 온도값 표시,
        1(정상)이 아닐때 ""-"" 표시
        -----------------------------
        2) 운전 일반화면 HVAC

        HVAC 상태(TEXT75~82)
        고장 bit 값이 1일 때 ""고  장"",
        정상 bit 값이 1일 때 이하 모드현시
        정상 bit 값이 0일 때 ""통신이상"" 

        3) 운전 일반화면 HVAC
        31: ""시  험"" / 21: ""자  동"" /
        14: ""FAST난방"" / 13: ""전난방"" /
        12: ""2/3난방"" / 11: ""1/3난방"" /
        6: ""FAN"" / 4: ""FAST냉방"" /
        3: ""환기"" / 2: ""전냉방"" / 1: ""반냉방""
        / 이 외, 값: ""OFF""
        열차 구성과 동일하게 모드표기 시
        색상동일하게 진행

        우선순위  고장 > 모드 > 통신이상

        (5L: 1, 2, 3, 4, 5, 6, 7, 0호 /
        8L; 1, 2, 4, 6, 7, 0호)"
    */
    {
        "offset": 91,
        "name": "1호차 HVAC_Mode",
        "size": 1,
        "description": "1호차 HVAC Mode",
        "keys": [
            "1호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 92,
        "name": "2호차 HVAC_Mode",
        "size": 1,
        "description": "2호차 HVAC Mode",
        "keys": [
            "2호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 93,
        "name": "3호차 HVAC_Mode",
        "size": 1,
        "description": "3호차 HVAC Mode",
        "keys": [
            "3호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 94,
        "name": "4호차 HVAC_Mode",
        "size": 1,
        "description": "4호차 HVAC Mode",
        "keys": [
            "4호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 95,
        "name": "5호차 HVAC_Mode",
        "size": 1,
        "description": "5호차 HVAC Mode",
        "keys": [
            "5호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 96,
        "name": "6호차 HVAC_Mode",
        "size": 1,
        "description": "6호차 HVAC Mode",
        "keys": [
            "6호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 97,
        "name": "7호차 HVAC_Mode",
        "size": 1,
        "description": "7호차 HVAC Mode",
        "keys": [
            "7호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 98,
        "name": "0호차 HVAC_Mode",
        "size": 1,
        "description": "0호차 HVAC Mode",
        "keys": [
            "0호차", "HVAC", "Mode"
        ]
    },
    {
        "offset": 99,
        "name": "1호차 실내온도",
        "size": 1,
        "description": "1호차 실내온도",
        "keys": [
            "1호차", "실내온도"
        ]
    },
    {
        "offset": 100,
        "name": "2호차 실내온도",
        "size": 1,
        "description": "2호차 실내온도",
        "keys": [
            "2호차", "실내온도"
        ]
    },
    {
        "offset": 101,
        "name": "3호차 실내온도",
        "size": 1,
        "description": "3호차 실내온도",
        "keys": [
            "3호차", "실내온도"
        ]
    },
    {
        "offset": 102,
        "name": "4호차 실내온도",
        "size": 1,
        "description": "4호차 실내온도",
        "keys": [
            "4호차", "실내온도"
        ]
    },
    {
        "offset": 103,
        "name": "5호차 실내온도",
        "size": 1,
        "description": "5호차 실내온도",
        "keys": [
            "5호차", "실내온도"
        ]
    },
    {
        "offset": 104,
        "name": "6호차 실내온도",
        "size": 1,
        "description": "6호차 실내온도",
        "keys": [
            "6호차", "실내온도"
        ]
    },
    {
        "offset": 105,
        "name": "7호차 실내온도",
        "size": 1,
        "description": "7호차 실내온도",
        "keys": [
            "7호차", "실내온도"
        ]
    },
    {
        "offset": 106,
        "name": "0호차 실내온도",
        "size": 1,
        "description": "0호차 실내온도",
        "keys": [
            "0호차", "실내온도"
        ]
    },

    /*
        "1호차 비상구원스위치 취급

        EO  - 1: EO, 0: None
        R1  - 1: R1, 0: None
        R2  - 1: R2, 0: None
        LOCO  - 1: LO, 0: None

        우선순위 
        (EO > R1 > R2 > LOCO > 미표시)"
    */
    {
        "offset": 108,
        "name": "1호차 비상구원스위치 취급",
        "size": 1,
        "description": "1호차 비상구원스위치 취급",
        "bitFlags": {
            "0": "EO",  // 비상 운전모드
            "1": "R1",  // 전동차구원 운전모드
            "2": "R2",  // 기관차 구원모드
            "3": "LOCO" // 기관사 비상운전
        },
        "keys": [
            "1호차", "비상구원스위치 취급"
        ]
    },
    {
        "offset": 109,
        "name": "0호차 비상구원스위치 취급",
        "size": 1,
        "description": "0호차 비상구원스위치 취급",
        "bitFlags": {
            "0": "EO",  // 비상 운전모드
            "1": "R1",  // 전동차구원 운전모드
            "2": "R2",  // 기관차 구원모드
            "3": "LOCO" // 기관사 비상운전
        },
        "keys": [
            "0호차", "비상구원스위치 취급"
        ]
    },

    /*
        "M Car 바퀴 색상
        VVVF INV_OK 값이 1일 시, 
        녹색(#00FF00) 표시 
        VVVF INV_OK 값이 0일 시,
        회색(#808080) 표시 
        -------------------------
        판토1(왼쪽) - 1: 상승, 0: 하강
        판토1(오른쪽) - 1: 상승, 0: 하강
        (5호선은 6호차 판토, 
        8호선은 7호차 판토)"
    */
    {
        "offset": 110,
        "name": "판토_바퀴색상",
        "size": 1,
        "description": "VVVF INV_OK 값이 1일 시, 녹색(#00FF00) 표시 VVVF INV_OK 값이 0일 시, 회색(#808080) 표시",
        "bitFlags": {
            "0": "2호차 판토1",
            "1": "2호차 판토2",
            "2": "6호차(7호차) 판토1",
            "3": "6호차(7호차) 판토2",
            "4": "2호차 VVVF INV_OK",
            "5": "3호차 VVVF INV_OK",
            "6": "6호차 VVVF INV_OK",
            "7": "7호차 VVVF INV_OK",
        },
        "keys": ["판토_바퀴색상"]
    },


    {
        "offset": 114,
        "name": "1호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "1호차",
            "CC"
        ]
    },
    {
        "offset": 115,
        "name": "2호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "2호차",
            "CC "
        ]
    },
    {
        "offset": 116,
        "name": "3호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "3호차",
            "CC"
        ]
    },
    {
        "offset": 117,
        "name": "4호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "4호차",
            "CC"
        ]
    },
    {
        "offset": 118,
        "name": "5호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "5호차",
            "CC"
        ]
    },
    {
        "offset": 119,
        "name": "6호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "6호차",
            "CC"
        ]
    },
    {
        "offset": 120,
        "name": "7호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "7호차",
            "CC"
        ]
    },
    {
        "offset": 121,
        "name": "0호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "0호차",
            "CC"
        ]
    },

    /*
        "CC 상태 (TEXT106~113)
        고장 bit 값과 통신고장 bit 값이
        둘 다 1(0x06)이면 아래 내용 미현시

        자동 연결기 상태 - 1: 취급, 0 :미취급
        출입문 열림 상태 - 1: 열림, 0: 닫힘"
    */

    {
        "offset": 124,
        "name": "CC 상태",
        "size": 1,
        "description": "bit0(4호차 통로 출입문 열림상태) bit1(5호차 통로 출입문 열림상태) bit4(1호차 운전실 출입문 열림상태) bit5(0호차 운전실 출입문 열림상태) bit6(1호차 자동연결기 상태) bit7(0호차 자동연결기 상태)",
        "bitFlags": {
            "0": "4호차 통로 출입문 열림상태",
            "1": "5호차 통로 출입문 열림상태",
            "4": "1호차 운전실 출입문 열림상태",
            "5": "0호차 운전실 출입문 열림상태",
            "6": "1호차 자동연결기 상태",
            "7": "0호차 자동연결기 상태"
        },
        "keys": [
            "CC 상태"
        ]
    },

    {
        "offset": 130,
        "name": "1호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["1호차", "DCU", "열림"]
    },
    {
        "offset": 131,
        "name": "1호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "1호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 132,
        "name": "1호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "1호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 133,
        "name": "1호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "1호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 134,
        "name": "1호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "1호차",
            "DCU",
            "고장"
        ]
    },

    {
        "offset": 136,
        "name": "2호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["2호차", "DCU", "열림"]
    },
    {
        "offset": 137,
        "name": "2호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "2호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 138,
        "name": "2호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "2호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 139,
        "name": "2호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "2호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 140,
        "name": "2호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "2호차",
            "DCU",
            "고장"
        ]
    },

    {
        "offset": 142,
        "name": "3호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["3호차", "DCU", "열림"]
    },
    {
        "offset": 143,
        "name": "3호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "3호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 144,
        "name": "3호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "3호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 145,
        "name": "3호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "3호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 146,
        "name": "3호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "3호차",
            "DCU",
            "고장"
        ]
    },

    {
        "offset": 148,
        "name": "4호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["4호차", "DCU", "열림"]
    },
    {
        "offset": 149,
        "name": "4호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "4호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 150,
        "name": "4호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "4호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 151,
        "name": "4호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "4호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 152,
        "name": "4호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "4호차",
            "DCU",
            "고장"
        ]
    },
    {
        "offset": 154,
        "name": "5호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["5호차", "DCU", "열림"]
    },
    {
        "offset": 155,
        "name": "5호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "5호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 156,
        "name": "5호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "5호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 157,
        "name": "5호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "5호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 158,
        "name": "5호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "5호차",
            "DCU",
            "고장"
        ]
    },
    {
        "offset": 160,
        "name": "6호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["6호차", "DCU", "열림"]
    },
    {
        "offset": 161,
        "name": "6호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "6호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 162,
        "name": "6호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "6호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 163,
        "name": "6호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "6호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 164,
        "name": "6호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "6호차",
            "DCU",
            "고장"
        ]
    },
    {
        "offset": 166,
        "name": "7호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["7호차", "DCU", "열림"]
    },
    {
        "offset": 167,
        "name": "7호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "7호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 168,
        "name": "7호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "7호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 169,
        "name": "7호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "7호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 170,
        "name": "7호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "7호차",
            "DCU",
            "고장"
        ]
    },

    {
        "offset": 172,
        "name": "0호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": ["0호차", "DCU", "열림"]
    },
    {
        "offset": 173,
        "name": "0호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "0호차",
            "DCU",
            "Bypass"
        ]
    },
    {
        "offset": 174,
        "name": "0호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "0호차",
            "DCU",
            "내부비상핸들"
        ]
    },
    {
        "offset": 175,
        "name": "0호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "0호차",
            "DCU",
            "외부비상핸들"
        ]
    },
    {
        "offset": 176,
        "name": "0호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "bitFlags": {
            "0": "DCU1",
            "1": "DCU2",
            "2": "DCU3",
            "3": "DCU4",
            "4": "DCU5",
            "5": "DCU6",
            "6": "DCU7",
            "7": "DCU8"
        },
        "keys": [
            "0호차",
            "DCU",
            "고장"
        ]
    },


    {
        "offset": 180,
        "name": "1호차 ATC1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "1호차",
            "ATC",
            "1"
        ]
    },
    {
        "offset": 181,
        "name": "1호차 ATC2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "1호차",
            "ATC",
            "2"
        ]
    },
    {
        "offset": 182,
        "name": "0호차 ATC1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "0호차",
            "ATC",
            "1"
        ]
    },
    {
        "offset": 183,
        "name": "0호차 ATC2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "0호차",
            "ATC",
            "2"
        ]
    },

    /*
        호차별 4bit 단위 Decimal
        "화재감지
        0: 정상 / 1: 주의 / 2: 고장 /
        3: 화재 / 4: ""-"" / 5: 고장
        ====================
        상태정보화면_화재감지_화재감지
        내용동일"
    */
    {
        "offset": 184,
        "name": "화재감지",
        "size": 4,
        "description": "",
        "bitFlags": {
            "0": "1호차 객실 화재감지 상태",
            "1": "1호차 객실 화재감지 상태",
            "2": "1호차 객실 화재감지 상태",
            "3": "1호차 객실 화재감지 상태",
            "4": "2호차 객실 화재감지 상태",
            "5": "2호차 객실 화재감지 상태",
            "6": "2호차 객실 화재감지 상태",
            "7": "2호차 객실 화재감지 상태",
            "8": "3호차 객실 화재감지 상태",
            "9": "3호차 객실 화재감지 상태",
            "10": "3호차 객실 화재감지 상태",
            "11": "3호차 객실 화재감지 상태",
            "12": "4호차 객실 화재감지 상태",
            "13": "4호차 객실 화재감지 상태",
            "14": "4호차 객실 화재감지 상태",
            "15": "4호차 객실 화재감지 상태",
            "16": "5호차 객실 화재감지 상태",
            "17": "5호차 객실 화재감지 상태",
            "18": "5호차 객실 화재감지 상태",
            "19": "5호차 객실 화재감지 상태",
            "20": "6호차 객실 화재감지 상태",
            "21": "6호차 객실 화재감지 상태",
            "22": "6호차 객실 화재감지 상태",
            "23": "6호차 객실 화재감지 상태",
            "24": "7호차 객실 화재감지 상태",
            "25": "7호차 객실 화재감지 상태",
            "26": "7호차 객실 화재감지 상태",
            "27": "7호차 객실 화재감지 상태",
            "28": "0호차 객실 화재감지 상태",
            "29": "0호차 객실 화재감지 상태",
            "30": "0호차 객실 화재감지 상태",
            "31": "0호차 객실 화재감지 상태",
        },
        "keys": [
            "화재감지", "객실"
        ]
    },
    {
        "offset": 188,
        "name": "화재감지",
        "size": 1,
        "description": "",
        "bitFlags": {
            "0": "1호차 운전실 화재감지 상태",
            "1": "1호차 운전실 화재감지 상태",
            "2": "1호차 운전실 화재감지 상태",
            "3": "1호차 운전실 화재감지 상태",
            "4": "0호차 운전실 화재감지 상태",
            "5": "0호차 운전실 화재감지 상태",
            "6": "0호차 운전실 화재감지 상태",
            "7": "0호차 운전실 화재감지 상태",
        },
        "keys": [
            "화재감지", "운전실"
        ]
    },

    {
        "offset": 189,
        "name": "1호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["1호차", "ECU"]
    },
    {
        "offset": 190,
        "name": "2호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["2호차", "ECU"]
    },
    {
        "offset": 191,
        "name": "3호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["3호차", "ECU"]
    },
    {
        "offset": 192,
        "name": "4호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["4호차", "ECU"]
    },
    {
        "offset": 193,
        "name": "5호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["5호차", "ECU"]
    },
    {
        "offset": 194,
        "name": "6호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["6호차", "ECU"]
    },
    {
        "offset": 195,
        "name": "7호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["7호차", "ECU"]
    },
    {
        "offset": 196,
        "name": "0호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": ["0호차", "ECU"]
    },
    {
        "offset": 197,
        "name": "2호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "TEST",
            "5": "미표시"
        },
        "keys": ["2호차", "VVVF"]
    },
    {
        "offset": 198,
        "name": "3호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "TEST",
            "5": "미표시"
        },
        "keys": ["3호차", "VVVF"]
    },
    {
        "offset": 199,
        "name": "6호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "TEST",
            "5": "미표시"
        },
        "keys": ["6호차", "VVVF"]
    },
    {
        "offset": 200,
        "name": "7호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "TEST",
            "5": "미표시"
        },
        "keys": ["7호차", "VVVF"]
    },
    {
        "offset": 201,
        "name": "1호차 SIV", // SIV_보조전원장치
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit5(투입)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "5": "투입"
        },
        "keys": ["1호차", "SIV"]
    },
    {
        "offset": 202,
        "name": "0호차 SIV", // SIV_보조전원장치
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit5(투입)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "5": "투입"
        },
        "keys": ["0호차", "SIV"]
    },
    {
        "offset": 203,
        "name": "1호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(BYPASS) bit5(CM기동)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "BYPASS",
            "5": "CM기동"
        },
        "keys": ["1호차", "CMSB"]
    },
    {
        "offset": 204,
        "name": "0호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(BYPASS) bit5(CM기동)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "BYPASS",
            "5": "CM기동"
        },
        "keys": ["0호차", "CMSB"]
    },
    {
        "offset": 205,
        "name": "ACM_ESK",
        "size": 1,
        "description": "bit0(2호차 ACM) bit1(6/7호차 ACM) bit7(ESK)",
        "bitFlags": {
            "0": "2호차 ACM 정상",
            "1": "6/7호차 ACM 정상",
            "7": "ESK 정상"
        },
        "keys": ["ACM_ESK"]
    },

    {
        "offset": 206,
        "name": "1호차 비상인터폰",
        "size": 1,
        "description": "bit0(1호차 비상인터폰 1 고장) bit1(1호차 비상인터폰 1 통신이상) bit2(1호차 비상인터폰 1 통화) bit3(1호차 비상인터폰 1 호출) bit4(1호차 비상인터폰 2 고장) bit5(1호차 비상인터폰 2 통신이상) bit6(1호차 비상인터폰 2 통화) bit7(1호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "1호차 비상인터폰 1 고장",
            "1": "1호차 비상인터폰 1 통신이상",
            "2": "1호차 비상인터폰 1 통화",
            "3": "1호차 비상인터폰 1 호출",
            "4": "1호차 비상인터폰 2 고장",
            "5": "1호차 비상인터폰 2 통신이상",
            "6": "1호차 비상인터폰 2 통화",
            "7": "1호차 비상인터폰 2 호출"
        },
        "keys": ["1호차", "비상인터폰"]
    },
    {
        "offset": 207,
        "name": "2호차 비상인터폰",
        "size": 1,
        "description": "bit0(2호차 비상인터폰 1 고장) bit1(2호차 비상인터폰 1 통신이상) bit2(2호차 비상인터폰 1 통화) bit3(2호차 비상인터폰 1 호출) bit4(2호차 비상인터폰 2 고장) bit5(2호차 비상인터폰 2 통신이상) bit6(2호차 비상인터폰 2 통화) bit7(2호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "2호차 비상인터폰 1 고장",
            "1": "2호차 비상인터폰 1 통신이상",
            "2": "2호차 비상인터폰 1 통화",
            "3": "2호차 비상인터폰 1 호출",
            "4": "2호차 비상인터폰 2 고장",
            "5": "2호차 비상인터폰 2 통신이상",
            "6": "2호차 비상인터폰 2 통화",
            "7": "2호차 비상인터폰 2 호출"
        },
        "keys": ["2호차", "비상인터폰"]
    },
    {
        "offset": 208,
        "name": "3호차 비상인터폰",
        "size": 1,
        "description": "bit0(3호차 비상인터폰 1 고장) bit1(3호차 비상인터폰 1 통신이상) bit2(3호차 비상인터폰 1 통화) bit3(3호차 비상인터폰 1 호출) bit4(3호차 비상인터폰 2 고장) bit5(3호차 비상인터폰 2 통신이상) bit6(3호차 비상인터폰 2 통화) bit7(3호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "3호차 비상인터폰 1 고장",
            "1": "3호차 비상인터폰 1 통신이상",
            "2": "3호차 비상인터폰 1 통화",
            "3": "3호차 비상인터폰 1 호출",
            "4": "3호차 비상인터폰 2 고장",
            "5": "3호차 비상인터폰 2 통신이상",
            "6": "3호차 비상인터폰 2 통화",
            "7": "3호차 비상인터폰 2 호출"
        },
        "keys": ["3호차", "비상인터폰"]
    },
    {
        "offset": 209,
        "name": "4호차 비상인터폰",
        "size": 1,
        "description": "bit0(4호차 비상인터폰 1 고장) bit1(4호차 비상인터폰 1 통신이상) bit2(4호차 비상인터폰 1 통화) bit3(4호차 비상인터폰 1 호출) bit4(4호차 비상인터폰 2 고장) bit5(4호차 비상인터폰 2 통신이상) bit6(4호차 비상인터폰 2 통화) bit7(4호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "4호차 비상인터폰 1 고장",
            "1": "4호차 비상인터폰 1 통신이상",
            "2": "4호차 비상인터폰 1 통화",
            "3": "4호차 비상인터폰 1 호출",
            "4": "4호차 비상인터폰 2 고장",
            "5": "4호차 비상인터폰 2 통신이상",
            "6": "4호차 비상인터폰 2 통화",
            "7": "4호차 비상인터폰 2 호출"
        },
        "keys": ["4호차", "비상인터폰"]
    },
    {
        "offset": 210,
        "name": "5호차 비상인터폰",
        "size": 1,
        "description": "bit0(5호차 비상인터폰 1 고장) bit1(5호차 비상인터폰 1 통신이상) bit2(5호차 비상인터폰 1 통화) bit3(5호차 비상인터폰 1 호출) bit4(5호차 비상인터폰 2 고장) bit5(5호차 비상인터폰 2 통신이상) bit6(5호차 비상인터폰 2 통화) bit7(5호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "5호차 비상인터폰 1 고장",
            "1": "5호차 비상인터폰 1 통신이상",
            "2": "5호차 비상인터폰 1 통화",
            "3": "5호차 비상인터폰 1 호출",
            "4": "5호차 비상인터폰 2 고장",
            "5": "5호차 비상인터폰 2 통신이상",
            "6": "5호차 비상인터폰 2 통화",
            "7": "5호차 비상인터폰 2 호출"
        },
        "keys": ["5호차", "비상인터폰"]
    },
    {
        "offset": 211,
        "name": "6호차 비상인터폰",
        "size": 1,
        "description": "bit0(6호차 비상인터폰 1 고장) bit1(6호차 비상인터폰 1 통신이상) bit2(6호차 비상인터폰 1 통화) bit3(6호차 비상인터폰 1 호출) bit4(6호차 비상인터폰 2 고장) bit5(6호차 비상인터폰 2 통신이상) bit6(6호차 비상인터폰 2 통화) bit7(6호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "6호차 비상인터폰 1 고장",
            "1": "6호차 비상인터폰 1 통신이상",
            "2": "6호차 비상인터폰 1 통화",
            "3": "6호차 비상인터폰 1 호출",
            "4": "6호차 비상인터폰 2 고장",
            "5": "6호차 비상인터폰 2 통신이상",
            "6": "6호차 비상인터폰 2 통화",
            "7": "6호차 비상인터폰 2 호출"
        },
        "keys": ["6호차", "비상인터폰"]
    },
    {
        "offset": 212,
        "name": "7호차 비상인터폰",
        "size": 1,
        "description": "bit0(7호차 비상인터폰 1 고장) bit1(7호차 비상인터폰 1 통신이상) bit2(7호차 비상인터폰 1 통화) bit3(7호차 비상인터폰 1 호출) bit4(7호차 비상인터폰 2 고장) bit5(7호차 비상인터폰 2 통신이상) bit6(7호차 비상인터폰 2 통화) bit7(7호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "7호차 비상인터폰 1 고장",
            "1": "7호차 비상인터폰 1 통신이상",
            "2": "7호차 비상인터폰 1 통화",
            "3": "7호차 비상인터폰 1 호출",
            "4": "7호차 비상인터폰 2 고장",
            "5": "7호차 비상인터폰 2 통신이상",
            "6": "7호차 비상인터폰 2 통화",
            "7": "7호차 비상인터폰 2 호출"
        },
        "keys": ["7호차", "비상인터폰"]
    },
    {
        "offset": 213,
        "name": "0호차 비상인터폰",
        "size": 1,
        "description": "bit0(0호차 비상인터폰 1 고장) bit1(0호차 비상인터폰 1 통신이상) bit2(0호차 비상인터폰 1 통화) bit3(0호차 비상인터폰 1 호출) bit4(0호차 비상인터폰 2 고장) bit5(0호차 비상인터폰 2 통신이상) bit6(0호차 비상인터폰 2 통화) bit7(0호차 비상인터폰 2 호출)",
        "bitFlags": {
            "0": "0호차 비상인터폰 1 고장",
            "1": "0호차 비상인터폰 1 통신이상",
            "2": "0호차 비상인터폰 1 통화",
            "3": "0호차 비상인터폰 1 호출",
            "4": "0호차 비상인터폰 2 고장",
            "5": "0호차 비상인터폰 2 통신이상",
            "6": "0호차 비상인터폰 2 통화",
            "7": "0호차 비상인터폰 2 호출"
        },
        "keys": ["0호차", "비상인터폰"]
    },
    {
        "offset": 220,
        "name": "2호차 VVVF VDC",
        "size": 2,
        "description": "2호차 추진장치 가선전압 Big Endian",
        "keys": ["2호차", "VVVF", "VDC"]
    },
    {
        "offset": 222,
        "name": "3호차 VVVF VDC",
        "size": 2,
        "description": "3호차 추진장치 가선전압 Big Endian",
        "keys": ["3호차", "VVVF", "VDC"]
    },
    {
        "offset": 224,
        "name": "6호차 VVVF VDC",
        "size": 2,
        "description": "6호차 추진장치 가선전압 Big Endian",
        "keys": ["6호차", "VVVF", "VDC"]
    },
    {
        "offset": 226,
        "name": "7호차 VVVF VDC",
        "size": 2,
        "description": "7호차 추진장치 가선전압 Big Endian",
        "keys": ["7호차", "VVVF", "VDC"]
    },
    {
        "offset": 228,
        "name": "2호차 전동기 전류",
        "size": 2,
        "description": "2호차 추진장치 전동기전류 Big Endian",
        "keys": ["2호차", "추진장치", "전동기전류"]
    },
    {
        "offset": 230,
        "name": "3호차 전동기 전류",
        "size": 2,
        "description": "3호차 추진장치 전동기전류 Big Endian",
        "keys": ["3호차", "추진장치", "전동기전류"]
    },
    {
        "offset": 232,
        "name": "6호차 전동기 전류",
        "size": 2,
        "description": "6호차 추진장치 전동기전류 Big Endian",
        "keys": ["6호차", "추진장치", "전동기전류"]
    },
    {
        "offset": 234,
        "name": "7호차 전동기 전류",
        "size": 2,
        "description": "7호차 추진장치 전동기전류 Big Endian",
        "keys": ["7호차", "추진장치", "전동기전류"]
    },
    {
        "offset": 236,
        "name": "2호차 VVVF FDC",
        "size": 2,
        "description": "2호차 추진장치 FC전압 Big Endian",
        "keys": ["2호차", "VVVF", "FDC"]
    },
    {
        "offset": 238,
        "name": "3호차 VVVF FDC",
        "size": 2,
        "description": "3호차 추진장치 FC전압 Big Endian",
        "keys": ["3호차", "VVVF", "FDC"]
    },
    {
        "offset": 240,
        "name": "6호차 VVVF FDC",
        "size": 2,
        "description": "6호차 추진장치 FC전압 Big Endian",
        "keys": ["6호차", "VVVF", "FDC"]
    },
    {
        "offset": 242,
        "name": "7호차 VVVF FDC",
        "size": 2,
        "description": "7호차 추진장치 FC전압 Big Endian",
        "keys": ["7호차", "VVVF", "FDC"]
    },
    {
        "offset": 244,
        "name": "HB투입상태",
        "size": 1,
        "description": "bit0(2호차 HB투입상태) bit1(3호차 HB투입상태) bit2(6호차 HB투입상태) bit3(7호차 HB투입상태)",
        "bitFlags": {
            "0": "2호차 HB투입상태",
            "1": "3호차 HB투입상태",
            "2": "6호차 HB투입상태",
            "3": "7호차 HB투입상태"
        },
        "keys": [
            "HB투입상태"
        ]
    },
    {
        "offset": 245,
        "name": "LB투입상태",
        "size": 1,
        "description": "bit0(2호차 LB투입상태) bit1(3호차 LB투입상태) bit2(6호차 LB투입상태) bit3(7호차 LB투입상태)",
        "bitFlags": {
            "0": "2호차 LB투입상태",
            "1": "3호차 LB투입상태",
            "2": "6호차 LB투입상태",
            "3": "7호차 LB투입상태"
        },
        "keys": [
            "LB투입상태"
        ]
    },
    {
        "offset": 247,
        "name": "1호차 SIV 출력전압",
        "size": 1,
        "description": "1호차 SIV 출력전압",
        "keys": ["1호차", "SIV", "출력전압"]
    },
    {
        "offset": 248,
        "name": "0호차 SIV 출력전압",
        "size": 1,
        "description": "0호차 SIV 출력전압",
        "keys": ["0호차", "SIV", "출력전압"]
    },
    {
        "offset": 249,
        "name": "1호차 SIV 출력전류",
        "size": 2,
        "description": "1호차 SIV 출력전류",
        "keys": ["1호차", "SIV", "출력전류"]
    },
    {
        "offset": 251,
        "name": "0호차 SIV 출력전류",
        "size": 2,
        "description": "0호차 SIV 출력전류",
        "keys": ["0호차", "SIV", "출력전류"]
    },
    {
        "offset": 253,
        "name": "1호차 SIV 출력주파수",
        "size": 1,
        "description": "1호차 SIV 출력주파수",
        "keys": ["1호차", "SIV", "출력주파수"]
    },
    {
        "offset": 254,
        "name": "0호차 SIV 출력주파수",
        "size": 1,
        "description": "0호차 SIV 출력주파수",
        "keys": ["0호차", "SIV", "출력주파수"]
    },
    {
        "offset": 255,
        "name": "1호차 SIV DC 가선전압",
        "size": 1,
        "description": "1호차 SIV DC 가선전압",
        "keys": ["1호차", "SIV", "DC가선전압"]
    },
    {
        "offset": 256,
        "name": "0호차 SIV DC 가선전압",
        "size": 1,
        "description": "0호차 SIV DC 가선전압",
        "keys": ["0호차", "SIV", "DC가선전압"]
    },
    {
        "offset": 257,
        "name": "1호차 SIV 인버터 FC전압",
        "size": 1,
        "description": "1호차 SIV 인버터 FC전압",
        "keys": ["1호차", "SIV", "인버터FC전압"]
    },
    {
        "offset": 258,
        "name": "0호차 SIV 인버터 FC전압",
        "size": 1,
        "description": "0호차 SIV 인버터 FC전압",
        "keys": ["0호차", "SIV", "인버터FC전압"]
    },

    {
        "offset": 259,
        "name": "배터리 충방전 상태",
        "size": 1,
        "description": "bit0(1호차 배터리 충전중) bit1(2호차 배터리 방전중) bit4(0호차 배터리 충전중) bit5(0호차 배터리 방전중)",
        "bitFlags": {
            "0": "1호차 배터리 충전중",
            "1": "2호차 배터리 방전중",
            "4": "0호차 배터리 충전중",
            "5": "0호차 배터리 방전중"
        },
        "keys": [
            "배터리 충방전 상태"
        ]
    },
    {
        "offset": 260,
        "name": "1호차 배터리 충전율",
        "size": 1,
        "description": "1호차 배터리 충전율",
        "keys": ["1호차", "배터리", "충전율"]
    },
    {
        "offset": 261,
        "name": "0호차 배터리 충전율",
        "size": 1,
        "description": "0호차 배터리 충전율",
        "keys": ["0호차", "배터리", "충전율"]
    },
    {
        "offset": 263,
        "name": "1호차 ECU AS압력",
        "size": 2,
        "description": "1호차 ECU AS압력",
        "keys": ["1호차", "ECU", "AS압력"]
    },
    {
        "offset": 265,
        "name": "2호차 ECU AS압력",
        "size": 2,
        "description": "2호차 ECU AS압력",
        "keys": ["2호차", "ECU", "AS압력"]
    },
    {
        "offset": 267,
        "name": "3호차 ECU AS압력",
        "size": 2,
        "description": "3호차 ECU AS압력",
        "keys": ["3호차", "ECU", "AS압력"]
    },
    {
        "offset": 269,
        "name": "4호차 ECU AS압력",
        "size": 2,
        "description": "4호차 ECU AS압력",
        "keys": ["4호차", "ECU", "AS압력"]
    },
    {
        "offset": 271,
        "name": "5호차 ECU AS압력",
        "size": 2,
        "description": "5호차 ECU AS압력",
        "keys": ["5호차", "ECU", "AS압력"]
    },
    {
        "offset": 273,
        "name": "6호차 ECU AS압력",
        "size": 2,
        "description": "6호차 ECU AS압력",
        "keys": ["6호차", "ECU", "AS압력"]
    },
    {
        "offset": 275,
        "name": "7호차 ECU AS압력",
        "size": 2,
        "description": "7호차 ECU AS압력",
        "keys": ["7호차", "ECU", "AS압력"]
    },
    {
        "offset": 277,
        "name": "0호차 ECU AS압력",
        "size": 2,
        "description": "0호차 ECU AS압력",
        "keys": ["0호차", "ECU", "AS압력"]
    },

    /*
        "제동 BC압력

        화면 출력 시 계산 필요
        1) (n * 3 * 0.0101972)
        3) 계산된 값은 소수점 1 번째 자리까지 현시
        (5L: 1, 2, 3, 4, 5, 6, 7, 0호 /
        8L; 1, 2, 4, 6, 7, 0호)"
    */
    {
        "offset": 279,
        "name": "1호차 ECU BC압력",
        "size": 1,
        "description": "1호차 ECU BC압력",
        "keys": ["1호차", "ECU", "BC압력"]
    },
    {
        "offset": 280,
        "name": "2호차 ECU BC압력",
        "size": 1,
        "description": "2호차 ECU BC압력",
        "keys": ["2호차", "ECU", "BC압력"]
    },
    {
        "offset": 281,
        "name": "3호차 ECU BC압력",
        "size": 1,
        "description": "3호차 ECU BC압력",
        "keys": ["3호차", "ECU", "BC압력"]
    },
    {
        "offset": 282,
        "name": "4호차 ECU BC압력",
        "size": 1,
        "description": "4호차 ECU BC압력",
        "keys": ["4호차", "ECU", "BC압력"]
    },
    {
        "offset": 283,
        "name": "5호차 ECU BC압력",
        "size": 1,
        "description": "5호차 ECU BC압력",
        "keys": ["5호차", "ECU", "BC압력"]
    },
    {
        "offset": 284,
        "name": "6호차 ECU BC압력",
        "size": 1,
        "description": "6호차 ECU BC압력",
        "keys": ["6호차", "ECU", "BC압력"]
    },
    {
        "offset": 285,
        "name": "7호차 ECU BC압력",
        "size": 1,
        "description": "7호차 ECU BC압력",
        "keys": ["7호차", "ECU", "BC압력"]
    },
    {
        "offset": 286,
        "name": "0호차 ECU BC압력",
        "size": 1,
        "description": "0호차 ECU BC압력",
        "keys": ["0호차", "ECU", "BC압력"]
    },
    {
        "offset": 287,
        "name": "1호차 ECU HCR BC압력",
        "size": 1,
        "description": "1호차 ECU HCR BC압력",
        "keys": ["1호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 288,
        "name": "1호차 ECU TCR BC압력",
        "size": 1,
        "description": "1호차 ECU TCR BC압력",
        "keys": ["1호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 289,
        "name": "2호차 ECU HCR BC압력",
        "size": 1,
        "description": "2호차 ECU HCR BC압력",
        "keys": ["2호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 290,
        "name": "2호차 ECU TCR BC압력",
        "size": 1,
        "description": "2호차 ECU TCR BC압력",
        "keys": ["2호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 291,
        "name": "3호차 ECU HCR BC압력",
        "size": 1,
        "description": "3호차 ECU HCR BC압력",
        "keys": ["3호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 292,
        "name": "3호차 ECU TCR BC압력",
        "size": 1,
        "description": "3호차 ECU TCR BC압력",
        "keys": ["3호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 293,
        "name": "4호차 ECU HCR BC압력",
        "size": 1,
        "description": "4호차 ECU HCR BC압력",
        "keys": ["4호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 294,
        "name": "4호차 ECU TCR BC압력",
        "size": 1,
        "description": "4호차 ECU TCR BC압력",
        "keys": ["4호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 295,
        "name": "5호차 ECU HCR BC압력",
        "size": 1,
        "description": "5호차 ECU HCR BC압력",
        "keys": ["5호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 296,
        "name": "5호차 ECU TCR BC압력",
        "size": 1,
        "description": "5호차 ECU TCR BC압력",
        "keys": ["5호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 297,
        "name": "6호차 ECU HCR BC압력",
        "size": 1,
        "description": "6호차 ECU HCR BC압력",
        "keys": ["6호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 298,
        "name": "6호차 ECU TCR BC압력",
        "size": 1,
        "description": "6호차 ECU TCR BC압력",
        "keys": ["6호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 299,
        "name": "7호차 ECU HCR BC압력",
        "size": 1,
        "description": "7호차 ECU HCR BC압력",
        "keys": ["7호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 300,
        "name": "7호차 ECU TCR BC압력",
        "size": 1,
        "description": "7호차 ECU TCR BC압력",
        "keys": ["7호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 301,
        "name": "0호차 ECU HCR BC압력",
        "size": 1,
        "description": "0호차 ECU HCR BC압력",
        "keys": ["0호차", "ECU", "HCR", "BC압력"]
    },
    {
        "offset": 302,
        "name": "0호차 ECU TCR BC압력",
        "size": 1,
        "description": "0호차 ECU TCR BC압력",
        "keys": ["0호차", "ECU", "TCR", "BC압력"]
    },
    {
        "offset": 303,
        "name": "2호차 회생제동력",
        "size": 1,
        "description": "2호차 회생제동력",
        "keys": ["2호차", "회생제동력"]
    },
    {
        "offset": 304,
        "name": "4호차 회생제동력",
        "size": 1,
        "description": "4호차 회생제동력",
        "keys": ["4호차", "회생제동력"]
    },
    {
        "offset": 305,
        "name": "6호차 회생제동력",
        "size": 1,
        "description": "6호차 회생제동력",
        "keys": ["6호차", "회생제동력"]
    },
    {
        "offset": 306,
        "name": "7호차 회생제동력",
        "size": 1,
        "description": "7호차 회생제동력",
        "keys": ["7호차", "회생제동력"]
    },

    /*
        "표시기 방송_표시기 SLEEP
        pic_sleep_start
        - 1: 무표시동작, 0: None"
    */
    {
        "offset": 310,
        "name": "pic_sleep_start",
        "size": 1,
        "description": "방송 표시기 SLEEP bit0(pic_sleep_start)",
        "bitFlags": {
            "0": "pic_sleep_start"
        },
        "keys": [
            "방송표시기"
        ]
    },
    {
        "offset": 311,
        "name": "1호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "1호차",
            "PIC"
        ]
    },
    {
        "offset": 312,
        "name": "0호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
        },
        "keys": [
            "0호차",
            "PIC"
        ]
    },
    {
        "offset": 313,
        "name": "통합설정기",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "통합설정기"
        ]
    },
    {
        "offset": 314,
        "name": "정면행선안내",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "정면행선안내"
        ]
    },
    {
        "offset": 315,
        "name": "단부안내표시기",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "단부안내표시기"
        ]
    },
    {
        "offset": 316,
        "name": "단부안내표시기 1",
        "size": 1,
        "description": "bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장)",
        "bitFlags": {
            "1": "2호차 고장",
            "2": "3호차 고장",
            "3": "4호차 고장",
            "4": "5호차 고장",
            "5": "6호차 고장",
            "6": "7호차 고장",
        },
        "keys": [
            "단부안내표시기", "1"
        ]
    },
    {
        "offset": 317,
        "name": "단부안내표시기 2",
        "size": 1,
        "description": "bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장)",
        "bitFlags": {
            "1": "2호차 고장",
            "2": "3호차 고장",
            "3": "4호차 고장",
            "4": "5호차 고장",
            "5": "6호차 고장",
            "6": "7호차 고장",
        },
        "keys": [
            "단부안내표시기2", "2"
        ]
    },
    {
        "offset": 318,
        "name": "객실안내표시기",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "1": "2호차 고장",
            "2": "3호차 고장",
            "3": "4호차 고장",
            "4": "5호차 고장",
            "5": "6호차 고장",
            "6": "7호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "객실안내표시기"
        ]
    },
    // 자동방송장치, 중앙제어장치(COB), 축면제어장치1(SOB), 축면제어장치2(SOB)
    {
        "offset": 319,
        "name": "자동방송장치",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "자동방송장치"
        ]
    },
    {
        "offset": 320,
        "name": "중앙제어장치(COB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "중앙제어장치(COB)"
        ]
    },
    {
        "offset": 321,
        "name": "축면제어장치1(SOB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "축면제어장치1(SOB)"
        ]
    },
    {
        "offset": 322,
        "name": "축면제어장치2(SOB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "축면제어장치2(SOB)"
        ]
    },

    // 출력증폭기1, 출력증폭기2
    {
        "offset": 323,
        "name": "출력증폭기1",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "1": "2호차 고장",
            "2": "3호차 고장",
            "3": "4호차 고장",
            "4": "5호차 고장",
            "5": "6호차 고장",
            "6": "7호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "객실안내표시기"
        ]
    },
    {
        "offset": 324,
        "name": "출력증폭기2",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "bitFlags": {
            "0": "1호차 고장",
            "1": "2호차 고장",
            "2": "3호차 고장",
            "3": "4호차 고장",
            "4": "5호차 고장",
            "5": "6호차 고장",
            "6": "7호차 고장",
            "7": "0호차 고장",
        },
        "keys": [
            "객실안내표시기"
        ]
    },

    /*
        ofsset 330~407 각 1byte
        1호차 객실MD1 차량온도							
        1호차 객실MD2 차량온도							
        1호차 객실MD3 차량온도							
        1호차 운전실MD4 차량온도							
        2호차 객실MD1 차량온도							
        2호차 객실MD2 차량온도							
        2호차 객실MD3 차량온도							
        3호차 객실MD1 차량온도							
        3호차 객실MD2 차량온도							
        3호차 객실MD3 차량온도							
        4호차 객실MD1 차량온도							
        4호차 객실MD2 차량온도							
        4호차 객실MD3 차량온도							
        5호차 객실MD1 차량온도							
        5호차 객실MD2 차량온도							
        5호차 객실MD3 차량온도							
        6호차 객실MD1 차량온도							
        6호차 객실MD2 차량온도							
        6호차 객실MD3 차량온도							
        7호차 객실MD1 차량온도							
        7호차 객실MD2 차량온도							
        7호차 객실MD3 차량온도							
        0호차 객실MD1 차량온도							
        0호차 객실MD2 차량온도							
        0호차 객실MD3 차량온도							
        0호차 운전실MD4 차량온도
        1호차 객실MD1 연기농도							
        1호차 객실MD2 연기농도							
        1호차 객실MD3 연기농도							
        1호차 운전실MD4 연기농도							
        2호차 객실MD1 연기농도							
        2호차 객실MD2 연기농도							
        2호차 객실MD3 연기농도							
        3호차 객실MD1 연기농도							
        3호차 객실MD2 연기농도							
        3호차 객실MD3 연기농도							
        4호차 객실MD1 연기농도							
        4호차 객실MD2 연기농도							
        4호차 객실MD3 연기농도							
        5호차 객실MD1 연기농도							
        5호차 객실MD2 연기농도							
        5호차 객실MD3 연기농도							
        6호차 객실MD1 연기농도							
        6호차 객실MD2 연기농도							
        6호차 객실MD3 연기농도							
        7호차 객실MD1 연기농도							
        7호차 객실MD2 연기농도							
        7호차 객실MD3 연기농도							
        0호차 객실MD1 연기농도							
        0호차 객실MD2 연기농도							
        0호차 객실MD3 연기농도							
        0호차 운전실MD4 연기농도							
        1호차 객실MD1 먼지농도							
        1호차 객실MD2 먼지농도							
        1호차 객실MD3 먼지농도							
        1호차 운전실MD4 먼지농도							
        2호차 객실MD1 먼지농도							
        2호차 객실MD2 먼지농도							
        2호차 객실MD3 먼지농도							
        3호차 객실MD1 먼지농도							
        3호차 객실MD2 먼지농도							
        3호차 객실MD3 먼지농도							
        4호차 객실MD1 먼지농도							
        4호차 객실MD2 먼지농도							
        4호차 객실MD3 먼지농도							
        5호차 객실MD1 먼지농도							
        5호차 객실MD2 먼지농도							
        5호차 객실MD3 먼지농도							
        6호차 객실MD1 먼지농도							
        6호차 객실MD2 먼지농도							
        6호차 객실MD3 먼지농도							
        7호차 객실MD1 먼지농도							
        7호차 객실MD2 먼지농도							
        7호차 객실MD3 먼지농도							
        0호차 객실MD1 먼지농도							
        0호차 객실MD2 먼지농도							
        0호차 객실MD3 먼지농도							
        0호차 운전실MD4 먼지농도							
    */
    {
        "offset": 330,
        "name": "1호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 331,
        "name": "1호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 332,
        "name": "1호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 333,
        "name": "1호차 운전실MD4 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "운전실MD4", "차량온도"
        ]
    },
    {
        "offset": 334,
        "name": "2호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 335,
        "name": "2호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 336,
        "name": "2호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 337,
        "name": "3호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 338,
        "name": "3호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 339,
        "name": "3호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 340,
        "name": "4호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 341,
        "name": "4호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 342,
        "name": "4호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 343,
        "name": "5호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 344,
        "name": "5호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 345,
        "name": "5호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 346,
        "name": "6호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 347,
        "name": "6호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 348,
        "name": "6호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 349,
        "name": "7호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 350,
        "name": "7호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 351,
        "name": "7호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 352,
        "name": "0호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD1", "차량온도"
        ]
    },
    {
        "offset": 353,
        "name": "0호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD2", "차량온도"
        ]
    },
    {
        "offset": 354,
        "name": "0호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD3", "차량온도"
        ]
    },
    {
        "offset": 355,
        "name": "0호차 운전실MD4 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "운전실MD4", "차량온도"
        ]
    },
    //연기농도
    {
        "offset": 356,
        "name": "1호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 357,
        "name": "1호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 358,
        "name": "1호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 359,
        "name": "1호차 운전실MD4 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "운전실MD4", "연기농도"
        ]
    },
    {
        "offset": 360,
        "name": "2호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 361,
        "name": "2호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 362,
        "name": "2호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 363,
        "name": "3호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 364,
        "name": "3호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 365,
        "name": "3호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 366,
        "name": "4호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 367,
        "name": "4호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 368,
        "name": "4호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 369,
        "name": "5호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 370,
        "name": "5호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 371,
        "name": "5호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 372,
        "name": "6호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 373,
        "name": "6호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 374,
        "name": "6호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 375,
        "name": "7호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 376,
        "name": "7호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 377,
        "name": "7호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 378,
        "name": "0호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD1", "연기농도"
        ]
    },
    {
        "offset": 379,
        "name": "0호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD2", "연기농도"
        ]
    },
    {
        "offset": 380,
        "name": "0호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD3", "연기농도"
        ]
    },
    {
        "offset": 381,
        "name": "0호차 운전실MD4 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "운전실MD4", "연기농도"
        ]
    },

    // 먼지농도
    {
        "offset": 382,
        "name": "1호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 383,
        "name": "1호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 384,
        "name": "1호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 385,
        "name": "1호차 운전실MD4 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차", "운전실MD4", "먼지농도"
        ]
    },
    {
        "offset": 386,
        "name": "2호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 387,
        "name": "2호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 388,
        "name": "2호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 389,
        "name": "3호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 390,
        "name": "3호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 391,
        "name": "3호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 392,
        "name": "4호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 393,
        "name": "4호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 394,
        "name": "4호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 395,
        "name": "5호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 396,
        "name": "5호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 397,
        "name": "5호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 398,
        "name": "6호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 399,
        "name": "6호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 400,
        "name": "6호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 401,
        "name": "7호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 402,
        "name": "7호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 403,
        "name": "7호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 404,
        "name": "0호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD1", "먼지농도"
        ]
    },
    {
        "offset": 405,
        "name": "0호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD2", "먼지농도"
        ]
    },
    {
        "offset": 406,
        "name": "0호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "객실MD3", "먼지농도"
        ]
    },
    {
        "offset": 407,
        "name": "0호차 운전실MD4 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차", "운전실MD4", "먼지농도"
        ]
    },

    /*
        offset 410~415

        "1호차 냉난방장치

        우선순위 (해당 값이 1이면 표시) 
        1) 난방장치: 전난방 > 2/3난방 >
        1/3난방 > 3개 중 해당 없을 시 ""OFF""

        2) 냉방1(U1): 전냉방 > 반냉방 >
        환기 > 3개 중 해당 없을 시 ""OFF""

        3) 냉방2(U2): 위와 동일

        4) 송풍기:
        ELFFK(약자) - 1: ON, 0: OFF
        LFFK (중앙) - 1: ON, 0: OFF

        5) 배기팬 - 1: ON, 0: OFF 

        6) 공기정화기: 강 > 중 > 약 >
        자동 > 4개 중 해당 없을 시 ""OFF""
        (공기청정화면_공기정화기 동일 사용)

        7) 설정모드
        1: 시험 / 2: 전냉방 / 3: 반냉방 /
        4: 환기 / 5: OFF / 6: 자동 /
        7: 1/3난방 / 8: 2/3난방 / 9: 전난방 /
        이 외 값: OFF

        8) 설정온도: 해당 값 뒤에 ℃ 표시"

    */
    /*
 U2 전냉방	
 U1 반냉방	
 U1 전냉방	
 1/3난방	
 2/3난방	
 전난방	
 OFF	
 자동
 
 예비	
 예비	
 배기 FAN 상태
 U2 FAD 상태
 U1 FAD 상태
 U2 환기
 U1 환기
 U2 반냉방
 
 
 예비
 예비	
 예비	
 예비	
 예비	
 LFFK 상태
 ELFFk 상태
 APDK 상태
 
 
 APR2 상태
 APR1 상태
 예비
 공기정화기 OFF
 공기정화기 자동
 공기정화기 약
 공기정화기 중
 공기정화기 강
 
    */
    //1호차
    {
        "offset": 410,
        "name": "1호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "1호차", "냉난방장치"
        ]
    },
    {
        "offset": 414,
        "name": "1호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "1호차", "냉난방장치"
        ]
    },
    {
        "offset": 415,
        "name": "1호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치 설정온도",

        "keys": [
            "1호차", "냉난방장치", "설정온도"
        ]
    },
    //2호차
    {
        "offset": 416,
        "name": "2호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "2호차", "냉난방장치"
        ]
    },
    {
        "offset": 420,
        "name": "2호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "2호차", "냉난방장치"
        ]
    },
    {
        "offset": 421,
        "name": "2호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "2호차", "냉난방장치", "설정온도"
        ]
    },
    //3호차
    {
        "offset": 422,
        "name": "3호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "3호차", "냉난방장치"
        ]
    },
    {
        "offset": 426,
        "name": "3호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "3호차", "냉난방장치"
        ]
    },
    {
        "offset": 427,
        "name": "3호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "3호차", "냉난방장치", "설정온도"
        ]
    },
    //4호차
    {
        "offset": 428,
        "name": "4호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "4호차", "냉난방장치"
        ]
    },
    {
        "offset": 432,
        "name": "4호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "4호차", "냉난방장치"
        ]
    },
    {
        "offset": 433,
        "name": "4호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "4호차", "냉난방장치", "설정온도"
        ]
    },
    //5호차
    {
        "offset": 434,
        "name": "5호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "5호차", "냉난방장치"
        ]
    },
    {
        "offset": 438,
        "name": "4호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "5호차", "냉난방장치"
        ]
    },
    {
        "offset": 439,
        "name": "5호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "5호차", "냉난방장치", "설정온도"
        ]
    },
    //6호차
    {
        "offset": 440,
        "name": "6호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "6호차", "냉난방장치"
        ]
    },
    {
        "offset": 444,
        "name": "6호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "6호차", "냉난방장치"
        ]
    },
    {
        "offset": 445,
        "name": "6호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "6호차", "냉난방장치", "설정온도"
        ]
    },
    //7호차
    {
        "offset": 446,
        "name": "7호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "7호차", "냉난방장치"
        ]
    },
    {
        "offset": 450,
        "name": "7호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "7호차", "냉난방장치"
        ]
    },
    {
        "offset": 451,
        "name": "7호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "7호차", "냉난방장치", "설정온도"
        ]
    },
    //0호차
    {
        "offset": 452,
        "name": "0호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "bitFlags": {
            "0": "자동",
            "1": "OFF",
            "2": "전난방",
            "3": "2/3난방",
            "4": "1/3난방",
            "5": "U1 전냉방",
            "6": "U1 반냉방",
            "7": "U2 전냉방",
            "8": "U2 반냉방",
            "9": "U1 환기",
            "10": "U2 환기",
            "11": "U1 FAD 상태",
            "12": "U2 FAD 상태",
            "13": "배기 FAN 상태",
            "16": "APDK 상태",
            "17": "ELFFk 상태",
            "18": "LFFK 상태",
            "24": "공기정화기 강",
            "25": "공기정화기 중",
            "26": "공기정화기 약",
            "27": "공기정화기 자동",
            "28": "공기정화기 OFF",
            "30": "APR1 상태",
            "31": "APR2 상태",

        },
        "keys": [
            "0호차", "냉난방장치"
        ]
    },
    {
        "offset": 456,
        "name": "0호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "bitFlags": {
            "0": "설정모드",
            "1": "설정모드",
            "2": "설정모드",
            "3": "설정모드",
        },
        "keys": [
            "0호차", "냉난방장치"
        ]
    },
    {
        "offset": 457,
        "name": "0호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",

        "keys": [
            "0호차", "냉난방장치", "설정온도"
        ]
    },

    //1호차 운전실 공기실개선장치
    {
        "offset": 458,
        "name": "1호차 운전실 공기실개선장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(OFF) bit6(CAPR1) bit7(CAPR2)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "4": "OFF",
            "6": "CAPR1",
            "7": "CAPR2",
        },
        "keys": [
            "1호차", "운전실", "공기실개선장치"
        ]
    },
    //1호차 운전실 냉방장치
    {
        "offset": 459,
        "name": "1호차 운전실 냉방장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(환기) bit4(OFF)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "환기",
            "4": "OFF",
        },
        "keys": [
            "1호차", "운전실", "냉방장치"
        ]
    },
    //0호차 운전실 공기실개선장치
    {
        "offset": 460,
        "name": "0호차 운전실 공기실개선장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(OFF) bit6(CAPR1) bit7(CAPR2)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "4": "OFF",
            "6": "CAPR1",
            "7": "CAPR2",
        },
        "keys": [
            "0호차", "운전실", "공기실개선장치"
        ]
    },
    //0호차 운전실 냉방장치
    {
        "offset": 461,
        "name": "0호차 운전실 냉방장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(환기) bit4(OFF)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "환기",
            "4": "OFF",
        },
        "keys": [
            "0호차", "운전실", "냉방장치"
        ]
    },

    //호차별 공기청정도
    /*
        공기청정도
        우선순위 및 표시
        해당 호차 HVAC 상태(TEXT75~82) 
        0x04(통신이상): "통신이상" / 
        0x02(고장): "-"
        해당 호차 공치청정도(TEXT470~477) 0x01: "좋  음" / 0x02: "보  통" /
        0x04: "경  고" / 0x08: "나  쁨"
        "통신이상" > "-" > "나  쁨" >
        "경  고" > "보  통" > "좋  음"
    */
    {
        "offset": 470,
        "name": "1호차 공기청정도",
        "size": 1,
        "description": "1호차 공기청정도",
        "keys": [
            "1호차", "공기청정도"
        ]
    },
    {
        "offset": 471,
        "name": "2호차 공기청정도",
        "size": 1,
        "description": "2호차 공기청정도",
        "keys": [
            "2호차", "공기청정도"
        ]
    },
    {
        "offset": 472,
        "name": "3호차 공기청정도",
        "size": 1,
        "description": "3호차 공기청정도",
        "keys": [
            "3호차", "공기청정도"
        ]
    },
    {
        "offset": 473,
        "name": "4호차 공기청정도",
        "size": 1,
        "description": "4호차 공기청정도",
        "keys": [
            "4호차", "공기청정도"
        ]
    },
    {
        "offset": 474,
        "name": "5호차 공기청정도",
        "size": 1,
        "description": "5호차 공기청정도",
        "keys": [
            "5호차", "공기청정도"
        ]
    },
    {
        "offset": 475,
        "name": "6호차 공기청정도",
        "size": 1,
        "description": "6호차 공기청정도",
        "keys": [
            "6호차", "공기청정도"
        ]
    },
    {
        "offset": 476,
        "name": "7호차 공기청정도",
        "size": 1,
        "description": "7호차 공기청정도",
        "keys": [
            "7호차", "공기청정도"
        ]
    },
    {
        "offset": 477,
        "name": "0호차 공기청정도",
        "size": 1,
        "description": "0호차 공기청정도",
        "keys": [
            "0호차", "공기청정도"
        ]
    },

    /*
        호차별 공기질 개선장치 필터 상태
        우선순위 및 표시
        해당 호차 HVAC 상태(TEXT75~82) 
        0x04(통신이상) 또는 0x02(고장): "-"
        해당호차 필터 상태(TEXT478~485)
        값이 1이면 "교체", 0이면 "양 호"
    */
    {
        "offset": 478,
        "name": "1호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "1호차", "공기질개선장치"
        ]
    },
    {
        "offset": 479,
        "name": "2호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "2호차", "공기질개선장치"
        ]
    },
    {
        "offset": 480,
        "name": "3호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "3호차", "공기질개선장치"
        ]
    },
    {
        "offset": 481,
        "name": "4호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "4호차", "공기질개선장치"
        ]
    },
    {
        "offset": 482,
        "name": "5호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "5호차", "공기질개선장치"
        ]
    },
    {
        "offset": 483,
        "name": "6호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "6호차", "공기질개선장치"
        ]
    },
    {
        "offset": 484,
        "name": "1호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "7호차", "공기질개선장치"
        ]
    },
    {
        "offset": 485,
        "name": "0호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "bitFlags": {
            "0": "필터1",
            "1": "필터2",
            "2": "필터3",
            "3": "필터4",
        },
        "keys": [
            "0호차", "공기질개선장치"
        ]
    }
];
