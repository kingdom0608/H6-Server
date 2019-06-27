import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as path from 'path';

export module s3Util {
	aws.config.loadFromPath(__dirname + '/config/env.json');
	const file = './packages/utils/config/env.json';
	let awsconfig: any = fs.readFileSync(file, 'utf8');
	awsconfig = JSON.parse(awsconfig);
	let s3 = new aws.S3();

	export const upload = (folder, tokenIndex = 0, count = 0) => multer({
		storage: multerS3({
			s3: s3,
			bucket: `${awsconfig.bucket}`,
			key: function(req, file, cb) {
				let extension = path.extname(file.originalname);
				cb(null, `${folder}/${Date.now().toString()}${count}${extension}`)
			},
			acl: awsconfig.acl,
		}),
		limits: {fileSize: 10 * 1024 * 1024},
		fileFilter(req, file, callback) {
			const ext = path.extname(file.originalname).toLowerCase();
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(new Error('Only images are allowed'))
			}
			callback(null, true)
		}
	});

	export const imageUpload = (folder, tokenIndex = 0, count = 0) => multer({
		storage: multerS3({
			s3: s3,
			bucket: `${awsconfig.bucket}`,
			key: function(req, file, cb) {
				let extension = path.extname(file.originalname);
				cb(null, `${folder}/${tokenIndex}/${Date.now().toString()}${count}${extension}`)
			},
			acl: awsconfig.acl,
		}),
		limits: {fileSize: 10 * 1024 * 1024},
		fileFilter(req, file, callback) {
			if (count == 0) {
				const {prevPath} = req.body;
				if (prevPath) {
					count = JSON.parse(prevPath).image.length;
				}
			}

			count++;
			if (count > 5) {
				return callback(new Error('Maximum file count of 5 has been exceeded.'))
			}

			const ext = path.extname(file.originalname).toLowerCase();
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(new Error('Only images are allowed'))
			}
			callback(null, true)
		}
	});

	export const restaurantUpload = (folder: string = 'restaurant', index: number = 0) => multer({
		storage: multerS3({
			s3,
			bucket: `${awsconfig.bucket}/${folder}`,
			key(req, file, cb) {
				const extension = path.extname(file.originalname);
				const {fieldname} = file;
				const prefixFileName = `${folder}_${req.params.restaurantIndex}_${fieldname}`;
				const suffixFileName = fieldname === 'sub_image' ? `_${++index}${extension}` : `${extension}`;
				cb(null, `${prefixFileName}${suffixFileName}`);
			},
			acl: awsconfig.acl,
		})
	});
}
