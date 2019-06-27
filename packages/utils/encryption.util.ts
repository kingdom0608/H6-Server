import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as pbkdf2 from 'pbkdf2';

const file = './packages/utils/config/env.json';
let encryptionData: any = fs.readFileSync(file, 'utf8');
encryptionData = JSON.parse(encryptionData);

/** salt 값 */
let salt = encryptionData.encryption.salt;

/** 암호화 횟수 */
let iterations = 5;

/** 암호화 길이 */
let keyLength = 16;

/** 암호화 방식 */
let digest = encryptionData.encryption.digest;

class EncryptionPw {
	getHash(pwd): string {
		let derivedKey = pbkdf2.pbkdf2Sync(pwd, salt, iterations, keyLength, digest);
		return derivedKey.toString('hex');
	}
}

class EncryptHansungInfoPw {
	encryptHansungInfoPw(hansungInfoPw: string) {
		let ciphertext = CryptoJS.AES.encrypt(hansungInfoPw, salt);
		return ciphertext;
	}
}

class DecryptHansungInfoPw {
	decryptHansungInfoPw(hansungInfoPw: string) {
		let bytes = CryptoJS.AES.decrypt(hansungInfoPw.toString(), salt);
		let plaintext = bytes.toString(CryptoJS.enc.Utf8);
		return plaintext;
	}
}

export const encriptionPw: EncryptionPw = new EncryptionPw();
export const encryptHansungInfoPw: EncryptHansungInfoPw = new EncryptHansungInfoPw();
export const decryptHansungInfoPw: DecryptHansungInfoPw = new DecryptHansungInfoPw();