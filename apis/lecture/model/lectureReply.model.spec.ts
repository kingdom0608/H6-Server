import { expect } from 'chai';
import { lectureReply } from './lectureReply.model';

describe('lectureReply 모델', () => {
	let testLectureReplyIndex: any;
	let testLectureInfoIndex: any;
	let testUserIndex: any;
	let testUserId: any;
	let testUserNickName: any;

	before(async () => {
		try {
			const result = await lectureReply.createLectureReply({
				lectureInfoIndex: 179,
				userIndex: 1,
				semester: '17년도 2학기',
				homework: '보통',
				homeworkType: '팀 프로젝트',
				testCount: 2,
				receivedGrade: 'A',
				review: '노광현 교수님 휴강이 많지만 좋아요',
				score: 4
			});
			/** validation 체크 */
			expect(result).to.instanceof(Object);
			/** lectureReply lectureInfoIndex 조회 */
			const resultListLectureReplyByLectureInfoIndex = await lectureReply.listLectureReplyByLectureInfoIndex(179);
			/** validation 체크 */
			expect(resultListLectureReplyByLectureInfoIndex).to.instanceof(Array);
			/** lectureReply 칼럼 값 */
			const lectureReplyData: any = resultListLectureReplyByLectureInfoIndex;
			testLectureReplyIndex = lectureReplyData[0].lectureReplyIndex;
			testLectureInfoIndex = lectureReplyData[0].lectureInfoIndex;
			testUserIndex = lectureReplyData[0].userIndex;
			testUserId = lectureReplyData[0].userId;
			testUserNickName = lectureReplyData[0].userNickName;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result = await lectureReply.deleteLectureReply(testLectureReplyIndex);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	/** 테스트 용도로 사용 */
	// it('createLectureReply', async () => {
	// 	const result = await lectureReply.createLectureReply({
	// 		lectureInfoIndex: 1,
	// 		userIndex: 9,
	// 		semester: '17년도 2학기',
	// 		homework: '보통',
	// 		homeworkType: 1,
	// 		testCount: 2,
	// 		receivedGrade: 2,
	//    review: '노광현 교수님 휴강이 많지만 좋아요',
	// 		score: 4
	// 	});
	// 	console.log(result);
	// 	expect(result).to.instanceof(Object);
	// });

	it('scoreGetLectureReply', async () => {
		const result = await lectureReply.scoreGetLectureReply(testLectureInfoIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('countGetLectureReplyByLectureInfoIndex', async () => {
		const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(187);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	/** 리플을 이미 남겼기 때문에 오류 발생 */
	it('checkGetLectureReply', async () => {
		const result = await lectureReply.checkGetLectureReply(testLectureInfoIndex, 0);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('checkUpdateLectureReply', async () => {
		const result = await lectureReply.checkUpdateLectureReply(testLectureInfoIndex, testUserIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listLectureReply', async () => {
		const result = await lectureReply.listLectureReply();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListLectureReply', async () => {
		const result = await lectureReply.pageListLectureReply(1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByLectureReplyIndex', async () => {
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(testLectureReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByLectureReplyIndex', async () => {
		const result = await lectureReply.pageGetLectureReplyByLectureReplyIndex(testLectureReplyIndex, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByLectureInfoIndex', async () => {
		const result = await lectureReply.listLectureReplyByLectureInfoIndex(testLectureInfoIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByLectureInfoIndex', async () => {
		const result = await lectureReply.pageListLectureReplyByLectureInfoIndex(testLectureInfoIndex, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyUserIndex', async () => {
		const result = await lectureReply.getLectureReplyByUserIndex(testUserIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyUserIndex', async () => {
		const result = await lectureReply.pageGetLectureReplyByUserIndex(testUserIndex, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyUserId', async () => {
		const result = await lectureReply.listLectureReplyByUserId(testUserId);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByUserId', async () => {
		const result = await lectureReply.pageListLectureReplyByUserId(testUserId, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByUserNickName', async () => {
		const result = await lectureReply.listLectureReplyByUserNickName(testUserNickName);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByUserNickName', async () => {
		const result = await lectureReply.pageListLectureReplyByUserNickName(testUserNickName, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateLectureReply', async () => {
		const result = await lectureReply.updateLectureReply(testLectureReplyIndex, {
			receivedGrade: 1,
			review: '노광현 교수님 수업은 재매있지만 휴강이 많아요ㅠㅠㅠ',
			score: 1
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	/** 테스트 용도로 사용 */
	// it('deleteLectureReply', async () => {
	// 	const result = await lectureReply.deleteLectureReply(2);
	// 	// console.log(result);
	// 	expect(result).to.instanceof(Object);
	// });

	/** 테스트 용도로 사용 */
	// it('deleteLectureReplyByUserIndex', async () => {
	// 	const result = await lectureReply.deleteLectureReplyByUserIndex(9);
	// 	// console.log(result);
	// 	expect(result).to.instanceof(Object);
	// });
});
