import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const notice = readFileSync(new URL("../NOTICE.md", import.meta.url), "utf8");
const recorded = notice.match(/Upstream commit: `([0-9a-f]{40})`/)?.[1];
if (!recorded) throw new Error("NOTICE.md does not record an upstream commit");

const output = execFileSync("git", ["ls-remote", "https://github.com/mattpocock/skills.git", "refs/heads/main"], { encoding: "utf8" });
const current = output.trim().split(/\s+/)[0];
if (current !== recorded) {
  console.error(`Upstream changed: recorded ${recorded}, current ${current}`);
  process.exit(1);
}
console.log(`Upstream unchanged at ${recorded}`);
