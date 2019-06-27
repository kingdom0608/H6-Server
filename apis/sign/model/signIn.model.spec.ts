import { expect } from 'chai';
import { encriptionPw } from '../../../packages/utils/encryption.util';
import { user } from '../../user/model/user.model';
import { signIn } from './signIn.model';

describe('signIn 모델', () => {
	let userId: string = 'testUserId';
	let userPw: string = 'testUserPw';

	before(async () => {
		try {
			const result = await user.createUser({
				userId: userId,
				userPw: encriptionPw.getHash(userPw),
				userNickName: 'testUserNickName',
				major: 'testMajor',
				admissionYear: '2018'
			});
			expect(result).to.be.eqls({
				userId: userId,
				userPw: encriptionPw.getHash(userPw),
				userNickName: 'testUserNickName',
				major: 'testMajor',
				admissionYear: '2018'
			});
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		const result = await user.deleteUser(userId);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getUser', async () => {
		const result = await signIn.getUser({
			userId: userId,
			userPw: userPw
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});

