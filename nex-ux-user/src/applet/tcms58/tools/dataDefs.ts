// 열차정보 데이터 파싱을 위한 정의
export interface NexBitFieldDef {
    offset: number; // 비트 시작 위치 (0~7)
    size: number;   // 비트 길이
    keys: string[]; // 파싱 후 변환될 서브 JSON 키 계층 배열
    valueMap?: Record<number, string | number>; // 매핑 딕셔너리 (예: { 1: 6, 2: 8 })
}

export interface NexFieldDef {
    offset: number;
    name: string;
    size: number;
    description: string;
    keys?: string[]; // 계층적 키 배열 (예: ["호차별 DCU", "1", "L1"])
    bitFields?: NexBitFieldDef[]; // 구조화된 비트 포맷
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
            "time",
            "year"
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
            "time",
            "month"
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
            "time",
            "day"
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
            "time",
            "hour"
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
            "time",
            "minute"
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
            "time",
            "second"
        ]
    },
    {
        "offset": 8,
        "name": "호선차량조성정보",
        "size": 1,
        "description": "bit0~1(차량조성정보 1:8칸 2:6칸 ) bit4~7(호선정보 1:5호선 2: 8호선)",
        "keys": [
            "호선차량조성정보"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 2,
                "keys": [
                    "차량정보",
                    "조성정보"
                ],
                "valueMap": {
                    "1": 6,
                    "2": 8
                }
            },
            {
                "offset": 4,
                "size": 4,
                "keys": [
                    "차량정보",
                    "호선정보"
                ],
                "valueMap": {
                    "1": "5호선",
                    "2": "8호선"
                }
            }
        ]
    },
    {
        "offset": 10,
        "name": "열차 번호(XXXX)",
        "size": 2,
        "description": "BCD포맷 4자리 숫자",
        "encoding": "BCD",
        "keys": [
            "train_num"
        ]
    },
    {
        "offset": 12,
        "name": "편성번호",
        "size": 1,
        "description": "BCD포맷 2자리 숫자",
        "encoding": "BCD",
        "keys": [
            "train"
        ]
    },
    {
        "offset": 14,
        "name": "현재역 코드",
        "size": 1,
        "description": "현재역 코드",
        "keys": [
            "current_station"
        ]
    },
    {
        "offset": 15,
        "name": "다음역 코드",
        "size": 1,
        "description": "",
        "keys": [
            "next_station"
        ]
    },
    {
        "offset": 16,
        "name": "종착역 코드",
        "size": 1,
        "description": "종착역 코드",
        "keys": [
            "terminal_station"
        ]
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
        "keys": [
            "역행"
        ]
    },
    {
        "offset": 31,
        "name": "제동",
        "size": 1,
        "description": "제동(0~100%)",
        "keys": [
            "제동"
        ]
    },
    {
        "offset": 32,
        "name": "1호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "1호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "1호차",
            "탑승률"
        ]
    },
    {
        "offset": 33,
        "name": "2호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "2호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "2호차",
            "탑승률"
        ]
    },
    {
        "offset": 34,
        "name": "3호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "3호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "3호차",
            "탑승률"
        ]
    },
    {
        "offset": 35,
        "name": "4호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "4호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "4호차",
            "탑승률"
        ]
    },
    {
        "offset": 36,
        "name": "5호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "5호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "5호차",
            "탑승률"
        ]
    },
    {
        "offset": 37,
        "name": "6호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "6호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "6호차",
            "탑승률"
        ]
    },
    {
        "offset": 38,
        "name": "7호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "7호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "7호차",
            "탑승률"
        ]
    },
    {
        "offset": 39,
        "name": "0호차 탑승률(0~200%/0x00~0xC8)",
        "size": 1,
        "description": "0호차 탑승률(0~200%/0x00~0xC8)",
        "keys": [
            "0호차",
            "탑승률"
        ]
    },
    {
        "offset": 42,
        "name": "HCR_구원운전",
        "size": 1,
        "description": "bit0(1호차 HCR) bit1(0호차 HCR) bit4(1호차 구원운전) bit5(0호차 구원운전)",
        "keys": [
            "HCR_구원운전"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 HCR"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "0호차 HCR"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1호차 구원운전"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "0호차 구원운전"
                ]
            }
        ]
    },
    {
        "offset": 43,
        "name": "CSB_FSB_상태",
        "size": 1,
        "description": "bit0(후진모드) bit1(후진모드 속도초과) bit3(EB CUT) bit4(HBCOS 상태) bit5(CSB 상태) bit6(FSB 상태) bit7(정차제동 상태)",
        "keys": [
            "CSB_FSB_상태"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "후진모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "후진모드 속도초과"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "EB CUT"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "HBCOS 상태"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "CSB 상태"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "FSB 상태"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "정차제동 상태"
                ]
            }
        ]
    },
    {
        "offset": 44,
        "name": "역전기_마스콘위치",
        "size": 1,
        "description": "bit0(역전기후진위치) bit1(역전기전진위치) bit2(마스콘제동위치) bit3(마스콘역행위치)",
        "keys": [
            "역전기_마스콘위치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "역전기후진위치"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "역전기전진위치"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "마스콘제동위치"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "마스콘역행위치"
                ]
            }
        ]
    },
    {
        "offset": 45,
        "name": "제동_ATO_ATC",
        "size": 1,
        "description": "bit0(보안제동 상태) bit1(비상제동 상태) bit2(주차제동 상태) bit3(ATO모드) bit4(ATC모드) bit6(stop_proceed_mdoe) bit7(yard_mode)",
        "keys": [
            "제동_ATO_ATC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "보안제동 상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "비상제동 상태"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "주차제동 상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "ATO모드"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "ATC모드"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "stop_proceed_mdoe"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "yard_mode"
                ]
            }
        ]
    },
    {
        "offset": 46,
        "name": "고장 상하선 정보",
        "size": 1,
        "description": "bit0~1(현재 출입문 열림 상태) bit2~3(출입문 열림 예정 방향) bit6(하선정보) bit7(상선정보)",
        "keys": [
            "고장 상하선 정보 플래그"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "현재 출입문 열림 상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "현재 출입문 열림 상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "출입문 열림 예정 방향"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "출입문 열림 예정 방향"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "하선정보"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "상선정보"
                ]
            }
        ]
    },
    {
        "offset": 47,
        "name": "SIVK_ESK",
        "size": 1,
        "description": "bit0(SIVK1) bit3(ESK) bit7(SIVK2)",
        "keys": [
            "SIVK_ESK"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "SIVK1"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "ESK"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "SIVK2"
                ]
            }
        ]
    },
    {
        "offset": 48,
        "name": "화재감지",
        "size": 2,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "화재감지"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 화재감지"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 화재감지"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 화재감지"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 화재감지"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 화재감지"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 화재감지"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 화재감지"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 화재감지"
                ]
            },
            {
                "offset": 14,
                "size": 1,
                "keys": [
                    "1호차 운전실 화재감지"
                ]
            },
            {
                "offset": 15,
                "size": 1,
                "keys": [
                    "0호차 운전실 화재감지"
                ]
            }
        ]
    },
    {
        "offset": 50,
        "name": "1번 비상인터폰 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "비상인터폰",
            "1번"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1번 감지"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1번 감지"
                ]
            }
        ]
    },
    {
        "offset": 52,
        "name": "1번 비상인터폰 통화중",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "비상인터폰",
            "1번"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1번 통화중"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1번 통화중"
                ]
            }
        ]
    },
    {
        "offset": 54,
        "name": "2번 비상인터폰 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "비상인터폰",
            "2번"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2번 감지"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2번 감지"
                ]
            }
        ]
    },
    {
        "offset": 56,
        "name": "2번 비상인터폰 통화중",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "비상인터폰",
            "2번"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2번 통화중"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2번 통화중"
                ]
            }
        ]
    },
    {
        "offset": 57,
        "name": "내부비상핸들 감지",
        "size": 1,
        "description": "bit0(0호차) ~ bit9(9호차)",
        "keys": [
            "내부비상핸들",
            "감지"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 내부비상핸들 감지"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 내부비상핸들 감지"
                ]
            }
        ]
    },
    {
        "offset": 59,
        "name": "NOTCH_AUTO_PWM",
        "size": 1,
        "description": "",
        "keys": [
            "NOTCH_AUTO_PWM"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "NOTCH"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "NOTCH"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "NOTCH"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "NOTCH"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "AUTO_PWM 상태"
                ]
            }
        ]
    },
    {
        "offset": 71,
        "name": "ATC_limit_speed",
        "size": 1,
        "description": "",
        "keys": [
            "ATC_limit_speed"
        ]
    },
    {
        "offset": 72,
        "name": "ATC_SPEED_MODE",
        "size": 1,
        "description": "",
        "keys": [
            "ATC_SPEED_MODE"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "속도 버튼 모드 표시"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "속도 버튼 모드 표시"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "속도 버튼 모드 표시"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "속도 버튼 모드 표시"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "주 ATC Active"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "보조 ATC Active"
                ]
            }
        ]
    },
    {
        "offset": 73,
        "name": "고장표시",
        "size": 1,
        "description": "bit0(고장 Clear) bit1(고장 Set)",
        "keys": [
            "고장표시"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "고장 Clear"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장 Set"
                ]
            }
        ]
    },
    {
        "offset": 80,
        "name": "1호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 81,
        "name": "2호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "2호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 82,
        "name": "3호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "3호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 83,
        "name": "4호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "4호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 84,
        "name": "5호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "5호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 85,
        "name": "6호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "6호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 86,
        "name": "7호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "7호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 87,
        "name": "0호차 HVAC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "HVAC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 88,
        "name": "온도센서 이상",
        "size": 1,
        "description": "bit0(온도센서 이상)",
        "keys": [
            "온도센서 이상"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "온도센서 이상"
                ]
            }
        ]
    },
    {
        "offset": 89,
        "name": "운전실 온도",
        "size": 1,
        "description": "운전실 온도(℃)",
        "keys": [
            "온도센서 이상"
        ]
    },
    {
        "offset": 90,
        "name": "외기 온도",
        "size": 1,
        "description": "외기 온도(℃)",
        "keys": [
            "외기 온도"
        ]
    },
    {
        "offset": 91,
        "name": "1호차 HVAC_Mode",
        "size": 1,
        "description": "1호차 HVAC Mode",
        "keys": [
            "1호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 92,
        "name": "2호차 HVAC_Mode",
        "size": 1,
        "description": "2호차 HVAC Mode",
        "keys": [
            "2호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 93,
        "name": "3호차 HVAC_Mode",
        "size": 1,
        "description": "3호차 HVAC Mode",
        "keys": [
            "3호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 94,
        "name": "4호차 HVAC_Mode",
        "size": 1,
        "description": "4호차 HVAC Mode",
        "keys": [
            "4호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 95,
        "name": "5호차 HVAC_Mode",
        "size": 1,
        "description": "5호차 HVAC Mode",
        "keys": [
            "5호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 96,
        "name": "6호차 HVAC_Mode",
        "size": 1,
        "description": "6호차 HVAC Mode",
        "keys": [
            "6호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 97,
        "name": "7호차 HVAC_Mode",
        "size": 1,
        "description": "7호차 HVAC Mode",
        "keys": [
            "7호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 98,
        "name": "0호차 HVAC_Mode",
        "size": 1,
        "description": "0호차 HVAC Mode",
        "keys": [
            "0호차",
            "HVAC",
            "Mode"
        ]
    },
    {
        "offset": 99,
        "name": "1호차 실내온도",
        "size": 1,
        "description": "1호차 실내온도",
        "keys": [
            "1호차",
            "실내온도"
        ]
    },
    {
        "offset": 100,
        "name": "2호차 실내온도",
        "size": 1,
        "description": "2호차 실내온도",
        "keys": [
            "2호차",
            "실내온도"
        ]
    },
    {
        "offset": 101,
        "name": "3호차 실내온도",
        "size": 1,
        "description": "3호차 실내온도",
        "keys": [
            "3호차",
            "실내온도"
        ]
    },
    {
        "offset": 102,
        "name": "4호차 실내온도",
        "size": 1,
        "description": "4호차 실내온도",
        "keys": [
            "4호차",
            "실내온도"
        ]
    },
    {
        "offset": 103,
        "name": "5호차 실내온도",
        "size": 1,
        "description": "5호차 실내온도",
        "keys": [
            "5호차",
            "실내온도"
        ]
    },
    {
        "offset": 104,
        "name": "6호차 실내온도",
        "size": 1,
        "description": "6호차 실내온도",
        "keys": [
            "6호차",
            "실내온도"
        ]
    },
    {
        "offset": 105,
        "name": "7호차 실내온도",
        "size": 1,
        "description": "7호차 실내온도",
        "keys": [
            "7호차",
            "실내온도"
        ]
    },
    {
        "offset": 106,
        "name": "0호차 실내온도",
        "size": 1,
        "description": "0호차 실내온도",
        "keys": [
            "0호차",
            "실내온도"
        ]
    },
    {
        "offset": 108,
        "name": "1호차 비상구원스위치 취급",
        "size": 1,
        "description": "1호차 비상구원스위치 취급",
        "keys": [
            "1호차",
            "비상구원스위치 취급"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "EO"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "R1"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "R2"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "LOCO"
                ]
            }
        ]
    },
    {
        "offset": 109,
        "name": "0호차 비상구원스위치 취급",
        "size": 1,
        "description": "0호차 비상구원스위치 취급",
        "keys": [
            "0호차",
            "비상구원스위치 취급"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "EO"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "R1"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "R2"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "LOCO"
                ]
            }
        ]
    },
    {
        "offset": 110,
        "name": "판토_바퀴색상",
        "size": 1,
        "description": "VVVF INV_OK 값이 1일 시, 녹색(#00FF00) 표시 VVVF INV_OK 값이 0일 시, 회색(#808080) 표시",
        "keys": [
            "판토_바퀴색상"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "2호차 판토1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 판토2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "6호차(7호차) 판토1"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "6호차(7호차) 판토2"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "2호차 VVVF INV_OK"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "3호차 VVVF INV_OK"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "6호차 VVVF INV_OK"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "7호차 VVVF INV_OK"
                ]
            }
        ]
    },
    {
        "offset": 114,
        "name": "1호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 115,
        "name": "2호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "2호차",
            "CC "
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 116,
        "name": "3호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "3호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 117,
        "name": "4호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "4호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 118,
        "name": "5호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "5호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 119,
        "name": "6호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "6호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 120,
        "name": "7호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "7호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 121,
        "name": "0호차 CC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "CC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 124,
        "name": "CC 상태",
        "size": 1,
        "description": "bit0(4호차 통로 출입문 열림상태) bit1(5호차 통로 출입문 열림상태) bit4(1호차 운전실 출입문 열림상태) bit5(0호차 운전실 출입문 열림상태) bit6(1호차 자동연결기 상태) bit7(0호차 자동연결기 상태)",
        "keys": [
            "CC 상태"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "4호차 통로 출입문 열림상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "5호차 통로 출입문 열림상태"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1호차 운전실 출입문 열림상태"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "0호차 운전실 출입문 열림상태"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "1호차 자동연결기 상태"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 자동연결기 상태"
                ]
            }
        ]
    },
    {
        "offset": 130,
        "name": "1호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "1호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 131,
        "name": "1호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "1호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 132,
        "name": "1호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "1호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 133,
        "name": "1호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "1호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 134,
        "name": "1호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "1호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 136,
        "name": "2호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "2호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 137,
        "name": "2호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "2호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 138,
        "name": "2호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "2호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 139,
        "name": "2호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "2호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 140,
        "name": "2호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "2호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 142,
        "name": "3호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "3호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 143,
        "name": "3호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "3호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 144,
        "name": "3호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "3호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 145,
        "name": "3호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "3호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 146,
        "name": "3호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "3호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 148,
        "name": "4호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "4호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 149,
        "name": "4호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "4호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 150,
        "name": "4호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "4호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 151,
        "name": "4호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "4호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 152,
        "name": "4호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "4호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 154,
        "name": "5호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "5호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 155,
        "name": "5호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "5호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 156,
        "name": "5호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "5호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 157,
        "name": "5호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "5호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 158,
        "name": "5호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "5호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 160,
        "name": "6호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "6호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 161,
        "name": "6호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "6호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 162,
        "name": "6호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "6호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 163,
        "name": "6호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "6호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 164,
        "name": "6호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "6호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 166,
        "name": "7호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "7호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 167,
        "name": "7호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "7호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 168,
        "name": "7호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "7호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 169,
        "name": "7호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "7호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 170,
        "name": "7호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "7호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 172,
        "name": "0호차 DCU 열림",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "0호차",
            "DCU",
            "열림"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 173,
        "name": "0호차 DCU Bypass",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "0호차",
            "DCU",
            "Bypass"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 174,
        "name": "0호차 DCU 내부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "0호차",
            "DCU",
            "내부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 175,
        "name": "0호차 DCU 외부비상핸들",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "0호차",
            "DCU",
            "외부비상핸들"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 176,
        "name": "0호차 DCU 고장",
        "size": 1,
        "description": "bit0(DCU1) ~ bit1(DCU8)",
        "keys": [
            "0호차",
            "DCU",
            "고장"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "DCU1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "DCU2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "DCU3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "DCU4"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "DCU5"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "DCU6"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "DCU7"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "DCU8"
                ]
            }
        ]
    },
    {
        "offset": 180,
        "name": "1호차 ATC1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "ATC",
            "1"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 181,
        "name": "1호차 ATC2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "ATC",
            "2"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 182,
        "name": "0호차 ATC1",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "ATC",
            "1"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 183,
        "name": "0호차 ATC2",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "ATC",
            "2"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 184,
        "name": "화재감지",
        "size": 4,
        "description": "",
        "keys": [
            "화재감지",
            "객실"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "1호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "1호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "1호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "2호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "2호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "2호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "2호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "3호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "3호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "3호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "3호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "4호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "4호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 14,
                "size": 1,
                "keys": [
                    "4호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 15,
                "size": 1,
                "keys": [
                    "4호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "5호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "5호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "5호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 19,
                "size": 1,
                "keys": [
                    "5호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 20,
                "size": 1,
                "keys": [
                    "6호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 21,
                "size": 1,
                "keys": [
                    "6호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 22,
                "size": 1,
                "keys": [
                    "6호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 23,
                "size": 1,
                "keys": [
                    "6호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "7호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "7호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "7호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "7호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "0호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 29,
                "size": 1,
                "keys": [
                    "0호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "0호차 객실 화재감지 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "0호차 객실 화재감지 상태"
                ]
            }
        ]
    },
    {
        "offset": 188,
        "name": "화재감지",
        "size": 1,
        "description": "",
        "keys": [
            "화재감지",
            "운전실"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "1호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "1호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "1호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "0호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "0호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "0호차 운전실 화재감지 상태"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 운전실 화재감지 상태"
                ]
            }
        ]
    },
    {
        "offset": 189,
        "name": "1호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 190,
        "name": "2호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "2호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 191,
        "name": "3호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "3호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 192,
        "name": "4호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "4호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 193,
        "name": "5호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "5호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 194,
        "name": "6호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "6호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 195,
        "name": "7호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "7호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 196,
        "name": "0호차 ECU",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "ECU"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 197,
        "name": "2호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "keys": [
            "2호차",
            "VVVF"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "TEST"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "미표시"
                ]
            }
        ]
    },
    {
        "offset": 198,
        "name": "3호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "keys": [
            "3호차",
            "VVVF"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "TEST"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "미표시"
                ]
            }
        ]
    },
    {
        "offset": 199,
        "name": "6호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "keys": [
            "6호차",
            "VVVF"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "TEST"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "미표시"
                ]
            }
        ]
    },
    {
        "offset": 200,
        "name": "7호차 VVVF",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(TEST) bit5(미표시)",
        "keys": [
            "7호차",
            "VVVF"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "TEST"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "미표시"
                ]
            }
        ]
    },
    {
        "offset": 201,
        "name": "1호차 SIV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit5(투입)",
        "keys": [
            "1호차",
            "SIV"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "투입"
                ]
            }
        ]
    },
    {
        "offset": 202,
        "name": "0호차 SIV",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit5(투입)",
        "keys": [
            "0호차",
            "SIV"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "투입"
                ]
            }
        ]
    },
    {
        "offset": 203,
        "name": "1호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(BYPASS) bit5(CM기동)",
        "keys": [
            "1호차",
            "CMSB"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "BYPASS"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "CM기동"
                ]
            }
        ]
    },
    {
        "offset": 204,
        "name": "0호차 CMSB",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF) bit4(BYPASS) bit5(CM기동)",
        "keys": [
            "0호차",
            "CMSB"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "BYPASS"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "CM기동"
                ]
            }
        ]
    },
    {
        "offset": 205,
        "name": "ACM_ESK",
        "size": 1,
        "description": "bit0(2호차 ACM) bit1(6/7호차 ACM) bit7(ESK)",
        "keys": [
            "ACM_ESK"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "2호차 ACM 정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "6/7호차 ACM 정상"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "ESK 정상"
                ]
            }
        ]
    },
    {
        "offset": 206,
        "name": "1호차 비상인터폰",
        "size": 1,
        "description": "bit0(1호차 비상인터폰 1 고장) bit1(1호차 비상인터폰 1 통신이상) bit2(1호차 비상인터폰 1 통화) bit3(1호차 비상인터폰 1 호출) bit4(1호차 비상인터폰 2 고장) bit5(1호차 비상인터폰 2 통신이상) bit6(1호차 비상인터폰 2 통화) bit7(1호차 비상인터폰 2 호출)",
        "keys": [
            "1호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "1호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 207,
        "name": "2호차 비상인터폰",
        "size": 1,
        "description": "bit0(2호차 비상인터폰 1 고장) bit1(2호차 비상인터폰 1 통신이상) bit2(2호차 비상인터폰 1 통화) bit3(2호차 비상인터폰 1 호출) bit4(2호차 비상인터폰 2 고장) bit5(2호차 비상인터폰 2 통신이상) bit6(2호차 비상인터폰 2 통화) bit7(2호차 비상인터폰 2 호출)",
        "keys": [
            "2호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "2호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 208,
        "name": "3호차 비상인터폰",
        "size": 1,
        "description": "bit0(3호차 비상인터폰 1 고장) bit1(3호차 비상인터폰 1 통신이상) bit2(3호차 비상인터폰 1 통화) bit3(3호차 비상인터폰 1 호출) bit4(3호차 비상인터폰 2 고장) bit5(3호차 비상인터폰 2 통신이상) bit6(3호차 비상인터폰 2 통화) bit7(3호차 비상인터폰 2 호출)",
        "keys": [
            "3호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "3호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 209,
        "name": "4호차 비상인터폰",
        "size": 1,
        "description": "bit0(4호차 비상인터폰 1 고장) bit1(4호차 비상인터폰 1 통신이상) bit2(4호차 비상인터폰 1 통화) bit3(4호차 비상인터폰 1 호출) bit4(4호차 비상인터폰 2 고장) bit5(4호차 비상인터폰 2 통신이상) bit6(4호차 비상인터폰 2 통화) bit7(4호차 비상인터폰 2 호출)",
        "keys": [
            "4호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "4호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 210,
        "name": "5호차 비상인터폰",
        "size": 1,
        "description": "bit0(5호차 비상인터폰 1 고장) bit1(5호차 비상인터폰 1 통신이상) bit2(5호차 비상인터폰 1 통화) bit3(5호차 비상인터폰 1 호출) bit4(5호차 비상인터폰 2 고장) bit5(5호차 비상인터폰 2 통신이상) bit6(5호차 비상인터폰 2 통화) bit7(5호차 비상인터폰 2 호출)",
        "keys": [
            "5호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "5호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 211,
        "name": "6호차 비상인터폰",
        "size": 1,
        "description": "bit0(6호차 비상인터폰 1 고장) bit1(6호차 비상인터폰 1 통신이상) bit2(6호차 비상인터폰 1 통화) bit3(6호차 비상인터폰 1 호출) bit4(6호차 비상인터폰 2 고장) bit5(6호차 비상인터폰 2 통신이상) bit6(6호차 비상인터폰 2 통화) bit7(6호차 비상인터폰 2 호출)",
        "keys": [
            "6호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "6호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 212,
        "name": "7호차 비상인터폰",
        "size": 1,
        "description": "bit0(7호차 비상인터폰 1 고장) bit1(7호차 비상인터폰 1 통신이상) bit2(7호차 비상인터폰 1 통화) bit3(7호차 비상인터폰 1 호출) bit4(7호차 비상인터폰 2 고장) bit5(7호차 비상인터폰 2 통신이상) bit6(7호차 비상인터폰 2 통화) bit7(7호차 비상인터폰 2 호출)",
        "keys": [
            "7호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "7호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 213,
        "name": "0호차 비상인터폰",
        "size": 1,
        "description": "bit0(0호차 비상인터폰 1 고장) bit1(0호차 비상인터폰 1 통신이상) bit2(0호차 비상인터폰 1 통화) bit3(0호차 비상인터폰 1 호출) bit4(0호차 비상인터폰 2 고장) bit5(0호차 비상인터폰 2 통신이상) bit6(0호차 비상인터폰 2 통화) bit7(0호차 비상인터폰 2 호출)",
        "keys": [
            "0호차",
            "비상인터폰"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1 통신이상"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1 통화"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 1 호출"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2 통신이상"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2 통화"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 비상인터폰 2 호출"
                ]
            }
        ]
    },
    {
        "offset": 220,
        "name": "2호차 VVVF VDC",
        "size": 2,
        "description": "2호차 추진장치 가선전압 Big Endian",
        "keys": [
            "2호차",
            "VVVF",
            "VDC"
        ]
    },
    {
        "offset": 222,
        "name": "3호차 VVVF VDC",
        "size": 2,
        "description": "3호차 추진장치 가선전압 Big Endian",
        "keys": [
            "3호차",
            "VVVF",
            "VDC"
        ]
    },
    {
        "offset": 224,
        "name": "6호차 VVVF VDC",
        "size": 2,
        "description": "6호차 추진장치 가선전압 Big Endian",
        "keys": [
            "6호차",
            "VVVF",
            "VDC"
        ]
    },
    {
        "offset": 226,
        "name": "7호차 VVVF VDC",
        "size": 2,
        "description": "7호차 추진장치 가선전압 Big Endian",
        "keys": [
            "7호차",
            "VVVF",
            "VDC"
        ]
    },
    {
        "offset": 228,
        "name": "2호차 전동기 전류",
        "size": 2,
        "description": "2호차 추진장치 전동기전류 Big Endian",
        "keys": [
            "2호차",
            "추진장치",
            "전동기전류"
        ]
    },
    {
        "offset": 230,
        "name": "3호차 전동기 전류",
        "size": 2,
        "description": "3호차 추진장치 전동기전류 Big Endian",
        "keys": [
            "3호차",
            "추진장치",
            "전동기전류"
        ]
    },
    {
        "offset": 232,
        "name": "6호차 전동기 전류",
        "size": 2,
        "description": "6호차 추진장치 전동기전류 Big Endian",
        "keys": [
            "6호차",
            "추진장치",
            "전동기전류"
        ]
    },
    {
        "offset": 234,
        "name": "7호차 전동기 전류",
        "size": 2,
        "description": "7호차 추진장치 전동기전류 Big Endian",
        "keys": [
            "7호차",
            "추진장치",
            "전동기전류"
        ]
    },
    {
        "offset": 236,
        "name": "2호차 VVVF FDC",
        "size": 2,
        "description": "2호차 추진장치 FC전압 Big Endian",
        "keys": [
            "2호차",
            "VVVF",
            "FDC"
        ]
    },
    {
        "offset": 238,
        "name": "3호차 VVVF FDC",
        "size": 2,
        "description": "3호차 추진장치 FC전압 Big Endian",
        "keys": [
            "3호차",
            "VVVF",
            "FDC"
        ]
    },
    {
        "offset": 240,
        "name": "6호차 VVVF FDC",
        "size": 2,
        "description": "6호차 추진장치 FC전압 Big Endian",
        "keys": [
            "6호차",
            "VVVF",
            "FDC"
        ]
    },
    {
        "offset": 242,
        "name": "7호차 VVVF FDC",
        "size": 2,
        "description": "7호차 추진장치 FC전압 Big Endian",
        "keys": [
            "7호차",
            "VVVF",
            "FDC"
        ]
    },
    {
        "offset": 244,
        "name": "HB투입상태",
        "size": 1,
        "description": "bit0(2호차 HB투입상태) bit1(3호차 HB투입상태) bit2(6호차 HB투입상태) bit3(7호차 HB투입상태)",
        "keys": [
            "HB투입상태"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "2호차 HB투입상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "3호차 HB투입상태"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "6호차 HB투입상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "7호차 HB투입상태"
                ]
            }
        ]
    },
    {
        "offset": 245,
        "name": "LB투입상태",
        "size": 1,
        "description": "bit0(2호차 LB투입상태) bit1(3호차 LB투입상태) bit2(6호차 LB투입상태) bit3(7호차 LB투입상태)",
        "keys": [
            "LB투입상태"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "2호차 LB투입상태"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "3호차 LB투입상태"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "6호차 LB투입상태"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "7호차 LB투입상태"
                ]
            }
        ]
    },
    {
        "offset": 247,
        "name": "1호차 SIV 출력전압",
        "size": 1,
        "description": "1호차 SIV 출력전압",
        "keys": [
            "1호차",
            "SIV",
            "출력전압"
        ]
    },
    {
        "offset": 248,
        "name": "0호차 SIV 출력전압",
        "size": 1,
        "description": "0호차 SIV 출력전압",
        "keys": [
            "0호차",
            "SIV",
            "출력전압"
        ]
    },
    {
        "offset": 249,
        "name": "1호차 SIV 출력전류",
        "size": 2,
        "description": "1호차 SIV 출력전류",
        "keys": [
            "1호차",
            "SIV",
            "출력전류"
        ]
    },
    {
        "offset": 251,
        "name": "0호차 SIV 출력전류",
        "size": 2,
        "description": "0호차 SIV 출력전류",
        "keys": [
            "0호차",
            "SIV",
            "출력전류"
        ]
    },
    {
        "offset": 253,
        "name": "1호차 SIV 출력주파수",
        "size": 1,
        "description": "1호차 SIV 출력주파수",
        "keys": [
            "1호차",
            "SIV",
            "출력주파수"
        ]
    },
    {
        "offset": 254,
        "name": "0호차 SIV 출력주파수",
        "size": 1,
        "description": "0호차 SIV 출력주파수",
        "keys": [
            "0호차",
            "SIV",
            "출력주파수"
        ]
    },
    {
        "offset": 255,
        "name": "1호차 SIV DC 가선전압",
        "size": 1,
        "description": "1호차 SIV DC 가선전압",
        "keys": [
            "1호차",
            "SIV",
            "DC가선전압"
        ]
    },
    {
        "offset": 256,
        "name": "0호차 SIV DC 가선전압",
        "size": 1,
        "description": "0호차 SIV DC 가선전압",
        "keys": [
            "0호차",
            "SIV",
            "DC가선전압"
        ]
    },
    {
        "offset": 257,
        "name": "1호차 SIV 인버터 FC전압",
        "size": 1,
        "description": "1호차 SIV 인버터 FC전압",
        "keys": [
            "1호차",
            "SIV",
            "인버터FC전압"
        ]
    },
    {
        "offset": 258,
        "name": "0호차 SIV 인버터 FC전압",
        "size": 1,
        "description": "0호차 SIV 인버터 FC전압",
        "keys": [
            "0호차",
            "SIV",
            "인버터FC전압"
        ]
    },
    {
        "offset": 259,
        "name": "배터리 충방전 상태",
        "size": 1,
        "description": "bit0(1호차 배터리 충전중) bit1(2호차 배터리 방전중) bit4(0호차 배터리 충전중) bit5(0호차 배터리 방전중)",
        "keys": [
            "배터리 충방전 상태"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 배터리 충전중"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 배터리 방전중"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "0호차 배터리 충전중"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "0호차 배터리 방전중"
                ]
            }
        ]
    },
    {
        "offset": 260,
        "name": "1호차 배터리 충전율",
        "size": 1,
        "description": "1호차 배터리 충전율",
        "keys": [
            "1호차",
            "배터리",
            "충전율"
        ]
    },
    {
        "offset": 261,
        "name": "0호차 배터리 충전율",
        "size": 1,
        "description": "0호차 배터리 충전율",
        "keys": [
            "0호차",
            "배터리",
            "충전율"
        ]
    },
    {
        "offset": 263,
        "name": "1호차 ECU AS압력",
        "size": 2,
        "description": "1호차 ECU AS압력",
        "keys": [
            "1호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 265,
        "name": "2호차 ECU AS압력",
        "size": 2,
        "description": "2호차 ECU AS압력",
        "keys": [
            "2호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 267,
        "name": "3호차 ECU AS압력",
        "size": 2,
        "description": "3호차 ECU AS압력",
        "keys": [
            "3호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 269,
        "name": "4호차 ECU AS압력",
        "size": 2,
        "description": "4호차 ECU AS압력",
        "keys": [
            "4호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 271,
        "name": "5호차 ECU AS압력",
        "size": 2,
        "description": "5호차 ECU AS압력",
        "keys": [
            "5호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 273,
        "name": "6호차 ECU AS압력",
        "size": 2,
        "description": "6호차 ECU AS압력",
        "keys": [
            "6호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 275,
        "name": "7호차 ECU AS압력",
        "size": 2,
        "description": "7호차 ECU AS압력",
        "keys": [
            "7호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 277,
        "name": "0호차 ECU AS압력",
        "size": 2,
        "description": "0호차 ECU AS압력",
        "keys": [
            "0호차",
            "ECU",
            "AS압력"
        ]
    },
    {
        "offset": 279,
        "name": "1호차 ECU BC압력",
        "size": 1,
        "description": "1호차 ECU BC압력",
        "keys": [
            "1호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 280,
        "name": "2호차 ECU BC압력",
        "size": 1,
        "description": "2호차 ECU BC압력",
        "keys": [
            "2호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 281,
        "name": "3호차 ECU BC압력",
        "size": 1,
        "description": "3호차 ECU BC압력",
        "keys": [
            "3호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 282,
        "name": "4호차 ECU BC압력",
        "size": 1,
        "description": "4호차 ECU BC압력",
        "keys": [
            "4호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 283,
        "name": "5호차 ECU BC압력",
        "size": 1,
        "description": "5호차 ECU BC압력",
        "keys": [
            "5호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 284,
        "name": "6호차 ECU BC압력",
        "size": 1,
        "description": "6호차 ECU BC압력",
        "keys": [
            "6호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 285,
        "name": "7호차 ECU BC압력",
        "size": 1,
        "description": "7호차 ECU BC압력",
        "keys": [
            "7호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 286,
        "name": "0호차 ECU BC압력",
        "size": 1,
        "description": "0호차 ECU BC압력",
        "keys": [
            "0호차",
            "ECU",
            "BC압력"
        ]
    },
    {
        "offset": 287,
        "name": "1호차 ECU HCR BC압력",
        "size": 1,
        "description": "1호차 ECU HCR BC압력",
        "keys": [
            "1호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 288,
        "name": "1호차 ECU TCR BC압력",
        "size": 1,
        "description": "1호차 ECU TCR BC압력",
        "keys": [
            "1호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 289,
        "name": "2호차 ECU HCR BC압력",
        "size": 1,
        "description": "2호차 ECU HCR BC압력",
        "keys": [
            "2호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 290,
        "name": "2호차 ECU TCR BC압력",
        "size": 1,
        "description": "2호차 ECU TCR BC압력",
        "keys": [
            "2호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 291,
        "name": "3호차 ECU HCR BC압력",
        "size": 1,
        "description": "3호차 ECU HCR BC압력",
        "keys": [
            "3호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 292,
        "name": "3호차 ECU TCR BC압력",
        "size": 1,
        "description": "3호차 ECU TCR BC압력",
        "keys": [
            "3호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 293,
        "name": "4호차 ECU HCR BC압력",
        "size": 1,
        "description": "4호차 ECU HCR BC압력",
        "keys": [
            "4호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 294,
        "name": "4호차 ECU TCR BC압력",
        "size": 1,
        "description": "4호차 ECU TCR BC압력",
        "keys": [
            "4호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 295,
        "name": "5호차 ECU HCR BC압력",
        "size": 1,
        "description": "5호차 ECU HCR BC압력",
        "keys": [
            "5호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 296,
        "name": "5호차 ECU TCR BC압력",
        "size": 1,
        "description": "5호차 ECU TCR BC압력",
        "keys": [
            "5호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 297,
        "name": "6호차 ECU HCR BC압력",
        "size": 1,
        "description": "6호차 ECU HCR BC압력",
        "keys": [
            "6호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 298,
        "name": "6호차 ECU TCR BC압력",
        "size": 1,
        "description": "6호차 ECU TCR BC압력",
        "keys": [
            "6호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 299,
        "name": "7호차 ECU HCR BC압력",
        "size": 1,
        "description": "7호차 ECU HCR BC압력",
        "keys": [
            "7호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 300,
        "name": "7호차 ECU TCR BC압력",
        "size": 1,
        "description": "7호차 ECU TCR BC압력",
        "keys": [
            "7호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 301,
        "name": "0호차 ECU HCR BC압력",
        "size": 1,
        "description": "0호차 ECU HCR BC압력",
        "keys": [
            "0호차",
            "ECU",
            "HCR",
            "BC압력"
        ]
    },
    {
        "offset": 302,
        "name": "0호차 ECU TCR BC압력",
        "size": 1,
        "description": "0호차 ECU TCR BC압력",
        "keys": [
            "0호차",
            "ECU",
            "TCR",
            "BC압력"
        ]
    },
    {
        "offset": 303,
        "name": "2호차 회생제동력",
        "size": 1,
        "description": "2호차 회생제동력",
        "keys": [
            "2호차",
            "회생제동력"
        ]
    },
    {
        "offset": 304,
        "name": "4호차 회생제동력",
        "size": 1,
        "description": "4호차 회생제동력",
        "keys": [
            "4호차",
            "회생제동력"
        ]
    },
    {
        "offset": 305,
        "name": "6호차 회생제동력",
        "size": 1,
        "description": "6호차 회생제동력",
        "keys": [
            "6호차",
            "회생제동력"
        ]
    },
    {
        "offset": 306,
        "name": "7호차 회생제동력",
        "size": 1,
        "description": "7호차 회생제동력",
        "keys": [
            "7호차",
            "회생제동력"
        ]
    },
    {
        "offset": 310,
        "name": "pic_sleep_start",
        "size": 1,
        "description": "방송 표시기 SLEEP bit0(pic_sleep_start)",
        "keys": [
            "방송표시기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "pic_sleep_start"
                ]
            }
        ]
    },
    {
        "offset": 311,
        "name": "1호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "1호차",
            "PIC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 312,
        "name": "0호차 PIC",
        "size": 1,
        "description": "bit0(정상) bit1(고장) bit2(통신이상) bit3(OFF)",
        "keys": [
            "0호차",
            "PIC"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "정상"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "통신이상"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 313,
        "name": "통합설정기",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "통합설정기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 314,
        "name": "정면행선안내",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "정면행선안내"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 315,
        "name": "단부안내표시기",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "단부안내표시기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 316,
        "name": "단부안내표시기 1",
        "size": 1,
        "description": "bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장)",
        "keys": [
            "단부안내표시기",
            "1"
        ],
        "bitFields": [
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 고장"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 고장"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 고장"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 317,
        "name": "단부안내표시기 2",
        "size": 1,
        "description": "bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장)",
        "keys": [
            "단부안내표시기2",
            "2"
        ],
        "bitFields": [
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 고장"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 고장"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 고장"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 318,
        "name": "객실안내표시기",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "keys": [
            "객실안내표시기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 고장"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 고장"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 고장"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 319,
        "name": "자동방송장치",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "자동방송장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 320,
        "name": "중앙제어장치(COB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "중앙제어장치(COB)"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 321,
        "name": "축면제어장치1(SOB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "축면제어장치1(SOB)"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 322,
        "name": "축면제어장치2(SOB)",
        "size": 1,
        "description": "bit0(1호차 고장) bit7(0호차 고장)",
        "keys": [
            "축면제어장치2(SOB)"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 323,
        "name": "출력증폭기1",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "keys": [
            "객실안내표시기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 고장"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 고장"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 고장"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 324,
        "name": "출력증폭기2",
        "size": 1,
        "description": "bit0(1호차 고장) bit1(2호차 고장) bit2(3호차 고장) bit3(4호차 고장) bit4(5호차 고장) bit5(6호차 고장) bit6(7호차 고장) bit7(0호차 고장)",
        "keys": [
            "객실안내표시기"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "1호차 고장"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "2호차 고장"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "3호차 고장"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "4호차 고장"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "5호차 고장"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "6호차 고장"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "7호차 고장"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "0호차 고장"
                ]
            }
        ]
    },
    {
        "offset": 330,
        "name": "1호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 331,
        "name": "1호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 332,
        "name": "1호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 333,
        "name": "1호차 운전실MD4 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "운전실MD4",
            "차량온도"
        ]
    },
    {
        "offset": 334,
        "name": "2호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 335,
        "name": "2호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 336,
        "name": "2호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 337,
        "name": "3호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 338,
        "name": "3호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 339,
        "name": "3호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 340,
        "name": "4호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 341,
        "name": "4호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 342,
        "name": "4호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 343,
        "name": "5호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 344,
        "name": "5호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 345,
        "name": "5호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 346,
        "name": "6호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 347,
        "name": "6호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 348,
        "name": "6호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 349,
        "name": "7호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 350,
        "name": "7호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 351,
        "name": "7호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 352,
        "name": "0호차 객실MD1 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD1",
            "차량온도"
        ]
    },
    {
        "offset": 353,
        "name": "0호차 객실MD2 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD2",
            "차량온도"
        ]
    },
    {
        "offset": 354,
        "name": "0호차 객실MD3 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD3",
            "차량온도"
        ]
    },
    {
        "offset": 355,
        "name": "0호차 운전실MD4 차량온도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "운전실MD4",
            "차량온도"
        ]
    },
    {
        "offset": 356,
        "name": "1호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 357,
        "name": "1호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 358,
        "name": "1호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 359,
        "name": "1호차 운전실MD4 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "운전실MD4",
            "연기농도"
        ]
    },
    {
        "offset": 360,
        "name": "2호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 361,
        "name": "2호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 362,
        "name": "2호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 363,
        "name": "3호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 364,
        "name": "3호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 365,
        "name": "3호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 366,
        "name": "4호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 367,
        "name": "4호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 368,
        "name": "4호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 369,
        "name": "5호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 370,
        "name": "5호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 371,
        "name": "5호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 372,
        "name": "6호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 373,
        "name": "6호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 374,
        "name": "6호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 375,
        "name": "7호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 376,
        "name": "7호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 377,
        "name": "7호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 378,
        "name": "0호차 객실MD1 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD1",
            "연기농도"
        ]
    },
    {
        "offset": 379,
        "name": "0호차 객실MD2 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD2",
            "연기농도"
        ]
    },
    {
        "offset": 380,
        "name": "0호차 객실MD3 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD3",
            "연기농도"
        ]
    },
    {
        "offset": 381,
        "name": "0호차 운전실MD4 연기농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "운전실MD4",
            "연기농도"
        ]
    },
    {
        "offset": 382,
        "name": "1호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 383,
        "name": "1호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 384,
        "name": "1호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 385,
        "name": "1호차 운전실MD4 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "1호차",
            "운전실MD4",
            "먼지농도"
        ]
    },
    {
        "offset": 386,
        "name": "2호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 387,
        "name": "2호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 388,
        "name": "2호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "2호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 389,
        "name": "3호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 390,
        "name": "3호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 391,
        "name": "3호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "3호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 392,
        "name": "4호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 393,
        "name": "4호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 394,
        "name": "4호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "4호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 395,
        "name": "5호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 396,
        "name": "5호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 397,
        "name": "5호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "5호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 398,
        "name": "6호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 399,
        "name": "6호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 400,
        "name": "6호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "6호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 401,
        "name": "7호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 402,
        "name": "7호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 403,
        "name": "7호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "7호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 404,
        "name": "0호차 객실MD1 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD1",
            "먼지농도"
        ]
    },
    {
        "offset": 405,
        "name": "0호차 객실MD2 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD2",
            "먼지농도"
        ]
    },
    {
        "offset": 406,
        "name": "0호차 객실MD3 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "객실MD3",
            "먼지농도"
        ]
    },
    {
        "offset": 407,
        "name": "0호차 운전실MD4 먼지농도",
        "size": 1,
        "description": "",
        "keys": [
            "0호차",
            "운전실MD4",
            "먼지농도"
        ]
    },
    {
        "offset": 410,
        "name": "1호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "1호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 414,
        "name": "1호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "1호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 415,
        "name": "1호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치 설정온도",
        "keys": [
            "1호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 416,
        "name": "2호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "2호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 420,
        "name": "2호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "2호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 421,
        "name": "2호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "2호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 422,
        "name": "3호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "3호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 426,
        "name": "3호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "3호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 427,
        "name": "3호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "3호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 428,
        "name": "4호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "4호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 432,
        "name": "4호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "4호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 433,
        "name": "4호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "4호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 434,
        "name": "5호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "5호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 438,
        "name": "4호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "5호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 439,
        "name": "5호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "5호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 440,
        "name": "6호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "6호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 444,
        "name": "6호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "6호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 445,
        "name": "6호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "6호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 446,
        "name": "7호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "7호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 450,
        "name": "7호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "7호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 451,
        "name": "7호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "7호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 452,
        "name": "0호차 냉난방장치 상태",
        "size": 4,
        "description": "bit0(자동) bit1(OFF) bit2(전난방) bit3(2/3난방) bit4(1/3난방) bit5(U1 전냉방) bit6(U1 반냉방) bit7(U2 전냉방)",
        "keys": [
            "0호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "자동"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "전난방"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "2/3난방"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "1/3난방"
                ]
            },
            {
                "offset": 5,
                "size": 1,
                "keys": [
                    "U1 전냉방"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "U1 반냉방"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "U2 전냉방"
                ]
            },
            {
                "offset": 8,
                "size": 1,
                "keys": [
                    "U2 반냉방"
                ]
            },
            {
                "offset": 9,
                "size": 1,
                "keys": [
                    "U1 환기"
                ]
            },
            {
                "offset": 10,
                "size": 1,
                "keys": [
                    "U2 환기"
                ]
            },
            {
                "offset": 11,
                "size": 1,
                "keys": [
                    "U1 FAD 상태"
                ]
            },
            {
                "offset": 12,
                "size": 1,
                "keys": [
                    "U2 FAD 상태"
                ]
            },
            {
                "offset": 13,
                "size": 1,
                "keys": [
                    "배기 FAN 상태"
                ]
            },
            {
                "offset": 16,
                "size": 1,
                "keys": [
                    "APDK 상태"
                ]
            },
            {
                "offset": 17,
                "size": 1,
                "keys": [
                    "ELFFk 상태"
                ]
            },
            {
                "offset": 18,
                "size": 1,
                "keys": [
                    "LFFK 상태"
                ]
            },
            {
                "offset": 24,
                "size": 1,
                "keys": [
                    "공기정화기 강"
                ]
            },
            {
                "offset": 25,
                "size": 1,
                "keys": [
                    "공기정화기 중"
                ]
            },
            {
                "offset": 26,
                "size": 1,
                "keys": [
                    "공기정화기 약"
                ]
            },
            {
                "offset": 27,
                "size": 1,
                "keys": [
                    "공기정화기 자동"
                ]
            },
            {
                "offset": 28,
                "size": 1,
                "keys": [
                    "공기정화기 OFF"
                ]
            },
            {
                "offset": 30,
                "size": 1,
                "keys": [
                    "APR1 상태"
                ]
            },
            {
                "offset": 31,
                "size": 1,
                "keys": [
                    "APR2 상태"
                ]
            }
        ]
    },
    {
        "offset": 456,
        "name": "0호차 냉난방장치 설정모드",
        "size": 1,
        "description": "bit0~4(설정모드)",
        "keys": [
            "0호차",
            "냉난방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "설정모드"
                ]
            }
        ]
    },
    {
        "offset": 457,
        "name": "0호차 냉난방장치 설정온도",
        "size": 1,
        "description": "1호차 냉난방장치",
        "keys": [
            "0호차",
            "냉난방장치",
            "설정온도"
        ]
    },
    {
        "offset": 458,
        "name": "1호차 운전실 공기실개선장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(OFF) bit6(CAPR1) bit7(CAPR2)",
        "keys": [
            "1호차",
            "운전실",
            "공기실개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "강"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "약"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "CAPR1"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "CAPR2"
                ]
            }
        ]
    },
    {
        "offset": 459,
        "name": "1호차 운전실 냉방장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(환기) bit4(OFF)",
        "keys": [
            "1호차",
            "운전실",
            "냉방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "강"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "약"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "환기"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 460,
        "name": "0호차 운전실 공기실개선장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit4(OFF) bit6(CAPR1) bit7(CAPR2)",
        "keys": [
            "0호차",
            "운전실",
            "공기실개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "강"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "약"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            },
            {
                "offset": 6,
                "size": 1,
                "keys": [
                    "CAPR1"
                ]
            },
            {
                "offset": 7,
                "size": 1,
                "keys": [
                    "CAPR2"
                ]
            }
        ]
    },
    {
        "offset": 461,
        "name": "0호차 운전실 냉방장치",
        "size": 1,
        "description": "bit0(강) bit1(중) bit2(약) bit3(환기) bit4(OFF)",
        "keys": [
            "0호차",
            "운전실",
            "냉방장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "강"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "중"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "약"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "환기"
                ]
            },
            {
                "offset": 4,
                "size": 1,
                "keys": [
                    "OFF"
                ]
            }
        ]
    },
    {
        "offset": 470,
        "name": "1호차 공기청정도",
        "size": 1,
        "description": "1호차 공기청정도",
        "keys": [
            "1호차",
            "공기청정도"
        ]
    },
    {
        "offset": 471,
        "name": "2호차 공기청정도",
        "size": 1,
        "description": "2호차 공기청정도",
        "keys": [
            "2호차",
            "공기청정도"
        ]
    },
    {
        "offset": 472,
        "name": "3호차 공기청정도",
        "size": 1,
        "description": "3호차 공기청정도",
        "keys": [
            "3호차",
            "공기청정도"
        ]
    },
    {
        "offset": 473,
        "name": "4호차 공기청정도",
        "size": 1,
        "description": "4호차 공기청정도",
        "keys": [
            "4호차",
            "공기청정도"
        ]
    },
    {
        "offset": 474,
        "name": "5호차 공기청정도",
        "size": 1,
        "description": "5호차 공기청정도",
        "keys": [
            "5호차",
            "공기청정도"
        ]
    },
    {
        "offset": 475,
        "name": "6호차 공기청정도",
        "size": 1,
        "description": "6호차 공기청정도",
        "keys": [
            "6호차",
            "공기청정도"
        ]
    },
    {
        "offset": 476,
        "name": "7호차 공기청정도",
        "size": 1,
        "description": "7호차 공기청정도",
        "keys": [
            "7호차",
            "공기청정도"
        ]
    },
    {
        "offset": 477,
        "name": "0호차 공기청정도",
        "size": 1,
        "description": "0호차 공기청정도",
        "keys": [
            "0호차",
            "공기청정도"
        ]
    },
    {
        "offset": 478,
        "name": "1호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "1호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 479,
        "name": "2호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "2호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 480,
        "name": "3호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "3호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 481,
        "name": "4호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "4호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 482,
        "name": "5호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "5호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 483,
        "name": "6호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "6호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 484,
        "name": "1호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "7호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    },
    {
        "offset": 485,
        "name": "0호차 공기질개선장치 필터 교체여부",
        "size": 1,
        "description": "bit0(필터1) bit1(필터2) bit2(필터3) bit3(필터4)",
        "keys": [
            "0호차",
            "공기질개선장치"
        ],
        "bitFields": [
            {
                "offset": 0,
                "size": 1,
                "keys": [
                    "필터1"
                ]
            },
            {
                "offset": 1,
                "size": 1,
                "keys": [
                    "필터2"
                ]
            },
            {
                "offset": 2,
                "size": 1,
                "keys": [
                    "필터3"
                ]
            },
            {
                "offset": 3,
                "size": 1,
                "keys": [
                    "필터4"
                ]
            }
        ]
    }
];
