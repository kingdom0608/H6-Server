import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { encryptHansungInfoPw } from '../../../packages/utils/encryption.util';
import { sqsUtil } from '../../../packages/utils/sqs.util';
import { user } from '../../user/model/user.model';
import { hansungInfo } from '../model/hansungInfo.model';

export class HansungInfoRoutes {
	public hansungInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.hansungInfoRouter.post('/hansungInfo', createHansungInfo);
		this.hansungInfoRouter.post('/hansungInfo/schedule', createHansungInfoSchedule);
		this.hansungInfoRouter.post('/hansungInfo/grades', createHansungInfoGrades);
		this.hansungInfoRouter.post('/hansungInfo/nonSubjectPoint', createHansungInfoNonSubjectPoint);
		this.hansungInfoRouter.get('/hansungInfo', getHansungInfo);
		this.hansungInfoRouter.get('/hansungInfo/grades', getHansungInfoGrades);
		this.hansungInfoRouter.delete('/hansungInfo', deleteHansungInfo);
	}
}

/**
 * route: hansungInfo 생성
 * @param req
 * @param res
 */
async function createHansungInfo(req, res) {
	try {
		let userData = auth(req);
		let hansungInfoPw = req.body.hansungInfoPw;
		hansungInfoPw = encryptHansungInfoPw.encryptHansungInfoPw(hansungInfoPw);
		hansungInfoPw = hansungInfoPw.toString();
		const result: any = await hansungInfo.createHansungInfo({
			userIndex: userData.tokenIndex,
			hansungInfoId: req.body.hansungInfoId,
			hansungInfoPw: hansungInfoPw,
			accessCount: 0,
			schedule: {},
			summaryGrades: {},
			detailGrades: [],
			nonSubjectPoint: {}
		});

		if (result !== null) {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfo:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'createHansungInfo : 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfo : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo schedule 생성
 * @param req
 * @param res
 */
async function createHansungInfoSchedule(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result === null) {
			res.send({
				success: false,
				statusCode: 404,
				message: 'createHansungInfoSchedule : 40401'
			});
		}

		if (result && result.status === 'SUCCESS') {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfoSchedule:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfoSchedule: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'createHansungInfoSchedule : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfoSchedule : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo grades 생성
 * @param req
 * @param res
 */
async function createHansungInfoGrades(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result === null) {
			res.send({
				success: false,
				statusCode: 404,
				message: 'createHansungInfoGrades : 40401'
			});
		}

		if (result && result.status === 'SUCCESS') {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfoGrades:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfoGrades: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'createHansungInfoGrades : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfoGrades : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo nonSubjectPoint 생성
 * @param req
 * @param res
 */
async function createHansungInfoNonSubjectPoint(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result === null) {
			res.send({
				success: false,
				statusCode: 404,
				message: 'createHansungInfoNonSubjectPoint : 40401'
			});
		}

		if (result && result.status === 'SUCCESS') {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfoNonSubjectPoint:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfoNonSubjectPoint: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'createHansungInfoNonSubjectPoint : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfoNonSubjectPoint : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo 조회
 * @param req
 * @param res
 */
async function getHansungInfo(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getHansungInfo : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getHansungInfo : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo grades 조회
 * @param req
 * @param res
 */
async function getHansungInfoGrades(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result.grades || null,
			message: 'getHansungInfoGrades: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getHansungInfoGrades : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getHansungInfoGrades : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo 삭제
 * @param req
 * @param res
 */
async function deleteHansungInfo(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.deleteHansung(userData.tokenIndex);
		await user.updateUserByUserIndex(userData.tokenIndex, {
			isValidation: 0
		});

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'deleteHansungInfo : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteHansungInfo : 50000'
				});
				break;
		}
	}
}

export const hansungInfoRoutes: HansungInfoRoutes = new HansungInfoRoutes();