import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { s3Util } from '../../../packages/utils/s3.util';
import { posts } from '../model/posts.model';
import { postsImage } from '../model/postsImage.model';
import { postsReport } from '../model/postsReport.model';
import { postsSubscriber } from '../model/postsSubscriber.model';

export class PostsRoutes {
	public postsRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsRouter.post('/posts', createPosts);
		this.postsRouter.get('/posts', pageListPosts);
		this.postsRouter.get('/posts/scrap', pageListPostsByIsScrap);
		this.postsRouter.get('/posts/publisher', pageListPostsByUserIndex);
		this.postsRouter.get('/posts/postsIndex/:postsIndex', getPosts);
		this.postsRouter.put('/posts/postsIndex/:postsIndex', updatePosts);
		this.postsRouter.delete('/posts/postsIndex/:postsIndex', deletePosts);
	}
}

/**
 * route: posts 생성
 * @param req
 * @param res
 */
async function createPosts(req, res): Promise<void> {
	const limit: number = 5;
	const userData = auth(req);
	const upload = s3Util.imageUpload(`postsImage`, userData.tokenIndex).array('upload', limit);

	await upload(req, res, async (err) => {
		try {
			if (err) {
				throw 'upload error';
			}

			const postsData = {
				userIndex: userData.tokenIndex,
				postsCategoryIndex: req.body.postsCategoryIndex,
				title: req.body.title,
				content: req.body.content,
				status: 'ACTIVE'
			};

			const postsResult: any = await posts.createPosts(postsData);

			const {files} = req;
			const imagePath = [];
			for (const file of files) {
				const [url, fileName] = file.location.split('postsImage');
				imagePath.push(`${url}resized-postsImage${fileName}`);
			}

			if (imagePath.length > 0) {
				const imageData = {
					image: imagePath
				};

				const path = JSON.stringify(imageData);
				const postsImageData = {
					postsIndex: postsResult.insertId,
					path
				};

				await postsImage.createPostsImage(postsImageData);
			}
			const result = Object.assign(postsData, {image: imagePath});

			/** 불필요한 데이터 삭제 */
			delete postsData.userIndex;

			res.send({
				success: true,
				statusCode: 200,
				result,
				message: 'createPosts: 200'
			});
		} catch (err) {
			switch (err) {
				case 'This posts does not exist':
					res.send({
						success: false,
						statusCode: 404,
						message: 'createPosts: 40401'
					});
					break;
				default:
					res.send({
						success: false,
						statusCode: 500,
						message: 'createPosts: 50000'
					});
					break;
			}
		}
	});
}

/**
 * route: posts page 리스트 조회
 * @param req
 * @param res
 */
