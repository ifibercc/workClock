import * as vscode from 'vscode';
const moment = require('moment');

export function activate(context: vscode.ExtensionContext) {
	const startTime = '09:00';
	const endTime = '23:50';
	const today = moment().format('YYYY-MM-DD');
	const startMoment = moment(`${today} ${startTime}`);
	const endMoment = moment(`${today} ${endTime}`);
	const day = endMoment.valueOf() - startMoment.valueOf();
	const dayHours = Math.round(day / 1000 / 60 / 60);
	console.log('🍭: activate -> dayHours', dayHours);
	const emptyChar = '○';
	const passedChar = '●';
	const tiredChar = '◎';
	let finalText = '';
	let process;
	if (moment().isSameOrBefore(startMoment)) {
		// 如果还未进入工作时间, 空进度
		process = 0;
		finalText = Array(dayHours).fill(emptyChar).join('');
	} else if (moment().isSameOrBefore(endMoment)) {
		// 在工作时间内, 根据时间占比计算
		const now = moment().valueOf() - startMoment.valueOf();
		const nowHours = Math.round(now / 1000 / 60 / 60);
		finalText = Array(nowHours).fill(passedChar).join('') + Array(dayHours - nowHours).fill(emptyChar).join('');
		process = now / day;
	} else {
		// 在工作时间外, 计算额外的占比
		const now = moment().valueOf() - startMoment.valueOf();
    console.log('🍭: activate -> now', now);
		process = now / day;
	}
	process = Math.round(process * 100);
	console.log('🍭: activate -> finalText', finalText);
	console.log('🍭: activate -> process', process);
	const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(statusBarItem);
	// statusBarItem.text = '●●●●●●●○○○○▏▏▋▋▊▉▉▉▉▉▉▉▉▉▊▋▌▪️▫️◾️◽️◼️🔲🔳´◎◎◎¤¤¤◎▨▨▨▨▨▥▥▧▧▤▤▦▩▕▁▔▔▔▔▔▔▔▔▁▁▔▁〓〓≡≡▏＝';
	// statusBarItem.text = '[🀅🀅🀅🀅🀅🀅🀅🀅🀆🀆🀆]🀂🀂🀂🀂';
	// statusBarItem.text = '{ ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ }▉▉▉▉▉';
	// statusBarItem.color = '#FF6A00';
	statusBarItem.text = `{${finalText}}[${process}%]`;
	statusBarItem.show();
}

export function deactivate() {}