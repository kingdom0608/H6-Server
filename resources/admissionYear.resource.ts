export class AdmissionYearResource {
	private admissionYear;

	constructor(admissionYearData) {
		this.setAdmission(admissionYearData.admissionYear);
	}

	getAdmission() {
		return this.admissionYear;
	}

	setAdmission(admissionYear) {
		this.admissionYear = admissionYear;
	}

	getAdmissionYear() {
		let admissionResource: object = {
			admissionYear: this.getAdmission()
		};
		return admissionResource;
	}
}
