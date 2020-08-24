"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const moment = require('moment');
const symbols_1 = require("./symbols");
exports.default = () => {
    const startTime = vscode.workspace.getConfiguration().get('workClock.startTime');
    const endTime = vscode.workspace.getConfiguration().get('workClock.endTime');
    const today = moment().format('YYYY-MM-DD'); // 转换为 Moment 对象
    const startMoment = moment(`${today} ${startTime}`);
    const endMoment = moment(`${today} ${endTime}`);
    const day = endMoment.valueOf() - startMoment.valueOf(); // 一个工作日的时长
    const dayHours = Math.round(day / 1000 / 60 / 60);
    const displaySymbol = vscode.workspace.getConfiguration().get('workClock.displaySymbol'); // 从配置获取
    const processSymbol = symbols_1.default[displaySymbol];
    let processBar;
    let processNum;
    let processEmoji;
    if (moment().isSameOrBefore(startMoment)) {
        // 如果还未进入工作时间, 空进度
        processNum = 0;
        processBar = Array(dayHours).fill(processSymbol.emptyChar).join('');
    }
    else if (moment().isSameOrBefore(endMoment)) {
        // 在工作时间内, 根据时间占比计算
        const now = moment().valueOf() - startMoment.valueOf();
        const nowHours = Math.round(now / 1000 / 60 / 60);
        processBar = Array(nowHours).fill(processSymbol.passedChar).join('') + Array(dayHours - nowHours).fill(processSymbol.emptyChar).join('');
        processNum = now / day;
    }
    else {
        // 在工作时间外, 计算额外的占比
        const now = moment().valueOf() - startMoment.valueOf();
        const nowHours = Math.round(now / 1000 / 60 / 60);
        processBar = Array(dayHours).fill(processSymbol.passedChar).join('') + Array(nowHours - dayHours).fill(processSymbol.tiredChar).join('');
        processNum = now / day;
    }
    processNum = Math.round(processNum * 100);
    if (processNum < 50) {
        processEmoji = '😐';
    }
    else if (processNum < 100) {
        processEmoji = '😀';
    }
    else if (processNum === 100) {
        processEmoji = '🏃‍♂️';
    }
    else if (processNum < 150) {
        processEmoji = '😩';
    }
    else if (processNum < 200) {
        processEmoji = '🤬';
    }
    else if (processNum < 300) {
        processEmoji = '🚑';
    }
    else {
        processEmoji = '💀';
    }
    return `${processBar}{${processNum}%} ${processEmoji}`;
};
//# sourceMappingURL=compute.js.map