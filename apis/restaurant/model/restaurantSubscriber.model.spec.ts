import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantSubscriber } from './restaurantSubscriber.model';

describe('restaurantSubscriber 모델', () => {
	let restaurantIndex;

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
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result: any = await restaurant.deleteRestaurant(restaurantIndex);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createRestaurantSubscriber', async () => {
		const result: any = await restaurantSubscriber.createRestaurantSubscriber({
			userIndex: 1,
			restaurantIndex: restaurantIndex,
			isGood: 1
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getRestaurantSubscriber', async () => {
		const result: any = await restaurantSubscriber.getRestaurantSubscriber(1, restaurantIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantSubscriberSumCount', async () => {
		const result: any = await restaurantSubscriber.getRestaurantSubscriberSumCount(restaurantIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateRestaurantSubscriber', async () => {
		const result: any = await restaurantSubscriber.updateRestaurantSubscriber(1, restaurantIndex, {
			isGood: 0
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurantSubscriber', async () => {
		const result: any = await restaurantSubscriber.deleteRestaurantSubscriber(1, restaurantIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});
});