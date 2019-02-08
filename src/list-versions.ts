import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export async function getNodeVersions(): Promise<Array<string> | null> {
  try {
    const { stderr, stdout } = await execAsync("ls ~/.nvm/versions/node");
    const versions = stdout
      .split("\n")
      .map(s => s.trim())
      .filter(s => !!s);

    if (versions.length === 0) {
      return null;
    }
    return versions;
  } catch (err) {
    return null;
  }
}
