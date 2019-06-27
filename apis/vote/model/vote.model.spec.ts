import { expect } from 'chai';
import { user } from '../../user/model/user.model';
import { vote } from './vote.model';

describe('vote 모델', () => {
	let testVoteTopicIndex: number;
	let testVoteItemIndex: number;
	let testVoteItemIndex2: number;
	let testVoteTopicName: string = '한성대학교를 상징하는 동물은 무엇입니까?';

	before(async () => {
		try {
			/** voteTopic 생성 */
			const result = await vote.createVoteTopic({
				topicName: testVoteTopicName,
				status: 'ACTIVE',
				dueDate: '2018-07-01'
			});
			/** validation 체크 */
			expect(result).instanceof(Object);
			/** voteTopic topicName 조회 */
			const resultVoteTopicByTopicName = await vote.getVoteTopicByTopicName(testVoteTopicName);
			/** validation 체크 */
			expect(resultVoteTopicByTopicName).to.instanceof(Array);
			testVoteTopicIndex = resultVoteTopicByTopicName[0].voteTopicIndex;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result = await vote.deleteVoteTopic(testVoteTopicIndex);
			// console.log(result);
			expect(result).instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	/** 테스트 용도로 사용 */
	// it('createVoteTopic', async () => {
	// 	const result = await vote.createVoteTopic({
	// 		topicName: testVoteTopicName
	// 	});
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });

	it('createVoteItem', async () => {
		const result = await vote.createVoteItem({
			voteTopicIndex: testVoteTopicIndex,
			itemName: '호랑이',
			itemOrder: 1
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('createVoteItem2', async () => {
		const result = await vote.createVoteItem({
			voteTopicIndex: testVoteTopicIndex,
			itemName: '거북이',
			itemOrder: 2
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('getVoteTopicByTopicIndex', async () => {
		const result = await vote.getVoteTopicByTopicIndex(testVoteTopicIndex);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('listVotePastTopic', async () => {
		const result = await vote.listVotePastTopic();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListVotePastTopic', async () => {
		const result = await vote.pageListVotePastTopic(1, 3);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('listVoteItemIndex', async () => {
		const result = await vote.listVoteItemIndex(testVoteTopicIndex);
		// console.log(result);
		testVoteItemIndex = result[0].voteItemIndex;
		testVoteItemIndex2 = result[1].voteItemIndex;
		expect(result).instanceof(Array);
	});

	it('createVoteUser', async () => {
		const voteUser = await user.getUser('kingdom0608@gmail.com');
		const result = await vote.createVoteUser({
			voteTopicIndex: testVoteTopicIndex,
			voteItemIndex: testVoteItemIndex,
			userIndex: voteUser[0].userIndex
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('createVoteUser2', async () => {
		const voteUser = await user.getUser('tlswnsxo@naver.com');
		const result = await vote.createVoteUser({
			voteTopicIndex: testVoteTopicIndex,
			voteItemIndex: testVoteItemIndex2,
			userIndex: voteUser[0].userIndex
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('listVoteItem', async () => {
		const result = await vote.listVoteItem(testVoteTopicIndex, testVoteItemIndex);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('getVoteItem', async () => {
		const result = await vote.getVoteItem(testVoteItemIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getVoteTopic', async () => {
		const result = await vote.getVoteTopic();
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getVoteTopicByStatus', async () => {
		const result = await vote.getVoteTopicByStatus('ACTIVE');
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getVoteUser', async () => {
		const result = await vote.getVoteUser(testVoteTopicIndex, testVoteItemIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getVoteDateDiff', async () => {
		const result = await vote.getVoteDateDiff('2018-07-16T21:28:00+0900', '2018-07-15T21:28:00+0900');
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listVoteUser', async () => {
		const result = await vote.listVoteUser(testVoteTopicIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('checkVote', async () => {
		const voteUser = await user.getUser('kingdom0608@gmail.com');
		const result = await vote.checkVote(testVoteTopicIndex, voteUser[0].userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getVoteUser2', async () => {
		const result = await vote.getVoteUser(testVoteTopicIndex, testVoteItemIndex2);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateVoteTopic', async () => {
		const result = await vote.updateVoteTopic(36, {
			status: 'INACTIVE'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	/** 테스트 용도로 사용 */
	// it('deleteVoteTopic', async () => {
	// 	const result = await vote.deleteVoteTopic(testVoteTopicIndex);
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });
});
