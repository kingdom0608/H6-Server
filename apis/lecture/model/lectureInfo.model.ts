import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { lectureReply } from './lectureReply.model';

const pool = mysqlUtil.pool;

// TODO(@jade): textbook 칼럼 추가  date: 2018. 2. 21. 오후 6:11
export class LectureInfo {

	/**
	 * model: lectureInfo 생성
	 * @param lectureInfoData
	 * @returns {Promise<void>}
	 */
	createLectureInfo(lectureInfoData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO lectureInfo SET ?`, [lectureInfoData], async function(err) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(lectureInfoData);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo 리스트 조회
	 * @returns {Promise<void>}
	 */
	listLectureInfo(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureName, t2.track, t3.professorName 
					FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
					INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex
					ORDER BY t1.updatedAt DESC`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo page 리스트 조회
	 * @returns {Promise<any>}
	 */
	pageListLectureInfo(page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureName, t2.track, t3.professorName
          FROM lectureInfo AS t1 
          INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
          INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
          ORDER BY t1.updatedAt DESC LIMIT ${start}, ${count}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo searchTerm 리스트 조회
	 * @param {string} searchTerm
	 * @returns {Promise<void>}
	 */
	listLectureInfoBySearchTerm(searchTerm: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureCode, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureCode LIKE ?
				OR t2.lectureName LIKE ?
				OR t2.track LIKE ? 
				OR t3.professorName LIKE ?`, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`,
					`%${searchTerm}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo searchTerm page 리스트 조회
	 * @param {string} searchTerm
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListLectureInfoBySearchTerm(searchTerm: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureCode, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureCode LIKE ? 
				OR t2.lectureName LIKE ?
				OR t2.track LIKE ?
				OR t3.professorName LIKE ?
				ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${searchTerm}%`, `%${searchTerm}%`,
					`%${searchTerm}%`, `%${searchTerm}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo index 조회
	 * @param lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	getLectureInfoByLectureInfoIndex(lectureInfoIndex: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t1.lectureInfoIndex = ?`, [lectureInfoIndex], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo lectureName 리스트 조회
	 * @param lectureName
	 * @returns {Promise<void>}
	 */
	listLectureInfoByLectureName(lectureName: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureName LIKE ?`, [`%${lectureName}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo lectureName page 리스트 조회
	 * @param lectureName
	 * @returns {Promise<void>}
	 */
	pageListLectureInfoByLectureName(lectureName: any, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
          FROM lectureInfo AS t1 
          INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
          INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
          WHERE t2.lectureName LIKE ?
          ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${lectureName}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo professorName 리스트 조회
	 * @param professorName
	 * @returns {Promise<void>}
	 */
	listLectureInfoByProfessorName(professorName: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t3.professorName LIKE ?`, [`%${professorName}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo professorName page 리스트 조회
	 * @param professorName
	 * @returns {Promise<void>}
	 */
	pageListLectureInfoByProfessorName(professorName: any, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lectureInfo AS t1 
                INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t3.professorName LIKE ?
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${professorName}%`], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: listLectureInfo userIndex 리스트 조회
	 * @param userIndex
	 */
	listLectureInfoByUserIndex(userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1
				INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				INNER JOIN lectureReply AS t4 ON t1.lectureInfoIndex = t4.lectureInfoIndex
				WHERE t4.userIndex = ?`, [userIndex], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: listLectureInfo userIndex page 리스트 조회
	 * @param userIndex
	 * @param page
	 * @param count
	 */
	pageListLectureInfoByUserIndex(userIndex: number, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let start = (page - 1) * count;
			if (start < 0) {
				start = 0;
			}
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1
				INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				INNER JOIN lectureReply AS t4 ON t1.lectureInfoIndex = t4.lectureInfoIndex
				WHERE t4.userIndex = ?
				ORDER BY t4.createdAt ASC LIMIT ${start}, ${count}`, [userIndex], async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo 업데이트
	 * @param {number} lectureInfoIndex
	 * @param lectureInfoData
	 * @returns {Promise<void>}
	 */
	updateLectureInfo(lectureInfoIndex: number, lectureInfoData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE lectureInfo SET ? WHERE lectureInfoIndex = ?`, [lectureInfoData,
					lectureInfoIndex], async function(err) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(lectureInfoData);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo 평균 업데이트
	 * @param {number} lectureInfoIndex
	 * @param {number} average
	 * @returns {Promise<void>}
	 */
	updateLectureInfoAverage(lectureInfoIndex: number, average: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE lectureInfo SET average = ?, updatedAt = now() WHERE lectureInfoIndex = ?`, [average,
					lectureInfoIndex], async function(err, rows) {
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

	/**
	 * model: lectureInfo 삭제
	 * @param {number} lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	deleteLectureInfo(lectureInfoIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM lectureInfo WHERE lectureInfoIndex = ?', [lectureInfoIndex], async function(err, rows) {
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

export const lectureInfo: any = new LectureInfo();