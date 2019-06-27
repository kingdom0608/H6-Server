import * as express from 'express';
import { getRandomInt } from '../../../packages/utils/randomInt.util';
import { uuidV1 } from '../../../packages/utils/uuid.util';
import { user } from '../../user/model/user.model';
import { userValidation } from '../model/userValidation.model';

export class UserValidationRoutes {
	public userValidationRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userValidationRouter.get('/userValidation/userId/:userId', checkUserId);
		this.userValidationRouter.get('/userValidation/userNickName/:userNickName', checkUserNickName);
		this.userValidationRouter.post('/userValidation/userId/:userId/userPw', checkUserPw);
		this.userValidationRouter.get('/userValidation/blockUserNickName/:blockUserNickName', getBlockUserNickName);
		this.userValidationRouter.get('/userValidation/sendPasswordMail/:userId', sendPasswordMail);
		this.userValidationRouter.post('/userValidation/sendValidationMail', sendValidationMail);
		this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
	}
}

/**
 * route: 아이디 중복 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkUserId(req, res): Promise<void> {
	const userId: string = req.params.userId;
	try {
		await userValidation.checkUserId(userId);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserId: 200'
		});
	} catch (err) {
		switch (err) {
			case 'Id already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkUserId: 40901'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserId: 50000'
				});
				break;
		}
	}
}

/**
 * route: 닉네임 중복 체크
 * @param req
 * @param res
 */
async function checkUserNickName(req, res): Promise<any> {
	const userNickName: string = req.params.userNickName;
	try {
		await userValidation.checkUserNickName(userNickName);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserNickName: 200'
		});
	} catch (err) {
		switch (err) {
			case 'NickName already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkUserNickName: 40901'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserNickName: 50000'
				});
				break;
		}
	}
}

/**
 * route: 비밀번호 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function checkUserPw(req, res): Promise<any> {
	const userId: string = req.params.userId;
	const userPw: string = req.body.userPw;
	try {
		await userValidation.checkUserPw(userId, userPw);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserPw: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'checkUserPw: 40401'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserPw: 50000'
				});
				break;
		}
	}
}

/**
 * route: blockUserNickName 조회
 * @param req
 * @param res
 */
async function getBlockUserNickName(req, res): Promise<void> {
	let userNickName: string = req.params.blockUserNickName;
	try {
		await userValidation.getBlockUserNickName(userNickName);
		res.send({
			success: true,
			statusCode: 200,
			message: 'getBlockUserNicName: 200'
		})
	} catch (err) {
		switch (err) {
			case 'The NickName is not allowed':
				res.send({
					success: false,
					statusCode: 409,
					message: 'getBlockUserNicName: 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getBlockUserNicName: 50000'
				});
				break;
		}
	}
}

/**
 * route: 새로운 비밀번호 이메일 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function sendPasswordMail(req, res): Promise<void> {
	try {
		let newPassword: any = String(getRandomInt());
		let userId: string = req.params.userId;
		let html: any = `${userId} 님 안녕하세요.<br><br> 임시비밀번호는 ${newPassword} 입니다.<br><br>`;

		let mailOptions = {
			to: userId,
			subject: '한담 비밀번호 재발급 메일',
			html: html
		};

		/** 비밀번호 재발급 메일 발송 */
		await userValidation.sendPasswordMail(mailOptions).catch(err => {
			throw err;
		});

		/** 비밀번호 업데이트 */
		await user.updateUserPassword(userId, newPassword);

		res.send({
			success: true,
			statusCode: 200,
			message: 'sendPasswordMail'
		});
	} catch (err) {
		switch (err) {
			case 'sendPasswordMail error':
				res.send({
					success: false,
					statusCode: 40001,
					message: 'sendPasswordMail: 40001'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'sendPasswordMail: 50000'
				});
		}
	}
}

/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function sendValidationMail(req, res): Promise<void> {
	try {
		let host: any = req.get('host');
		let uuid: string = uuidV1();

		let userId: string = req.body.userId.toLowerCase();
		let link: any = 'http://' + host + '/userValidation/verify/' + uuid;
		let email: string = req.body.email;

		await userValidation.setUuid(userId, uuid);

		let html: any = userId + '님 안녕하세요.<br><br> 한담을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
		html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
		html = html + '<a href=' + link + '>' + link + '</a>';

		let mailOptions = {
			to: email,
			subject: '한담 한성인 인증 메일',
			html: html
		};

		await userValidation.sendValidationMail(mailOptions);
		res.send({
			success: true,
			statusCode: 200,
			message: 'sendValidationMail: 200'
		});

	} catch (err) {
		switch (err) {
			case 'setUuid query error':
				res.send({
					success: false,
					statusCode: 400,
					message: 'setUuid: 40001'
				});
				break;
			case 'sendValidationMail error':
				res.send({
					success: false,
					statusCode: 400,
					message: 'sendValidationMail: 40002'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'sendValidationMail: 50000'
				});
		}
	}
}

/**
 * route: 인증코드 검증
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function verifyValidation(req, res): Promise<void> {
	try {
		let verifiedUuid: any = req.params.uuid;
		await userValidation.verifyValidation(verifiedUuid);
		res.send({
			success: true,
			statusCode: 200,
			message: 'verifyValidation:200'
		});
	} catch (err) {
		switch (err) {
			case 'Unvalidated code Error!':
				res.send({
					success: false,
					statusCode: 403,
					message: 'verifyValidation:40301'
				});
				break;
			case 'Validation date expired.':
				res.send({
					success: false,
					statusCode: 403,
					message: 'verifyValidation:40302'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'verifyValidation:500'
				});
				break;
		}
	}
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
