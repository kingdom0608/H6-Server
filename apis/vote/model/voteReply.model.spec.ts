import { expect } from 'chai';
import { user } from '../../user/model/user.model';
import { vote } from './vote.model';
import { voteReply } from './voteReply.model';

describe('voteReplyModel 모델', () => {
	let testVoteReplyIndex: number;
	let testParentsVoteReplyIndex: number;
	let testVoteTopicIndex: number;
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

	it('createVoteReply', async () => {
		const voteUser = await user.getUser('kingdom0608@gmail.com');
		const result: any = await voteReply.createVoteReply({
			voteTopicIndex: testVoteTopicIndex,
			parentsVoteReplyIndex: 1,
			userIndex: voteUser[0].userIndex,
			content: '투표 댓글',
			status: 'ACTIVE'
		});
		// console.log(result);
		delete result.voteTopicIndex;
		delete result.userIndex;
		expect(result).to.eqls({
			parentsVoteReplyIndex: 1,
			content: '투표 댓글',
			status: 'ACTIVE'
		});
	});

	it('listVoteReply', async () => {
		const result: any = await voteReply.listVoteReply(testVoteTopicIndex);
		// console.log(result);
		testVoteReplyIndex = result[0].voteReplyIndex;
		testParentsVoteReplyIndex = result[0].parentsVoteReplyIndex;
		delete result[0].voteReplyIndex;
		delete result[0].voteTopicIndex;
		delete result[0].userIndex;
		delete result[0].createdAt;
		delete result[0].updatedAt;
		expect(result).to.eqls([{
			parentsVoteReplyIndex: 1,
			content: '투표 댓글',
			status: 'ACTIVE',
			userNickName: 'jade'
		}]);
	});

	it('listChildVoteReply', async () => {
		const result: any = await voteReply.listChildVoteReply(testParentsVoteReplyIndex);
		// console.log(result);
		delete result[0].voteReplyIndex;
		delete result[0].voteTopicIndex;
		delete result[0].userIndex;
		delete result[0].createdAt;
		delete result[0].updatedAt;
		expect(result).to.eqls([{
			parentsVoteReplyIndex: 1,
			content: '투표 댓글',
			status: 'ACTIVE',
			userNickName: 'jade'
		}]);
	});

	it('pageListVoteReply', async () => {
		const result = await voteReply.pageListVoteReply(testVoteTopicIndex, 1, 10);
		// console.log(result);
		delete result[0].voteReplyIndex;
		delete result[0].voteTopicIndex;
		delete result[0].userIndex;
		delete result[0].createdAt;
		delete result[0].updatedAt;
		expect(result).to.eqls([{
			parentsVoteReplyIndex: 1,
			content: '투표 댓글',
			status: 'ACTIVE',
			userNickName: 'jade'
		}]);
	});

	it('pageListChildVoteReply', async () => {
		const result = await voteReply.pageListChildVoteReply(testParentsVoteReplyIndex, 1, 10);
		// console.log(result);
		delete result[0].voteReplyIndex;
		delete result[0].voteTopicIndex;
		delete result[0].userIndex;
		delete result[0].createdAt;
		delete result[0].updatedAt;
		expect(result).to.eqls([{
			parentsVoteReplyIndex: 1,
			content: '투표 댓글',
			status: 'ACTIVE',
			userNickName: 'jade'
		}]);
	});

	it('updateVoteReply', async () => {
		const result = await voteReply.updateVoteReply(testVoteReplyIndex, {
			content: '투표 댓글 업데이트'
		});
		// console.log(result);
		expect(result).to.eqls({
			content: '투표 댓글 업데이트'
		});
	});

	it('deleteVoteReply', async () => {
		const result = await voteReply.deleteVoteReply(testVoteReplyIndex);
		// console.log(result);
		expect(result).instanceof(Object);
	});
});