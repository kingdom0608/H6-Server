import { expect } from 'chai';
import { notice } from './notice.model';

describe('notice 모델', () => {
	const noticeData: Object = {
		noticeImg: 'testImg',
		info: JSON.stringify({
			noticeUrl: 'testUrl',
			noticeSubject: 'testSubject'
		})
	};
	it('createNotice', async () => {
		const result = await notice.createNotice(noticeData);
		// console.log(result);
		expect(result).to.equal(noticeData)
	});

	it('listNotice', async () => {
		const result = await notice.listNotice();
		// console.log(result);
		expect(result).instanceof(Array);
	});

	it('listNoticeImg', async () => {
		const result = await notice.listNoticeImg();
		// console.log(result);
		expect(result).instanceof(Array);
	})
});