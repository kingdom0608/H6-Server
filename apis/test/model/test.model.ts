let nameArray: Array<any> = [];

export class Test {
	constructor() {
	}

	createName(name: string) {
		let result: object = {
			name: name
		};
		nameArray.push(result);
		return nameArray;
	}

	listName() {
		return nameArray;
	}

	getName(name: string) {
		for (let i: number = 0; i < nameArray.length; i++) {
			if (nameArray[i].name === name) {
				return nameArray[i];
			}
		}
	}

	updateName(name: string, chaneName: string) {
		for (let i: number = 0; i < nameArray.length; i++) {
			if (nameArray[i].name === name) {
				nameArray[i].name = chaneName;
				return nameArray[i];
			}
		}
	}

	async deleteName(name: string) {
		for (let i: number = 0; i < nameArray.length; i++) {
			if (nameArray[i].name === name) {
				await nameArray.splice(i, 1);
				return nameArray[i];
			}
		}
	}

}

export const test: any = new Test();
