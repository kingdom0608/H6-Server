export class PostsReplyReportResource {
	private postsReplyIndex;
	private postsIndex;
	private userIndex;
	private content;

	constructor(postsReplyReportData) {
		this.setPostsReplyIndex(postsReplyReportData.postsReplyIndex);
		this.setPostsIndex(postsReplyReportData.postsIndex);
		this.setUserIndex(postsReplyReportData.userIndex);
		this.setContent(postsReplyReportData.content);
	}

	getPostsReplyIndex() {
		return this.postsReplyIndex;
	}

	setPostsReplyIndex(postsReplyIndex) {
		this.postsReplyIndex = postsReplyIndex;
	}

	getPostsIndex() {
		return this.postsIndex;
	}

	setPostsIndex(postsIndex) {
		this.postsIndex = postsIndex;
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getContent() {
		return this.content;
	}

	setContent(content) {
		this.content = content;
	}

	getPostsReplyReport() {
		let postsReplyReportResource: object = {
			postsReplyIndex: this.getPostsReplyIndex(),
			postsIndex: this.getPostsIndex(),
			userIndex: this.getUserIndex(),
			content: this.getContent()
		};
		return postsReplyReportResource;
	}

}

