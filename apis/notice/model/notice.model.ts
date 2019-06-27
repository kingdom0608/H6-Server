import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Notice {

	/**
	 * model: Notice 생성
	 * @param noticeData
	 * @returns {Promise<void>}
	 */
	createNotice(noticeData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO notice SET ?`, [noticeData], async (err) => {
					await connection.release();
					err ? reject(err) : resolve(noticeData)
				})
			})
		})
	}

	/**
	 * model: notice 리스트 조회
	 * @returns {Promise<void>}
	 */
	listNotice(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM notice`, async (err, rows) => {
					await connection.release();
					err ? reject(err) : resolve(rows)
				})
			})
		})
	}

	/**
	 * model: notice 이미지 리스트 조회
	 * @returns {Promise<void>}
	 */
	listNoticeImg(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT noticeImg FROM notice`, async (err, rows) => {
					await connection.release();
					if (err) {
						reject(err);
					} else {
						let imgRows: string[] = rows.map(function(row) {
							return row.noticeImg;
						});
						resolve(imgRows);
					}
				})
			})
		})
	}
}

export const notice: Notice = new Notice();
