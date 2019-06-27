import * as express from 'express';
import { restaurantCategory } from '../model/restaurantCategory.model';

export class RestaurantCategoryRoutes {
	public restaurantCategoryRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantCategoryRouter.get('/restaurantCategory', listRestaurantCategory);
	}
}

/**
 * route: restaurantCategory 리스트 조회
 * @param req
 * @param res
 */
async function listRestaurantCategory(req, res): Promise<void> {
	try {
		const result: any = await restaurantCategory.listRestaurantCategory();
		res.send({
			success: true,
			statusCode: 200,
			resultCount: result.length,
			result: result,
			message: 'listRestaurantCategory: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurantCategory: 50000'
				});
		}
	}
}

export const restaurantCategoryRoutes: RestaurantCategoryRoutes = new RestaurantCategoryRoutes();