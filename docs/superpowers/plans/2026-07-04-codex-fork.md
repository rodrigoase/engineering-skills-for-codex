# Engineering Skills for Codex Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Publish a Codex-native, attributed fork containing all 16 upstream engineering skills plus the five productivity dependencies used by `ask-matt`.

**Architecture:** Flatten the curated upstream resources into Codex's required `skills/<skill-name>/` namespace, apply deterministic compatibility rewrites, then make targeted semantic edits where Codex orchestration differs. A Node test suite validates inventory, metadata, references, forbidden Claude-only patterns, and behavioral contracts; the root is also a Codex plugin and Skills CLI package.

**Tech Stack:** Markdown Agent Skills, YAML metadata, Node.js built-in test runner, Codex plugin JSON, GitHub Actions.

---

### Task 1: Lock the compatibility contract

**Files:**
- Create: `tests/adaptation.test.mjs`
- Modify: `package.json`

- [x] Write tests that enumerate the 21 packaged skills and assert Codex metadata, complete engineering-folder coverage, resolvable cross-skill references, portable frontmatter, and absence of Claude-only orchestration.
- [x] Run `node --test tests/adaptation.test.mjs` and confirm it fails against the unadapted upstream fork.
- [x] Add the `test` and `validate` scripts to `package.json`.

### Task 2: Add deterministic adaptation and metadata

**Files:**
- Create: `scripts/adapt-codex.mjs`
- Create: `scripts/validate-skills.mjs`
- Create: `.codex-plugin/plugin.json`
- Create: `.agents/plugins/marketplace.json`
- Create: `skills/*/*/agents/openai.yaml`
- Modify: packaged `SKILL.md` and support Markdown files

- [x] Implement the mechanical rewrite for skill invocation and portable frontmatter.
- [x] Generate explicit-invocation policy for orchestration skills and implicit policy only for narrow discipline skills.
- [x] Add plugin and marketplace manifests listing exactly the curated inventory.
- [x] Run the tests; confirm remaining failures identify semantic Codex incompatibilities rather than missing scaffolding.

### Task 3: Adapt orchestration semantics

**Files:**
- Modify: `skills/ask-matt/SKILL.md`
- Modify: `skills/code-review/SKILL.md`
- Modify: `skills/improve-codebase-architecture/SKILL.md`
- Modify: `skills/research/SKILL.md`
- Modify: `skills/setup-matt-pocock-skills/SKILL.md`
- Modify: `skills/handoff/SKILL.md`
- Modify: `skills/writing-great-skills/SKILL.md`

- [x] Route merge conflicts through `$resolving-merge-conflicts`.
- [x] Give subagent workflows a sequential fallback and require user authorization for delegation.
- [x] Treat automated review findings as evidence-bound hypotheses.
- [x] Prefer `AGENTS.md`, connected GitHub tools, safe temporary reports, and Codex metadata.
- [x] Run `npm test` and fix every compatibility-contract failure.

### Task 4: Attribution, synchronization, and release docs

**Files:**
- Modify: `README.md`
- Create: `NOTICE.md`
- Create: `.github/workflows/validate.yml`
- Create: `.github/workflows/upstream-check.yml`
- Create: `scripts/sync-upstream.mjs`
- Modify: `package.json`

- [x] Put fork attribution and independent-maintenance disclosure at the start of the README.
- [x] Record the upstream commit and Codex-specific modifications in `NOTICE.md`.
- [x] Document plugin and `npx skills` installation and the reviewed update workflow.
- [x] Add CI validation and a non-mutating upstream drift check.

### Task 5: Verify and publish

**Files:**
- Test: all files above

- [x] Run `npm test` and the Codex plugin validator.
- [x] Inspect `git diff --check`, packaged inventory, remotes, and repository visibility.
- [x] Commit the adaptation on a feature branch, push it, open a PR, merge it after checks pass, and confirm public `main` contains the release.
