import { expect } from 'chai';
import { restaurantCategory } from './restaurantCategory.model';

describe('restaurantCategory 모델', async () => {
	it('listRestaurantCategory', async () => {
		const result = await restaurantCategory.listRestaurantCategory();
		// console.log(result);
		expect(result).to.instanceof(Array);
	})
});