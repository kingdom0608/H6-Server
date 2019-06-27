export class LectureReplyResource {
	private lectureInfoIndex;
	private userIndex;
	private semester;
	private homework;
	private homeworkType;
	private testCount;
	private receivedGrade;
	private preview;
	private review;
	private score;

	constructor(lectureReplyData) {
		this.setLectureInfoIndex(lectureReplyData.lectureInfoIndex);
		this.setUserIndex(lectureReplyData.userIndex);
		this.setSemester(lectureReplyData.semester);
		this.setHomework(lectureReplyData.homework);
		this.setHomeworkType(lectureReplyData.homeworkType);
		this.setTestCount(lectureReplyData.testCount);
		this.setReceivedGrade(lectureReplyData.receivedGrade);
		this.setPreview(lectureReplyData.preview);
		this.setReview(lectureReplyData.review);
		this.setScore(lectureReplyData.score);
	}

	getLectureInfoIndex() {
		return this.lectureInfoIndex;
	}

	setLectureInfoIndex(lectureInfoIndex) {
		this.lectureInfoIndex = lectureInfoIndex;
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getSemester() {
		return this.semester;
	}

	setSemester(semester) {
		this.semester = semester;
	}

	getHomework() {
		return this.homework;
	}

	setHomework(homework) {
		this.homework = homework;
	}

	getHomeworkType() {
		return this.homeworkType;
	}

	setHomeworkType(homeworkType) {
		this.homeworkType = homeworkType;
	}

	getTestCount() {
		return this.testCount;
	}

	setTestCount(testCount) {
		this.testCount = testCount;
	}

	getReceivedGrade() {
		return this.receivedGrade;
	}

	setReceivedGrade(receivedGrade) {
		this.receivedGrade = receivedGrade;
	}

	getPreview() {
		return this.preview;
	}

	setPreview(preview) {
		this.preview = preview;
	}

	getReview() {
		return this.review;
	}

	setReview(review) {
		this.review = review;
	}

	getScore() {
		return this.score;
	}

	setScore(score) {
		this.score = score;
	}

	getLectureReply() {
		let lectureReplyResource: object = {
			lectureInfoIndex: this.getLectureInfoIndex(),
			userIndex: this.getUserIndex(),
			semester: this.getSemester(),
			homework: this.getHomework(),
			homeworkType: this.getHomeworkType(),
			testCount: this.getTestCount(),
			receivedGrade: this.getReceivedGrade(),
			preview: this.getPreview(),
			review: this.getReview(),
			score: this.getScore()
		};
		return lectureReplyResource;
	}
}