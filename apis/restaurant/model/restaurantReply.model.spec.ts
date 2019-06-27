import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantReply } from './restaurantReply.model';

describe('restaurantReply 모델', () => {
	let restaurantIndex;
	let resultRestaurantReply;
	let restaurantReplyIndex;

	before(async () => {
		try {
			await restaurant.createRestaurant({
				restaurantCategoryIndex: 1,
				name: 'Hyo',
				address: '서울시',
				locationUrl: '0',
				tel: '000-000-000',
				openingHours: ' 11:30 - 15:00 , 17:00 - 22:00 (일 휴무)',
				review: '테스트 리뷰',
				goodCount: '0'
			});

			const result: any = await restaurant.getRestaurantByName('Hyo');
			restaurantIndex = result[0].restaurantIndex;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result: any = await restaurant.deleteRestaurant(restaurantIndex);
			// console.log(result);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createRestaurantReply', async () => {
		resultRestaurantReply = {
			restaurantIndex,
			userIndex: 1,
			content: '테스트 게시글 댓글',
			status: 'ACTIVE'
		}
		const result: any = await restaurantReply.createRestaurantReply(resultRestaurantReply);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listRestaurantReply', async () => {
		const result: any = await restaurantReply.listRestaurantReply(restaurantIndex);
		restaurantReplyIndex = result[0].restaurantReplyIndex;
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListRestaurantReply', async () => {
		const result: any = await restaurantReply.pageListRestaurantReply(restaurantIndex, 0, 5);
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantReply', async () => {
		const result: any = await restaurantReply.getRestaurantReply(restaurantReplyIndex);
		// console.log(result[0]);
		expect(result).to.instanceof(Object);
	});

	it('updateRestaurantReply', async () => {
		const result: any = await restaurantReply.updateRestaurantReply(restaurantReplyIndex, {
			content: '업데이트 테스트 게시글 댓글 내용'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurantReply', async () => {
		const result: any = await restaurantReply.deleteRestaurantReply(restaurantReplyIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

});
