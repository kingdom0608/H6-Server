export class PostsFileResource {
	private postsFileIndex;
	private postsIndex;
	private fileName;
	private filePath;
	private fileSize;
	private fileExtension;
	private downloadCount;

	constructor(fileData) {
		this.setpostsFileIndex(fileData.postsFileIndex);
		this.setpostsIndex(fileData.postsIndex);
		this.setFileName(fileData.fileName);
		this.setFilePath(fileData.filePath);
		this.setFileSize(fileData.fileSize);
		this.setFileExtension(fileData.fileExtension);
		this.setdownloadCount(fileData.downloadCount);

	}

	getpostsFileIndex() {
		return this.postsFileIndex;
	}

	setpostsFileIndex(postsFileIndex) {
		this.postsFileIndex = postsFileIndex;
	}

	getpostsIndex() {
		return this.postsIndex;
	}

	setpostsIndex(postsIndex) {
		this.postsIndex = postsIndex;
	}

	getFileName() {
		return this.fileName;
	}

	setFileName(fileName) {
		this.fileName = fileName;
	}

	getFilePath() {
		return this.filePath;
	}

	setFilePath(filePath) {
		this.filePath = filePath;
	}

	getFileSize() {
		return this.fileSize;
	}

	setFileSize(fileSize) {
		this.fileSize = fileSize;
	}

	getFileExtension() {
		return this.fileExtension;
	}

	setFileExtension(fileExtension) {
		this.fileExtension = fileExtension;
	}

	getdownloadCount() {
		return this.downloadCount;
	}

	setdownloadCount(downloadCount) {
		this.downloadCount = downloadCount;
	}

	getPostsFile() {
		let postsFileResource = {
			postsFileIndex: this.getpostsFileIndex(),
			postsIndex: this.getpostsIndex(),
			fileName: this.getFileName(),
			filePath: this.getFilePath(),
			fileSize: this.getFileSize(),
			fileExtension: this.getFileExtension(),
			downloadCount: this.getdownloadCount()
		};
		return postsFileResource;
	}
}