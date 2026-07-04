import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const engineering = [
  "ask-matt", "code-review", "codebase-design", "diagnosing-bugs",
  "domain-modeling", "grill-with-docs", "implement",
  "improve-codebase-architecture", "prototype", "research",
  "resolving-merge-conflicts", "setup-matt-pocock-skills", "tdd",
  "to-issues", "to-prd", "triage",
];
const productivity = ["grill-me", "grilling", "handoff", "teach", "writing-great-skills"];
const skills = [...engineering, ...productivity];
const explicit = new Set([
  "ask-matt", "setup-matt-pocock-skills", "grill-me", "grill-with-docs",
  "handoff", "to-prd", "to-issues", "triage", "improve-codebase-architecture",
  "teach", "writing-great-skills", "resolving-merge-conflicts",
]);

const title = (name) => name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
const quote = (value) => JSON.stringify(value);

for (const name of skills) {
  const path = join(root, "skills", name, "SKILL.md");
  let body = readFileSync(path, "utf8");
  const match = body.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid frontmatter: ${path}`);
  const old = match[1];
  const descriptionMatch = old.match(/^description:\s*(.+)$/m);
  if (!descriptionMatch) throw new Error(`Missing description: ${path}`);
  let description = descriptionMatch[1].trim().replace(/^['"]|['"]$/g, "");
  if (!/^Use when\b/i.test(description)) description = `Use when ${description[0].toLowerCase()}${description.slice(1)}`;
  body = `---\nname: ${name}\ndescription: ${description}\n---\n${match[2]}`;
  for (const target of [...engineering, ...productivity]) {
    body = body.replace(new RegExp(`(?<![\\w.])/${target}\\b(?!/)`, "g"), `$${target}`);
  }
  writeFileSync(path, body);

  const metadata = join(root, "skills", name, "agents", "openai.yaml");
  mkdirSync(dirname(metadata), { recursive: true });
  writeFileSync(metadata, `interface:\n  display_name: ${quote(title(name))}\n  short_description: ${quote(description.replace(/^Use when\s+/i, "").slice(0, 96))}\n  default_prompt: ${quote(`Use $${name} for this task.`)}\npolicy:\n  allow_implicit_invocation: ${explicit.has(name) ? "false" : "true"}\n`);
}
