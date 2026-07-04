---
name: research
description: Use when a question requires research against high-trust primary sources, cited documentation, API facts, or source-code evidence.
---

Prefer primary sources. If subagents are available and the user has authorized delegation, a background agent may perform independent reading. Otherwise complete the same workflow in the current thread without subagents.

Its job:

1. Investigate the question against **primary sources** — official docs, source code, specs, first-party APIs — not a secondary write-up of them. Follow every claim back to the source that owns it.
2. Write the findings to a single Markdown file, citing each claim's source.
3. Distinguish sourced facts from inference.
4. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.
