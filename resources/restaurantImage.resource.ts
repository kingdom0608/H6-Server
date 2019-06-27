export class RestaurantImageResource {
	private restaurantIndex;
	private url;

	constructor(restaurantImageData) {
		this.setRestaurantIndex(restaurantImageData.restaurantIndex);
		this.setUrl(restaurantImageData.url);
	}

	getRestaurantIndex() {
		return this.restaurantIndex;
	}

	setRestaurantIndex(restaurantIndex) {
		this.restaurantIndex = restaurantIndex;
	}

	getUrl() {
		return this.url;
	}

	setUrl(url) {
		this.url = url;
	}

	getRestaurantImage() {
		let restaurantImageData: object = {
			restaurantIndex: this.getRestaurantIndex(),
			url: this.getUrl()
		};
		return restaurantImageData;
	}
}