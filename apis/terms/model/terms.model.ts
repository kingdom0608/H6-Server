import * as fs from 'graceful-fs';

const path: any = require('path');

/**
 * model: 약관 HTML 파일 로드
 * @param {string} termsName
 * @returns {any}
 */
export function loadTermsHtml(termsName: string): any {
	return new Promise(async (resolve, reject) => {
		const file: string = path.join(__dirname, '..', 'template', `${termsName}.html`);
		if (!fs.existsSync(file)) {
			return reject('Terms does not exist');
		}
		const result = fs.readFileSync(file, 'utf8');
		return resolve(result);
	});
}