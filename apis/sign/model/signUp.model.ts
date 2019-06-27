import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class SignUp {
	constructor() {
	}

	/**
	 * model: 회원가입
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO user SET ?`, [userData], async function(err, rows) {
					if (err) {
						await connection.release();
						return reject(err);
					} else {
						await connection.release();
						return resolve(rows);
					}
				});
			})
		})
	}
}

export const signUp: SignUp = new SignUp();
