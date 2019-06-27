export class ProfessorResource {
	private professorName;
	private department;
	private address;
	private tel;
	private email;

	constructor(professorData) {
		this.setProfessorName(professorData.professorName);
		this.setDepartment(professorData.department);
		this.setAddress(professorData.address);
		this.setTel(professorData.tel);
		this.setEmail(professorData.email);
	}

	public getProfessorName() {
		return this.professorName;
	}

	public setProfessorName(professorName) {
		this.professorName = professorName;
	}

	public getDepartment() {
		return this.department;
	}

	public setDepartment(department) {
		this.department = department;
	}

	public getAddress() {
		return this.address;
	}

	public setAddress(address) {
		this.address = address;
	}

	public getTel() {
		return this.tel;
	}

	public setTel(tel) {
		this.tel = tel;
	}

	public getEmail() {
		return this.email;
	}

	public setEmail(email) {
		this.email = email;
	}

	getProfessor() {
		let professorResource: object = {
			professorName: this.getProfessorName(),
			department: this.getDepartment(),
			address: this.getAddress(),
			tel: this.getTel(),
			email: this.getEmail()
		};
		return professorResource;
	}
}