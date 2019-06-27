import { mysqlUtil } from '../../../packages/utils/mysql.util';

const {pool} = mysqlUtil;

export class RestaurantImage {

	/**
	 * model: restaurantImage 생성
	 * @param : restaurantImageData
	 * @returns {Promise<any>}
	 */
	createRestaurantImage(restaurantImageData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurantImage SET ?`, [restaurantImageData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantImageData);
					}
				});
			});
		});
	}

	/**
	 * model: 모든 restaurantImage 조회
	 * @param : void
	 * @returns {Promise<any>}
	 */
	listRestaurantImage(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantImage`, (err, data) => {
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
	 * model: restaurantIndex에 따른 restaurantImage 조회
	 * @param: {number} restaurantIndex
	 * @returns {Promise<any>}
	 */
	listRestaurantImagesByRestaurantIndex(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantImage WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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
	 * model: restaurantImage 조회
	 * @param : {number} restaurantImageIndex
	 * @returns {Promise<any>}
	 */
	getRestaurantImage(restaurantImageIndex): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM restaurantImage where restaurantImageIndex=?`, [restaurantImageIndex], (err, data) => {
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
	 * model: restaurantImage 업데이트
	 * @param : {number} restaurantImageIndex
	 * @param : {any} restaurantImageData
	 * @returns {Promise<any>}
	 */
	updateRestaurantImage(restaurantImageIndex: number, restaurantImageData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE restaurantImage SET ? where restaurantImageIndex=?`, [restaurantImageData,
					restaurantImageIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantImageData);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantImage 업데이트
	 * @param : {number} restaurantImageIndex
	 * @returns {Promise<any>}
	 */
	deleteRestaurantImage(restaurantImageIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurantImage where restaurantImageIndex=?`, [restaurantImageIndex], (err, data) => {
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

export const restaurantImage: RestaurantImage = new RestaurantImage();