"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let addTodo = vscode.commands.registerCommand('quicktodo.add', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        vscode.window.showInputBox({
            prompt: 'Todo text'
        }).then(text => {
            if (!text)
                return;
            const cursor = editor.selection.active;
            const line = editor.document.lineAt(cursor.line);
            const spaces = line.text.match(/^\s*/);
            const indent = spaces ? spaces[0] : '';
            editor.edit(edit => {
                edit.insert(cursor, `\n${indent}// TODO: ${text}`);
            });
        });
    });
    context.subscriptions.push(addTodo);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map