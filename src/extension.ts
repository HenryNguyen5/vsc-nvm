// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getNodeVersions } from "./list-versions";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  const disposable = vscode.commands.registerCommand(
    "extension.node-version",
    async () => {
      const versions = await getNodeVersions();
      if (!versions) {
        vscode.window.showErrorMessage(
          "Could not find any installed nodejs versions"
        );
      } else {
        const lastNodeVersionSelected = context.workspaceState.get<string>(
          "last-node-version-selected"
        );

        const sortedVersions = lastNodeVersionSelected
          ? [
              lastNodeVersionSelected,
              ...versions.filter(v => v !== lastNodeVersionSelected)
            ]
          : versions;
        const res = await vscode.window.showQuickPick(sortedVersions);
        if (res !== undefined) {
          context.workspaceState.update("last-node-version-selected", res);
        }
        return res;
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
