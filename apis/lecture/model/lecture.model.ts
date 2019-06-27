import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Lecture {
	/**
	 * model: lecture 생성
	 * @param lectureData
	 * @returns {Promise<any>}
	 */
	createLecture(lectureData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('INSERT INTO lecture SET ?', [lectureData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(lectureData);
					}
				})
			})
		})
	}

	/**
	 * model: lecture 리스트 조회
	 * @returns {Promise<any>}
	 */
	listLecture(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM lecture', function(err, rows) {
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
	 * model: lecture index 조회
	 * @param {number} lectureIndex
	 * @returns {Promise<any>}
	 */
	getLectureByLectureIndex(lectureIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM lecture WHERE lectureIndex = ?', [lectureIndex], function(err, rows) {
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
	 * model: lecture lectureCode 조회
	 * @param {string} lectureCode
	 * @returns {Promise<any>}
	 */
	getLectureByLectureCode(lectureCode: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM lecture WHERE lectureCode LIKE '%${escape(lectureCode)}%'`, function(err, rows) {
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
	 * model: lecture lectureName 조회
	 * @param {string} lectureName
	 * @returns {Promise<any>}
	 */
	getLectureByLectureName(lectureName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM lecture WHERE lectureName LIKE ?`, [`%${lectureName}%`], function(err, rows) {
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
	 * model: lecture track 조회
	 * @param {string} track
	 * @returns {Promise<any>}
	 */
	getLectureByTrack(track: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM lecture WHERE track LIKE ?`, [`%${track}%`], function(err, rows) {
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
	 * model: lecture 업데이트
	 * @param {number} lectureIndex
	 * @param lectureData
	 * @returns {Promise<any>}
	 */
	updateLecture(lectureIndex: number, lectureData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('UPDATE lecture SET ? WHERE lectureIndex = ?', [lectureData,
					lectureIndex], function(err, rows) {
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
	 * model: lecture 삭제
	 * @param {number} lectureIndex
	 * @returns {Promise<any>}
	 */
	deleteLecture(lectureIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM lecture WHERE lectureIndex = ?', [lectureIndex], function(err, rows) {
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

export const lecture: any = new Lecture();