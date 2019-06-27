import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Posts {
	/**
	 * model: posts 필터
	 * @param filter
	 */
	async filterPosts(filter: string) {
		try {
			filter = filter.replace(/ eq /gi, ' = ');
			filter = filter.replace(/ and /gi, ' AND ');
			filter = filter.replace(/ or /gi, ' OR ');
			filter = filter.replace(/ gt /gi, ' > ');
			filter = filter.replace(/ ge /gi, ' >= ');
			filter = filter.replace(/ lt /gi, ' < ');
			filter = filter.replace(/ le /gi, ' <= ');
			filter = filter.replace(/ is /gi, ' IS ');
			filter = filter.replace(/ like /gi, ' LIKE ');

			filter = `AND ` + filter;
			let filterArray: any = filter.split(' ');

			for (let i = 0; i < filterArray.length; i++) {
				/** 포스트 키에 맞도록 커스터마이징 */
				if (filterArray[i] === `postsCategoryIndex`) {
					filterArray[i] = `t3.postsCategoryIndex`;
				}

				/** 필터 각 요소 정리 */
				if (filterArray[i].indexOf('\'') != -1) {
					for (let x = 0; x < 2; x++) {
						filterArray[i] = filterArray[i].replace('\'', '');
					}
				} else if (isNaN(filterArray[i]) === false) {
					filterArray[i] = parseInt(filterArray[i]);
				} else {
					filterArray[i] = filterArray[i];
				}

				/** 포스트 값에 맞도록 커스터마이징 */
				if (filterArray[i] === ('=') || filterArray[i] === ('>=') || filterArray[i] === ('>') || filterArray[i] === ('<=') || filterArray[i] === ('<')) {
					if (filterArray[i + 1] == 'true' || filterArray[i + 1] == 'false') {
						filterArray[i + 1] = `${filterArray[i + 1]}`;
					} else {
						filterArray[i + 1] = `"${filterArray[i + 1]}"`;
					}
				}
				if (filterArray[i] === ('LIKE')) {
					filterArray[i - 1] = `REPLACE(${filterArray[i - 1]}, ' ', '')`;
					filterArray[i + 1] = `"%${filterArray[i + 1]}%"`;
				}
			}

			/** 포스트 SQL 문으로 정리 */
			let filterString: string = filterArray.join(' ');
			filterString = filterString + ' ';

			return filterString;
		} catch (err) {
			throw new Error('Posts filter does not exist');
		}
	}

	/**
	 * model: posts 정렬
	 * @param orderBy
	 */
	async orderByPosts(orderBy: string) {
		try {
			for (let i = 0; i < orderBy.length; i++) {
				orderBy = orderBy.replace(' ', ':');
			}

			let orderByObj: any = {};
			let resultArray = orderBy.split(':');
			orderByObj[resultArray[0]] = resultArray[1];
			return orderByObj;
		} catch (err) {
			throw new Error('Posts orderBy does not exist');
		}
	}

	/**
	 * model : posts 생성
	 * @param postsData
	 * @returns {Promise<void>}
	 */
	createPosts(postsData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO posts SET ?`, [postsData], (err, result) => {
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
	 * model: posts 리스트 조회
	 * @param filter
	 */
	listPosts(filter: string) {
		return new Promise(async (resolve, reject) => {
			let sql: any = `SELECT 
			t1.postsIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName 
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
			WHERE t1.postsIndex IS NOT NULL `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts page 리스트 조회
	 * @param filter
	 * @param orderBy
	 * @param page
	 * @param count
	 */
	pageListPosts(filter: string, orderBy: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let sortType;

			let start = (page - 1) * count;
			if (start < 0) {
				start = 0;
			}

			let sql: any = `SELECT 
			t1.postsIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName,
			(SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
			WHERE t1.postsIndex IS NOT NULL `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			if (orderBy) {
				const orderByObj = await this.orderByPosts(orderBy);
				if (orderByObj.hasOwnProperty('createdAt')) {
					sortType = orderByObj.createdAt;
					sql = sql + `ORDER BY t1.createdAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('updatedAt')) {
					sortType = orderByObj.updatedAt;
					sql = sql + `ORDER BY t1.updatedAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('goodCount')) {
					sortType = orderByObj.goodCount;
					sql = sql + `ORDER BY t1.goodCount ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('badCount')) {
					sortType = orderByObj.badCount;
					sql = sql + `ORDER BY t1.badCount ${sortType} `;
				}
			} else {
				sql = sql + `ORDER BY t1.createdAt DESC `;
			}

			sql = sql + `LIMIT ${start}, ${count}`;

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts isScrap 리스트 조회
	 * @param filter
	 */
	listPostsByIsScrap(userIndex: number, filter: string) {
		return new Promise(async (resolve, reject) => {
			let sql: any = `SELECT 
			t1.postsIndex,
			t1.userIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
			INNER JOIN postsSubscriber AS t4 ON t1.postsIndex = t4.postsIndex AND t4.userIndex = ${userIndex}
			WHERE t1.postsIndex IS NOT NULL AND t4.isScrap = 1 `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts page isScrap 리스트 조회
	 * @param userIndex
	 * @param filter
	 * @param orderBy
	 * @param page
	 * @param count
	 */
	pageListPostsByIsScrap(userIndex: number, filter: string, orderBy: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let sortType;

			let start = (page - 1) * count;
			if (start < 0) {
				start = 0;
			}

			let sql: any = `SELECT 
			t1.postsIndex,
			t1.userIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName,
			t4.isScrap,
			(SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
			INNER JOIN postsSubscriber AS t4 ON t1.postsIndex = t4.postsIndex AND t4.userIndex = ${userIndex}
      WHERE t1.postsIndex IS NOT NULL AND t4.isScrap = 1 `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			if (orderBy) {
				const orderByObj = await this.orderByPosts(orderBy);
				if (orderByObj.hasOwnProperty('createdAt')) {
					sortType = orderByObj.createdAt;
					sql = sql + `ORDER BY t1.createdAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('updatedAt')) {
					sortType = orderByObj.updatedAt;
					sql = sql + `ORDER BY t1.updatedAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('goodCount')) {
					sortType = orderByObj.goodCount;
					sql = sql + `ORDER BY t1.goodCount ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('badCount')) {
					sortType = orderByObj.badCount;
					sql = sql + `ORDER BY t1.badCount ${sortType} `;
				}
			} else {
				sql = sql + `ORDER BY t1.createdAt DESC `;
			}

			sql = sql + `LIMIT ${start}, ${count}`;

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts userIndex 리스트 조회
	 * @param userIndex
	 * @param filter
	 */
	listPostsByUserIndex(userIndex: number, filter: string) {
		return new Promise(async (resolve, reject) => {
			let sql: any = `SELECT 
			t1.postsIndex,
			t1.userIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
			WHERE t1.postsIndex IS NOT NULL AND t1.userIndex = ${userIndex} `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts page userIndex 리스트 조회
	 * @param userIndex
	 * @param filter
	 * @param orderBy
	 * @param page
	 * @param count
	 */
	pageListPostsByUserIndex(userIndex: number, filter: string, orderBy: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let sortType;

			let start = (page - 1) * count;
			if (start < 0) {
				start = 0;
			}

			let sql: any = `SELECT 
			t1.postsIndex,
			t1.userIndex,
			t1.postsCategoryIndex,
			t1.title, 
			t1.content,
			t1.count,
			t1.goodCount,
			t1.badCount,
			t1.status,
			t1.createdAt, 
			t2.userNickName,
			t3.postsCategoryName,
			(SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount
      FROM posts AS t1
      INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
			INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
      WHERE t1.postsIndex IS NOT NULL AND t1.userIndex = ${userIndex} `;

			if (filter) {
				const resultFilter = await this.filterPosts(filter);
				sql = sql + resultFilter;
			}

			if (orderBy) {
				const orderByObj = await this.orderByPosts(orderBy);
				if (orderByObj.hasOwnProperty('createdAt')) {
					sortType = orderByObj.createdAt;
					sql = sql + `ORDER BY t1.createdAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('updatedAt')) {
					sortType = orderByObj.updatedAt;
					sql = sql + `ORDER BY t1.updatedAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('goodCount')) {
					sortType = orderByObj.goodCount;
					sql = sql + `ORDER BY t1.goodCount ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('badCount')) {
					sortType = orderByObj.badCount;
					sql = sql + `ORDER BY t1.badCount ${sortType} `;
				}
			} else {
				sql = sql + `ORDER BY t1.createdAt DESC `;
			}

			sql = sql + `LIMIT ${start}, ${count}`;

			await pool.getConnection(async function(err, connection) {
				await connection.query(sql, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			});
		});
	}

	/**
	 * model: posts 게시물 조회
	 * @param {number} postsIndex
	 * @returns {Promise<void>}
	 */
	getPosts(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.title,
				t1.content,
				t1.status,
				t1.goodCount,
			  t1.badCount,
				t1.createdAt,
				t2.userNickName,
				t3.postsCategoryIndex,
				t3.postsCategoryName,
			  (SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount
        FROM posts AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
        WHERE t1.postsIndex = ?`, [postsIndex], async (err, data) => {
					if (err) {
						await connection.release();
						reject(err);
					} else if (data[0] == null) {
						await connection.release();
						reject('This posts does not exist');
					} else {
						await connection.release();
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: posts userIndex 포함한 게시물 조회
	 * @param {number} postsIndex
	 * @returns {Promise<void>}
	 */
	getPostsIncludeUserIndex(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.title,
				t1.content,
				t1.status,
				t1.goodCount,
			  t1.badCount,
				t1.createdAt,
				t2.userIndex,
				t2.userNickName,
				t3.postsCategoryIndex,
				t3.postsCategoryName,
			  (SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount
        FROM posts AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
        WHERE t1.postsIndex = ?`, [postsIndex], async (err, data) => {
					if (err) {
						await connection.release();
						reject(err);
					} else if (data[0] == null) {
						await connection.release();
						reject('This posts does not exist');
					} else {
						await connection.release();
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: posts title 조회
	 * @param title
	 */
	getPostsByTitle(title: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.title,
				t1.content,
			  t1.status,
				t1.createdAt,
				t2.userNickName,
				t3.postsCategoryIndex,
				t3.postsCategoryName,
			  (SELECT COUNT(*) AS count FROM postsReply WHERE t1.postsIndex = postsReply.postsIndex) AS postsReplyCount 
        FROM posts AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
        WHERE t1.title = ?`, [title], async (err, data) => {
					if (err) {
						await connection.release();
						reject(err);
					} else if (data[0] == null) {
						await connection.release();
						reject('This posts does not exist');
					} else {
						await connection.release();
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: posts userIndex 조회
	 * @param userIndex
	 */
	getPostsByUserIndex(userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.title,
				t1.content,
			  t1.status,
				t1.createdAt,
				t2.userIndex,
				t2.userNickName,
				t3.postsCategoryIndex,
				t3.postsCategoryName
        FROM posts AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        INNER JOIN postsCategory AS t3 ON t1.postsCategoryIndex = t3.postsCategoryIndex
        WHERE t1.userIndex = ?
        ORDER BY t1.createdAt DESC
        `, [userIndex], async (err, data) => {
					if (err) {
						await connection.release();
						reject(err);
					} else if (data[0] == null) {
						await connection.release();
						reject('This posts does not exist');
					} else {
						await connection.release();
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model : posts status 업데이트
	 * @param {number} postsIndex
	 * @param {string} status
	 * @returns {Promise<void>}
	 */
	updatePostsStatus(postsIndex: number, status: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE posts SET status = ? WHERE postsIndex = ?`, [status, postsIndex], (err) => {
					connection.release();
					if (err) {
						reject('posts Status Update Error');
					} else {
						resolve();
					}
				});
			});
		});
	}

	/**
	 * model : posts 업데이트
	 * @param {number} postsIndex
	 * @param postsData
	 * @returns {Promise<void>}
	 */
	updatePosts(postsIndex: number, postsData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE posts SET ? WHERE postsIndex = ?`, [postsData, postsIndex], (err) => {
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
	 * model: posts 조회수 업데이트
	 * @param {number} postsIndex
	 * @returns {Promise<void>}
	 */
	updatePostsByCount(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE posts SET count = count + 1 WHERE postsIndex = ?`, [postsIndex], (err, data) => {
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
	 * model: posts 삭제
	 * @param {number} postsIndex
	 * @returns {Promise<void>}
	 */
	deletePosts(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`
				DELETE FROM posts WHERE postsIndex = ?`, [postsIndex], (err, data) => {
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

export const posts: Posts = new Posts();
