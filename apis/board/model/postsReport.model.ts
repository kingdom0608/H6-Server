import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsReport {

	/**
	 * model: postsReport 생성
	 * @param : postsReportData
	 * @returns {Promise<any>}
	 */
	createPostsReport(postsReportData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsReport SET ?`, [postsReportData], async (err) => {
					await connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsReportData);
					}
				})
			})
		});
	}

	/**
	 * model: PostsReport 중복 신고 확인
	 * @param : {number} postsIndex
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */

	checkPostsReport(postsIndex: number, userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReport where postsIndex=? AND userIndex=?`,
					[postsIndex, userIndex], (err, data) => {
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
	 * model: postsIndex 신고횟수 조회
	 * @param : {number} postsIndex
	 * @returns {Promise<any>}
	 */
	getPostsReportCount(postsIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT postsIndex, count(*) as reportCount 
    			from postsReport where postsIndex=? group by postsIndex`, [postsIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				})
			})
		});
	}

	/**
	 * model : PostsReport 모든 신고 리스트 조회
	 * @returns {Promise<any>}
	 */
	listPostsReport(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReport`, (err, data) => {
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
	 * model : PostsReport By User 특정 유저가 신고 리스트 조회
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */
	getPostsReportByUserIndex(userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReport WHERE userIndex=?`, [userIndex], (err, data) => {
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
	 * model : PostsReport By Post 특정 게시글 신고 리스트 조회
	 * @param : {number} postsIndex
	 * @returns {Promise<any>}
	 */
	getPostsReportByPostIndex(postsIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReport WHERE postsIndex=?`, [postsIndex], (err, data) => {
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
	 * model: postsReport 업데이트
	 * @param : {number} postsReportIndex
	 * @param : {number} postsReportData
	 * @returns {Promise<any>}
	 */
	updatePostsReport(postsReportIndex: number, postsReportData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE postsReport SET ? WHERE postsReportIndex=?`, [postsReportData,
					postsReportIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsReportData);
					}
				});
			});
		});
	}

	/**
	 * model: postsReport 삭제 (신고 철회)
	 * @param : {number} postsIndex
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */
	deletePostsReport(postsIndex: number, userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsReport WHERE postsIndex=? AND userIndex=?`, [postsIndex,
					userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(data);
					}
				})
			})
		});
	}
}

export const postsReport: any = new PostsReport();