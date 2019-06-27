import { expect } from 'chai';
import * as request from 'supertest';

describe('signIn 라우트', () => {
	it('signInRoutes', async () => {
		let result = await request('http://localhost')
			.post('/signIn')
			.send({
				userId: 'mochatest@gmail.com',
				userPw: 'mochatest'
			})
			.set('Content-Type', 'application/x-www-form-urlencoded');
		result = result.toJSON();
		result.text = JSON.parse(result.text);
		delete result.text.result.createdAt;
		delete result.text.result.updatedAt;
		delete result.text.result.token;
		// console.log(result);
		expect(result.text).to.be.eqls({
			success: true,
			statusCode: 200,
			message: 'getUser: 200',
			result: {
				userIndex: 487,
				userId: 'mochatest@gmail.com',
				userNickName: '모카테스트',
				major: '산업경영공학과',
				minor: null,
				doubleMajor: null,
				connectedMajor: null,
				admissionYear: 2018,
				avatar: null,
				status: 'ACTIVE',
				isValidation: 0,
			}
		});
	});
});
