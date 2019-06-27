import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class RestaurantCategory {
	/**
	 * model: restaurantCategory 리스트 조회
	 */
	async listRestaurantCategory() {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantCategory ORDER BY restaurantCategory.order ASC`, (err, data) => {
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

export const restaurantCategory: RestaurantCategory = new RestaurantCategory();