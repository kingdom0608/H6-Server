import { expect } from 'chai';
import { posts } from './posts.model';
import { postsImage, PostsImageData } from './postsImage.model';

describe('postsImage 모델', () => {
	const userIndex: number = 1;
	let postsIndex: number = undefined;

	before(async () => {
		try {
			await posts.createPosts({
				userIndex,
				postsCategoryIndex: 1,
				title: '테스트 게시글 이미지 업로드',
				content: '테스트 게시글 이미지 업로드 내용',
				status: 'ACTIVE'
			});

			const result = await posts.getPostsByTitle('테스트 게시글 이미지 업로드');
			postsIndex = result[0].postsIndex;

		} catch (err) {
			console.error('postsImage before ', err);
		}
	});

	after(async () => {
		try {
			const result: any = await posts.deletePosts(postsIndex)
			//console.log(result);
		} catch (err) {
			console.error('postsImage after ', err);
		}
	});

	it('createPostsImage', async () => {
		const arr = [];
		arr.push('https://goo.gl/maps/L3MtsMtV6r1/test1');
		arr.push('https://goo.gl/maps/L3MtsMtV6r1/test2');
		const data = {
			image: arr
		}
		const result: PostsImageData | string = await postsImage.createPostsImage({
			postsIndex,
			path: JSON.stringify(data)
		});
		//console.log('create ', typeof result);
		expect(result).to.instanceof(Object);
	});

	it('getPostsImage', async () => {
		const result: any = await postsImage.getPostsImage(postsIndex);
		//console.log('get ', typeof result);
		expect(result).to.instanceOf(Object);
	});

	it('updatePostsImage', async () => {
		const data = {
			image: ['https://goo.gl/maps/L3MtsMtV6r1/test3', 'https://goo.gl/maps/L3MtsMtV6r1/test4']
		}
		const result: PostsImageData | string = await postsImage.updatePostsImage(postsIndex, {
			postsIndex,
			path: JSON.stringify(data)
		});
		//console.log('update ', typeof result);
		expect(result).to.instanceof(Object);
	});

	it('deletePostsImage', async () => {
		const result: any = await postsImage.deletePostsImage(postsIndex);
		//console.log('delete ', typeof result);
		expect(result).to.instanceof(Object);
	});

	it('createRemovedPostsImage', async () => {
		const path = [];
		path.push('https://goo.gl/maps/L3MtsMtV6r1/test1');
		path.push('https://goo.gl/maps/L3MtsMtV6r1/test2');
		const data = {
			image: path
		};
		const result: any = await postsImage.createPostsRemovedImage({
			postsIndex,
			path: JSON.stringify(data)
		});
	});
});
