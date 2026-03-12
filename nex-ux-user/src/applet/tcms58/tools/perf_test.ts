import { tcms58MonitoringDataDefs } from './dataDefs';
import { convertTrainBinaryToJson } from './dataConv';

const ITERATIONS = 1000;
const BUFFER_SIZE = 567;

// 1. 샘플 데이터 1000개 미리 생성 (테스트 시각 측정에서 생성 시간은 제외하기 위함)
console.log(`Generating ${ITERATIONS} sample buffers of ${BUFFER_SIZE} bytes...`);
const testBuffers: Uint8Array[] = [];

for (let i = 0; i < ITERATIONS; i++) {
    const buffer = new Uint8Array(BUFFER_SIZE);
    const view = new DataView(buffer.buffer);

    // 랜덤 데이터 주입
    for (let j = 0; j < buffer.length; j++) {
        buffer[j] = Math.floor(Math.random() * 256);
    }

    // 필수 데이터 (안전을 위해)
    view.setUint16(0, i, false); // 일련번호
    view.setUint8(44, 50); // 역행
    view.setUint8(45, 30); // 제동
    view.setUint8(2, 24); // YY
    view.setUint8(3, 10); // MM
    view.setUint8(4, 25); // DD

    testBuffers.push(buffer);
}

// 2. 변환 속도 측정
console.log(`Starting performance benchmark for ${ITERATIONS} conversions...`);
const startTime = performance.now();

for (let i = 0; i < ITERATIONS; i++) {
    convertTrainBinaryToJson(testBuffers[i], tcms58MonitoringDataDefs);
}

const endTime = performance.now();
const durationMs = endTime - startTime;

console.log(`\n===== Benchmark Results =====`);
console.log(`Total items processed : ${ITERATIONS}`);
console.log(`Total time elapsed    : ${durationMs.toFixed(2)} ms`);
console.log(`Average time per item : ${(durationMs / ITERATIONS).toFixed(3)} ms`);
console.log(`Items per second      : ${((ITERATIONS / durationMs) * 1000).toFixed(0)}`);
console.log(`=============================\n`);
