import * as fs from 'fs';
import * as nodemailer from 'nodemailer';

export module emailUtil {
	const file = './packages/utils/config/env.json';
	let emailData: any = fs.readFileSync(file, 'utf8');
	emailData = JSON.parse(emailData);

	export const smtpTransport = nodemailer.createTransport({
		service: emailData.service,
		auth: {
			user: emailData.auth.user,
			pass: emailData.auth.pass
		}
	});
}
