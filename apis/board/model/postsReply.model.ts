import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsReplyModel {
	/**
	 * model: 댓글 생성
	 * @param postsData
	 */
	createPostsReply(postsData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsReply SET ?`, [postsData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsData);
					}
				})
			})
		})
	}

	/**
	 * model: postsIndex 댓글 리스트 조회
	 * @param {number} postsIndex
	 * @returns {Promise<void>}
	 */
	listPostsReply(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsReplyIndex, 
				t1.parentsPostsReplyIndex,
				t1.postsIndex,
				t1.content,
				t1.status,
				t1.createdAt, 
				t2.userNickName
				FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsIndex = ?
        AND t1.parentsPostsReplyIndex IS NULL
        ORDER BY t1.createdAt ASC`, [postsIndex], (err, data) => {
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
	 * model: parentsPostReplyIndex 댓글 리스트 조회
	 * @param parentsPostReplyIndex
	 */
	listChildPostsReply(parentsPostReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT
				t1.postsReplyIndex,
				t1.parentsPostsReplyIndex,
				t1.postsIndex,
				t1.content,
				t1.status,
				t1.createdAt, 
				t2.userNickName
				FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.parentsPostsReplyIndex = ?
        ORDER BY t1.createdAt ASC`, [parentsPostReplyIndex], (err, data) => {
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
	 * model: postsReply 댓글 page 리스트 조회
	 * @param {number} postsIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListPostsReply(postsIndex: number, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT 
				t1.postsReplyIndex,
				t1.parentsPostsReplyIndex,
				t1.postsIndex,
			  t1.content,
			  t1.status,
        t1.createdAt,
				t2.userNickName,
				(SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsReplyIndex = postsReply.parentsPostsReplyIndex) AS childPostsReplyCount
        FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex                 
        WHERE t1.postsIndex = ?
        AND t1.parentsPostsReplyIndex IS NULL
        ORDER BY t1.createdAt ASC LIMIT ${start}, ${count}`, [postsIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: childPostsReply 댓글 page 리스트 조회
	 * @param parentsPostReplyIndex
	 * @param page
	 * @param count
	 */
	pageListChildPostsReply(parentsPostReplyIndex: number, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT
				t1.postsReplyIndex,
				t1.parentsPostsReplyIndex,
				t1.postsIndex,
				t1.content,
				t1.status,
				t1.createdAt, 
				t2.userNickName
				FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.parentsPostsReplyIndex = ?
        ORDER BY t1.createdAt ASC LIMIT ${start}, ${count}`, [parentsPostReplyIndex], (err, data) => {
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
	 * model: postsReply 조회
	 * @param postsReplyIndex
	 */
	getPostsReply(postsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsReplyIndex,
				t1.postsIndex,
				t1.content,
				t1.status,
				t1.createdAt,
				t2.userNickName
        FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsReplyIndex = ?`, [postsReplyIndex], async (err, data) => {
					if (err) {
						await connection.release();
						reject(err);
					} else if (data[0] == null) {
						await connection.release();
						reject('This postsReply does not exist');
					} else {
						await connection.release();
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: postsReplyIndex userIndex 포함한 게시물 조회
	 * @param postsReplyIndex
	 */
	getPostsReplyIncludeUserIndex(postsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsReplyIndex,
				t1.postsIndex,
				t1.content,
				t1.status,
				t1.createdAt,
				t2.userIndex,
				t2.userNickName
        FROM postsReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsReplyIndex = ?`, [postsReplyIndex], async (err, data) => {
					await connection.release();
					if (err) {
						reject(err);
					} else if (data[0] == null) {
						reject('This postsReply does not exist');
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: postsReply 업데이트
	 * @param {number} postsReplyIndex
	 * @param postsReplyData
	 * @returns {Promise<void>}
	 */
	updatePostsReply(postsReplyIndex: number, postsReplyData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE postsReply SET ? WHERE postsReplyIndex = ?`,
					[postsReplyData, postsReplyIndex], (err) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(postsReplyData);
						}
					});
			});
		});
	}

	/**
	 * model: postsReply status 업데이트
	 * @param {number} postsReplyIndex
	 * @param {string} status
	 * @returns {Promise<void>}
	 */
	updatePostsReplyStatus(postsReplyIndex: number, status: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE postsReply SET status = ? WHERE postsReplyIndex = ?`, [status,
					postsReplyIndex], (err) => {
					connection.release();
					if (err) {
						reject('postsReply Status Update Error');
					} else {
						resolve();
					}
				});
			});
		});
	}

	/**
	 * model: postsReply 삭제
	 * @param {number} postsReplyIndex
	 * @returns {Promise<void>}
	 */
	deletePostsReply(postsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsReply WHERE postsReplyIndex = ?`, [postsReplyIndex], (err, data) => {
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
	 * model: childPostsReply 삭제
	 * @param parentsPostsReplyIndex
	 */
	deleteChildPostsReply(parentsPostsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsReply WHERE parentsPostsReplyIndex = ?`, [parentsPostsReplyIndex], (err, data) => {
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

export const postsReply: PostsReplyModel = new PostsReplyModel();