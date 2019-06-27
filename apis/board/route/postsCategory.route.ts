import * as express from 'express';
import { postsCategory } from '../model/postsCategory.model';

export class PostsCategoryRoutes {
	public postsCategoryRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsCategoryRouter.get('/postsCategory', listPostsCategory);
	}
}

/**
 * route: postsCategory 리스트 조회
 * @param req
 * @param res
 */
async function listPostsCategory(req, res): Promise<void> {
	try {
		const result: any = await postsCategory.listPostsCategory();
		res.send({
			success: true,
			statusCode: 200,
			resultCount: result.length,
			result: result,
			message: 'listPostsCategory: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listPostsCategory: 50000'
				});
		}
	}
}

export const postsCategoryRoutes: PostsCategoryRoutes = new PostsCategoryRoutes();