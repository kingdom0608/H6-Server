import * as express from 'express';
import { admissionYear } from '../model/admissionYear.model';

export class AdmissionYearRoutes {
	public admissionYearRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.admissionYearRouter.get('/admissionYear', listAdmissionYear);
	}
}

/**
 * route: admissionYear 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listAdmissionYear(req, res) {
	try {
		const result = await admissionYear.listAdmissionYear();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listAdmissionYear: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listAdmissionYear: 50000'
				});
				break;
		}
	}
}

export const admissionRoutes: AdmissionYearRoutes = new AdmissionYearRoutes();
