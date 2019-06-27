import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { voteReply } from '../model/voteReply.model';

export class VoteReplyRoutes {
	public voteReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.voteReplyRouter.post('/voteReply/voteTopicIndex/:voteTopicIndex', createVoteReply);
		this.voteReplyRouter.get('/voteReply/voteTopicIndex/:voteTopicIndex', pageListVoteReply);
		this.voteReplyRouter.put('/voteReply/voteReplyIndex/:voteReplyIndex', updateVoteReply);
		this.voteReplyRouter.delete('/voteReply/voteReplyIndex/:voteReplyIndex', deleteVoteReply);
	}
}

/**
 * route: voteReply 생성
 * @param req
 * @param res
 */
async function createVoteReply(req, res): Promise<void> {
	try {
		const voteTopicIndex: number = req.params.voteTopicIndex;
		let userData = auth(req);
		const result = await voteReply.createVoteReply({
			voteTopicIndex: voteTopicIndex,
			parentsVoteReplyIndex: req.body.parentsVoteReplyIndex,
			userIndex: userData.tokenIndex,
			content: req.body.content,
			status: 'ACTIVE'
		});
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createVoteReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createVoteReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: voteReply 리스트 조회
 * @param req
 * @param res
 */
async function pageListVoteReply(req, res): Promise<void> {
	try {
		const voteTopicIndex: number = req.params.voteTopicIndex;
		let page: number = parseInt(req.query.page);
		let count: number = parseInt(req.query.count);

		const resultCount: any = await voteReply.listVoteReply(voteTopicIndex);
		const result = await voteReply.pageListVoteReply(voteTopicIndex, page, count);

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListVoteReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListVoteReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: voteReply 업데이
 * @param req
 * @param res
 */
async function updateVoteReply(req, res): Promise<void> {
	try {
		let voteReplyIndex: number = req.params.voteReplyIndex;
		let voteReplyData: any = req.body;
		const result = await voteReply.updateVoteReply(voteReplyIndex, voteReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateVoteReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateVoteReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: voteReply 삭제
 * @param req
 * @param res
 */
async function deleteVoteReply(req, res): Promise<void> {
	try {
		let voteReplyIndex: number = req.params.voteReplyIndex;

		const result = await voteReply.deleteVoteReply(voteReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteVoteReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteVoteReply: 50000'
				});
				break;
		}
	}
}

export const voteReplyRoutes: VoteReplyRoutes = new VoteReplyRoutes();
