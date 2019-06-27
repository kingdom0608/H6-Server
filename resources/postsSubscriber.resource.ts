export class PostsSubscriberResource {
	private postsIndex;
	private userIndex;
	private isGood;
	private isBad;
	private isScrap;

	constructor(postsSubscriberData) {
		this.setPostsIndex(postsSubscriberData.postsIndex);
		this.setUserIndex(postsSubscriberData.userIndex);
		this.setIsGood(postsSubscriberData.isGood);
		this.setIsBad(postsSubscriberData.isBad);
		this.setIsScrap(postsSubscriberData.isScrap);
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

	getIsGood() {
		return this.isGood;
	}

	setIsGood(isGood) {
		this.isGood = isGood;
	}

	getIsBad() {
		return this.isBad;
	}

	setIsBad(isBad) {
		this.isBad = isBad;
	}

	getIsScrap() {
		return this.isScrap;
	}

	setIsScrap(isScrap) {
		this.isScrap = isScrap;
	}

	getPostsSubscriber() {
		let postsSubscriberData: object = {
			postsIndex: this.getPostsIndex(),
			userIndex: this.getUserIndex(),
			isGood: this.getIsScrap(),
			isBad: this.getIsBad(),
			isScrap: this.getIsScrap()
		};
		return postsSubscriberData;
	}
}