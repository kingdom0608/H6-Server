import { encriptionPw } from '../packages/utils/encryption.util';

export class UserResource {
	private userId;
	private userPw;
	private userNickName;
	private major;
	private minor;
	private doubleMajor;
	private connectedMajor;
	private admissionYear;
	private isValidation;
	private avatar;
	private status;
	private appId;
	private isPostsAlarm;

	constructor(signUpData) {
		this.setUserId(signUpData.userId);
		this.setUserPw(signUpData.userPw);
		this.setUserNickName(signUpData.userNickName);
		this.setMajor(signUpData.major);
		this.setMinor(signUpData.minor);
		this.setDoubleMajor(signUpData.doubleMajor);
		this.setConnectedMajor(signUpData.connectedMajor);
		this.setAdmissionYear(signUpData.admissionYear);
		this.setIsValidation(signUpData.isValidation);
		this.setAvatar(signUpData.avatar);
		this.setStatus(signUpData.status);
		this.setAppId(signUpData.appId);
		this.setIsPostsAlarm(signUpData.isPostsAlarm);
	}

	public getUserId() {
		return this.userId;
	}

	public setUserId(userId) {
		this.userId = userId;
	}

	public getUserPw() {
		return this.userPw;
	}

	public setUserPw(userPw) {
		this.userPw = encriptionPw.getHash(userPw);
	}

	public getUserNickName() {
		return this.userNickName;
	}

	public setUserNickName(userNickName) {
		this.userNickName = userNickName;
	}

	public getMajor() {
		return this.major;
	}

	public setMajor(major) {
		this.major = major;
	}

	public getMinor() {
		return this.minor;
	}

	public setMinor(minor) {
		this.minor = minor;
	}

	public getDoubleMajor() {
		return this.doubleMajor;
	}

	public setDoubleMajor(doubleMajor) {
		this.doubleMajor = doubleMajor;
	}

	public getConnectedMajor() {
		return this.connectedMajor;
	}

	public setConnectedMajor(connectedMajor) {
		this.connectedMajor = connectedMajor;
	}

	public getAdmissionYear() {
		return this.admissionYear;
	}

	public setAdmissionYear(admissionYear) {
		this.admissionYear = admissionYear;
	}

	public getIsValidation() {
		return this.isValidation;
	}

	public setIsValidation(isValidation) {
		this.isValidation = isValidation;
	}

	public getAvatar() {
		return this.avatar;
	}

	public setAvatar(avatar) {
		this.avatar = avatar;
	}

	public getStatus() {
		return this.status;
	}

	public setStatus(status) {
		this.status = status;
	}

	public getAppId() {
		return this.appId;
	}

	public setAppId(appId) {
		this.appId = appId;
	}

	public getIsPostsAlarm() {
		return this.isPostsAlarm;
	}

	public setIsPostsAlarm(isPostsAlarm) {
		this.isPostsAlarm = isPostsAlarm;
	}

	getSignUp() {
		let userResource = {
			userId: this.getUserId(),
			userPw: this.getUserPw(),
			userNickName: this.getUserNickName(),
			major: this.getMajor(),
			minor: this.getMinor(),
			doubleMajor: this.getDoubleMajor(),
			connectedMajor: this.getConnectedMajor(),
			admissionYear: this.getAdmissionYear(),
			isValidation: this.getIsValidation(),
			avatar: this.getAvatar(),
			status: this.getStatus(),
			appId: this.getAppId(),
			isPostsAlarm: this.getIsPostsAlarm()
		};
		return userResource;
	}
}