async function pageListPosts(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPosts(filter);
		const result: any = await posts.pageListPosts(filter, orderBy, page, count);
		for (const row of result) {
			const scrapData: any = await postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
			const imagePath: any = await postsImage.getPostsImage(row.postsIndex);
			if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
				row.isScrap = true;
			} else {
				row.isScrap = false;
			}
			const ip = JSON.parse(JSON.stringify(imagePath))[0];
			row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPosts: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts page isScrap 리스트 조회
 * @param req
 * @param res
 */
async function pageListPostsByIsScrap(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPostsByIsScrap(userData.tokenIndex, filter);
		const result: any = await posts.pageListPostsByIsScrap(userData.tokenIndex, filter, orderBy, page, count);
		for (const row of result) {
			const imagePath: any = await postsImage.getPostsImage(row.postsIndex);
			const ip = JSON.parse(JSON.stringify(imagePath))[0];
			row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
			row.isScrap = row.isScrap === 1 ? true : false;
			delete row.userIndex;
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsByIsScrap: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsByIsScrap: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts userIndex 리스트 조회
 * @param req
 * @param res
 */
async function pageListPostsByUserIndex(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPostsByUserIndex(userData.tokenIndex, filter);
		const result: any = await posts.pageListPostsByUserIndex(userData.tokenIndex, filter, orderBy, page, count);
		for (const row of result) {
			const scrapData: any = await postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
			const imagePath: any = await postsImage.getPostsImage(row.postsIndex);
			if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
				row.isScrap = true;
			} else {
				row.isScrap = false;
			}
			const ip = JSON.parse(JSON.stringify(imagePath))[0];
			row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsByUserIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsByUserIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts 조회
 * @param req
 * @param res
 */
async function getPosts(req, res): Promise<void> {
	let postsIndex: number = req.params.postsIndex;
	try {
		const userData = auth(req);
		const [result, reportCheck, scrapData, imagePath, unused] = await Promise.all([
			posts.getPosts(postsIndex),
			postsReport.checkPostsReport(postsIndex, userData.tokenIndex),
			postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userData.tokenIndex),
			postsImage.getPostsImage(postsIndex),
			posts.updatePostsByCount(postsIndex)
		]);

		if (scrapData[0]) {
			result[0].isGood = !!scrapData[0].isGood;
			result[0].isBad = !!scrapData[0].isBad;
			result[0].isScrap = !!scrapData[0].isScrap;
		} else {
			result[0].isGood = false;
			result[0].isBad = false;
			result[0].isScrap = false;
		}
		result[0].reported = !!reportCheck[0];
		result[0].imagePath = imagePath;

		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getPosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPosts: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts 업데이트
 * @param req
 * @param res
 */
async function updatePosts(req, res): Promise<void> {
	const limit: number = 5;
	const {postsIndex} = req.params;
	const userData = auth(req);
	const upload = s3Util.imageUpload(`postsImage`, userData.tokenIndex).array('upload', limit);

	await upload(req, res, async (err) => {
		try {
			if (err) {
				throw 'upload error';
			}

			const {files} = req;
			const {prevPath, removedPath} = req.body;
			const imagePath = [];

			if (removedPath) {
				delete req.body.removedPath;

				const tempPath = [];
				const removedFiles = JSON.parse(removedPath).image;
				removedFiles.forEach(removedFile => tempPath.push(removedFile));

				const removedImageData = {
					image: tempPath
				};

				const path = JSON.stringify(removedImageData);
				const postsRemovedImageData = {
					postsIndex,
					path
				};

				await postsImage.createPostsRemovedImage(postsRemovedImageData);
			}

			if (prevPath) {
				delete req.body.prevPath;

				const prevFiles = JSON.parse(prevPath).image;
				prevFiles.forEach(prevFile => imagePath.push(prevFile));
			}

			if (files) {
				files.forEach(file => {
					const [url, fileName] = file.location.split('postsImage');
					imagePath.push(`${url}resized-postsImage${fileName}`);
				});
			}

			const result = await posts.updatePosts(postsIndex, req.body);

			if (imagePath.length > 0) {
				const imageData = {
					image: imagePath
				};

				const path = JSON.stringify(imageData)
				const postsImageData = {
					postsIndex,
					path
				};

				if (!prevPath && !removedPath) {
					await postsImage.createPostsImage(postsImageData);
				} else {
					await postsImage.updatePostsImage(postsIndex, postsImageData);
				}
			} else {
				await postsImage.deletePostsImage(postsIndex);
			}

			res.send({
				success: true,
				statusCode: 200,
				result: Object.assign(result, {image: imagePath}),
				message: 'updatePosts: 200'
			});
		} catch (err) {
			switch (err) {
				default:
					res.send({
						success: false,
						statusCode: 500,
						message: 'updatePosts: 50000'
					});
					break;
			}
		}
	});
}

/**
 * route: posts 삭제
 * @param req
 * @param res
 */
async function deletePosts(req, res): Promise<void> {
	const {postsIndex} = req.params;
	try {
		const unused = auth(req);
		const temp = await postsImage.getPostsImage(postsIndex);
		if (temp[0]) {
			await postsImage.createPostsRemovedImage({
				postsIndex,
				path: temp[0].path
			});
			await postsImage.deletePostsImage(postsIndex);
		}
		await posts.deletePosts(postsIndex);
		res.send({
			success: true,
			statusCode: 200,
			message: 'deletePosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePosts: 50000'
				});
		}
	}
}

export const postsRoutes: PostsRoutes = new PostsRoutes();
