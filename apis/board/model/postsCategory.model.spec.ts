import { expect } from 'chai';
import { postsCategory } from './postsCategory.model';

describe('postsCategory 모델', async () => {
	it('listPostsCategory', async () => {
		const result = await postsCategory.listPostsCategory();
		// console.log(result);
		expect(result).to.instanceof(Array);
	})
});