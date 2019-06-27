import * as express from 'express';
import { LectureResource } from '../../../resources/lecture.resource';
import { lecture } from '../model/lecture.model';

export class LectureRoutes {
	public lectureRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureRouter.post('/lecture', createLecture);
		this.lectureRouter.get('/lecture', listLecture);
		this.lectureRouter.get('/lecture/lectureIndex/:lectureIndex', getLectureByLectureIndex);
		this.lectureRouter.get('/lecture/lectureCode/:lectureCode', getLectureByLectureCode);
		this.lectureRouter.get('/lecture/lectureName/:lectureName', getLectureByLectureName);
		this.lectureRouter.get('/lecture/track/:track', getLectureByTrack);
		this.lectureRouter.put('/lecture/lectureIndex/:lectureIndex', updateLecture);
		this.lectureRouter.delete('/lecture/lectureIndex/:lectureIndex', deleteLecture);
	}
}

/**
 * route: lecture 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLecture(req, res): Promise<void> {
	let lectureData: any = new LectureResource(req.body);
	try {
		const result: any = await lecture.createLecture(lectureData.getLecture());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createLecture: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createLecture: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listLecture(req, res): Promise<void> {
	try {
		const result = await lecture.listLecture();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listLecture: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listLecture: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureIndex(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		const result = await lecture.getLectureByLectureIndex(lectureIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureByLectureIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureByLectureIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture code 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureCode(req, res): Promise<void> {
	try {
		let lectureCode: string = req.params.lectureCode;
		const result = await lecture.getLectureByLectureCode(lectureCode);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureByLectureCode: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureByLectureCode: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureName(req, res): Promise<void> {
	try {
		let lectureName: string = req.params.lectureName;
		const result = await lecture.getLectureByLectureName(lectureName);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureByLectureName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureByLectureName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture track 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByTrack(req, res): Promise<void> {
	try {
		let track: string = req.params.track;
		const result = await lecture.getLectureByTrack(track);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureByTrack: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureByTrack: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLecture(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		let lectureData: any = new LectureResource(req.body);
		const result = await lecture.updateLecture(lectureIndex, lectureData.getLecture());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateLecture: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateLecture: 50000'
				});
				break;
		}
	}
}

/**
 * route: lecture 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLecture(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		const result = await lecture.deleteLecture(lectureIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteLecture: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteLecture: 50000'
				});
				break;
		}
	}
}

export const lectureRoutes: LectureRoutes = new LectureRoutes();
