import * as dateFormat from 'dateformat';
import * as cron from 'node-cron';
import { vote } from '../../apis/vote/model/vote.model';

export class VoteScheduler {
	constructor() {
	}

	task() {
		cron.schedule('0 0 * * *', async function(): Promise<void> {
			const now = new Date();
			try {
				const nowDate = await dateFormat(now, 'isoDateTime');
				const ActiveVoteTopic = await vote.getVoteTopic();
				const dueDate = await dateFormat(ActiveVoteTopic.dueDate, 'isoDateTime');
				const resultDate = await vote.getVoteDateDiff(dueDate, nowDate);

				/** 마감기한이 지나면 데이터 업데이트 */
				if (resultDate.dateDiff < 0) {
					await vote.updateVoteTopic(ActiveVoteTopic.voteTopicIndex, {
						status: 'INACTIVE'
					});

					const WaitingVoteTopic = await vote.getVoteTopicByStatus('WAITING');
					await vote.updateVoteTopic(WaitingVoteTopic.voteTopicIndex, {
						status: 'ACTIVE'
					});
				}
			} catch (err) {
				console.log(err);
			}
		});
	}
}

export const voteScheduler: VoteScheduler = new VoteScheduler();
