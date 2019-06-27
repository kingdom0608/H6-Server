import { expect } from 'chai';
import { encriptionPw } from '../../../packages/utils/encryption.util';
import { user } from '../../user/model/user.model';
import { userValidation } from './userValidation.model';

describe('userValidation 모델', () => {
	let resultCreateUser: any;
	let testUserId: string = '이미 존재하는 아이디';
	let testUserId2: string = '사용 가능한 아이디';
	let testUserPw: string = 'marine1164';
	let testUserNickName: string = '이미 존재하는 닉네임';
	let testUserNickName2: string = '사용 가능한 닉네임';
	let testMajor: string = '산업경영공학과';
	let testAdmissionYear: number = 2012;

	before(async () => {
		try {
			resultCreateUser = await user.createUser({
				userId: testUserId,
				userPw: await encriptionPw.getHash(testUserPw),
				userNickName: testUserNickName,
				major: testMajor,
				admissionYear: testAdmissionYear
			});
			/** validation 체크 */
			expect(resultCreateUser).instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			await user.deleteUser(resultCreateUser.userId);
			await userValidation.deleteUserValidation(resultCreateUser.userId);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createUserValidation', async () => {
		const result = await userValidation.createUserValidation({
			userId: testUserId
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserId - 사용 가능한 아이디', async () => {
		const result = await userValidation.checkUserId(testUserId2);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserNickName - 사용 가능한 닉네임', async () => {
		const result = await userValidation.checkUserNickName(testUserNickName2);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserPw', async () => {
		const result = await userValidation.checkUserPw(testUserId, testUserPw);
		// console.log(result);
		expect(result).instanceof(Array);
	});

	it('getBlockUserNicName', async () => {
		const result = await userValidation.getBlockUserNickName('testUserNickName');
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	let tmpUserId: string = 'ychooni@naver.com';
	let tmpUuid: string = 'qwer1234';
	it('setUuid', async () => {
		const result = await userValidation.setUuid(tmpUserId, tmpUuid);
		expect(result).to.instanceof(Object);
	});

	it('getValidationCode', async () => {
		const result = await userValidation.getValidationCode(tmpUserId);
		//console.log(result);
		expect(result).to.instanceof(Array);
		//console.log(result[0].validationCode);
		expect(result[0].validationCode).to.eql(tmpUuid);
	});

	/* Timeout 2000ms
	it('sendValidationMail && sendPasswordMail', async () => {
		const result = await userValidation.sendPasswordMail({
			to: tmpUserId,
			subject: '한담 비밀번호 재발급 메일',
			html: `${tmpUserId} 님 안녕하세요. <br><br> 임시비밀번호 전송 테스트메일 입니다. <br><br>`
		});
		expect(result).to.eql('send ok');
	});
	*/

	it('getUserIdData', async () => {
		const result = await userValidation.getUserIdData(tmpUuid);
		expect(result).to.instanceof(Array);
		expect(result[0].userId).to.eql(tmpUserId);
	});

	it('getUpdateAt', async () => {
		const result = await userValidation.getUpdatedAt(tmpUserId);
		expect(result).to.instanceof(Array);
	});

	it('verifyValidation', async () => {
		const result = await userValidation.verifyValidation(tmpUuid);
		expect(result).to.eql('Email is been Successfully verified');
	});

});