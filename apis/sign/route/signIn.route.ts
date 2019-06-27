import * as express from 'express';
import { user } from '../../user/model/user.model';
import { signIn } from '../model/signIn.model';

export class SignInRoutes {
	public signInRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.signInRouter.post('/signIn', getUser);
	}
}

/**
 * route: 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getUser(req, res): Promise<void> {
	try {
		const result: any = await signIn.getUser(req.body);

		/** appId 추가 */
		await user.updateUser(req.body.userId, {
			appId: req.body.appId || null
		});

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getUser: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getUser: 40401'
				});
				break;
			case 'The password is incorrect':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getUser: 40402'
				});
				break;
			case 'The jwt is incorrect':
				res.send({
					success: false,
					statusCode: 403,
					message: 'getUser: 40301'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getUser: 50000'
				});
				break;
		}
	}
}

export const signInRoutes: SignInRoutes = new SignInRoutes();
