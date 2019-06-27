import { mysqlUtil } from '../../../packages/utils/mysql.util';

const {pool} = mysqlUtil;

export interface PostsImageData {
	postsIndex: number,
	path: string
}

export class PostsImage {

	/**
	 * model: postsImage 생성
	 * @param {PostsImageData} postsImageData
	 * @returns {Promise<PostsImageData|string>}
	 */
	createPostsImage(postsImageData: PostsImageData): Promise<PostsImageData | string> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsImage SET ?`, [postsImageData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsImageData);
					}
				});
			});
		});
	}

	/**
	 * model: postsImage 조회
	 * @param {number} postsIndex
	 * @returns {Promise<object|string>}
	 */
	getPostsImage(postsIndex: number): Promise<object | string> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT path FROM postsImage where postsIndex = ?`, [postsIndex], (err, result) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		});
	}

	/**
	 * model: postsImage 업데이트
	 * @param {number} postsIndex
	 * @param {PostsImageData} postsData
	 * @returns {Promise<PostsImageData|string>}
	 */
	updatePostsImage(postsIndex: number, postsImageData: PostsImageData): Promise<PostsImageData | string> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE postsImage SET ? WHERE postsIndex = ?`, [postsImageData, postsIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsImageData);
					}
				});
			});
		});
	}

	/**
	 * model: postsImage 삭제
	 * @param {number} postsIndex
	 * @returns {Promise<object|string>}
	 */
	deletePostsImage(postsIndex: number): Promise<object | string> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsImage WHERE postsIndex = ?`, [postsIndex], (err, result) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		});
	}

	/**
	 * model: postsRemovedImage 생성
	 * @param {PostsImageData} postsRevmoedData
	 * @returns {Promise<object|string>}
	 */
	createPostsRemovedImage(postsRemovedImageData: PostsImageData): Promise<PostsImageData | string> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsRemovedImage SET ?`, [postsRemovedImageData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsRemovedImageData);
					}
				});
			});
		});
	}
}

export const postsImage: PostsImage = new PostsImage();
