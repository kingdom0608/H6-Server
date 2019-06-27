import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantMenu } from './restaurantMenu.model';

describe('restaurantMenu 모델', () => {
	let restaurantIndex;
	let restaurantMenuIndex;

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
			//console.log(result);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createRestaurantMenu', async () => {
		const result: any = await restaurantMenu.createRestaurantMenu({
			restaurantIndex: restaurantIndex,
			name: '순대국',
			price: 6000,
			imageUrl: '://goo.gl/maps/L3MtsMtV6r1'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listRestaurantMenus', async () => {
		const result: any = await restaurantMenu.listRestaurantMenus();
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listRestaurantMenusByRestaurantIndex', async () => {
		const result: any = await restaurantMenu.listRestaurantMenusByRestaurantIndex(restaurantIndex);
		//console.log(result);
		restaurantMenuIndex = result[0].restaurantMenuIndex;
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantMenu', async () => {
		const result: any = await restaurantMenu.getRestaurantMenu(restaurantMenuIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantPriorityMenus', async () => {
		const testRestaurantIndex: number = 40;
		const result: any = await restaurantMenu.getRestaurantPriorityMenus(testRestaurantIndex);
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateRestaurantMenu', async () => {
		const result: any = await restaurantMenu.updateRestaurantMenu(restaurantMenuIndex, {
			restaurantIndex: restaurantIndex,
			name: '순대국',
			price: 7000,
			imageUrl: '://goo.gl/maps/L3MtsMtV6r1'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurantMenu', async () => {
		const result: any = await restaurantMenu.deleteRestaurantMenu(restaurantMenuIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});
});