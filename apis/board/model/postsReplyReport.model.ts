import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsReplyReport {

	/**
	 * model: postsReplyReport 생성
	 * @param : postsReplyReportData
	 * @returns {Promise<any>}
	 */
	createPostsReplyReport(postsReplyReportData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsReplyReport SET ?`, [postsReplyReportData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsReplyReportData);
					}
				});
			});
		});
	}

	/**
	 * model: PostsReplyReport 중복 신고 확인
	 * @param : {number} postsReplyIndex
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */
	checkPostsReplyReport(postsReplyIndex: number, userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReplyReport where postsReplyIndex=? AND userIndex=?`, [postsReplyIndex,
					userIndex], (err, data) => {
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
	 * model: postsReplyIndex 신고횟수 조회
	 * @param : {number} postsReplyIndex
	 * @returns {Promise<any>}
	 */
	getPostsReplyReportCount(postsReplyIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT postsReplyIndex, count(*) as reportCount
              from postsReplyReport where postsReplyIndex=? group by postsReplyIndex`, [postsReplyIndex], (err, data) => {
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
	 * model : PostsReplyReport 모든 신고 리스트 조회
	 * @returns {Promise<any>}
	 */
	listPostsReplyReport(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReplyReport`, (err, data) => {
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
	 * model : PostsReplyReport By User 특정 유저의 댓글 신고 리스트 조회
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */
	getPostsReplyReportByUserIndex(userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsReplyReport where userIndex=?`, [userIndex], (err, data) => {
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
	 * model: postsReplyReport 업데이트
	 * @param : {number} postsReplyReportIndex
	 * @param : {any}    postsReportData
	 * @returns {Promise<any>}
	 */
	updatePostsReplyReport(postsReplyReportIndex: number, postsReplyReportData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE postsReplyReport SET ? where postsReplyReportIndex=?`,
					[postsReplyReportData, postsReplyReportIndex], (err) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(postsReplyReportData);
						}
					});
			});
		});
	}

	/**
	 * model: postsReplyReport 삭제 (신고 철회)
	 * @param : {number} postsReplyIndex
	 * @param : {number} userIndex
	 * @returns {Promise<any>}
	 */
	deletePostsReplyReport(postsReplyIndex: number, userIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsReplyReport WHERE postsReplyIndex=? AND userIndex=?`,
					[postsReplyIndex, userIndex], (err, data) => {
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

export const postsReplyReport: any = new PostsReplyReport();