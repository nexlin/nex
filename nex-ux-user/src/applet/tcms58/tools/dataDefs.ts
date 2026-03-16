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








=====================================

    {
        "offset": 14,
        "name": "atc_code",
        "size": 1,
        "description": "",
        "keys": [
            "ATC 코드"
        ]
    },
    {
        "offset": 15,
        "name": "ats_code",
        "size": 1,
        "description": "",
        "keys": [
            "ATS 코드"
        ]
    },
    {
        "offset": 16,
        "name": "atc_ats_mode",
        "size": 1,
        "description": "bit0(ATC모드) bit1(ATS모드) bit2(ATC이중계활성화) bit6(stop_proceed_mdoe) bit7(yard_mode)",
        "bitFlags": {
            "0": "ATC모드",
            "1": "ATS모드",
            "2": "ATC이중계활성화",
            "6": "stop_proceed_mdoe",
            "7": "yard_mode"
        },
        "keys": [
            "ATC ATS 플래그"
        ]
    },

    {
        "offset": 24,
        "name": "1호차 AC 가선 전압",
        "size": 2,
        "description": "Big Endian / AC 가선 전압(VE) / (0 ~ 30,000Vrms)",
        "keys": ["AC 가선 전압", "1호차"]
    },
    {
        "offset": 26,
        "name": "2호차 AC 가선 전압",
        "size": 2,
        "description": "Big Endian / AC 가선 전압(VE) / (0 ~ 30,000Vrms)",
        "keys": ["AC 가선 전압", "2호차"]
    },
    {
        "offset": 28,
        "name": "4호차 AC 가선 전압",
        "size": 2,
        "description": "Big Endian / AC 가선 전압(VE) / (0 ~ 30,000Vrms)",
        "keys": ["AC 가선 전압", "4호차"]
    },
    {
        "offset": 30,
        "name": "7호차 AC 가선 전압",
        "size": 2,
        "description": "Big Endian / AC 가선 전압(VE) / (0 ~ 30,000Vrms)",
        "keys": ["AC 가선 전압", "7호차"]
    },
    {
        "offset": 32,
        "name": "8호차 AC 가선 전압",
        "size": 2,
        "description": "Big Endian / AC 가선 전압(VE) / (0 ~ 30,000Vrms)",
        "keys": ["AC 가선 전압", "8호차"]
    },
    {
        "offset": 34,
        "name": "1호차 DC 가선 전압",
        "size": 2,
        "description": "Big Endian / DC 가선 전압(VE) / (0 ~ 2,500V)",
        "keys": ["DC 가선 전압", "1호차"]
    },
    {
        "offset": 36,
        "name": "2호차 DC 가선 전압",
        "size": 2,
        "description": "Big Endian / DC 가선 전압(VE) / (0 ~ 2,500V)",
        "keys": ["DC 가선 전압", "2호차"]
    },
    {
        "offset": 38,
        "name": "4호차 DC 가선 전압",
        "size": 2,
        "description": "Big Endian / DC 가선 전압(VE) / (0 ~ 2,500V)",
        "keys": ["DC 가선 전압", "4호차"]
    },
    {
        "offset": 40,
        "name": "7호차 DC 가선 전압",
        "size": 2,
        "description": "Big Endian / DC 가선 전압(VE) / (0 ~ 2,500V)",
        "keys": ["DC 가선 전압", "7호차"]
    },
    {
        "offset": 42,
        "name": "8호차 DC 가선 전압",
        "size": 2,
        "description": "Big Endian / DC 가선 전압(VE) / (0 ~ 2,500V)",
        "keys": ["DC 가선 전압", "8호차"]
    },

    {
        "offset": 56,
        "name": "HCR_TCR_Master",
        "size": 1,
        "description": "bit0(0호차 HCR) bit1(9호차HCR) bit2(0호차 TCR) bit3(9호차 TCR) bit4(Master ID)",
        "bitFlags": {
            "0": "0호차 HCR",
            "1": "9호차 HCR",
            "2": "0호차 TCR",
            "3": "9호차 TCR",
            "4": "Master ID"
        },
        "keys": ["HCR TCR 플래그"]
    },
    {
        "offset": 57,
        "name": "제동관련",
        "size": 1,
        "description": "bit0(데드맨 멀티부저) bit1(ATS ATC절연구간 검지) bit2(ScBS) bit3(PAR) bit5(EBR1) bit6(EBR2)",
        "bitFlags": {
            "0": "데드맨 멀티부저",
            "1": "ATS ATC절연구간 검지",
            "2": "ScBS",
            "3": "PAR",
            "5": "EBR1",
            "6": "EBR2"
        },
        "keys": ["제동관련 플래그"]
    },

    {
        "offset": 65,
        "name": "마스콘(검수모드)_CI상태관련",
        "size": 1,
        "description": "bit0(0호차마스콘투입) bit1(9호차 마스콘투입) bit2(0호차 검수모드) bit3(9호차 검수모드) bit4(0호차 ADS AC) bit5(0호차 ADS DC)  bit6(9호차 ADS AC) bit7(9호차 ADS DC)",
        "bitFlags": {
            "0": "0호차마스콘투입",
            "1": "9호차 마스콘투입",
            "2": "0호차 검수모드",
            "3": "9호차 검수모드",
            "4": "0호차 ADS AC",
            "5": "0호차 ADS DC",
            "6": "9호차 ADS AC",
            "7": "9호차 ADS DC"
        },
        "keys": ["마스콘 AC DC 플래그"]
    },
    {
        "offset": 66,
        "name": "0호차 비상구원스위치 취급",
        "size": 1,
        "description": "bit0(EBCOS) bit2(EROS14_L0) bit3(EROS12_R) bit4(비상구원스위치_EO) bit5(MSP11_EB)",
        "bitFlags": {
            "0": "EBCOS",
            "2": "EROS14_L0",
            "3": "EROS12_R",
            "4": "비상구원스위치_EO",
            "5": "MSP11_EB"
        },
        "keys": ["비상구원스위치 취급", "0호차"]
    },
    {
        "offset": 67,
        "name": "9호차 비상구원스위치 취급",
        "size": 1,
        "description": "bit0(EBCOS) bit2(EROS14_L0) bit3(EROS12_R) bit4(비상구원스위치_EO) bit5(MSP11_EB)",
        "bitFlags": {
            "0": "EBCOS",
            "2": "EROS14_L0",
            "3": "EROS12_R",
            "4": "비상구원스위치_EO",
            "5": "MSP11_EB"
        },
        "keys": ["비상구원스위치 취급", "9호차"]
    },
    {
        "offset": 68,
        "name": "역전기마스콘위치_DSD_ZVR_SPARE",
        "size": 1,
        "description": "bit0(역전기후진위치) bit1(역전기전진위치) bit2(마스콘제동위치) bit3(마스콘역행위치) bit4(역행가능) bit5(DSD)  bit6(ZVR) bit7(SPARE)",
        "bitFlags": {
            "0": "역전기후진위치",
            "1": "역전기전진위치",
            "2": "마스콘제동위치",
            "3": "마스콘역행위치",
            "4": "역행가능",
            "5": "DSD",
            "6": "ZVR",
            "7": "SPARE"
        },
        "keys": ["역전기마스콘위치_DSD_ZVR_SPARE"]
    },
    {
        "offset": 69,
        "name": "판토_DBS_가선상태",
        "size": 1,
        "description": "bit0(2호차판토) bit1(4호차판토) bit2(8호차판토)  bit4(0호차DBS) bit5(9호차DBS)  bit6(가선상태_AC) bit7(가선상태_DC)",
        "bitFlags": {
            "0": "2호차판토",
            "1": "4호차판토",
            "2": "8호차판토",
            "4": "0호차DBS",
            "5": "9호차DBS",
            "6": "가선상태_AC",
            "7": "가선상태_DC"
        },
        "keys": ["판토_DBS_가선상태"]
    },

    {
        "offset": 76,
        "name": "0호차 DCU 도어 잠김 신호",
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
            "DCU",
            "0호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 77,
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
        "keys": [
            "DCU",
            "1호차",
            "열림"
        ]
    },
    {
        "offset": 78,
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
            "DCU",
            "1호차",
            "Bypass"
        ]
    },
    {
        "offset": 79,
        "name": "1호차 DCU 내부비상 핸들",
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
            "DCU",
            "1호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 80,
        "name": "1호차 DCU 외부비상 핸들",
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
            "DCU",
            "1호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 81,
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
            "DCU",
            "1호차",
            "고장"
        ]
    },
    {
        "offset": 82,
        "name": "1호차 DCU 도어 잠김 신호",
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
            "DCU",
            "1호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 83,
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
        "keys": [
            "DCU",
            "2호차",
            "열림"
        ]
    },
    {
        "offset": 84,
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
            "DCU",
            "2호차",
            "Bypass"
        ]
    },
    {
        "offset": 85,
        "name": "2호차 DCU 내부비상 핸들",
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
            "DCU",
            "2호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 86,
        "name": "2호차 DCU 외부비상 핸들",
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
            "DCU",
            "2호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 87,
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
            "DCU",
            "2호차",
            "고장"
        ]
    },
    {
        "offset": 88,
        "name": "2호차 DCU 도어 잠김 신호",
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
            "DCU",
            "2호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 89,
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
        "keys": [
            "DCU",
            "3호차",
            "열림"
        ]
    },
    {
        "offset": 90,
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
            "DCU",
            "3호차",
            "Bypass"
        ]
    },
    {
        "offset": 91,
        "name": "3호차 DCU 내부비상 핸들",
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
            "DCU",
            "3호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 92,
        "name": "3호차 DCU 외부비상 핸들",
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
            "DCU",
            "3호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 93,
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
            "DCU",
            "3호차",
            "고장"
        ]
    },
    {
        "offset": 94,
        "name": "3호차 DCU 도어 잠김 신호",
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
            "DCU",
            "3호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 95,
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
        "keys": [
            "DCU",
            "4호차",
            "열림"
        ]
    },
    {
        "offset": 96,
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
            "DCU",
            "4호차",
            "Bypass"
        ]
    },
    {
        "offset": 97,
        "name": "4호차 DCU 내부비상 핸들",
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
            "DCU",
            "4호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 98,
        "name": "4호차 DCU 외부비상 핸들",
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
            "DCU",
            "4호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 99,
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
            "DCU",
            "4호차",
            "고장"
        ]
    },
    {
        "offset": 100,
        "name": "4호차 DCU 도어 잠김 신호",
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
            "DCU",
            "4호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 101,
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
        "keys": [
            "DCU",
            "5호차",
            "열림"
        ]
    },
    {
        "offset": 102,
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
            "DCU",
            "5호차",
            "Bypass"
        ]
    },
    {
        "offset": 103,
        "name": "5호차 DCU 내부비상 핸들",
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
            "DCU",
            "5호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 104,
        "name": "5호차 DCU 외부비상 핸들",
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
            "DCU",
            "5호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 105,
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
            "DCU",
            "5호차",
            "고장"
        ]
    },
    {
        "offset": 106,
        "name": "5호차 DCU 도어 잠김 신호",
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
            "DCU",
            "5호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 107,
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
        "keys": [
            "DCU",
            "6호차",
            "열림"
        ]
    },
    {
        "offset": 108,
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
            "DCU",
            "6호차",
            "Bypass"
        ]
    },
    {
        "offset": 109,
        "name": "6호차 DCU 내부비상 핸들",
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
            "DCU",
            "6호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 110,
        "name": "6호차 DCU 외부비상 핸들",
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
            "DCU",
            "6호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 111,
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
            "DCU",
            "6호차",
            "고장"
        ]
    },
    {
        "offset": 112,
        "name": "6호차 DCU 도어 잠김 신호",
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
            "DCU",
            "6호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 113,
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
        "keys": [
            "DCU",
            "7호차",
            "열림"
        ]
    },
    {
        "offset": 114,
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
            "DCU",
            "7호차",
            "Bypass"
        ]
    },
    {
        "offset": 115,
        "name": "7호차 DCU 내부비상 핸들",
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
            "DCU",
            "7호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 116,
        "name": "7호차 DCU 외부비상 핸들",
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
            "DCU",
            "7호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 117,
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
            "DCU",
            "7호차",
            "고장"
        ]
    },
    {
        "offset": 118,
        "name": "7호차 DCU 도어 잠김 신호",
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
            "DCU",
            "7호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 119,
        "name": "8호차 DCU 열림",
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
            "DCU",
            "8호차",
            "열림"
        ]
    },
    {
        "offset": 120,
        "name": "8호차 DCU Bypass",
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
            "DCU",
            "8호차",
            "Bypass"
        ]
    },
    {
        "offset": 121,
        "name": "8호차 DCU 내부비상 핸들",
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
            "DCU",
            "8호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 122,
        "name": "8호차 DCU 외부비상 핸들",
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
            "DCU",
            "8호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 123,
        "name": "8호차 DCU 고장",
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
            "DCU",
            "8호차",
            "고장"
        ]
    },
    {
        "offset": 124,
        "name": "8호차 DCU 도어 잠김 신호",
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
            "호차별 DCU",
            "8호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 125,
        "name": "9호차 DCU 열림",
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
            "호차별 DCU",
            "9호차",
            "열림"
        ]
    },
    {
        "offset": 126,
        "name": "9호차 DCU Bypass",
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
            "호차별 DCU",
            "9호차",
            "Bypass"
        ]
    },
    {
        "offset": 127,
        "name": "9호차 DCU 내부비상 핸들",
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
            "호차별 DCU",
            "9호차",
            "내부비상 핸들"
        ]
    },
    {
        "offset": 128,
        "name": "9호차 DCU 외부비상 핸들",
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
            "호차별 DCU",
            "9호차",
            "외부비상 핸들"
        ]
    },
    {
        "offset": 129,
        "name": "9호차 DCU 고장",
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
            "호차별 DCU",
            "9호차",
            "고장"
        ]
    },
    {
        "offset": 130,
        "name": "9호차 DCU 도어 잠김 신호",
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
            "호차별 DCU",
            "9호차",
            "도어 잠김 신호"
        ]
    },
    {
        "offset": 131,
        "name": "MCB 고장",
        "size": 1,
        "description": "bit0(2호차) bit1(4호차) bit2(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "2": "8호차"
        },
        "keys": [
            "MCB 고장"
        ]
    },
    {
        "offset": 132,
        "name": "MCB 차단 확인 신호",
        "size": 1,
        "description": "bit0(2호차) bit1(4호차) bit2(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "2": "8호차"
        },
        "keys": [
            "MCB 차단 확인 신호"
        ]
    },
    {
        "offset": 133,
        "name": "MCB 투입",
        "size": 1,
        "description": "bit0(2호차) bit1(4호차) bit2(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "2": "8호차"
        },
        "keys": [
            "MCB 투입"
        ]
    },
    {
        "offset": 134,
        "name": "SIVK 투입",
        "size": 1,
        "description": "bit0(0호차) bit1(5호차) bit2(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "5호차",
            "2": "9호차"
        },
        "keys": [
            "SIVK 투입"
        ]
    },
    {
        "offset": 135,
        "name": "연장급전(ESK)",
        "size": 1,
        "description": "bit0(3호차) bit1(6호차)",
        "bitFlags": {
            "0": "3호차",
            "1": "6호차"
        },
        "keys": [
            "연장급전(ESK)"
        ]
    },
    {
        "offset": 136,
        "name": "C/I SQS모드",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "C/I SQS모드"
        ]
    },
    {
        "offset": 137,
        "name": "0호차 CM",
        "size": 1,
        "description": "bit4(ON_CMK) bit5(BYPASS_BCMK)  bit7(CMSB CPU FAULT)",
        "bitFlags": {
            "4": "ON_CMK",
            "5": "BYPASS_BCMK",
            "7": "CMSB CPU FAULT"
        },
        "keys": [
            "0호차 CM",
            "0호차"
        ]
    },
    {
        "offset": 138,
        "name": "5호차 CM",
        "size": 1,
        "description": "bit4(ON_CMK) bit5(BYPASS_BCMK)  bit7(CMSB CPU FAULT)",
        "bitFlags": {
            "4": "ON_CMK",
            "5": "BYPASS_BCMK",
            "7": "CMSB CPU FAULT"
        },
        "keys": [
            "5호차 CM",
            "5호차"
        ]
    },
    {
        "offset": 139,
        "name": "9호차 CM",
        "size": 1,
        "description": "bit4(ON_CMK) bit5(BYPASS_BCMK)  bit7(CMSB CPU FAULT)",
        "bitFlags": {
            "4": "ON_CMK",
            "5": "BYPASS_BCMK",
            "7": "CMSB CPU FAULT"
        },
        "keys": [
            "9호차 CM",
            "9호차"
        ]
    },
    {
        "offset": 140,
        "name": "ACM 보조 ON",
        "size": 1,
        "description": "bit0(2호차) bit1(4호차) bit2(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "2": "8호차"
        },
        "keys": [
            "ACM 보조 ON"
        ]
    },
    {
        "offset": 141,
        "name": "0호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "0호차"
        ]
    },
    {
        "offset": 142,
        "name": "0호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "0호차"
        ]
    },
    {
        "offset": 143,
        "name": "1호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "1호차"
        ]
    },
    {
        "offset": 144,
        "name": "1호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "1호차"
        ]
    },
    {
        "offset": 145,
        "name": "2호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "2호차"
        ]
    },
    {
        "offset": 146,
        "name": "2호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "2호차"
        ]
    },
    {
        "offset": 147,
        "name": "3호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "3호차"
        ]
    },
    {
        "offset": 148,
        "name": "3호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "3호차"
        ]
    },
    {
        "offset": 149,
        "name": "4호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "4호차"
        ]
    },
    {
        "offset": 150,
        "name": "4호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "4호차"
        ]
    },
    {
        "offset": 151,
        "name": "5호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "5호차"
        ]
    },
    {
        "offset": 152,
        "name": "5호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "5호차"
        ]
    },
    {
        "offset": 153,
        "name": "6호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "6호차"
        ]
    },
    {
        "offset": 154,
        "name": "6호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "6호차"
        ]
    },
    {
        "offset": 155,
        "name": "7호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "7호차"
        ]
    },
    {
        "offset": 156,
        "name": "7호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "7호차"
        ]
    },
    {
        "offset": 157,
        "name": "8호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "8호차"
        ]
    },
    {
        "offset": 158,
        "name": "8호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "8호차"
        ]
    },
    {
        "offset": 159,
        "name": "9호차 ECU HCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU HCR BC압력",
            "9호차"
        ]
    },
    {
        "offset": 160,
        "name": "9호차 ECU TCR BC압력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 ECU TCR BC압력",
            "9호차"
        ]
    },
    {
        "offset": 161,
        "name": "1호차 전동기 전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 전동기 전류",
            "1호차"
        ]
    },
    {
        "offset": 163,
        "name": "2호차 전동기 전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 전동기 전류",
            "2호차"
        ]
    },
    {
        "offset": 165,
        "name": "4호차 전동기 전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 전동기 전류",
            "4호차"
        ]
    },
    {
        "offset": 167,
        "name": "7호차 전동기 전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 전동기 전류",
            "7호차"
        ]
    },
    {
        "offset": 169,
        "name": "8호차 전동기 전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 전동기 전류",
            "8호차"
        ]
    },
    {
        "offset": 171,
        "name": "0호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "0호차"
        ]
    },
    {
        "offset": 172,
        "name": "1호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "1호차"
        ]
    },
    {
        "offset": 173,
        "name": "2호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "2호차"
        ]
    },
    {
        "offset": 174,
        "name": "3호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "3호차"
        ]
    },
    {
        "offset": 175,
        "name": "4호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "4호차"
        ]
    },
    {
        "offset": 176,
        "name": "5호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "5호차"
        ]
    },
    {
        "offset": 177,
        "name": "6호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "6호차"
        ]
    },
    {
        "offset": 178,
        "name": "7호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "7호차"
        ]
    },
    {
        "offset": 179,
        "name": "8호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "8호차"
        ]
    },
    {
        "offset": 180,
        "name": "9호차 실내 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 실내 온도",
            "9호차"
        ]
    },
    {
        "offset": 181,
        "name": "1호차 C/I PWM 값 (%)",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 C/I PWM (%)",
            "1호차"
        ]
    },
    {
        "offset": 182,
        "name": "2호차 C/I PWM 값 (%)",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 C/I PWM (%)",
            "2호차"
        ]
    },
    {
        "offset": 183,
        "name": "4호차 C/I PWM 값 (%)",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 C/I PWM (%)",
            "4호차"
        ]
    },
    {
        "offset": 184,
        "name": "7호차 C/I PWM 값 (%)",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 C/I PWM (%)",
            "7호차"
        ]
    },
    {
        "offset": 185,
        "name": "8호차 C/I PWM 값 (%)",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 C/I PWM (%)",
            "8호차"
        ]
    },
    {
        "offset": 187,
        "name": "AK AC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 AK AC"
        ]
    },
    {
        "offset": 188,
        "name": "K1 AC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 K1 AC"
        ]
    },
    {
        "offset": 189,
        "name": "K2 AC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 K2 AC"
        ]
    },
    {
        "offset": 190,
        "name": "HB DC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 HB DC"
        ]
    },
    {
        "offset": 191,
        "name": "LB1 DC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 LB1 DC"
        ]
    },
    {
        "offset": 192,
        "name": "LB2 DC ON",
        "size": 1,
        "description": "bit0(1호차) bit1(2호차) bit2(4호차) bit3(7호차) bit4(8호차)",
        "bitFlags": {
            "0": "1호차",
            "1": "2호차",
            "2": "4호차",
            "3": "7호차",
            "4": "8호차"
        },
        "keys": [
            "호차별 LB2 DC"
        ]
    },
    {
        "offset": 193,
        "name": "1호차 FC(V)",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 FC(V)",
            "1호차"
        ]
    },
    {
        "offset": 195,
        "name": "2호차 FC(V)",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 FC(V)",
            "2호차"
        ]
    },
    {
        "offset": 197,
        "name": "4호차 FC(V)",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 FC(V)",
            "4호차"
        ]
    },
    {
        "offset": 199,
        "name": "7호차 FC(V)",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 FC(V)",
            "7호차"
        ]
    },
    {
        "offset": 201,
        "name": "8호차 FC(V)",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 FC(V)",
            "8호차"
        ]
    },
    {
        "offset": 203,
        "name": "0호차 SIV 출력전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 출력전압",
            "0호차"
        ]
    },
    {
        "offset": 204,
        "name": "5호차 SIV 출력전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 출력전압",
            "5호차"
        ]
    },
    {
        "offset": 205,
        "name": "9호차 SIV 출력전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 출력전압",
            "9호차"
        ]
    },
    {
        "offset": 206,
        "name": "0호차 SIV 출력전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 SIV 출력전류",
            "0호차"
        ]
    },
    {
        "offset": 208,
        "name": "5호차 SIV 출력전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 SIV 출력전류",
            "5호차"
        ]
    },
    {
        "offset": 210,
        "name": "9호차 SIV 출력전류",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 SIV 출력전류",
            "9호차"
        ]
    },
    {
        "offset": 212,
        "name": "0호차 SIV 주파수",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 주파수",
            "0호차"
        ]
    },
    {
        "offset": 213,
        "name": "5호차 SIV 주파수",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 주파수",
            "5호차"
        ]
    },
    {
        "offset": 214,
        "name": "9호차 SIV 주파수",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV 주파수",
            "9호차"
        ]
    },
    {
        "offset": 215,
        "name": "0호차 SIV AC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV AC 가선전압",
            "0호차"
        ]
    },
    {
        "offset": 216,
        "name": "5호차 SIV AC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV AC 가선전압",
            "5호차"
        ]
    },
    {
        "offset": 217,
        "name": "9호차 SIV AC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV AC 가선전압",
            "9호차"
        ]
    },
    {
        "offset": 218,
        "name": "0호차 SIV DC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV DC 가선전압",
            "0호차"
        ]
    },
    {
        "offset": 219,
        "name": "5호차 SIV DC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV DC 가선전압",
            "5호차"
        ]
    },
    {
        "offset": 220,
        "name": "9호차 SIV DC 가선전압",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 SIV DC 가선전압",
            "9호차"
        ]
    },
    {
        "offset": 221,
        "name": "0호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "0호차"
        ]
    },
    {
        "offset": 223,
        "name": "1호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "1호차"
        ]
    },
    {
        "offset": 225,
        "name": "2호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "2호차"
        ]
    },
    {
        "offset": 227,
        "name": "3호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "3호차"
        ]
    },
    {
        "offset": 229,
        "name": "4호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "4호차"
        ]
    },
    {
        "offset": 231,
        "name": "5호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "5호차"
        ]
    },
    {
        "offset": 233,
        "name": "6호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "6호차"
        ]
    },
    {
        "offset": 235,
        "name": "7호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "7호차"
        ]
    },
    {
        "offset": 237,
        "name": "8호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "8호차"
        ]
    },
    {
        "offset": 239,
        "name": "9호차 ECU AS압력",
        "size": 2,
        "description": "",
        "keys": [
            "호차별 ECU AS압력",
            "9호차"
        ]
    },
    {
        "offset": 241,
        "name": "1호차 회생제동력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 회생제동력",
            "1호차"
        ]
    },
    {
        "offset": 242,
        "name": "2호차 회생제동력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 회생제동력",
            "2호차"
        ]
    },
    {
        "offset": 243,
        "name": "4호차 회생제동력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 회생제동력",
            "4호차"
        ]
    },
    {
        "offset": 244,
        "name": "7호차 회생제동력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 회생제동력",
            "7호차"
        ]
    },
    {
        "offset": 245,
        "name": "8호차 회생제동력",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 회생제동력",
            "8호차"
        ]
    },
    {
        "offset": 246,
        "name": "BC코크1",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 BC코크1"
        ]
    },
    {
        "offset": 248,
        "name": "BC코크2",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 BC코크2"
        ]
    },
    {
        "offset": 250,
        "name": "AS코크1",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 AS코크1"
        ]
    },
    {
        "offset": 252,
        "name": "AS코크2",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 AS코크2"
        ]
    },
    {
        "offset": 254,
        "name": "제동풀림 코크",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 제동풀림 코크"
        ]
    },
    {
        "offset": 256,
        "name": "PANPS1",
        "size": 1,
        "description": "bit0(2호차)  bit1(4호차)  bit3(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "3": "8호차"
        },
        "keys": [
            "호차별 PANPS1"
        ]
    },
    {
        "offset": 257,
        "name": "PANPS2",
        "size": 1,
        "description": "bit0(2호차)  bit1(4호차)  bit3(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "3": "8호차"
        },
        "keys": [
            "호차별 PANPS2"
        ]
    },
    {
        "offset": 260,
        "name": "MCB코크",
        "size": 1,
        "description": "bit0(2호차)  bit1(4호차)  bit3(8호차)",
        "bitFlags": {
            "0": "2호차",
            "1": "4호차",
            "3": "8호차"
        },
        "keys": [
            "호차별 MCB코크"
        ]
    },
    {
        "offset": 261,
        "name": "0호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "0호차"
        ]
    },
    {
        "offset": 262,
        "name": "1호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "1호차"
        ]
    },
    {
        "offset": 263,
        "name": "2호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "2호차"
        ]
    },
    {
        "offset": 264,
        "name": "3호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "3호차"
        ]
    },
    {
        "offset": 265,
        "name": "4호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "4호차"
        ]
    },
    {
        "offset": 266,
        "name": "5호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "5호차"
        ]
    },
    {
        "offset": 267,
        "name": "6호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "6호차"
        ]
    },
    {
        "offset": 268,
        "name": "7호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "7호차"
        ]
    },
    {
        "offset": 269,
        "name": "8호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "8호차"
        ]
    },
    {
        "offset": 270,
        "name": "9호차 객실 동작모드",
        "size": 1,
        "description": "bit0(정비) bit1(정지) bit2(자동) bit3(수동)",
        "bitFlags": {
            "0": "정비",
            "1": "정지",
            "2": "자동",
            "3": "수동"
        },
        "keys": [
            "호차별 객실 동작모드",
            "9호차"
        ]
    },
    {
        "offset": 271,
        "name": "0호차 운전실 동작모드",
        "size": 1,
        "description": "bit0(강풍) bit1(중풍) bit2(약풍) bit3(환기)",
        "bitFlags": {
            "0": "강풍",
            "1": "중풍",
            "2": "약풍",
            "3": "환기"
        },
        "keys": [
            "호차별 운전실 동작모드",
            "0호차"
        ]
    },
    {
        "offset": 272,
        "name": "9호차 운전실 동작모드",
        "size": 1,
        "description": "bit0(강풍) bit1(중풍) bit2(약풍) bit3(환기)",
        "bitFlags": {
            "0": "강풍",
            "1": "중풍",
            "2": "약풍",
            "3": "환기"
        },
        "keys": [
            "호차별 운전실 동작모드",
            "9호차"
        ]
    },
    {
        "offset": 273,
        "name": "중앙송풍기 ON",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 중앙송풍기 ON"
        ]
    },
    {
        "offset": 275,
        "name": "단부송풍기 ON",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 단부송풍기 ON"
        ]
    },
    {
        "offset": 277,
        "name": "0호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "0호차"
        ]
    },
    {
        "offset": 279,
        "name": "1호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "1호차"
        ]
    },
    {
        "offset": 281,
        "name": "2호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "2호차"
        ]
    },
    {
        "offset": 283,
        "name": "3호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "3호차"
        ]
    },
    {
        "offset": 285,
        "name": "4호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "4호차"
        ]
    },
    {
        "offset": 287,
        "name": "5호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "5호차"
        ]
    },
    {
        "offset": 289,
        "name": "6호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "6호차"
        ]
    },
    {
        "offset": 291,
        "name": "7호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "7호차"
        ]
    },
    {
        "offset": 293,
        "name": "8호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "8호차"
        ]
    },
    {
        "offset": 295,
        "name": "9호차 냉난방장치",
        "size": 2,
        "description": "bit0(냉방기1반냉) bit1(냉방기2FAN) bit2(냉방기1FAN) bit3(냉방기 자동) bit5(3/3난방)  bit6(2/3난방) bit7(1/3난방) bit13(냉방기2 전냉) bit14(냉방기1 전냉) bit15(냉방기2 반냉)",
        "bitFlags": {
            "0": "냉방기1반냉",
            "1": "냉방기2FAN",
            "2": "냉방기1FAN",
            "3": "냉방기 자동",
            "5": "3/3난방",
            "6": "2/3난방",
            "7": "1/3난방",
            "13": "냉방기2 전냉",
            "14": "냉방기1 전냉",
            "15": "냉방기2 반냉"
        },
        "keys": [
            "호차별 냉난방장치",
            "9호차"
        ]
    },
    {
        "offset": 297,
        "name": "0호차 실외 온도값",
        "size": 2,
        "description": "화면 출력 시 계산 필요(n/10)",
        "keys": [
            "호차별 실외온도",
            "0호차"
        ]
    },
    {
        "offset": 299,
        "name": "9호차 실외 온도값",
        "size": 2,
        "description": "화면 출력 시 계산 필요(n/10)",
        "keys": [
            "호차별 실외온도",
            "9호차"
        ]
    },
    {
        "offset": 301,
        "name": "0호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "0호차"
        ]
    },
    {
        "offset": 302,
        "name": "1호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "1호차"
        ]
    },
    {
        "offset": 303,
        "name": "2호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "2호차"
        ]
    },
    {
        "offset": 304,
        "name": "3호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "3호차"
        ]
    },
    {
        "offset": 305,
        "name": "4호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "4호차"
        ]
    },
    {
        "offset": 306,
        "name": "5호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "5호차"
        ]
    },
    {
        "offset": 307,
        "name": "6호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "6호차"
        ]
    },
    {
        "offset": 308,
        "name": "7호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "7호차"
        ]
    },
    {
        "offset": 309,
        "name": "8호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "8호차"
        ]
    },
    {
        "offset": 310,
        "name": "9호차 설정 온도값",
        "size": 1,
        "description": "",
        "keys": [
            "호차별 설정 온도",
            "9호차"
        ]
    },
    {
        "offset": 311,
        "name": "0호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "0호차"
        ]
    },
    {
        "offset": 312,
        "name": "1호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "1호차"
        ]
    },
    {
        "offset": 313,
        "name": "2호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "2호차"
        ]
    },
    {
        "offset": 314,
        "name": "3호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "3호차"
        ]
    },
    {
        "offset": 315,
        "name": "4호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "4호차"
        ]
    },
    {
        "offset": 316,
        "name": "5호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "5호차"
        ]
    },
    {
        "offset": 317,
        "name": "6호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "6호차"
        ]
    },
    {
        "offset": 318,
        "name": "7호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "7호차"
        ]
    },
    {
        "offset": 319,
        "name": "8호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "8호차"
        ]
    },
    {
        "offset": 320,
        "name": "9호차 공기청정도",
        "size": 1,
        "description": "0~15(이하): 좋음 16~35(이하): 보통 36~ : 나쁨",
        "keys": [
            "호차별 공기청정도",
            "9호차"
        ]
    },
    {
        "offset": 321,
        "name": "0호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "0호차"
        ]
    },
    {
        "offset": 322,
        "name": "1호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "1호차"
        ]
    },
    {
        "offset": 323,
        "name": "2호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "2호차"
        ]
    },
    {
        "offset": 324,
        "name": "3호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "3호차"
        ]
    },
    {
        "offset": 325,
        "name": "4호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "4호차"
        ]
    },
    {
        "offset": 326,
        "name": "5호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "5호차"
        ]
    },
    {
        "offset": 327,
        "name": "6호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "6호차"
        ]
    },
    {
        "offset": 328,
        "name": "7호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "7호차"
        ]
    },
    {
        "offset": 329,
        "name": "8호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "8호차"
        ]
    },
    {
        "offset": 330,
        "name": "9호차 공기청정기 객실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(자동) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "3": "자동",
            "4": "Off"
        },
        "keys": [
            "호차별 객실 공기청정기 동작모드",
            "9호차"
        ]
    },
    {
        "offset": 331,
        "name": "0호차 공기청정기 운전실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "4": "Off"
        },
        "keys": [
            "호차별 운전실 공기청정기 동작모드",
            "0호차"
        ]
    },
    {
        "offset": 332,
        "name": "9호차 공기청정기 운전실 동작모드",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(Off)",
        "bitFlags": {
            "0": "강",
            "1": "중",
            "2": "약",
            "4": "Off"
        },
        "keys": [
            "호차별 운전실 공기청정기 동작모드",
            "9호차"
        ]
    },
    {
        "offset": 333,
        "name": "객실등 AC1 ON",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 객실등 AC1"
        ]
    },
    {
        "offset": 335,
        "name": "객실등 AC2 ON",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 객실등 AC21"
        ]
    },
    {
        "offset": 337,
        "name": "객실등 DC ON",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "bitFlags": {
            "0": "0호차",
            "1": "1호차",
            "2": "2호차",
            "3": "3호차",
            "4": "4호차",
            "5": "5호차",
            "6": "6호차",
            "7": "7호차",
            "8": "8호차",
            "9": "9호차"
        },
        "keys": [
            "호차별 객실등 DC"
        ]
    },
    {
        "offset": 339,
        "name": "2호차 MCB 투입횟수",
        "size": 4,
        "description": "",
        "keys": [
            "호차별 MCB 투입횟수",
            "2호차"
        ]
    },
    {
        "offset": 343,
        "name": "4호차 MCB 투입횟수",
        "size": 4,
        "description": "",
        "keys": [
            "호차별 MCB 투입횟수",
            "4호차"
        ]
    },
    {
        "offset": 347,
        "name": "8호차 MCB 투입횟수",
        "size": 4,
        "description": "",
        "keys": [
            "호차별 MCB 투입횟수",
            "8호차"
        ]
    },
    {
        "offset": 352,
        "name": "0호차 LIU 1계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 LIU계",
            "0호차"
        ]
    },
    {
        "offset": 353,
        "name": "0호차 LIU 2계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 LIU계",
            "0호차"
        ]
    },
    {
        "offset": 354,
        "name": "0호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "0호차"
        ]
    },
    {
        "offset": 355,
        "name": "0호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "0호차"
        ]
    },
    {
        "offset": 356,
        "name": "0호차 VDU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 VDU",
            "0호차"
        ]
    },
    {
        "offset": 357,
        "name": "0호차 TDR",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 TDR",
            "0호차"
        ]
    },
    {
        "offset": 358,
        "name": "0호차 PAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 PAC",
            "0호차"
        ]
    },
    {
        "offset": 359,
        "name": "0호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 PIC",
            "0호차"
        ]
    },
    {
        "offset": 360,
        "name": "0호차 CCTV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CCTV",
            "0호차"
        ]
    },
    {
        "offset": 361,
        "name": "0호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "0호차"
        ]
    },
    {
        "offset": 362,
        "name": "0호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "0호차"
        ]
    },
    {
        "offset": 363,
        "name": "0호차 BMS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 BMS",
            "0호차"
        ]
    },
    {
        "offset": 364,
        "name": "0호차 SIV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 SIV",
            "0호차"
        ]
    },
    {
        "offset": 365,
        "name": "0호차 FDU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(화재)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "화재"
        },
        "keys": [
            "호차별 FDU",
            "0호차"
        ]
    },
    {
        "offset": 366,
        "name": "0호차 ATC1 1계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "호차별 ATC계",
            "0호차"
        ]
    },
    {
        "offset": 367,
        "name": "0호차 ATC2 2계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "호차별 ATC계",
            "0호차"
        ]
    },
    {
        "offset": 368,
        "name": "0호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(BYPASS)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "BYPASS"
        },
        "keys": [
            "호차별 CMSB",
            "0호차"
        ]
    },
    {
        "offset": 369,
        "name": "0호차 ADS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ADS",
            "0호차"
        ]
    },
    {
        "offset": 370,
        "name": "0호차 IMB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 IMB",
            "0호차"
        ]
    },
    {
        "offset": 371,
        "name": "0호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "0호차"
        ]
    },
    {
        "offset": 372,
        "name": "0호차 TRS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 TRS",
            "0호차"
        ]
    },
    {
        "offset": 373,
        "name": "0호차 ENC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(2계 동작)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "2계 동작"
        },
        "keys": [
            "호차별 ENC",
            "0호차"
        ]
    },
    {
        "offset": 374,
        "name": "0호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "L1"
        ]
    },
    {
        "offset": 375,
        "name": "0호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "L2"
        ]
    },
    {
        "offset": 376,
        "name": "0호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "L3"
        ]
    },
    {
        "offset": 377,
        "name": "0호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "L4"
        ]
    },
    {
        "offset": 378,
        "name": "0호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "R1"
        ]
    },
    {
        "offset": 379,
        "name": "0호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "R2"
        ]
    },
    {
        "offset": 380,
        "name": "0호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "R3"
        ]
    },
    {
        "offset": 381,
        "name": "0호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "0호차",
            "R4"
        ]
    },
    {
        "offset": 383,
        "name": "1호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "1호차"
        ]
    },
    {
        "offset": 384,
        "name": "1호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "1호차"
        ]
    },
    {
        "offset": 385,
        "name": "1호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "1호차"
        ]
    },
    {
        "offset": 386,
        "name": "1호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "1호차"
        ]
    },
    {
        "offset": 387,
        "name": "1호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "1호차"
        ]
    },
    {
        "offset": 388,
        "name": "1호차 C/I",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 C/I",
            "1호차"
        ]
    },
    {
        "offset": 389,
        "name": "1호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "1호차"
        ]
    },
    {
        "offset": 390,
        "name": "1호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "L1"
        ]
    },
    {
        "offset": 391,
        "name": "1호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "L2"
        ]
    },
    {
        "offset": 392,
        "name": "1호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "L3"
        ]
    },
    {
        "offset": 393,
        "name": "1호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "L4"
        ]
    },
    {
        "offset": 394,
        "name": "1호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "R1"
        ]
    },
    {
        "offset": 395,
        "name": "1호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "R2"
        ]
    },
    {
        "offset": 396,
        "name": "1호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "R3"
        ]
    },
    {
        "offset": 397,
        "name": "1호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "1호차",
            "R4"
        ]
    },
    {
        "offset": 399,
        "name": "2호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "2호차"
        ]
    },
    {
        "offset": 400,
        "name": "2호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "2호차"
        ]
    },
    {
        "offset": 401,
        "name": "2호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "2호차"
        ]
    },
    {
        "offset": 402,
        "name": "2호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "2호차"
        ]
    },
    {
        "offset": 403,
        "name": "2호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "2호차"
        ]
    },
    {
        "offset": 404,
        "name": "2호차 C/I",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 C/I",
            "2호차"
        ]
    },
    {
        "offset": 405,
        "name": "2호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "2호차"
        ]
    },
    {
        "offset": 406,
        "name": "2호차 모진보호장치",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(모진보호 장치 동작)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "모진보호 장치 동작"
        },
        "keys": [
            "호차별 모진보호장치",
            "2호차"
        ]
    },
    {
        "offset": 407,
        "name": "2호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "L1"
        ]
    },
    {
        "offset": 408,
        "name": "2호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "L2"
        ]
    },
    {
        "offset": 409,
        "name": "2호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "L3"
        ]
    },
    {
        "offset": 410,
        "name": "2호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "L4"
        ]
    },
    {
        "offset": 411,
        "name": "2호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "R1"
        ]
    },
    {
        "offset": 412,
        "name": "2호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "R2"
        ]
    },
    {
        "offset": 413,
        "name": "2호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "R3"
        ]
    },
    {
        "offset": 414,
        "name": "2호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "2호차",
            "R4"
        ]
    },
    {
        "offset": 415,
        "name": "2호차 EDCU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EDCU",
            "2호차"
        ]
    },
    {
        "offset": 417,
        "name": "3호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "3호차"
        ]
    },
    {
        "offset": 418,
        "name": "3호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "3호차"
        ]
    },
    {
        "offset": 419,
        "name": "3호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "3호차"
        ]
    },
    {
        "offset": 420,
        "name": "3호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "3호차"
        ]
    },
    {
        "offset": 421,
        "name": "3호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "3호차"
        ]
    },
    {
        "offset": 422,
        "name": "3호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "3호차"
        ]
    },
    {
        "offset": 423,
        "name": "3호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "L1"
        ]
    },
    {
        "offset": 424,
        "name": "3호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "L2"
        ]
    },
    {
        "offset": 425,
        "name": "3호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "L3"
        ]
    },
    {
        "offset": 426,
        "name": "3호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "L4"
        ]
    },
    {
        "offset": 427,
        "name": "3호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "R1"
        ]
    },
    {
        "offset": 428,
        "name": "3호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "R2"
        ]
    },
    {
        "offset": 429,
        "name": "3호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "R3"
        ]
    },
    {
        "offset": 430,
        "name": "3호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "3호차",
            "R4"
        ]
    },
    {
        "offset": 431,
        "name": "3호차 ESK",
        "size": 1,
        "description": "bit0(연장급전 미투입) bit1(연장급전)",
        "bitFlags": {
            "0": "연장급전 미투입",
            "1": "연장급전"
        },
        "keys": [
            "호차별 ESK",
            "3호차"
        ]
    },
    {
        "offset": 432,
        "name": "4호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "4호차"
        ]
    },
    {
        "offset": 433,
        "name": "4호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "4호차"
        ]
    },
    {
        "offset": 434,
        "name": "4호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "4호차"
        ]
    },
    {
        "offset": 435,
        "name": "4호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "4호차"
        ]
    },
    {
        "offset": 436,
        "name": "4호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "4호차"
        ]
    },
    {
        "offset": 437,
        "name": "4호차 C/I",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 C/I",
            "4호차"
        ]
    },
    {
        "offset": 438,
        "name": "4호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "4호차"
        ]
    },
    {
        "offset": 439,
        "name": "4호차 모진보호장치",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(모진보호 장치 동작)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "모진보호 장치 동작"
        },
        "keys": [
            "호차별 모진보호장치",
            "4호차"
        ]
    },
    {
        "offset": 440,
        "name": "4호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "L1"
        ]
    },
    {
        "offset": 441,
        "name": "4호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "L2"
        ]
    },
    {
        "offset": 442,
        "name": "4호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "L3"
        ]
    },
    {
        "offset": 443,
        "name": "4호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "L4"
        ]
    },
    {
        "offset": 444,
        "name": "4호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "R1"
        ]
    },
    {
        "offset": 445,
        "name": "4호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "R2"
        ]
    },
    {
        "offset": 446,
        "name": "4호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "R3"
        ]
    },
    {
        "offset": 447,
        "name": "4호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "4호차",
            "R4"
        ]
    },
    {
        "offset": 448,
        "name": "4호차 EDCU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EDCU",
            "4호차"
        ]
    },
    {
        "offset": 450,
        "name": "5호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "5호차"
        ]
    },
    {
        "offset": 451,
        "name": "5호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "5호차"
        ]
    },
    {
        "offset": 452,
        "name": "5호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "5호차"
        ]
    },
    {
        "offset": 453,
        "name": "5호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "5호차"
        ]
    },
    {
        "offset": 454,
        "name": "5호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "5호차"
        ]
    },
    {
        "offset": 455,
        "name": "5호차 BMS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 BMS",
            "5호차"
        ]
    },
    {
        "offset": 456,
        "name": "5호차 SIV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 SIV",
            "5호차"
        ]
    },
    {
        "offset": 457,
        "name": "5호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(BYPASS)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "BYPASS"
        },
        "keys": [
            "호차별 CMSB",
            "5호차"
        ]
    },
    {
        "offset": 458,
        "name": "5호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "5호차"
        ]
    },
    {
        "offset": 459,
        "name": "5호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "L1"
        ]
    },
    {
        "offset": 460,
        "name": "5호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "L2"
        ]
    },
    {
        "offset": 461,
        "name": "5호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "L3"
        ]
    },
    {
        "offset": 462,
        "name": "5호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "L4"
        ]
    },
    {
        "offset": 463,
        "name": "5호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "R1"
        ]
    },
    {
        "offset": 464,
        "name": "5호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "R2"
        ]
    },
    {
        "offset": 465,
        "name": "5호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "R3"
        ]
    },
    {
        "offset": 466,
        "name": "5호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "5호차",
            "R4"
        ]
    },
    {
        "offset": 468,
        "name": "6호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "6호차"
        ]
    },
    {
        "offset": 469,
        "name": "6호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "6호차"
        ]
    },
    {
        "offset": 470,
        "name": "6호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "6호차"
        ]
    },
    {
        "offset": 471,
        "name": "6호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "6호차"
        ]
    },
    {
        "offset": 472,
        "name": "6호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "6호차"
        ]
    },
    {
        "offset": 473,
        "name": "6호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "6호차"
        ]
    },
    {
        "offset": 474,
        "name": "6호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "L1"
        ]
    },
    {
        "offset": 475,
        "name": "6호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "L2"
        ]
    },
    {
        "offset": 476,
        "name": "6호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "L3"
        ]
    },
    {
        "offset": 477,
        "name": "6호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "L4"
        ]
    },
    {
        "offset": 478,
        "name": "6호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "R1"
        ]
    },
    {
        "offset": 479,
        "name": "6호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "R2"
        ]
    },
    {
        "offset": 480,
        "name": "6호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "R3"
        ]
    },
    {
        "offset": 481,
        "name": "6호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "6호차",
            "R4"
        ]
    },
    {
        "offset": 482,
        "name": "6호차 EDCU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EDCU",
            "6호차"
        ]
    },
    {
        "offset": 483,
        "name": "6호차 ESK",
        "size": 1,
        "description": "bit0(연장급전 미투입) bit1(연장급전)",
        "bitFlags": {
            "0": "연장급전 미투입",
            "1": "연장급전"
        },
        "keys": [
            "호차별 ESK",
            "6호차"
        ]
    },
    {
        "offset": 484,
        "name": "7호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "7호차"
        ]
    },
    {
        "offset": 485,
        "name": "7호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "7호차"
        ]
    },
    {
        "offset": 486,
        "name": "7호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "7호차"
        ]
    },
    {
        "offset": 487,
        "name": "7호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "7호차"
        ]
    },
    {
        "offset": 488,
        "name": "7호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "7호차"
        ]
    },
    {
        "offset": 489,
        "name": "7호차 C/I",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 C/I",
            "7호차"
        ]
    },
    {
        "offset": 490,
        "name": "7호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "7호차"
        ]
    },
    {
        "offset": 491,
        "name": "7호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "L1"
        ]
    },
    {
        "offset": 492,
        "name": "7호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "L2"
        ]
    },
    {
        "offset": 493,
        "name": "7호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "L3"
        ]
    },
    {
        "offset": 494,
        "name": "7호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "L4"
        ]
    },
    {
        "offset": 495,
        "name": "7호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "R1"
        ]
    },
    {
        "offset": 496,
        "name": "7호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "R2"
        ]
    },
    {
        "offset": 497,
        "name": "7호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "R3"
        ]
    },
    {
        "offset": 498,
        "name": "7호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "7호차",
            "R4"
        ]
    },
    {
        "offset": 500,
        "name": "8호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "8호차"
        ]
    },
    {
        "offset": 501,
        "name": "8호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "8호차"
        ]
    },
    {
        "offset": 502,
        "name": "8호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CC",
            "8호차"
        ]
    },
    {
        "offset": 503,
        "name": "8호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "8호차"
        ]
    },
    {
        "offset": 504,
        "name": "8호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "8호차"
        ]
    },
    {
        "offset": 505,
        "name": "8호차 C/I",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 C/I",
            "8호차"
        ]
    },
    {
        "offset": 506,
        "name": "8호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "8호차"
        ]
    },
    {
        "offset": 507,
        "name": "8호차 모진보호장치",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(모진보호 장치 동작)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "모진보호 장치 동작"
        },
        "keys": [
            "호차별 모진보호장치",
            "8호차"
        ]
    },
    {
        "offset": 508,
        "name": "8호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "L1"
        ]
    },
    {
        "offset": 509,
        "name": "8호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "L2"
        ]
    },
    {
        "offset": 510,
        "name": "8호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "L3"
        ]
    },
    {
        "offset": 511,
        "name": "8호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "L4"
        ]
    },
    {
        "offset": 512,
        "name": "8호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "R1"
        ]
    },
    {
        "offset": 513,
        "name": "8호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "R2"
        ]
    },
    {
        "offset": 514,
        "name": "8호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "R3"
        ]
    },
    {
        "offset": 515,
        "name": "8호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "8호차",
            "R4"
        ]
    },
    {
        "offset": 517,
        "name": "9호차 LIU 1계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 LIU계",
            "9호차"
        ]
    },
    {
        "offset": 518,
        "name": "9호차 LIU 2계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 LIU계",
            "9호차"
        ]
    },
    {
        "offset": 519,
        "name": "9호차 ESW1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "9호차"
        ]
    },
    {
        "offset": 520,
        "name": "9호차 ESW2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ESW",
            "9호차"
        ]
    },
    {
        "offset": 521,
        "name": "9호차 VDU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 VDU",
            "9호차"
        ]
    },
    {
        "offset": 522,
        "name": "9호차 TDR",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 TDR",
            "9호차"
        ]
    },
    {
        "offset": 523,
        "name": "9호차 PAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 PAC",
            "9호차"
        ]
    },
    {
        "offset": 524,
        "name": "9호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 PIC",
            "9호차"
        ]
    },
    {
        "offset": 525,
        "name": "9호차 CCTV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 CCTV",
            "9호차"
        ]
    },
    {
        "offset": 526,
        "name": "9호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ECU",
            "9호차"
        ]
    },
    {
        "offset": 527,
        "name": "9호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 HVAC",
            "9호차"
        ]
    },
    {
        "offset": 528,
        "name": "9호차 BMS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 BMS",
            "9호차"
        ]
    },
    {
        "offset": 529,
        "name": "9호차 SIV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 SIV",
            "9호차"
        ]
    },
    {
        "offset": 530,
        "name": "9호차 FDU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(화재)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "화재"
        },
        "keys": [
            "호차별 FDU",
            "9호차"
        ]
    },
    {
        "offset": 531,
        "name": "9호차 ATC1 1계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "호차별 ATC계",
            "9호차"
        ]
    },
    {
        "offset": 532,
        "name": "9호차 ATC2 2계",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF"
        },
        "keys": [
            "호차별 ATC계",
            "9호차"
        ]
    },
    {
        "offset": 533,
        "name": "9호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit4(BYPASS)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "4": "BYPASS"
        },
        "keys": [
            "호차별 CMSB",
            "9호차"
        ]
    },
    {
        "offset": 534,
        "name": "9호차 ADS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 ADS",
            "9호차"
        ]
    },
    {
        "offset": 535,
        "name": "9호차 IMB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 IMB",
            "9호차"
        ]
    },
    {
        "offset": 536,
        "name": "9호차 EPD",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 EPD",
            "9호차"
        ]
    },
    {
        "offset": 537,
        "name": "9호차 TRS",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 TRS",
            "9호차"
        ]
    },
    {
        "offset": 538,
        "name": "9호차 ENC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(2계 동작)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상",
            "3": "OFF",
            "4": "2계 동작"
        },
        "keys": [
            "호차별 ENC",
            "9호차"
        ]
    },
    {
        "offset": 539,
        "name": "9호차 DCU L1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "L1"
        ]
    },
    {
        "offset": 540,
        "name": "9호차 DCU L2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "L2"
        ]
    },
    {
        "offset": 541,
        "name": "9호차 DCU L3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "L3"
        ]
    },
    {
        "offset": 542,
        "name": "9호차 DCU L4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "L4"
        ]
    },
    {
        "offset": 543,
        "name": "9호차 DCU R1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "R1"
        ]
    },
    {
        "offset": 544,
        "name": "9호차 DCU R2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "R2"
        ]
    },
    {
        "offset": 545,
        "name": "9호차 DCU R3",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "R3"
        ]
    },
    {
        "offset": 546,
        "name": "9호차 DCU R4",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상)",
        "bitFlags": {
            "0": "정상",
            "1": "고장",
            "2": "통신이상"
        },
        "keys": [
            "호차별 DCU",
            "9호차",
            "R4"
        ]
    }
];
