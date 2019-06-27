import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { posts } from '../model/posts.model';
import { postsSubscriber } from '../model/postsSubscriber.model';

export class PostsSubscriberRoutes {
	public postsSubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsSubscriberRouter.put('/postsSubscriber/postsIndex/:postsIndex', putPostsSubscriber);
	}
}

/**
 * route: postsSubscriber 생성 및 업데이트
 * @param req
 * @param res
 */
async function putPostsSubscriber(req, res) {
	try {
		const postsIndex = req.params.postsIndex;
		let userData = auth(req);
		const userIndex = userData.tokenIndex;

		let result = await postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userIndex);
		if (result[0] == null) {
			await postsSubscriber.createPostsSubscriber({
				postsIndex: postsIndex,
				userIndex: userIndex,
				isGood: req.body.isGood === undefined ? 0 : 1,
				isBad: req.body.isBad === undefined ? 0 : 1,
				isScrap: req.body.isScrap === undefined ? 0 : 1
			});
		} else {
			await postsSubscriber.updatePostsSubscriber(postsIndex, userIndex, req.body);
		}

		result = await postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userIndex);
		if (result[0].isGood === 0 && result[0].isBad === 0 && result[0].isScrap === 0) {
			await postsSubscriber.deletePostsSubscriber(postsIndex, userIndex);
		}

		/** posts goodCount, badCount 업데이트 */
		const subscriberCount: any = await postsSubscriber.getPostsSubscriberSumCount(postsIndex);
		await posts.updatePosts(postsIndex, {
			goodCount: subscriberCount[0].goodCount,
			badCount: subscriberCount[0].badCount
		});

		delete result[0].userIndex;

		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'putPostsSubscriber: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'putPostsSubscriber : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'putPostsSubscriber : 50000'
				});
				break;
		}
	}
}

export const postsSubscriberRoutes: PostsSubscriberRoutes = new PostsSubscriberRoutes();