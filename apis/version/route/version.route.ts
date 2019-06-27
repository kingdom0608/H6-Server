import * as express from 'express';
import { VersionResource } from '../../../resources/version.resource';
import { version } from '../model/version.model';

export class VersionRoutes {
	public versionRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.versionRouter.post('/version', createVersion);
		this.versionRouter.get('/version', getVersion);
		this.versionRouter.delete('/version/versionIndex/:versionIndex', deleteVersion);
	}
}

/**
 * route: version 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createVersion(req, res) {
	let versionData: any = new VersionResource(req.body);
	try {
		const result = await version.createVersion(versionData.getVersion());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createVersion: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createVersion: 50000'
				});
				break;
		}
	}
}

/**
 * route: version 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getVersion(req, res): Promise<void> {
	try {
		const result = await version.getVersion();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getVersion: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getVersion: 50000'
				});
				break;
		}
	}
}

/**
 * route: version 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteVersion(req, res): Promise<void> {
	let versionIndex: number = req.params.versionIndex;
	try {
		const result = await version.deleteVersion(versionIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteVersion: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteVersion: 50000'
				});
				break;
		}
	}
}

export const versionRoutes: VersionRoutes = new VersionRoutes();
