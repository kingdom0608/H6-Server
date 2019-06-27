import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Track {
	/**
	 * model: track 생성
	 * @param trackData
	 * @returns {Promise<void>}
	 */
	createTrack(trackData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('INSERT INTO track SET ?', [trackData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(trackData);
					}
				})
			})
		})
	}

	/**
	 * model: track 리스트 조회
	 * @returns {Promise<void>}
	 */
	listTrack(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM track', function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: track page 리스트 조회
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageListTrack(page?: number, count?: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				if (page && count) {
					let start = (page - 1) * count;
					if (start < 0) {
						start = 0;
					}
					await connection.query(`SELECT * FROM track ORDER BY trackName ASC LIMIT ${start}, ${count}`, function(err, rows) {
						if (err) {
							connection.release();
							reject(err);
						} else {
							connection.release();
							resolve(rows);
						}
					})
				} else {
					await connection.query(`SELECT * FROM track ORDER BY trackName`, function(err, rows) {
						if (err) {
							connection.release();
							reject(err);
						} else {
							connection.release();
							resolve(rows);
						}
					})
				}
			})
		})
	}

	/**
	 * model: track 삭제
	 * @param {string} trackName
	 * @returns {Promise<void>}
	 */
	deleteTrack(trackName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM track WHERE trackName = ?', [trackName], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}
}

export const track: any = new Track();