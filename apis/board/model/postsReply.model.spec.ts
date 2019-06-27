import { expect } from 'chai';
import { posts } from './posts.model';
import { postsReply } from './postsReply.model';

describe('postsReply 모델', () => {
	let resultPosts;
	let resultPostsReply;

	before(async () => {
		try {
			await posts.createPosts({
				userIndex: 1,
				postsCategoryIndex: 1,
				title: '테스트 게시글 제목',
				content: '테스트 게시글 내용',
				status: 'ACTIVE'
			});

			const result: any = await posts.getPostsByTitle('테스트 게시글 제목');
			resultPosts = result;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result: any = await posts.deletePosts(resultPosts[0].postsIndex);
			// console.log(result);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createPostsReply', async () => {
		const result: any = await postsReply.createPostsReply({
			postsIndex: resultPosts[0].postsIndex,
			parentsPostsReplyIndex: null,
			userIndex: 1,
			content: '테스트 게시글 댓글',
			status: 'ACTIVE'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listPostsReply', async () => {
		const result: any = await postsReply.listPostsReply(resultPosts[0].postsIndex);
		resultPostsReply = result;
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListPostsReply', async () => {
		const result: any = await postsReply.pageListPostsReply(resultPosts[0].postsIndex, 1, 1);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsReply', async () => {
		const result: any = await postsReply.getPostsReply(resultPostsReply[0].postsReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updatePostsReply', async () => {
		const result: any = await postsReply.updatePostsReply(resultPostsReply[0].postsReplyIndex, {
			content: '업데이트 테스트 게시글 댓글 내용'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deletePostsReply', async () => {
		const result: any = await postsReply.deletePostsReply(resultPostsReply[0].postsReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteChildPostsReply', async () => {
		const result: any = await postsReply.deleteChildPostsReply(resultPostsReply[0].postsReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});
