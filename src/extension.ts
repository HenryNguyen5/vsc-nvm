// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getNodeVersions, useNvm, getVersion, setVersion } from "./nvm-utils";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  useNvm();
  const disposable = vscode.commands.registerCommand(
    "extension.node-version",
    async () => {
      const versions = await getNodeVersions(ctx);
      if (!versions) {
        vscode.window.showErrorMessage(
          "Could not find any installed nodejs versions"
        );
      } else {
        const versionPicked = await vscode.window.showQuickPick(versions);
        setVersion(ctx, versionPicked);
        return versionPicked;
      }
    }
  );

  ctx.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
