import { mysqlUtil } from '../../../packages/utils/mysql.util';

const {pool} = mysqlUtil;

export class RestaurantTag {
	/**
	 * model: restaurantTag 생성
	 * @param : restaurantTagData
	 * @returns {Promise<any>}
	 */
	createRestaurantTag(restaurantTagData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurantTag SET ?`, [restaurantTagData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantTagData);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantIndex 에 따른 restaurantTag 조회
	 * @param: {number} restaurantIndex
	 * @returns {Promise<any>}
	 */
	getRestaurantTag(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT tag FROM restaurantTag WHERE restaurantIndex=?`, [restaurantIndex], (err, data) => {
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
	 * model: Tag 에 따른 restaurantTag 조회
	 * @param: {string} tag
	 * @returns {Promise<any>}
	 */
	getRestaurantTagByTag(tag: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM restaurantTag WHERE tag=?`, [tag], (err, data) => {
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
	 * model: restaurantTag 삭제
	 * @param {number} restaurantTagIndex
	 * @returns {Promise<any>}
	 */
	deleteRestaurantTag(restaurantTagIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurantTag WHERE restaurantTagIndex=?`, [restaurantTagIndex], (err, data) => {
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

export const restaurantTag: RestaurantTag = new RestaurantTag();