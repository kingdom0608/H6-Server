import * as express from 'express';
import { ProfessorResource } from '../../../resources/professor.resource';
import { professor } from '../model/professor.model';

export class ProfessorRoutes {
	public professorRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.professorRouter.post('/professor', createProfessor);
		this.professorRouter.get('/professor', listProfessor);
		this.professorRouter.get('/professor/professorIndex/:professorIndex/', getProfessorByProfessorIndex);
		this.professorRouter.get('/professor/professorName/:professorName/', getProfessorByProfessorName);
		this.professorRouter.put('/professor/professorIndex/:professorIndex', updateProfessor);
		this.professorRouter.delete('/professor/professorIndex/:professorIndex', deleteProfessor);
	}
}

/**
 * route: professor 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createProfessor(req, res): Promise<void> {
	let professorData: any = new ProfessorResource(req.body);
	try {
		const result: any = await professor.createProfessor(professorData.getProfessor());
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: professor 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listProfessor(req, res): Promise<void> {
	try {
		const result: any = await professor.listProfessor();
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: professorIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProfessorByProfessorIndex(req, res): Promise<void> {
	let professorIndex: number = req.params.professorIndex;
	try {
		const result: any = await professor.getProfessorByProfessorIndex(professorIndex);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProfessorByProfessorName(req, res): Promise<void> {
	let professorName: string = req.params.professorName;
	try {
		const result: any = await professor.getProfessorByProfessorName(professorName);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: professor 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateProfessor(req, res): Promise<void> {
	let professorIndex: number = req.params.professorIndex;
	let professorData: any = new ProfessorResource(req.body);
	try {
		const result: any = await professor.updateProfessor(professorIndex, professorData);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: professor 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteProfessor(req, res): Promise<void> {
	let professorIndex: number = req.params.professorIndex;
	try {
		const result: any = await professor.deleteProfessor(professorIndex);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const professorRoutes: ProfessorRoutes = new ProfessorRoutes();