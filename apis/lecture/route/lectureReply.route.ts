import * as express from 'express';
import { LectureReplyResource } from '../../../resources/lectureReply.resource';
import { lectureInfo } from '../model/lectureInfo.model';
import { lectureReply } from '../model/lectureReply.model';

export class LectureReplyRoutes {
	public lectureReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureReplyRouter.post('/lectureReply', createLectureReply);
		this.lectureReplyRouter.get('/lectureReply/checkGetLectureReply/lectureInfoIndex/:lectureInfoIndex/userIndex/:userIndex', checkGetLectureReply);
		this.lectureReplyRouter.get('/lectureReply/checkUpdateLectureReply/lectureInfoIndex/:lectureInfoIndex/userIndex/:userIndex', checkUpdateLectureReply);
		this.lectureReplyRouter.get('/lectureReply', pageListLectureReply);
		this.lectureReplyRouter.get('/lectureReply/lectureReplyIndex/:lectureReplyIndex', getLectureReplyByLectureReplyIndex);
		this.lectureReplyRouter.get('/lectureReply/lectureInfoIndex/:lectureInfoIndex', pageListLectureReplyByLectureInfoIndex);
		this.lectureReplyRouter.get('/lectureReply/userId/:userId', pageListLectureReplyByUserId);
		this.lectureReplyRouter.get('/lectureReply/userNickName/:userNickName', pageListLectureReplyByUserNickName);
		this.lectureReplyRouter.put('/lectureReply/lectureReplyIndex/:lectureReplyIndex', updateLectureReply);
		this.lectureReplyRouter.delete('/lectureReply/lectureReplyIndex/:lectureReplyIndex', deleteLectureReply);
	}
}

/**
 * route: lectureReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLectureReply(req, res): Promise<void> {
	let lectureReplyData: any = new LectureReplyResource(req.body);
	try {
		const result = await lectureReply.createLectureReply(lectureReplyData.getLectureReply());
		const resultTotalScore = await lectureReply.scoreGetLectureReply(result.lectureInfoIndex);
		await lectureInfo.updateLectureInfoAverage(result.lectureInfoIndex, resultTotalScore[0].totalScore);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 등록 중복 검사
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkGetLectureReply(req, res): Promise<void> {
	let lectureInfoIndex = req.params.lectureInfoIndex;
	let userIndex = req.params.userIndex;
	try {
		const result = await lectureReply.checkGetLectureReply(lectureInfoIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'checkGetLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'LectureReply already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkGetLectureReply: 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkGetLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 업데이스 중복 검사
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkUpdateLectureReply(req, res): Promise<void> {
	let lectureInfoIndex = req.params.lectureInfoIndex;
	let userIndex = req.params.userIndex;
	try {
		const result = await lectureReply.checkUpdateLectureReply(lectureInfoIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'checkUpdateLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'LectureReply does not exist':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkUpdateLectureReply: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUpdateLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureReply(req, res): Promise<void> {
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureReply.listLectureReply();
		const result: number = await lectureReply.pageListLectureReply(page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply replyIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureReplyByLectureReplyIndex(req, res): Promise<void> {
	let lectureReplyIndex = req.params.lectureReplyIndex;
	try {
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureReplyByLectureReplyIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureReplyByLectureReplyIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply lectureInfoIndex page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureReplyByLectureInfoIndex(req, res): Promise<void> {
	const lectureInfoIndex: number = req.params.lectureInfoIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureReply.listLectureReplyByLectureInfoIndex(lectureInfoIndex);
		const result = await lectureReply.pageListLectureReplyByLectureInfoIndex(lectureInfoIndex, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListLectureReplyByLectureInfoIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				console.log(err.message);
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureReplyByLectureInfoIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply userId 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureReplyByUserId(req, res): Promise<void> {
	const userId: string = req.params.userId;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureReply.listLectureReplyByUserId(userId);
		const result = await lectureReply.pageListLectureReplyByUserId(userId, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageGetLectureReplyByUserId: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureReplyByUserId: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply userNickName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureReplyByUserNickName(req, res): Promise<void> {
	const userNickName: string = req.params.userNickName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureReply.listLectureReplyByUserNickName(userNickName);
		const result = await lectureReply.pageListLectureReplyByUserNickName(userNickName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageGetLectureReplyByUserNickName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureReplyByUserNickName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLectureReply(req, res): Promise<void> {
	const lectureReplyIndex: number = req.params.lectureReplyIndex;
	let lectureReplyData: any = req.body;
	try {
		await lectureReply.updateLectureReply(lectureReplyIndex, lectureReplyData);
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
		const resultTotalScore = await lectureReply.scoreGetLectureReply(result[0].lectureInfoIndex);
		await lectureInfo.updateLectureInfoAverage(result[0].lectureInfoIndex, resultTotalScore[0].totalScore);
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'updateLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLectureReply(req, res): Promise<void> {
	const lectureReplyIndex: number = req.params.lectureReplyIndex;
	try {
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
		await lectureReply.deleteLectureReply(lectureReplyIndex);
		const resultTotalScore = await lectureReply.scoreGetLectureReply(result[0].lectureInfoIndex);
		await lectureInfo.updateLectureInfoAverage(result[0].lectureInfoIndex, resultTotalScore[0].totalScore)
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'deleteLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteLectureReply: 50000'
				});
				break;
		}
	}
}

export const lectureReplyRoutes: LectureReplyRoutes = new LectureReplyRoutes();