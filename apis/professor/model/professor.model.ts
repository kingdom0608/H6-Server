import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Professor {
	constructor() {
	}

	/**
	 * model: professor 생성
	 * @param professorData
	 * @returns {Promise<any>}
	 */
	createProfessor(professorData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO professor SET ?`, [professorData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(professorData);
					}
				})
			})
		})
	}

	/**
	 * model: professor 리스트 조회
	 * @returns {Promise<any>}
	 */
	listProfessor(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM professor`, function(err, rows) {
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
	 * model: professor professorIndex 조회
	 * @param {number} professorIndex
	 * @returns {Promise<any>}
	 */
	getProfessorByProfessorIndex(professorIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM professor WHERE professorIndex = ?`, [professorIndex], function(err, rows) {
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
	 * model: professor professorName 조회
	 * @param {string} professorName
	 * @returns {Promise<any>}
	 */
	getProfessorByProfessorName(professorName: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM professor WHERE professorName LIKE ?`, [`%${professorName}%`], function(err, rows) {
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
	 * model: professor 업데이트
	 * @param {number} professorIndex
	 * @param professorData
	 * @returns {Promise<any>}
	 */
	updateProfessor(professorIndex: number, professorData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE professor SET ? WHERE professorIndex = ?`, [professorData,
					professorIndex], function(err, rows) {
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
	 * model: professor 삭제
	 * @param {number} professorIndex
	 * @returns {Promise<any>}
	 */
	deleteProfessor(professorIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`DELETE FROM professor WHERE professorIndex = ?`, [professorIndex], function(err, rows) {
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
}

export const professor: any = new Professor();
