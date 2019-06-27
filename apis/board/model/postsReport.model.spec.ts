import { expect } from 'chai';
import { postsReport } from './postsReport.model';

describe('postsReport 모델', () => {

	let userIndex: number = 1;
	let postsIndex: number = 37;
	let content: string = 'Report!!'

	/*** 테스트 용도로 사용 ***/

	it('createPostsReport', async () => {
		try {
			const result = await postsReport.createPostsReport({
				userIndex: userIndex,
				postsIndex: postsIndex,
				content: content
			});
			expect(result).to.be.eqls({
				userIndex: userIndex,
				postsIndex: postsIndex,
				content: content
			});
		} catch (err) {
			console.error('err', err);
		}
	});

	it('checkPostsReport', async () => {
		const result = await postsReport.checkPostsReport(postsIndex, userIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsReport', async () => {
		const result = await postsReport.getPostsReport();
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsReportByPost', async () => {
		const result = await postsReport.getPostsReportByPost(postsIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsReportByUser', async () => {
		const result = await postsReport.getPostsReportByUser(userIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	const updateContent: string = 'changes content';
	const postsReportIndex: number = 27;
	it('updatePostsReport', async () => {
		const result = await postsReport.updatePostsReport(postsReportIndex, {
			userIndex: userIndex,
			postsIndex: postsIndex,
			content: updateContent
		});
		//console.log(result);
		expect(result).to.be.eqls({
			userIndex: userIndex,
			postsIndex: postsIndex,
			content: updateContent
		});
	});

	it('deletePostsReport', async () => {
		const result = await postsReport.deletePostsReport(postsIndex, userIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});
});