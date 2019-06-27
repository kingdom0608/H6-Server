import { expect } from 'chai';
import { hansungInfo } from './hansungInfo.model';

describe('hansungInfo 모델', async () => {
	let createHansungInfo;

	it('createHansungInfo', async () => {
		const result: any = await hansungInfo.createHansungInfo({
			userIndex: 1,
			hansungInfoId: 'testHansungInfoId',
			hansungInfoPw: 'testHansungInfoPw',
			accessCount: 0
		});
		createHansungInfo = result;
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listHansungInfo', async () => {
		const result: any = await hansungInfo.listHansungInfo(createHansungInfo.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getHansungInfo', async () => {
		const result: any = await hansungInfo.getHansungInfo(createHansungInfo.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updateHansungInfo', async () => {
		const result: any = await hansungInfo.updateHansungInfo(createHansungInfo.userIndex, {
			accessCount: 5
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteHansung', async () => {
		const result: any = await hansungInfo.deleteHansung(1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})
});
