import { expect } from 'chai';
import { lecture } from './lecture.model';

describe('lecture 모델', () => {
	let testLectureIndex: any;
	let testLectureCode: string = 'IDE001';
	let testLectureName: string = 'Node.js';
	let testTrack: string = '영미문학문화 트랙';

	before(async () => {
		try {
			/** lecture 생성 */
			const resultCreateLecture = await lecture.createLecture({
				lectureCode: testLectureCode,
				lectureName: testLectureName,
				track: testTrack
			});
			/** validation 체크 */
			expect(resultCreateLecture).instanceof(Object);
			/** lecture lectureCode 조회 */
			const resultGetLectureByLectureCode = await lecture.getLectureByLectureCode(testLectureCode);
			/** validation 체크 */
			expect(resultGetLectureByLectureCode).to.instanceof(Array);
			/** lecture 칼럼 값 */
			const lectureData: any = resultGetLectureByLectureCode;
			testLectureIndex = lectureData[0].lectureIndex;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result = await lecture.deleteLecture(testLectureIndex);
			expect(result).instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	/** 테스트 용도로 사용 */
	// it('createLecture', async () => {
	// 	const result = await lecture.createLecture({
	// 		lectureCode: 'IDE0001',
	// 		lectureName: 'Node.js',
	// 		professorIndex: 3,
	// 		track: 'IT'
	// 	});
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });

	it('listLecture', async () => {
		const result = await lecture.listLecture();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByLectureIndex', async () => {
		const result = await lecture.getLectureByLectureIndex(testLectureIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByLectureCode', async () => {
		const result = await lecture.getLectureByLectureCode(testLectureCode);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByLectureName', async () => {
		const result = await lecture.getLectureByLectureName(testLectureName);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByTrack', async () => {
		const result = await lecture.getLectureByTrack(testTrack);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateLecture', async () => {
		const result = await lecture.updateLecture(testLectureIndex, {
			lectureCode: 'IDE0002',
			lectureName: 'Node.js 실습'
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	/** 테스트 용도로 사용 */
	// it('deleteLecture', async () => {
	// 	const result = await lecture.deleteLecture(testLectureIndex);
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// })
});