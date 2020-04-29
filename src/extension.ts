/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

const COMMAND = 'editor.action.formatDocument';
const CODE_ACTION_KIND = vscode.CodeActionKind.SourceFixAll.append('format');

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('*', new FormatDocument(), {
			providedCodeActionKinds: FormatDocument.providedCodeActionKinds
		}));
}

/**
 * Provides code actions for converting :) to a smiley emoji.
 */
export class FormatDocument implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		CODE_ACTION_KIND
	];

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {
		const commandAction = this.createCommand();

		return [
			commandAction
		];
	}

	private createCommand(): vscode.CodeAction {
		const action = new vscode.CodeAction('Format Document', CODE_ACTION_KIND);
		action.command = { command: COMMAND, title: 'Format Document', tooltip: 'This will format the document with the default formatter.' };
		return action;
	}
}
