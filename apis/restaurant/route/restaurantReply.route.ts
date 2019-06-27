import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { restaurantReply } from '../model/restaurantReply.model';

export class restaurantReplyRouter {
	public restaurantReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantReplyRouter.post('/restaurantReply/restaurantIndex/:restaurantIndex', createRestaurantReply);
		this.restaurantReplyRouter.get('/restaurantReply/restaurantIndex/:restaurantIndex', pageListRestaurantReply);
		this.restaurantReplyRouter.get('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', getRestaurantReply);
		this.restaurantReplyRouter.put('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', updateRestaurantReply);
		this.restaurantReplyRouter.delete('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', deleteRestaurantReply);
	}
}

/**
 * route : restaurantReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurantReply(req, res) {
	const restaurantIndex = req.params.restaurantIndex;
	try {
		const userData = auth(req);
		const result: any = await restaurantReply.createRestaurantReply({
			restaurantIndex,
			userIndex: userData.tokenIndex,
			content: req.body.content,
			status: 'ACTIVE'
		});

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurantReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurantReply: 50000',
				});
				break;
		}
	}
}

/**
 * route : restaurantReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListRestaurantReply(req, res) {
	let restaurantIndex: number = req.params.restaurantIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const userData = auth(req);
		const pResultCount: any = restaurantReply.listRestaurantReply(restaurantIndex);
		const result: any = await restaurantReply.pageListRestaurantReply(restaurantIndex, page, count);

		const resultCount = await pResultCount;
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListRestaurantReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListRestaurantReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: restaurantReply 조회
 * @param req
 * @param res
 */
async function getRestaurantReply(req, res) {
	let restaurantReplyIndex: number = req.params.restaurantReplyIndex;
	try {
		const userData = auth(req);
		const result = await restaurantReply.getRestaurantReply(restaurantReplyIndex)
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getRestaurantReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'This restaurantReply does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getRestaurantReply: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantReply: 50000'
				});
				break;
		}
	}
}

/**
 * route : restaurantReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurantReply(req, res) {
	const {restaurantReplyIndex} = req.params;
	const restaurantReplyData: any = req.body;
	try {
		const result: any = await restaurantReply.updateRestaurantReply(restaurantReplyIndex, restaurantReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'updateRestaurantReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurantReply: 50000'
				});
				break;
		}
	}
}

/**
 * route : postsReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurantReply(req, res) {
	const restaurantReplyIndex: number = req.params.restaurantReplyIndex;
	try {
		const result: any = await restaurantReply.deleteRestaurantReply(restaurantReplyIndex)
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurantReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurantReply: 50000'
				});
				break;
		}
	}
}

export const restaurantReplyRoutes: restaurantReplyRouter = new restaurantReplyRouter();