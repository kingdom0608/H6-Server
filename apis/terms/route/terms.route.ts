import * as express from 'express';
import { loadTermsHtml } from '../model/terms.model';

export class TermsRoutes {
	public termsRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.termsRouter.get('/terms/:termsName', getTerms);
	}
}

/**
 * route: terms 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTerms(req, res): Promise<void> {
	let termsName: string = req.params.termsName;
	try {
		const result = await loadTermsHtml(termsName);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getTerms: 200'
		});
	} catch (err) {
		switch (err) {
			case 'Terms does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getTerms: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getTerms: 50000'
				});
				break;
		}
	}
}

export const termsRoutes: TermsRoutes = new TermsRoutes();
