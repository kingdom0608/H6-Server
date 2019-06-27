import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class AlarmModel {
	/**
	 * model: alarm 생성
	 * @param alarmData
	 */
	createAlarm(alarmData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO alarm SET ?`, [alarmData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(alarmData);
					}
				})
			})
		})
	}

	/**
	 * model: alarm 리스트 조회
	 * @param userIndex
	 */
	listAlarm(userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt,
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        ORDER BY t1.createdAt DESC`, [userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: alarm page 리스트 조회
	 * @param userIndex
	 * @param page
	 * @param count
	 */
	pageListAlarm(userIndex: number, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt,
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        ORDER BY t1.createdAt DESC LIMIT ${start}, ${count}`, [userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: alarm isRead 리스트 조회
	 * @param userIndex
	 * @param isRead
	 */
	listAlarmByIsRead(userIndex: number, isRead: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        AND t1.isRead = ${isRead}
        ORDER BY t1.createdAt DESC`, [userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	pageListAlarmByIsRead(userIndex: number, isRead: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        AND t1.isRead = ${isRead}
        ORDER BY t1.createdAt DESC LIMIT ${start}, ${count}`, [userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: alarm 조회
	 * @param alarmIndex
	 */
	getAlarm(alarmIndex: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.alarmIndex = ?
        `, [alarmIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (data[0] == null) {
						reject('This alarm does not exist');
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: alarm 업데이트
	 * @param alarmIndex
	 * @param alarmData
	 */
	updateAlarm(alarmIndex: string, alarmData: any) {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE alarm SET ? WHERE alarmIndex = ?`,
					[alarmData, alarmIndex], (err) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(alarmData);
						}
					});
			});
		});
	}

	/**
	 * model: alarm 삭제
	 * @param alarmIndex
	 */
	deleteAlarm(alarmIndex: string) {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM alarm WHERE alarmIndex = ?`, [alarmIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}
}

export const alarm: AlarmModel = new AlarmModel();
