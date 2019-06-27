import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantImage } from './restaurantImage.model';

describe('restaurantImage 모델', () => {
	let restaurantIndex;
	let restaurantImageIndex;

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

	it('createRestaurantImage', async () => {
		const result: any = await restaurantImage.createRestaurantImage({
			restaurantIndex: restaurantIndex,
			url: 'https://goo.gl/maps/L3MtsMtV6r1/test'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listRestaurantImage', async () => {
		const result: any = await restaurantImage.listRestaurantImage();
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listRestaurantImagesByRestaurantIndex', async () => {
		const result: any = await restaurantImage.listRestaurantImagesByRestaurantIndex(restaurantIndex);
		//console.log(result);
		restaurantImageIndex = result[0].restaurantImageIndex;
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantImage', async () => {
		const result: any = await restaurantImage.getRestaurantImage(restaurantImageIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateRestaurantImage', async () => {
		const result: any = await restaurantImage.updateRestaurantImage(restaurantImageIndex, {
			restaurantIndex: restaurantIndex,
			url: 'https://goo.gl/maps/L3MtsMtV6r1/test/update'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurantImage', async () => {
		const result: any = await restaurantImage.deleteRestaurantImage(restaurantImageIndex);
		//console.log(result);
		expect(result).to.instanceof(Object);
	});
});