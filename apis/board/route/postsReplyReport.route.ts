import * as express from 'express';
import { slack } from '../../../packages/core/slack/slack';
import { PostsReplyReportResource } from '../../../resources/postsReplyReport.resource';
import { user } from '../../user/model/user.model';
import { postsReply } from '../model/postsReply.model';
import { postsReplyReport } from '../model/postsReplyReport.model';

export class PostsReplyReportRoute {
	public postsReplyReportRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReplyReportRouter.post('/postsReplyReport', createPostsReplyReport);
		this.postsReplyReportRouter.get('/postsReplyReport', listPostsReplyReport);
		this.postsReplyReportRouter.get('/postsReplyReport/userId/:userId', getPostsReplyReportByUserId);
		this.postsReplyReportRouter.put('/postsReplyReport/postsReplyReportIndex/:postsReplyReportIndex', updatePostsReplyReport);
		this.postsReplyReportRouter.delete('/postsReplyReport', deletePostsReplyReport);
	}
}

/**
 * route: postsReplyReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createPostsReplyReport(req, res): Promise<void> {
	const {userId, ...postReplyReportData} = req.body;
	try {
		const resultUser = await user.getUser(userId);
		const {userIndex} = resultUser[0];
		postReplyReportData.userIndex = userIndex;

		const checkResult: any = await postsReplyReport.checkPostsReplyReport(postReplyReportData.postsReplyIndex, userIndex);
		if (checkResult.length > 0) {
			throw 'report duplicated';
		}

		await postsReplyReport.createPostsReplyReport(postReplyReportData);
		let countResult: any = await postsReplyReport.getPostsReplyReportCount(postReplyReportData.postsReplyIndex);

		const replyLimitCount = 5;
		const reportCount = countResult[0]['reportCount'];
		if (reportCount === replyLimitCount) {
			const color = '#0013FF';
			const field = {
				'title': `Reply Report 알림`,
				'value': `postsIndex=${postReplyReportData.postsIndex}, postsReplyIndex=${postReplyReportData.postsReplyIndex}, reportCount=${reportCount}\nContent: ${postReplyReportData.content}`,
				'short': false
			};
			await Promise.all([
				postsReply.updatePostsReplyStatus(postReplyReportData.postsReplyIndex, 'INACTIVE'),
				slack.sendReportMessage('replyReport', field, color)
			]);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: postReplyReportData,
			message: 'createPostsReplyReport: 200'
		});
	} catch (err) {
		switch (err) {
			case 'report duplicated':
				res.send({
					success: false,
					statusCode: 409,
					message: 'createPostsReplyReport: 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 50000,
					message: 'createPostsReplyReport: 50000'
				});
				break;
		}
	}
}

/**
 * route: postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listPostsReplyReport(req, res): Promise<void> {
	try {
		const result: any = await postsReplyReport.listPostsReplyReport();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getPostsReplyReport: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReplyReport: 50000'
				});
		}
	}
}

/**
 * route: UserId에 따른 postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPostsReplyReportByUserId(req, res): Promise<void> {
	const {userId} = req.params;
	const resultUser = await user.getUser(userId);
	const {userIndex} = resultUser[0];
	try {
		const result: any = await postsReplyReport.getPostsReplyReportByUserIndex(userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getPostsReplyReportByUser: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReplyReportByUser: 50000'
				});
		}
	}
}

/**
 * route: postsReplyReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updatePostsReplyReport(req, res): Promise<void> {
	const {postsReplyReportIndex} = req.params;
	const {userId} = req.body;
	try {
		const resultUser = await user.getUser(userId);
		const {userIndex} = resultUser[0];

		delete req.body.userId;
		req.body.userIndex = userIndex;

		const postsReplyReportData: any = new PostsReplyReportResource(req.body);

		const result: any = await postsReplyReport.updatePostsReplyReport(postsReplyReportIndex, postsReplyReportData.getPostsReplyReport());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updatePostsReplyReport: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePostsReplyReport: 50000'
				});
		}
	}
}

/**
 * route: postsReplyReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deletePostsReplyReport(req, res): Promise<void> {
	const {postsReplyIndex, userId} = req.body;
	const resultUser = await user.getUser(userId);
	const {userIndex} = resultUser[0];
	try {
		const result: any = await postsReplyReport.deletePostsReplyReport(postsReplyIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deletePostsReplyReport: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePostsReplyReport: 50000'
				});
		}
	}
}

export const postsReplyReportRoutes: PostsReplyReportRoute = new PostsReplyReportRoute();