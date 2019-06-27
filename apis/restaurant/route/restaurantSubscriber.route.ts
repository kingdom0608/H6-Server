import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { restaurant } from '../model/restaurant.model';
import { restaurantSubscriber } from '../model/restaurantSubscriber.model';

export class RestaurantSubscriberRoutes {
	public restaurantSubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantSubscriberRouter.put('/restaurantSubscriber/restaurantIndex/:restaurantIndex', putRestaurantSubscriber);
		;
	}
}

/**
 * route: restaurantSubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function putRestaurantSubscriber(req, res): Promise<void> {
	try {
		const {restaurantIndex} = req.params;
		const {tokenIndex} = auth(req);
		let result: any = await restaurantSubscriber.updateRestaurantSubscriber(tokenIndex, restaurantIndex, req.body);
		if (result.changedRows == 0) {
			result = await restaurantSubscriber.createRestaurantSubscriber({
				userIndex: tokenIndex,
				restaurantIndex: restaurantIndex,
				isGood: 1
			});
		} else {
			result = await restaurantSubscriber.getRestaurantSubscriber(tokenIndex, restaurantIndex);
			result = result[0];
			if (result.isGood == 0) {
				await restaurantSubscriber.deleteRestaurantSubscriber(tokenIndex, restaurantIndex);
			}
		}

		const sumResult: any = await restaurantSubscriber.getRestaurantSubscriberSumCount(restaurantIndex);
		await restaurant.updateRestaurant(restaurantIndex, sumResult[0]);

		delete result.userIndex;
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'putRestaurantSubscriber: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'putRestaurantSubscriber : 50000'
				});
				break;
		}
	}
}

export const restaurantSubscriberRoutes: RestaurantSubscriberRoutes = new RestaurantSubscriberRoutes();