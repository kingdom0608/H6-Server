import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsSubscriber {
	/**
	 * model: postsSubscriber 생성
	 * @param postsSubscriberData
	 */
	createPostsSubscriber(postsSubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsSubscriber SET ?`, [postsSubscriberData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsSubscriberData);
					}
				});
			});
		});
	}

	/**
	 * model: postsSubscriber 게시글별 조회
	 * @param postsIndex
	 */
	getPostsSubscriber(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT
				t1.postsIndex,
				t1.isGood,
				t1.isBad,
				t1.isScrap,
				t2.userIndex,
				t2.userId,
				t2.userNickName
				FROM postsSubscriber AS t1
				INNER JOIN user AS t2 ON user.userIndex = postsSubscriber.userIndex
        WHERE postsSubscriber.postsIndex = ?
        `, [postsIndex], (err, data) => {
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
	 * model: postsSubscriber 개수 조회
	 * @param postsIndex
	 */
	getPostsSubscriberSumCount(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT
				SUM(postsSubscriber.isGood) AS goodCount,
			  SUM(postsSubscriber.isBad) AS badCount
			  FROM postsSubscriber
        WHERE postsSubscriber.postsIndex = ?
        `, [postsIndex], (err, data) => {
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
	 * model: postsSubscriber 사용자별 개수 조회
	 * @param postsIndex
	 * @param userIndex
	 */
	getPostsSubscriberByUserIndex(postsIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.isGood,
				t1.isBad,
				t1.isScrap,
				t2.userIndex,
				t2.userId,
				t2.userNickName
				FROM postsSubscriber AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsIndex = ?
        AND t1.userIndex = ?
        `, [postsIndex, userIndex], (err, data) => {
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
	 * model: postsSubscriber 업데이트
	 * @param postsIndex
	 * @param userIndex
	 * @param postsSubscriberData
	 */
	updatePostsSubscriber(postsIndex: number, userIndex: number, postsSubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE 
				postsSubscriber SET ? 
				WHERE postsIndex = ? 
				AND userIndex = ?`, [postsSubscriberData, postsIndex, userIndex], (err, data) => {
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
	 * model: postsSubscriber 삭제
	 * @param postsIndex
	 * @param userIndex
	 */
	deletePostsSubscriber(postsIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsSubscriber WHERE postsIndex = ? AND userIndex = ?`,
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
}

export const postsSubscriber: PostsSubscriber = new PostsSubscriber();