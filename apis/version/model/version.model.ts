import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Version {
	/**
	 * model: version 생성
	 * @param versionData
	 * @returns {Promise<void>}
	 */
	createVersion(versionData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('INSERT INTO version SET ?', [versionData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(versionData);
					}
				})
			})
		})
	}

	/**
	 * model: version 리스트 조회
	 * @returns {Promise<void>}
	 */
	getVersion(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM version', function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows[0]);
					}
				})
			})
		})
	}

	/** model : version 업데이트
	 * @returns {Promise<void>}
	 */
	updateVersion(versionIndex: number, versionDate: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('UPDATE version SET ? where versionIndex = ?', [versionDate,
					versionIndex], function(err, rows) {
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
	 * model: version 삭제
	 * @param {number} versionIndex
	 * @returns {Promise<void>}
	 */
	deleteVersion(versionIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM version WHERE versionIndex = ?', [versionIndex], async function(err, rows) {
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

export const version: any = new Version();