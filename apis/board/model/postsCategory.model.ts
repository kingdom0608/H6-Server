import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsCategory {
	/**
	 * model: postsCategory 리스트 조회
	 */
	async listPostsCategory() {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from postsCategory ORDER BY postsCategory.order ASC`, (err, data) => {
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

export const postsCategory: PostsCategory = new PostsCategory();