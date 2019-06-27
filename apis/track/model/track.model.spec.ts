import { expect } from 'chai';
import { track } from './track.model';

describe('track 모델', () => {
	let testTrackName: string = '경제학과';

	it('createTrack', async () => {
		const result = await track.createTrack({
			trackName: testTrackName
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('listTrack', async () => {
		const result = await track.listTrack();
		// console.log(result);
		expect(result).instanceof(Array);
	});

	it('pageListTrack', async () => {
		const result = await track.pageListTrack(1, 5);
		// console.log(result);
		expect(result).instanceof(Array);
	});

	it('deleteTrack', async () => {
		const result = await track.deleteTrack(testTrackName);
		// console.log(result);
		expect(result).instanceof(Object);
	})
});