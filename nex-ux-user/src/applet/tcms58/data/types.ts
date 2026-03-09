// types.ts

// 1. 헤더 (모니터링_헤더.csv 기준)
export interface PacketHeader {
  stx: number;          // 예: 0x02 (1 byte)
  messageId: number;    // 예: 0x1001 (2 bytes)
  payloadLength: number;// 페이로드 길이 (2 bytes 또는 4 bytes)
}

// 2. 모니터링 정보 (모니터링_정보.csv 기준)
export interface MonitoringInfo {
  deviceId: string;     // 문자열 ID (예: 8 bytes)
  voltage: number;      // 전압 (Float32, 4 bytes)
  current: number;      // 전류 (Float32, 4 bytes)
  temperature: number;  // 온도 (Int16, 2 bytes)
}

// 3. 실시간 고장 정보 (모니터링_실시간 고장.csv 기준)
// 바이너리의 특정 비트(Bit)가 1이면 고장, 0이면 정상으로 처리합니다.
export interface FaultStatus {
  isOverVoltage: boolean;  // 0번 비트
  isOverCurrent: boolean;  // 1번 비트
  isOverTemp: boolean;     // 2번 비트
  isCommError: boolean;    // 3번 비트
}

// 최종 패킷 구조 (모니터링_데이터_구조.csv 기준)
export interface MonitoringPacket {
  header: PacketHeader;
  info: MonitoringInfo;
  faults: FaultStatus;
}



