import { expect } from 'chai';
import { version } from './version.model';

describe('version 모델', () => {
	let testVersionIndex: any;

	/** 테스트 용도로 사용 */
	// it('createVersion', async () => {
	// 	const result = await version.createVersion({
	// 		android: '1.0.0',
	// 		ios: '1.0.0'
	// 	});
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });

	it('getVersion', async () => {
		const result = await version.getVersion();
		// console.log(result);
		testVersionIndex = result.versionIndex;
		expect(result).instanceof(Object);
	});

	it('updateVersion', async () => {
		const result = await version.updateVersion(testVersionIndex, {
			android: '1.0.1',
			ios: '1.0.1'
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	/** 테스트 용도로 사용 */
	// it('deleteVersion', async () => {
	// 	const result = await version.deleteVersion(testVersionIndex);
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// })
});