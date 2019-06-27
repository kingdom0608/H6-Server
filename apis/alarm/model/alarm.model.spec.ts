import { expect } from 'chai';
import { alarm } from './alarm.model';

describe('alarm 모델', async () => {
	let resultAlarm;

	it('createAlarm', async () => {
		const result: any = await alarm.createAlarm({
			userIndex: 446,
			category: 'posts',
			data: JSON.stringify({
				postsIndex: 1,
				content: 'content'
			}),
			status: 'ACTIVE',
			isRead: 0,
			readAt: null
		});
		resultAlarm = result;
		expect(result).to.instanceof(Object);
	});

	it('listAlarm', async () => {
		const result = await alarm.listAlarm(446);
		// console.log(result);
		resultAlarm = result[0];
		expect(result).to.instanceof(Array);
	});

	it('pageListAlarm', async () => {
		const result = await alarm.pageListAlarm(446, 1, 1);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('listAlarmByIsRead', async () => {
		const result = await alarm.listAlarmByIsRead(resultAlarm.userIndex, 0);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getAlarm', async () => {
		const result = await alarm.getAlarm(resultAlarm.alarmIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updateAlarm', async () => {
		const result = await alarm.updateAlarm(resultAlarm.alarmIndex, {
			isRead: 1,
			readAt: '2019-12-31'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteAlarm', async () => {
		const result = await alarm.deleteAlarm(resultAlarm.alarmIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});
