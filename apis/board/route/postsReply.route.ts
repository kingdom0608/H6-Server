import * as express from 'express';
import { alarmUtil } from '../../../packages/utils/alarm.util';
import { auth } from '../../../packages/utils/auth.util';
import { alarm } from '../../alarm/model/alarm.model';
import { user } from '../../user/model/user.model';
import { posts } from '../model/posts.model';
import { postsReply } from '../model/postsReply.model';
import { postsReplyReport } from '../model/postsReplyReport.model';

export class PostsReplyRoutes {
	public postsReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReplyRouter.post('/postsReply/postsIndex/:postsIndex', createPostsReply);
		this.postsReplyRouter.get('/postsReply/postsIndex/:postsIndex', pageListPostsReply);
		this.postsReplyRouter.get('/postsReply/parentsPostsReplyIndex/:parentsPostsReplyIndex', pageChildPostsReply);
		this.postsReplyRouter.get('/postsReply/postsReplyIndex/:postsReplyIndex', getPostsReply);
		this.postsReplyRouter.put('/postsReply/postsReplyIndex/:postsReplyIndex', updatePostsReply);
		this.postsReplyRouter.delete('/postsReply/postsReplyIndex/:postsReplyIndex', deletePostsReply);
	}
}

/**
 * route : postsReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createPostsReply(req, res) {
	const postsIndex = req.params.postsIndex;
	try {
		let userData = auth(req);
		const result: any = await postsReply.createPostsReply({
			postsIndex: postsIndex,
			parentsPostsReplyIndex: req.body.parentsPostsReplyIndex,
			userIndex: userData.tokenIndex,
			content: req.body.content,
			status: 'ACTIVE'
		});

		/** 댓글 작성 케이스 */
		if (result.postsIndex && result.parentsPostsReplyIndex === undefined) {
			/** 알림 수신자 추가 */
			let resultsPosts = await posts.getPostsIncludeUserIndex(postsIndex);

			/** 알림 수신자와 댓글 작성자가 다를 경우에만 알림 전송 */
			if (resultsPosts[0].userIndex !== userData.tokenIndex) {
				let resultUser = await user.getUserByUserIndex(resultsPosts[0].userIndex);
				let appIds = [];
				if (resultUser[0].isPostsAlarm && resultUser[0].status === 'ACTIVE') {
					if (resultUser[0].appId !== null) {
						appIds.push(resultUser[0].appId);
					}
				}

				/** 알림 전송 */
				if (appIds.length > 0) {
					await alarmUtil.sendAlarm({
						include_player_ids: appIds,
						contents: {
							en: 'alarm',
							ko: `내 글에 댓글이 달렸어요: ${req.body.content.substring(0, 30)}`
						}
					});

					/** 알림 리스트 추가 */
					await alarm.createAlarm({
						userIndex: resultsPosts[0].userIndex,
						category: 'posts',
						data: JSON.stringify({
							postsIndex: parseInt(resultsPosts[0].postsIndex),
							postsTitle: resultsPosts[0].title,
							postsCategoryIndex: resultsPosts[0].postsCategoryIndex,
							postsCategoryName: resultsPosts[0].postsCategoryName
						}),
						status: 'ACTIVE',
						isRead: 0,
						readAt: null
					});
				}
			}
		}

		/** 대댓글 작성 케이스 */
		if (result.postsIndex && result.parentsPostsReplyIndex) {
			/** 게시글 정보 */
			let resultsPosts = await posts.getPostsIncludeUserIndex(postsIndex);

			/** 알림 수신자 추가 */
			let resultsPostsReply = await postsReply.getPostsReplyIncludeUserIndex(req.body.parentsPostsReplyIndex);

			/** 알림 수신자와 댓글 작성자가 다를 경우에만 알림 전송 */
			if (resultsPostsReply[0].userIndex !== userData.tokenIndex) {
				let resultUser = await user.getUserByUserIndex(resultsPostsReply[0].userIndex);

				let appIds = [];
				if (resultUser[0].isPostsAlarm && resultUser[0].status === 'ACTIVE') {
					if (resultUser[0].appId !== null) {
						appIds.push(resultUser[0].appId);
					}
				}

				/** 알림 전송 */
				if (appIds.length > 0) {
					await alarmUtil.sendAlarm({
						include_player_ids: appIds,
						contents: {
							en: 'alarm',
							ko: `내 댓글에 답글이 달렸어요: ${req.body.content.substring(0, 30)}`
						}
					});

					/** 알림 리스트 추가 */
					await alarm.createAlarm({
						userIndex: resultsPostsReply[0].userIndex,
						category: 'postsReply',
						data: JSON.stringify({
							postsIndex: parseInt(resultsPostsReply[0].postsIndex),
							postsReplyIndex: parseInt(resultsPostsReply[0].postsReplyIndex),
							postsTitle: resultsPosts[0].title,
							postsCategoryIndex: resultsPosts[0].postsCategoryIndex,
							postsCategoryName: resultsPosts[0].postsCategoryName
						}),
						status: 'ACTIVE',
						isRead: 0,
						readAt: null
					});
				}
			}
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route : postsReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListPostsReply(req, res) {
	let postsIndex: number = req.params.postsIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const userData = auth(req);
		const pResultCount: any = postsReply.listPostsReply(postsIndex);
		const result: any = await postsReply.pageListPostsReply(postsIndex, page, count);
		const pReportCheck = [];
		for (const res of result) {
			pReportCheck.push(postsReplyReport.checkPostsReplyReport(res.postsReplyIndex, userData.tokenIndex));
		}

		for (let i = 0; i < pReportCheck.length; i++) {
			const reported = await pReportCheck[i];
			result[i].reported = !!reported[0];
		}

		const resultCount = await pResultCount;
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: postsReply 대댓글 리스트 조회
 * @param req
 * @param res
 */
async function pageChildPostsReply(req, res) {
	let parentsPostsReplyIndex: number = req.params.parentsPostsReplyIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const userData = auth(req);
		const pResultCount: any = postsReply.listChildPostsReply(parentsPostsReplyIndex);
		const result: any = await postsReply.pageListChildPostsReply(parentsPostsReplyIndex, page, count);

		const pReportCheck = [];
		for (const res of result) {
			pReportCheck.push(postsReplyReport.checkPostsReplyReport(res.postsReplyIndex, userData.tokenIndex));
		}

		for (let i = 0; i < pReportCheck.length; i++) {
			const reported = await pReportCheck[i];
			result[i].reported = !!reported[0];
		}

		const resultCount = await pResultCount;
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageChildPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageChildPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: postsReply 조회
 * @param req
 * @param res
 */
async function getPostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	try {
		const userData = auth(req);
		const [result, reported] = await Promise.all([
			postsReply.getPostsReply(postsReplyIndex),
			postsReplyReport.checkPostsReplyReport(postsReplyIndex, userData.tokenIndex)
		]);
		result[0].reported = !!reported[0];
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'This postsReply does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getPostsReply: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route : postsReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updatePostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	let postsReplyData: any = req.body;
	try {
		const result: any = await postsReply.updatePostsReply(postsReplyIndex, postsReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updatePostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePostsReply: 50000'
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
async function deletePostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	try {
		const result: any = await postsReply.deletePostsReply(postsReplyIndex)
		await postsReply.deleteChildPostsReply(postsReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deletePostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePostsReply: 50000'
				});
				break;
		}
	}
}

export const postsReplyRoutes: PostsReplyRoutes = new PostsReplyRoutes();