import * as vscode from 'vscode';
const moment = require('moment');

import symbols from './symbols';

export default () => {
  const startTime = vscode.workspace.getConfiguration().get('workClock.startTime');
  const endTime = vscode.workspace.getConfiguration().get('workClock.endTime');

	const today = moment().format('YYYY-MM-DD'); // 转换为 Moment 对象
	const startMoment = moment(`${today} ${startTime}`);
  const endMoment = moment(`${today} ${endTime}`);

	const day = endMoment.valueOf() - startMoment.valueOf(); // 一个工作日的时长
  const dayHours = Math.round(day / 1000 / 60 / 60);

  const displaySymbol: any = vscode.workspace.getConfiguration().get('workClock.displaySymbol'); // 从配置获取
  const processSymbol = symbols(displaySymbol);

	let processBar;
	let processNum;
	let processEmoji;

	if (moment().isSameOrBefore(startMoment)) {
		// 如果还未进入工作时间, 空进度
		processNum = 0;
		processBar = Array(dayHours).fill(processSymbol.emptyChar).join('');
	} else if (moment().isSameOrBefore(endMoment)) {
		// 在工作时间内, 根据时间占比计算
		const now = moment().valueOf() - startMoment.valueOf();
		const nowHours = Math.floor(now / 1000 / 60 / 60);
		processBar = Array(nowHours).fill(processSymbol.passedChar).join('') + processSymbol.halfChar + Array(dayHours - nowHours - 1).fill(processSymbol.emptyChar).join('');
		processNum = now / day;
	} else {
		// 在工作时间外, 计算额外的占比
    const now = moment().valueOf() - startMoment.valueOf();
    const nowHours = Math.round(now / 1000 / 60 / 60);
    processBar = Array(dayHours).fill(processSymbol.passedChar).join('') + Array(nowHours - dayHours).fill(processSymbol.tiredChar).join('');
		processNum = now / day;
	}
	processNum = Math.round(processNum * 100);
	if (processNum < 50) {
		processEmoji = '😐';
	} else if (processNum < 100) {
		processEmoji = '😀';
	} else if (processNum === 100) {
		processEmoji = '🏃‍♂️';
	} else if (processNum < 150) {
		processEmoji = '😩';
	} else if (processNum < 200) {
		processEmoji = '🤬';
	} else if (processNum < 300) {
		processEmoji = '🚑';
	} else {
		processEmoji = '💀';
	}
	return `${processBar}{${processNum}%} ${processEmoji}`;
};
