export class PostsResource {
	private userIndex;
	private postsCategoryIndex;
	private title;
	private content;

	constructor(postsData) {
		this.setUserIndex(postsData.userIndex);
		this.setPostsCategoryIndex(postsData.postsCategoryIndex);
		this.setTitle(postsData.title);
		this.setContent(postsData.content);
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getPostsCategoryIndex() {
		return this.postsCategoryIndex;
	}

	setPostsCategoryIndex(postsCategoryIndex) {
		this.postsCategoryIndex = postsCategoryIndex;
	}

	getTitle() {
		return this.title;
	}

	setTitle(title) {
		this.title = title;
	}

	getContent() {
		return this.content;
	}

	setContent(content) {
		this.content = content;
	}

	getPosts() {
		let postsData: object = {
			userIndex: this.getUserIndex(),
			postsCategoryIndex: this.getPostsCategoryIndex(),
			title: this.getTitle(),
			content: this.getContent()
		};
		return postsData;
	}
}