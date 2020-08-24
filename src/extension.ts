import * as vscode from 'vscode';
import compute from './compute';

export function activate(context: vscode.ExtensionContext) {
	const position = vscode.workspace.getConfiguration().get('workClock.position');
	const priority = vscode.workspace.getConfiguration().get('workClock.priority');
	const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
		position === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, priority);
	context.subscriptions.push(statusBarItem);
	statusBarItem.show();
	renderClock(statusBarItem);
	setInterval(() => renderClock(statusBarItem), 60 * 1000);
}

export function deactivate() {}

const renderClock = (statusBarItem: vscode.StatusBarItem) => {
	const text = compute();
	statusBarItem.text = text;
};