import { promisify } from "util";
import { exec } from "child_process";
const execAsync = promisify(exec);

import * as vscode from "vscode";

export async function getNodeVersions(
  ctx: vscode.ExtensionContext
): Promise<Array<string> | null> {
  try {
    const { stdout } = await execAsync("ls ~/.nvm/versions/node");
    const versions = stdout
      .split("\n")
      .map(s => s.trim())
      .filter(s => !!s);

    if (versions.length === 0) {
      return null;
    }
    return sortVersions(ctx, versions);
  } catch (err) {
    return null;
  }
}

export async function useNvm() {
  const terminals = vscode.window.terminals;
  const sendText = (t: vscode.Terminal) => t.sendText("nvm use");
  if (terminals.length) {
    // console.log("Found opened terminals, let's change node version");
    terminals.forEach(sendText);
  }
  vscode.window.onDidOpenTerminal(sendText);
}

export async function sortVersions(
  ctx: vscode.ExtensionContext,
  versions: string[]
) {
  const lastNodeVersionSelected = await getVersion(ctx);
  return lastNodeVersionSelected
    ? [
        lastNodeVersionSelected,
        ...versions.filter(v => v !== lastNodeVersionSelected)
      ]
    : versions;
}

export function setVersion(ctx: vscode.ExtensionContext, version?: string) {
  if (version) {
    ctx.workspaceState.update("last-node-version-selected", version);
  }
}

export async function getVersion(ctx: vscode.ExtensionContext) {
  return ctx.workspaceState.get<string>("last-node-version-selected");
}
