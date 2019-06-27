import * as fs from 'fs';
import * as mysql from 'mysql';

/** MySQL DB 연결 */
export module mysqlUtil {
	const file = './packages/utils/config/env.json';
	let mysqlData: any = fs.readFileSync(file, 'utf8');
	mysqlData = JSON.parse(mysqlData);

	export const pool = mysql.createPool({
		host: mysqlData.host,
		user: mysqlData.user,
		password: mysqlData.password,
		database: mysqlData.database,
		timezone: mysqlData.timezone,
		connectionLimit: mysqlData.connectionLimit,
		waitForConnections: mysqlData.waitForConnections,
		charset: mysqlData.charset
	});
}