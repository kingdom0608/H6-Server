import { expect } from 'chai';
import { posts } from './posts.model';

describe('posts 모델', async () => {
	let resultPosts;

	it('createPosts', async () => {
		const result: any = await posts.createPosts({
			userIndex: 1,
			postsCategoryIndex: 1,
			title: '테스트 게시글 제목',
			content: '테스트 게시글 내용',
			status: 'ACTIVE'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listPosts', async () => {
		const result: any = await posts.listPosts(`postsCategoryIndex eq 1`);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListPosts', async () => {
		const result: any = await posts.pageListPosts(`postsCategoryIndex eq 1 AND title like 테스트`, `createdAt ASC`, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listPostsByIsScrap', async () => {
		const result: any = await posts.listPostsByIsScrap(1, `postsCategoryIndex eq 1`);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListPostsByIsScrap', async () => {
		const result: any = await posts.pageListPostsByIsScrap(1, `postsCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listPostsByUserIndex', async () => {
		const result: any = await posts.listPostsByUserIndex(1, `postsCategoryIndex eq 1`);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListPostsByUserIndex', async () => {
		const result: any = await posts.pageListPostsByUserIndex(1, `postsCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsByTitle', async () => {
		const result: any = await posts.getPostsByTitle('테스트 게시글 제목');
		// console.log(result);
		resultPosts = result;
		expect(result).to.instanceof(Object);
	});

	it('getPostsByUserIndex', async () => {
		const result: any = await posts.getPostsByUserIndex(1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getPosts', async () => {
		const result: any = await posts.getPosts(resultPosts[0].postsIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updatePosts', async () => {
		const result: any = await posts.updatePosts(resultPosts[0].postsIndex, {
			content: '업데이트 테스트 게시글 내용'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deletePosts', async () => {
		const result: any = await posts.deletePosts(resultPosts[0].postsIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});
