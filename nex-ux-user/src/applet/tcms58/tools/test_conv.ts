import { tcms58MonitoringDataDefs } from './dataDefs';
import { convertTrainBinaryToJson } from './dataConv';
import * as fs from 'fs';

const buffer = new Uint8Array(520);
const view = new DataView(buffer.buffer);

for (let i = 0; i < buffer.length; i++) {
    buffer[i] = i % 256;
}

view.setUint16(0, 4660, false);
view.setUint8(8, 18); // 호선차량조성정보 모의 (0001 0010: bit4~7은 1, bit0~1은 2)
view.setUint16(10, 120, false);
view.setUint8(44, 50);
view.setUint8(45, 30);

// 테스트용 시간 (포맷팅 증명)
view.setUint8(2, 22); // YY (2022)
view.setUint8(3, 11); // MM (11)
view.setUint8(4, 25); // DD (25)
view.setUint8(5, 14); // hh (14)
view.setUint8(6, 30); // mm (30)
view.setUint8(7, 45); // ss (45)

// 테스트용 K1314 주입
view.setUint8(18, 75); // 'K'
view.setUint16(19, 0x1314, false); // BCD encoded 1314

const jsonData = convertTrainBinaryToJson(buffer, tcms58MonitoringDataDefs);
fs.writeFileSync('out.json', JSON.stringify(jsonData, null, 2), 'utf-8');

console.log('out.json 생성 완료.');
