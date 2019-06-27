import { expect } from 'chai';
import { posts } from './posts.model';
import { postsSubscriber } from './postsSubscriber.model';

describe('postsSubscriber', () => {
	let resultPosts;

	before(async () => {
		try {
			await posts.createPosts({
				userIndex: 1,
				postsCategoryIndex: 1,
				title: '테스트 게시글 제목',
				content: '테스트 게시글 내용'
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

	it('createPostsSubscriber', async () => {
		const result: any = await postsSubscriber.createPostsSubscriber({
			postsIndex: resultPosts[0].postsIndex,
			userIndex: 1,
			isGood: true,
			isBad: false,
			isScrap: true
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('createPostsSubscriber2', async () => {
		const result: any = await postsSubscriber.createPostsSubscriber({
			postsIndex: resultPosts[0].postsIndex,
			userIndex: 2,
			isGood: true,
			isBad: false,
			isScrap: false
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getPostsSubscriber', async () => {
		const result: any = await postsSubscriber.getPostsSubscriber(resultPosts[0].postsIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsSubscriberByUserIndex', async () => {
		const result: any = await postsSubscriber.getPostsSubscriberByUserIndex(resultPosts[0].postsIndex, 1);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updatePostsSubscriber', async () => {
		const result: any = await postsSubscriber.updatePostsSubscriber(resultPosts[0].postsIndex, 1, {
			isBad: true
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deletePostsSubscriber', async () => {
		const result: any = await postsSubscriber.deletePostsSubscriber(resultPosts[0].postsIndex, 1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});