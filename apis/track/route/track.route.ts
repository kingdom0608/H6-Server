import * as express from 'express';
import { TrackResource } from '../../../resources/track.resource';
import { track } from '../model/track.model';

export class TrackRoutes {
	public trackRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.trackRouter.post('/track', createTrack);
		this.trackRouter.get('/track', listTrack);
		this.trackRouter.delete('/track/trackName/:trackName', deleteTrack);
	}
}

/**
 * route: track 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createTrack(req, res) {
	let trackData: any = new TrackResource(req.body);
	try {
		const result = await track.createTrack(trackData.getTrack());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createTrack: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createTrack: 50000'
				});
				break;
		}
	}
}

/**
 * route: track 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listTrack(req, res): Promise<void> {
	try {
		const result = await track.listTrack();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageListTrack: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListTrack: 50000'
				});
				break;
		}
	}
}

/**
 * route: track 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteTrack(req, res): Promise<void> {
	let trackName: string = req.params.trackName;
	try {
		const result = await track.deleteTrack(trackName);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteTrack: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteTrack: 50000'
				});
				break;
		}
	}
}

export const trackRoutes: TrackRoutes = new TrackRoutes();