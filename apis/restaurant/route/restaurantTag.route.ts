import * as express from 'express';
import { restaurantTag } from '../model/restaurantTag.model';

export class RestaurantTagRoute {
	public restaurantTagRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantTagRouter.post('/restaurantTag', createRestaurantTag);
		this.restaurantTagRouter.get('/restaurantTag/restaurantIndex/:restaurantIndex', getRestaurantTag);
		this.restaurantTagRouter.get('/restaurantTag/tag/:tag', getRestaurantTagByTag);
		this.restaurantTagRouter.delete('/restaurantTag/restaurantTagIndex/:restaurantTagIndex', deleteRestaurantTag);
	}
}

/**
 * route: restaurantTag 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurantTag(req, res): Promise<void> {
	try {
		const result: any = await restaurantTag.createRestaurantTag(req.body);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurantTag: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurantTag: 50000'
				});
		}
	}
}

/**
 * route: restaurantIndex에 따른 restaurantTag 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurantTag(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const result: any = await restaurantTag.getRestaurantTag(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantTag: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantTag: 50000'
				});
		}
	}
}

/**
 * route: tag에 따른 restaurantTag 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurantTagByTag(req, res): Promise<void> {
	const {tag} = req.params;
	try {
		const result: any = await restaurantTag.getRestaurantTagByTag(tag);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantTagByTag: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantTagByTag: 50000'
				});
		}
	}
}

/**
 * route: restaurantTag 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurantTag(req, res): Promise<void> {
	const {restaurantTagIndex} = req.params;
	try {
		const result: any = await restaurantTag.deleteRestaurantTag(restaurantTagIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurantTag: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurantTag: 50000'
				});
		}
	}
}

export const restaurantTagRoutes: RestaurantTagRoute = new RestaurantTagRoute();