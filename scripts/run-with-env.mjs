import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const [,, envFile, ...commandArgs] = process.argv;

if (!envFile || commandArgs.length === 0) {
  console.error(
    "Usage: node scripts/run-with-env.mjs <env-file> <command> [args...]"
  );
  process.exit(1);
}

const envPath = resolve(process.cwd(), envFile);

if (!existsSync(envPath)) {
  console.error(`Env file not found: ${envPath}`);
  process.exit(1);
}

const content = readFileSync(envPath, "utf8");

for (const line of content.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    continue;
  }

  const delimiterIndex = trimmed.indexOf("=");
  if (delimiterIndex === -1) {
    continue;
  }

  const key = trimmed.slice(0, delimiterIndex).trim();
  let value = trimmed.slice(delimiterIndex + 1).trim();

  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  process.env[key] = value;
}

const [command, ...args] = commandArgs;
const child = spawn(command, args, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});