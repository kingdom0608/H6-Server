import { mysqlUtil } from '../../../packages/utils/mysql.util';

const {pool} = mysqlUtil;

export class RestaurantSubscriber {

	/**
	 * model: restaurantSubscriber 생성
	 * @param restaurnatSubscriberData
	 * return : {Promise<any>}
	 */
	createRestaurantSubscriber(restaurantSubscriberData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurantSubscriber SET ?`, [restaurantSubscriberData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantSubscriberData);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantSubscriber 조회
	 * @param {number} userIndex
	 * @param {number} restaurantIndex
	 * return : {Promise<any>}
	 */
	getRestaurantSubscriber(userIndex: number, restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantSubscriber WHERE userIndex=? AND restaurantIndex=?`,
					[userIndex, restaurantIndex], (err, data) => {
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
	 * model: restaurantSubscriber 음식점별 good 갯수 합 조회
	 * @param {number} restaurantIndex
	 * return : {Promise<any>}
	 */
	getRestaurantSubscriberSumCount(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT SUM(isGood) as goodCount FROM restaurantSubscriber WHERE restaurantIndex=?`,
					[restaurantIndex], (err, data) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(data);
						}
					})
			});
		});
	}

	/**
	 * model: restaurantSubscriber 업데이트
	 * @param {number} userIndex
	 * @param {number} restaurantIndex
	 * @param restaurnatSubscriberData
	 * return : {Promise<any>}
	 */
	updateRestaurantSubscriber(userIndex: number, restaurantIndex: number, restaurantSubscriberData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE restaurantSubscriber SET ? WHERE userIndex=? AND restaurantIndex=?`,
					[restaurantSubscriberData, userIndex, restaurantIndex], (err, data) => {
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
	 * model: restaurantSubscriber 삭제
	 * @param {number} userIndex
	 * @param {number} restaurantIndex
	 * return : {Promise<any>}
	 */
	deleteRestaurantSubscriber(userIndex: number, restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurantSubscriber WHERE userIndex=? AND restaurantIndex=?`,
					[userIndex, restaurantIndex], (err, data) => {
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

export const restaurantSubscriber: RestaurantSubscriber = new RestaurantSubscriber();