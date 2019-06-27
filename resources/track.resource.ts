export class TrackResource {
	private trackName;

	constructor(trackData) {
		this.setTrackName(trackData.trackName);
	}

	getTrackName() {
		return this.trackName;
	}

	setTrackName(trackName) {
		this.trackName = trackName;
	}

	getTrack() {
		let trackResource: object = {
			trackName: this.getTrackName()
		};
		return trackResource;
	}
}