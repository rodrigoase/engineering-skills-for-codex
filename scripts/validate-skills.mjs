import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["--test", "tests/adaptation.test.mjs"], {
  cwd: new URL("..", import.meta.url),
  stdio: "inherit",
});
process.exit(result.status ?? 1);
