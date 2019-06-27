import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { RestaurantResource } from '../../../resources/restaurant.resource';
import { restaurant } from '../model/restaurant.model';
import { restaurantImage } from '../model/restaurantImage.model';
import { restaurantMenu } from '../model/restaurantMenu.model';
import { restaurantSubscriber } from '../model/restaurantSubscriber.model';
import { restaurantTag } from '../model/restaurantTag.model';

export class RestaurantRoutes {
	public restaurantRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantRouter.post('/restaurant', createRestaurant);
		this.restaurantRouter.get('/restaurant', pageListRestaurant);
		this.restaurantRouter.get('/restaurant/restaurantIndex/:restaurantIndex', getRestaurant);
		this.restaurantRouter.put('/restaurant/restaurantIndex/:restaurantIndex', updateRestaurant);
		this.restaurantRouter.delete('/restaurant/restaurantIndex/:restaurantIndex', deleteRestaurant);
	}
}

/**
 * route: restaurant 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurant(req, res): Promise<void> {
	const restaurantData: any = new RestaurantResource(req.body);
	try {
		const result: any = await restaurant.createRestaurant(restaurantData.getRestaurant());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListRestaurant(req, res): Promise<void> {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const {tokenIndex} = auth(req);
		const [resultCount, result] = await Promise.all([
			restaurant.listRestaurant(filter), restaurant.pageListRestaurant(filter, orderBy, page, count)
		]);
		for (const row of result) {
			const [resultRestaurantImage, resultPriorityMenus, resultRestaurantTag, resultRestaurantSubscriber] = await Promise.all([
				restaurantImage.listRestaurantImagesByRestaurantIndex(row.restaurantIndex),
				restaurantMenu.getRestaurantPriorityMenus(row.restaurantIndex),
				restaurantTag.getRestaurantTag(row.restaurantIndex),
				restaurantSubscriber.getRestaurantSubscriber(tokenIndex, row.restaurantIndex)
			]);
			row.restaurantImage = JSON.parse(resultRestaurantImage[0].url).mainImage;
			row.restaurantPriorityMenus = resultPriorityMenus;
			row.restaurantTag = resultRestaurantTag;
			row.isGood = resultRestaurantSubscriber[0] ? resultRestaurantSubscriber[0].isGood : 0;
		}

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'listRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const {tokenIndex} = auth(req);
		const result: any = await restaurant.getRestaurant(restaurantIndex);

		const [resultRestaurantMenu, resultRestaurantImage, resultRestaurantTag, resultRestaurantSubscriber] = await Promise.all([
			restaurantMenu.listRestaurantMenusByRestaurantIndex(result[0].restaurantIndex),
			restaurantImage.listRestaurantImagesByRestaurantIndex(result[0].restaurantIndex),
			restaurantTag.getRestaurantTag(result[0].restaurantIndex),
			restaurantSubscriber.getRestaurantSubscriber(tokenIndex, restaurantIndex)
		]);

		result[0].restaurantMenu = resultRestaurantMenu;
		result[0].resultRestaurantImage = JSON.parse(resultRestaurantImage[0].url);
		result[0].resultRestaurantTag = resultRestaurantTag;
		result[0].isGood = resultRestaurantSubscriber[0] ? resultRestaurantSubscriber[0].isGood : 0;

		const location = result[0].locationUrl.split(',');
		delete result[0].locationUrl;
		result[0].latitude = location[0];
		result[0].longitude = location[1];
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	const restaurantData: any = new RestaurantResource(req.body);
	try {
		const result: any = await restaurant.updateRestaurant(restaurantIndex, restaurantData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const result: any = await restaurant.deleteRestaurant(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurant: 50000'
				});
		}
	}
}

export const restaurantRoutes: RestaurantRoutes = new RestaurantRoutes();