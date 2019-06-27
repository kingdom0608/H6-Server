import * as express from 'express';
import { LectureInfoResource } from '../../../resources/lectureInfo.resource';
import { user } from '../../user/model/user.model';
import { lectureInfo } from '../model/lectureInfo.model';

export class LectureInfoRoutes {
	public lectureInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureInfoRouter.post('/lectureInfo', createLectureInfo);
		this.lectureInfoRouter.get('/lectureInfo', pageListLectureInfo);
		this.lectureInfoRouter.get('/lectureInfo/pageListLectureInfoBySearchTerm/:searchTerm', pageListLectureInfoBySearchTerm);
		this.lectureInfoRouter.get('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', getLectureInfoByLectureInfoIndex);
		this.lectureInfoRouter.get('/lectureInfo/userId/:userId', pageListLectureInfoByUserId);
		this.lectureInfoRouter.get('/lectureInfo/lectureName/:lectureName', pageListLectureInfoByLectureName);
		this.lectureInfoRouter.get('/lectureInfo/professorName/:professorName', pageListLectureInfoByProfessorName);
		this.lectureInfoRouter.put('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', updateLectureInfo);
		this.lectureInfoRouter.delete('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', deleteLectureInfo);
	}
}

/**
 * route: lectureInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLectureInfo(req, res): Promise<void> {
	let lectureInfoData: any = new LectureInfoResource(req.body);
	try {
		const result = await lectureInfo.createLectureInfo(lectureInfoData.getLectureInfo());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfo(req, res): Promise<void> {
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureInfo.listLectureInfo();
		const result: any = await lectureInfo.pageListLectureInfo(page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo searchTerm 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfoBySearchTerm(req, res): Promise<void> {
	let searchTerm: string = req.params.searchTerm;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureInfo.listLectureInfoBySearchTerm(searchTerm);
		const result = await lectureInfo.pageListLectureInfoBySearchTerm(searchTerm, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'listLectureInfoBySearchTerm: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listLectureInfoBySearchTerm: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureInfoByLectureInfoIndex(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	try {
		const result = await lectureInfo.getLectureInfoByLectureInfoIndex(lectureInfoIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureInfoByLectureInfoIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureInfoByLectureInfoIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route lectureInfo userId 조회
 * @param req
 * @param res
 */
async function pageListLectureInfoByUserId(req, res): Promise<void> {
	let userId: string = req.params.userId;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultUser = await user.getUser(userId);
		const resultCount = await lectureInfo.listLectureInfoByUserIndex(resultUser[0].userIndex);
		const result = await lectureInfo.pageListLectureInfoByUserIndex(resultUser[0].userIndex, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListLectureInfoByUserId: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'pageListLectureInfoByUserId: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureInfoByUserId: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo lectureName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfoByLectureName(req, res): Promise<void> {
	let lectureName: string = req.params.lectureName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureInfo.listLectureInfoByLectureName(lectureName);
		const result = await lectureInfo.pageListLectureInfoByLectureName(lectureName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageGetLectureInfoByLectureName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureInfoByLectureName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo professorName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfoByProfessorName(req, res): Promise<void> {
	let professorName: string = req.params.professorName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount = await lectureInfo.listLectureInfoByProfessorName(professorName);
		const result = await lectureInfo.pageListLectureInfoByProfessorName(professorName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageGetLectureInfoByProfessorName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureInfoByProfessorName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLectureInfo(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	let lectureInfoData: any = new LectureInfoResource(req.body);
	try {
		const result = await lectureInfo.updateLectureInfo(lectureInfoIndex, lectureInfoData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLectureInfo(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	try {
		const result = await lectureInfo.deleteLectureInfo(lectureInfoIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteLectureInfo: 50000'
				});
				break;
		}
	}
}

export const lectureInfoRoutes: LectureInfoRoutes = new LectureInfoRoutes();