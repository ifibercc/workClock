"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const compute_1 = require("./compute");
function activate(context) {
    const position = vscode.workspace.getConfiguration().get('workClock.position');
    const priority = vscode.workspace.getConfiguration().get('workClock.priority');
    const statusBarItem = vscode.window.createStatusBarItem(position === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, priority);
    context.subscriptions.push(statusBarItem);
    statusBarItem.show();
    renderClock(statusBarItem);
    setInterval(() => renderClock(statusBarItem), 60 * 1000);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
const renderClock = (statusBarItem) => {
    const text = compute_1.default();
    statusBarItem.text = text;
};
//# sourceMappingURL=extension.js.map