import { expect } from 'chai';
import { admissionYear } from './admissionYear.model';

describe('admissionYear 모델', () => {
	it('listAdmissionYear', async () => {
		const result = await admissionYear.listAdmissionYear();
		// console.log(result);
		expect(result).instanceof(Array);
	});
});
