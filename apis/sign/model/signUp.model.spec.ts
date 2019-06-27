import { expect } from 'chai';
import { user } from '../../user/model/user.model';
import { signUp } from './signUp.model';

describe('signUp 모델', () => {
	let testUserId: string = '이현아';
	let testUserPw: string = '12345';
	let testUserNickName: string = '서울';

	it('createUser', async () => {
		const result = await signUp.createUser({
			userId: testUserId,
			userPw: testUserPw,
			userNickName: testUserNickName
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteUser', async () => {
		const result = await user.deleteUser(testUserId);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});
