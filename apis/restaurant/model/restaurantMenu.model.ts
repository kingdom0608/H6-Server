import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class RestaurantMenu {
	/**
	 * model: restaurantMenu 생성
	 * @param : restaurantMenuData
	 * @returns {Promise<any>}
	 */
	createRestaurantMenu(restaurantMenuData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurantMenu SET ?`, [restaurantMenuData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantMenuData);
					}
				});
			});
		});
	}

	/**
	 * model: 모든 restaurantMenu 조회
	 * @param: void
	 * @returns {Promise<any>}
	 */
	listRestaurantMenus(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantMenu`, (err, data) => {
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
	 * model: restaurantIndex 에 따른 restaurantMenu 리스트 조회
	 * @param: void
	 * @returns {Promise<any>}
	 */
	listRestaurantMenusByRestaurantIndex(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM restaurantMenu WHERE restaurantIndex = ? ORDER BY priority ASC`, [restaurantIndex], (err, data) => {
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
	 * model: restaurantIndex 에 따른 restaurantMenu 조회
	 * @param: {number} restaurantMenuIndex
	 * @returns {Promise<any>}
	 */
	getRestaurantMenu(restaurantMenuIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantMenu WHERE restaurantMenuIndex = ?`, [restaurantMenuIndex], (err, data) => {
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
	 * model: restaurantIndex 에 따른 Priority restaurantMenu 조회
	 * @param: {number} restaurantIndex
	 * @returns {Promise<any>}
	 */
	getRestaurantPriorityMenus(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT name from restaurantMenu 
				WHERE restaurantIndex=? AND priority IS NOT NULL
				ORDER BY priority ASC`, [restaurantIndex], (err, data) => {
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
	 * model: restaurantMenu 업데이트
	 * @param {number} restaurantMenuIndex
	 * @param restaurantMenuData
	 * @returns {Promise<any>}
	 */
	updateRestaurantMenu(restaurantMenuIndex: number, restaurantMenuData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE restaurantMenu SET ? WHERE restaurantMenuIndex = ?`, [restaurantMenuData,
					restaurantMenuIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantMenuData);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantMenu 삭제
	 * @param {number} restaurantMenuIndex
	 * @returns {Promise<any>}
	 */
	deleteRestaurantMenu(restaurantMenuIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurantMenu WHERE restaurantMenuIndex = ?`, [restaurantMenuIndex], (err, data) => {
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

export const restaurantMenu: RestaurantMenu = new RestaurantMenu();