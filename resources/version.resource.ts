export class VersionResource {
	private versionIndex;

	constructor(versionData) {
		this.setVersionIndex(versionData.versionIndex);
	}

	getVersionIndex() {
		return this.versionIndex;
	}

	setVersionIndex(versionIndex) {
		this.versionIndex = versionIndex;
	}

	getVersion() {
		let versionResource: object = {
			versionIndex: this.getVersionIndex()
		};
		return versionResource;
	}
}