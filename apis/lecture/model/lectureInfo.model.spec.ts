import { expect } from 'chai';
import { lectureInfo } from './lectureInfo.model';

describe('lectureInfo 모델', () => {
	it('createLectureInfo', async () => {
		const result = await lectureInfo.createLectureInfo({
			lectureIndex: 11,
			professorIndex: 3,
			textbookIndex: null,
			average: 0
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listLectureInfo', async () => {
		const result = await lectureInfo.listLectureInfo();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListLectureInfo', async () => {
		const result = await lectureInfo.pageListLectureInfo(3, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listLectureInfoBySearchTerm', async () => {
		const result = await lectureInfo.listLectureInfoBySearchTerm('os');
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListLectureInfoBySearchTerm', async () => {
		const result = await lectureInfo.pageListLectureInfoBySearchTerm('os', 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureInfoByLectureInfoIndex', async () => {
		const result = await lectureInfo.getLectureInfoByLectureInfoIndex(1);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listLectureInfoByLectureName', async () => {
		const result = await lectureInfo.listLectureInfoByLectureName('os');
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureInfoByLectureName', async () => {
		const result = await lectureInfo.pageListLectureInfoByLectureName('os', 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listLectureInfoByProfessorName', async () => {
		const result = await lectureInfo.listLectureInfoByProfessorName('안재성');
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureInfoByProfessorName', async () => {
		const result = await lectureInfo.pageListLectureInfoByProfessorName('안재성', 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateLectureInfo', async () => {
		const result = await lectureInfo.updateLectureInfo(2, {
			average: 2
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updateLectureInfoAverage', async () => {
		const result = await lectureInfo.updateLectureInfoAverage(2, 1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteLectureInfo', async () => {
		const result = await lectureInfo.deleteLectureInfo(6);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});