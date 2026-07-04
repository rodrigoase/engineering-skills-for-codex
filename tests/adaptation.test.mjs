import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const engineering = [
  "ask-matt", "code-review", "codebase-design", "diagnosing-bugs",
  "domain-modeling", "grill-with-docs", "implement",
  "improve-codebase-architecture", "prototype", "research",
  "resolving-merge-conflicts", "setup-matt-pocock-skills", "tdd",
  "to-issues", "to-prd", "triage",
];
const productivity = ["grill-me", "grilling", "handoff", "teach", "writing-great-skills"];
const skillNames = [...engineering, ...productivity];

const read = (path) => readFileSync(join(root, path), "utf8");

test("packages every upstream engineering skill in a flat Codex namespace", () => {
  const actual = readdirSync(join(root, "skills"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(actual, skillNames.toSorted());
});

test("every packaged skill has portable frontmatter and Codex UI metadata", () => {
  for (const name of skillNames) {
    const skill = read(`skills/${name}/SKILL.md`);
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\ndescription: .+\\n---`, "s"), name);
    assert.doesNotMatch(skill, /disable-model-invocation|argument-hint/, name);
    const metadata = `skills/${name}/agents/openai.yaml`;
    assert.ok(existsSync(join(root, metadata)), metadata);
    const yaml = read(metadata);
    assert.match(yaml, /default_prompt:/, name);
    assert.match(yaml, /allow_implicit_invocation: (true|false)/, name);
  }
});

test("packaged docs contain no Claude-only orchestration", () => {
  const docs = skillNames.map((name) => read(`skills/${name}/SKILL.md`)).join("\n");
  assert.doesNotMatch(docs, /Agent tool|subagent_type|CLAUDE\.md|\.claude\//);
  assert.doesNotMatch(docs, /`\/(ask-matt|code-review|codebase-design|diagnosing-bugs|domain-modeling|grill-with-docs|implement|improve-codebase-architecture|prototype|research|resolving-merge-conflicts|setup-matt-pocock-skills|tdd|to-issues|to-prd|triage|grill-me|grilling|handoff|teach|writing-great-skills)`/);
});

test("ask-matt routes every packaged engineering workflow", () => {
  const askMatt = read("skills/ask-matt/SKILL.md");
  for (const name of engineering.filter((name) => name !== "ask-matt")) {
    assert.match(askMatt, new RegExp(`\\$${name}\\b`), name);
  }
});

test("Codex behavioral safeguards are documented", () => {
  assert.match(read("skills/code-review/SKILL.md"), /hypotheses/i);
  assert.match(read("skills/code-review/SKILL.md"), /sequential/i);
  assert.match(read("skills/research/SKILL.md"), /without subagents|current thread/i);
  assert.match(read("skills/setup-matt-pocock-skills/SKILL.md"), /Prefer.*AGENTS\.md/is);
  assert.match(read("skills/improve-codebase-architecture/SKILL.md"), /Do not (launch|open)/i);
  assert.match(read("skills/handoff/SKILL.md"), /redact/i);
});
