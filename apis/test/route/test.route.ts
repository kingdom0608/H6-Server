import * as express from 'express';
import { test } from '../model/test.model';

export class TestRoutes {
	public testRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		/**
		 * 라우트: 테스트 생성
		 */
		this.testRouter.post('/test', function(req, res) {
			let name: string = req.body.name;
			try {
				let result: any = test.createName(name);
				res.send(result);
			} catch (err) {
				res.send(err.message);
			}
		});

		/**
		 * 라우트: 테스트 리스트 조회
		 */
		this.testRouter.get('/test', function(req, res) {
			try {
				let result: any = test.listName();
				res.send(result);
			} catch (err) {
				res.send(err.message);
			}
		});

		/**
		 * 라우트: 테스트 name 조회
		 */
		this.testRouter.get('/test/:name', function(req, res) {
			let name: any = req.params.name;
			try {
				let result: any = test.getName(name);
				res.send(result);
			} catch (err) {
				res.send(err.message);
			}
		});

		/**
		 * 라우트: 테스트 업데이트
		 */
		this.testRouter.put('/test/:name', function(req, res) {
			let name: any = req.params.name;
			try {
				let result: any = test.updateName(name, 'Mike');
				res.send(result);
			} catch (err) {
				res.send(err.message);
			}
		});

		/**
		 * 라우트: 테스트 삭제
		 */
		this.testRouter.delete('/test/:name', function(req, res) {
			let name: any = req.params.name;
			try {
				let result: any = test.deleteName(name);
				res.send(result);
			} catch (err) {
				res.send(err.message);
			}
		});
	}
}

export const testRoutes: TestRoutes = new TestRoutes();
