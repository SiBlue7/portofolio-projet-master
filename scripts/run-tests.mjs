import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const packageJsonPath = new URL("../package.json", import.meta.url);

async function readScripts() {
  const packageJsonContent = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);

  return packageJson.scripts ?? {};
}

function runNpmScript(scriptName) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", scriptName], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`The "${scriptName}" script failed with exit code ${code}.`),
      );
    });
  });
}

async function main() {
  const scripts = await readScripts();
  const testScripts = ["test:unit", "test:e2e"].filter(
    (scriptName) => typeof scripts[scriptName] === "string",
  );

  if (testScripts.length === 0) {
    console.log(
      "No test:unit or test:e2e script is configured yet. Skipping tests.",
    );
    return;
  }

  console.log(`Running ${testScripts.join(" and ")}...`);

  for (const scriptName of testScripts) {
    await runNpmScript(scriptName);
  }
}

await main();
