import * as express from 'express';
import { alarmUtil } from '../../../packages/utils/alarm.util';
import { auth } from '../../../packages/utils/auth.util';
import { jsonUtil } from '../../../packages/utils/json.util';
import { user } from '../../user/model/user.model';
import { alarm } from '../model/alarm.model';

export class AlarmRoutes {
	public alarmRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.alarmRouter.post('/alarm', pushAlarm);
		this.alarmRouter.get('/alarm', pageListAlarm);
		this.alarmRouter.get('/alarm/isRead', pageListAlarmByIsRead);
		this.alarmRouter.put('/alarm/alarmIndex/:alarmIndex', updateAlarm);
	}
}

/**
 * route: alarm 푸시
 * @param req
 * @param res
 */
async function pushAlarm(req, res): Promise<void> {
	try {
		const userIndex: number = auth(req).tokenIndex;
		const content: string = req.body.content;
		const resultUser = await user.getUserByUserIndex(userIndex);
		const pushableUserId: Array<string> = ['h6handam@gmail.com'];
		const appIds = [];

		/** 푸시 가능 여부 */
		if (pushableUserId.indexOf(resultUser[0].userId) > -1) {
			let resultUsers = await user.listUserByExistAppId();

			/** 타겟 유저 */
			for (const row of resultUsers) {
				if (row.appId && row.status === 'ACTIVE') {
					appIds.push(row.appId);
				}
			}

			/** 메세지 전송 */
			if (appIds.length > 0 && content !== undefined) {
				await alarmUtil.sendAlarm({
					include_player_ids: appIds,
					contents: {
						en: 'alarm',
						ko: `${content}`
					}
				});
			}
		} else {
			throw 'Access is limited';
		}

		res.send({
			success: true,
			statusCode: 200,
			message: 'pushAlarm: 200'
		});
	} catch (err) {
		switch (err) {
			case 'Access is limited':
				res.send({
					success: false,
					statusCode: 403,
					message: 'pushAlarm: 40301'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pushAlarm: 50000'
				});
				break;
		}
	}
}

/**
 * route: alarm 리스트 조회
 * @param req
 * @param res
 */
async function pageListAlarm(req, res): Promise<void> {
	try {
		let userIndex = auth(req).tokenIndex;
		let page: number = parseInt(req.query.page);
		let count: number = parseInt(req.query.count);

		const resultCount = await alarm.listAlarm(userIndex);
		const result: any = await alarm.pageListAlarm(userIndex, page, count);

		/** 읽지 않은 알림 갯수 */
		let notReadAlarmCount: number = 0;
		for (const row of resultCount) {
			if (row.readAt === 'null') {
				notReadAlarmCount = notReadAlarmCount + 1;
			}
		}

		/** 읽지 않은 알림 갯수 결과 값에 추가 */
		result.notReadAlarmCount = notReadAlarmCount;

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListAlarm: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListAlarm: 50000'
				});
				break;
		}
	}
}

/**
 * route: alarm isRead 리스트 조회
 * @param req
 * @param res
 */
async function pageListAlarmByIsRead(req, res): Promise<void> {
	try {
		let userIndex = auth(req).tokenIndex;
		let isRead: number = parseInt(req.query.isRead);
		let page: number = parseInt(req.query.page);
		let count: number = parseInt(req.query.count);

		let resultCount: any = await alarm.listAlarmByIsRead(userIndex, isRead);
		let result: any = await alarm.pageListAlarmByIsRead(userIndex, isRead, page, count);

		/** 읽지 않은 알림 갯수 */
		const resultAlarm = await alarm.listAlarm(userIndex);
		let notReadAlarmCount: number = 0;
		for (const row of resultAlarm) {
			if (row.readAt === null) {
				notReadAlarmCount = notReadAlarmCount + 1;
			}
		}

		/** 읽지 않은 알림 갯수 결과 값에 추가 */
		result.notReadAlarmCount = notReadAlarmCount;

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListAlarmByIsRead: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListAlarmByIsRead: 50000'
				});
				break;
		}
	}
}

/**
 * route: alarm 업데이트
 * @param req
 * @param res
 */
async function updateAlarm(req, res) {
	try {
		let alarmIndex: string = req.params.alarmIndex;
		let alarmData: any = jsonUtil.cleanObject(req.body);

		/** alarmData JSON 파싱 */
		if (alarmData.data) {
			alarmData.data = JSON.parse(alarmData.data);
		}

		const result = await alarm.updateAlarm(alarmIndex, alarmData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateAlarm: 200'
		});

	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateAlarm: 50000'
				});
				break;
		}
	}
}

export const alarmRoutes: AlarmRoutes = new AlarmRoutes();