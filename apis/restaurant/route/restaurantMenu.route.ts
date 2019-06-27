import * as express from 'express';
import { RestaurantMenuResource } from '../../../resources/restaurantMenu.resource';
import { restaurantMenu } from '../model/restaurantMenu.model';

export class RestaurantMenuRoute {
	public restaurantMenuRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantMenuRouter.post('/restaurantMenu', createRestaurantMenu);
		this.restaurantMenuRouter.get('/restaurantMenu', listRestaurantMenus);
		this.restaurantMenuRouter.get('/restaurantMenu/restaurantIndex/:restaurantIndex', listRestaurantMenusByRestaurantIndex);
		this.restaurantMenuRouter.get('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', getRestaurantMenu);
		this.restaurantMenuRouter.put('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', updateRestaurantMenu);
		this.restaurantMenuRouter.delete('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', deleteRestaurantMenu);
	}
}

/**
 * route: restaurantMenu 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurantMenu(req, res): Promise<void> {
	let restaurantMenuData: any = new RestaurantMenuResource(req.body);
	try {
		const result: any = await restaurantMenu.createRestaurantMenu(restaurantMenuData.getRestaurantMenu());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurantMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurantMenu: 50000'
				});
		}
	}
}

/**
 * route: 모든 restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listRestaurantMenus(req, res): Promise<void> {
	try {
		const results: any = await restaurantMenu.listRestaurantMenus();
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'listRestaurantMenus: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurantMenus: 50000'
				});
		}
	}
}

/**
 * route: restaurantIndex 에 따른 restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listRestaurantMenusByRestaurantIndex(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const results: any = await restaurantMenu.listRestaurantMenusByRestaurantIndex(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'listRestaurantMenusByRestaurantIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurantMenusByRestaurantIndex: 50000'
				});
		}
	}
}

/**
 * route: restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurantMenu(req, res): Promise<void> {
	const {restaurantMenuIndex} = req.params;
	try {
		const result: any = await restaurantMenu.getRestaurantMenu(restaurantMenuIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantMenu: 50000'
				});
		}
	}
}

/**
 * route: restaurantMenu 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurantMenu(req, res): Promise<void> {
	const {restaurantMenuIndex} = req.params;
	const restaurantMenuData: any = new RestaurantMenuResource(req.body);
	try {
		const result: any = await restaurantMenu.updateRestaurantMenu(restaurantMenuIndex, restaurantMenuData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateRestaurantMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurantMenu: 50000'
				});
		}
	}
}

/**
 * route: restaurantMenu 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurantMenu(req, res): Promise<void> {
	const {restaurantMenuIndex} = req.params;
	try {
		const result: any = await restaurantMenu.deleteRestaurantMenu(restaurantMenuIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurantMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurantMenu: 50000'
				});
		}
	}
}

export const restaurantMenuRoutes: RestaurantMenuRoute = new RestaurantMenuRoute();