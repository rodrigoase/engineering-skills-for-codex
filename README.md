# Engineering Skills for Codex

This repository is a Codex-focused fork of [mattpocock/skills](https://github.com/mattpocock/skills). The original workflows are authored by Matt Pocock and distributed under the MIT License. This fork adapts invocation, metadata, tools, and orchestration for OpenAI Codex. It is independently maintained and is not an official Matt Pocock or OpenAI project.

It packages all 16 skills currently under upstream `skills/engineering`, plus the five productivity skills required by `$ask-matt`: `$grill-me`, `$grilling`, `$handoff`, `$teach`, and `$writing-great-skills`.

## Install

### Codex plugin

```bash
codex plugin marketplace add rodrigoase/engineering-skills-for-codex --ref main
```

Then open `/plugins`, select **Engineering Skills for Codex**, and install it. Start a new thread after installation.

### Skills CLI

```bash
npx skills@latest add rodrigoase/engineering-skills-for-codex -g -a codex
```

Invoke a skill explicitly with `$skill-name`; start with `$ask-matt` when you are unsure which workflow fits. Run `$setup-matt-pocock-skills` once in each repository to configure `AGENTS.md`, issue tracking, triage labels, and domain-document conventions.

## What this fork changes

- Uses Codex `$skill-name` invocation while retaining documented built-in slash commands such as `/compact`.
- Adds `agents/openai.yaml` metadata and explicit implicit-invocation policy to every packaged skill.
- Prefers `AGENTS.md`, connected GitHub tools, Codex-compatible subagents, and sequential fallbacks.
- Requires evidence for blocking review findings and treats speculative automated-review comments as hypotheses.
- Keeps generated reports in temporary storage, readable offline, without launching GUI applications automatically.
- Validates complete engineering-skill coverage and the closure of `$ask-matt` references.

See [NOTICE.md](NOTICE.md) for upstream provenance and [the implementation plan](docs/superpowers/plans/2026-07-04-codex-fork.md) for the adaptation contract.
