import * as dynamo from 'dynamodb';
import * as fs from 'fs';
import * as Joi from 'joi';
import { Dynamo } from '../../../packages/utils/dynamo.util';

const file = './packages/utils/config/env.json';
let dynamoData: any = fs.readFileSync(file, 'utf8');
dynamoData = JSON.parse(dynamoData);

let stage;
if (dynamoData.stage === 'prod') {
	stage = 'prod'
} else {
	stage = 'dv'
}

let HansungInfoDynamo = dynamo.define(`${stage}-handam-hansungInfo`, {
	hashKey: 'userIndex',
	timestamps: true,
	createdAt: true,
	updatedAt: 'updateTimestamp',
	schema: {
		userIndex: Joi.number(),
		hansungInfoId: Joi.string(),
		hansungInfoPw: Joi.string(),
		status: Joi.string(),
		errorMessage: Joi.string(),
		accessCount: Joi.number(),
		schedule: Joi.object(),
		summaryGrades: Joi.object(),
		detailGrades: Joi.array(),
		nonSubjectPoint: Joi.object()
	},
	tableName: `${stage}-handam-hansungInfo`
});

interface IHansungInfo {
	userIndex: number,
	hansungInfoId: string,
	hansungInfoPw: string,
	status?: string,
	errorMessage?: string,
	accessCount?: number,
	schedule?: any,
	summaryGrades?: any,
	detailGrades?: any,
	nonSubjectPoint?: any
}

export class HansungInfo extends Dynamo {
	constructor() {
		super(HansungInfoDynamo, {
			hashKey: 'userIndex'
		});
	}

	/**
	 * model: hansungInfo 생성
	 * @param data
	 */
	async createHansungInfo(data: IHansungInfo) {
		data.status = data.status || 'UNVERIFIED';
		return await this.create(data);
	}

	/**
	 * model: HansungInfo 리스트 조회
	 * @param userIndex
	 */
	async listHansungInfo(userIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db
				.query(userIndex)
				.exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						let hansungInfo: any = this.getResults(result);
						resolve(hansungInfo);
					}
				})
		})
	}

	/**
	 * model: HansungInfo 조회
	 * @param userIndex
	 */
	async getHansungInfo(userIndex: number): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.db
				.query(userIndex)
				.exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						let hansungInfo: any = this.getResult(result);
						resolve(hansungInfo);
					}
				})
		})
	}

	/**
	 * model: HansungInfo 업데이트
	 * @param userIndex
	 * @param hansungInfoData
	 */
	async updateHansungInfo(userIndex: number, hansungInfoData: any) {
		hansungInfoData.userIndex = userIndex;
		return super.update(hansungInfoData);
	}

	/**
	 * model: HansungInfo 삭제
	 * @param userIndex
	 */
	async deleteHansung(userIndex: number) {
		return super.destroy(userIndex);
	}
}

export const hansungInfo: HansungInfo = new HansungInfo();
