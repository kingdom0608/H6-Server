export class LectureInfoResource {
	private lectureIndex;
	private professorIndex;
	private textbookIndex;
	private average;

	constructor(lectureInfoData) {
		this.setLectureIndex(lectureInfoData.lectureIndex);
		this.setProfessorIndex(lectureInfoData.professorIndex);
		this.setTextbookIndex(lectureInfoData.textbookIndex);
		this.setAverage(lectureInfoData.average);
	}

	getLectureIndex() {
		return this.lectureIndex;
	}

	setLectureIndex(lectureIndex) {
		this.lectureIndex = lectureIndex;
	}

	getProfessorIndex() {
		return this.professorIndex
	}

	setProfessorIndex(professorIndex) {
		this.professorIndex = professorIndex;
	}

	getTextbookIndex() {
		return this.textbookIndex;
	}

	setTextbookIndex(textbookIndex) {
		this.textbookIndex = textbookIndex;
	}

	getAverage() {
		return this.average;
	}

	setAverage(average) {
		this.average = average;
	}

	getLectureInfo() {
		let lectureInfoResource: object = {
			lectureIndex: this.getLectureIndex(),
			professorIndex: this.getProfessorIndex(),
			textbookIndex: this.getTextbookIndex(),
			average: this.getAverage()
		};
		return lectureInfoResource;
	}
}