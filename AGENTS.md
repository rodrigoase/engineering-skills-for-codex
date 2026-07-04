# Repository guidance

This repository is the Codex-native fork of `mattpocock/skills` described in `NOTICE.md`.

- Skills use the flat `skills/<skill-name>/` layout required by the Codex plugin validator.
- Every skill must contain portable `name` and trigger-focused `description` frontmatter plus `agents/openai.yaml`.
- Cross-skill invocation uses `$skill-name`; documented Codex built-ins such as `/compact` keep slash syntax.
- `skills/ask-matt/SKILL.md` must route every packaged engineering skill and must not reference absent skills.
- Preserve upstream intent. Put mechanical compatibility changes in `scripts/adapt-codex.mjs` and explain semantic divergences in `NOTICE.md`.
- Do not add unrelated upstream `personal`, `misc`, `in-progress`, or `deprecated` skills to the plugin.
- Prefer connected GitHub tools; external mutations require authorization from the user's request.

Before committing, run:

```bash
npm test
python3 /path/to/plugin-creator/scripts/validate_plugin.py .
git diff --check
```
