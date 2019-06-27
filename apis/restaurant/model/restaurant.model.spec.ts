import { expect } from 'chai';
import { restaurant } from './restaurant.model';

describe('restaurant 모델', async () => {
	let resultRestaurant;

	it('createRestaurant', async () => {
		const result = await restaurant.createRestaurant({
			restaurantCategoryIndex: 1,
			name: '영웅분식',
			address: '서울시 성북구 삼선교로 10바길 38',
			locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
			tel: '02-760-2341',
			openingHours: '10:00 - 19:00',
			review: '음식이 전체적으로 좀 짜요.',
			goodCount: 0
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getRestaurantByName', async () => {
		const result = await restaurant.getRestaurantByName('영웅분식');
		// console.log(result);
		resultRestaurant = result;
		expect(result).to.instanceof(Array);
	});

	it('listRestaurant', async () => {
		const result = await restaurant.listRestaurant();
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListRestaurant', async () => {
		const result = await restaurant.pageListRestaurant(`restaurantCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateRestaurant', async () => {
		const result: any = await restaurant.updateRestaurant(resultRestaurant[0].restaurantIndex, {
			restaurantCategoryIndex: 1,
			name: '미스터돈가스',
			address: '서울시 성북구 삼선교로 10바길 38',
			locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
			tel: '02-760-2341',
			openingHours: '10:00 - 19:00',
			review: '이젠 돈가스 팔아요',
			goodCount: 0
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurant', async () => {
		const result = await restaurant.deleteRestaurant(resultRestaurant[0].restaurantIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})
});