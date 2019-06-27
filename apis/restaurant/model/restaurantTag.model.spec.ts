import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantTag } from './restaurantTag.model';

describe('restaurantTag 모델', () => {
	let restaurantIndex;
	let restaurantTagIndex;

	before(async () => {
		try {
			await restaurant.createRestaurant({
				restaurantCategoryIndex: 1,
				name: '테스트푸드',
				address: '성북구 삼선교로',
				locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
				tel: '02-760-1234',
				openingHours: '10:00 - 17:00',
				review: '괜츈'
			});

			const result: any = await restaurant.getRestaurantByName('테스트푸드');
			restaurantIndex = result[0].restaurantIndex;
		} catch (err) {
			//console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result: any = await restaurant.deleteRestaurant(restaurantIndex);
			//console.log(result);
		} catch (err) {
			console.error('err', err);
		}
	});

	const tag: string = 'testTag';
	it('createRestaurantTag', async () => {
		const result: any = await restaurantTag.createRestaurantTag({
			restaurantIndex: restaurantIndex,
			tag: tag
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getRestaurantTag', async () => {
		const result: any = await restaurantTag.getRestaurantTag(restaurantIndex);
		//console.log(tag);
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantTagByTag', async () => {
		const result: any = await restaurantTag.getRestaurantTagByTag(tag);
		restaurantTagIndex = result[0].restaurantTagIndex;
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('deleteRestaurantTag', async () => {
		const result: any = await restaurantTag.deleteRestaurantTag(restaurantTagIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

});