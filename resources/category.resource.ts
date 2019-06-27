export class CategoryResource {
	private categoryName;

	constructor(categoryData) {
		this.setCategoryName(categoryData.categoryName);
	}

	getCategoryName() {
		return this.categoryName;
	}

	setCategoryName(categoryName: string) {
		this.categoryName = categoryName;
	}

	getCategory() {
		let categoryData: object = {
			categoryName: this.getCategoryName()
		};
		return categoryData;
	}

}