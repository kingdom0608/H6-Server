import chalk from 'chalk';
import * as express from 'express';
import * as fs from 'fs';
import { Server } from './app';
import { slack } from './packages/core/slack/slack';

const port: number = 80;
const app: express.Application = new Server().app;
app.set('port', port);
app.listen(app.get('port'), async () => {
	console.log(chalk.rgb(0, 153, 255)`
  **********************************************************************************************************************************                                                             
    tf        tf    tf                  tftftftftftf    tftftftftftf    tftftftftftf   tf        tf   tftftftftftf    tftftftftftf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tftftftftftf    tftftttftftf        tftftftftftf    tftftftftftf    tftftftftftf    tf      tf    tftftftftftf    tftftftftftf
    ft        tf    tf        tf                  tf    tf              tf   tf.         tf    tf     tf              tf   tf.
    ft        tf    tf        tf                  tf    tf              tf     tf.        tf  tf      tf              tf     tf.
    ft        tf    tftftftftftf        tftftftftftf    tftftftftftf    tf       tf.       tftf       tftftftftftf    tf       tf.
  **********************************************************************************************************************************                                  
      `);
	const file = './packages/utils/config/env.json';
	let envData: any = fs.readFileSync(file, 'utf8');
	envData = JSON.parse(envData);

	console.log('stage:', envData.stage);
	console.log('H6 server listening on port', port);

	/** 스테이지 분기 처리 */
	if (envData.stage === 'dv' || envData.stage === 'prod') {
		await slack.sendDeployMessage('deploy');
	}
}).on('error', err => {
	console.error(err);
});