# AGENTS.md

Repository-wide guidance for agentic development in `bread`.

## Purpose

This repository is intended for a static-site codebase with repeatable, automation-friendly workflows.

## Standards

- Prefer small, reviewable commits.
- Keep content and code changes separated when possible.
- For content pages, preserve clean frontmatter and valid internal links.
- Run lint/build checks before opening PRs once tooling is present.

## Skills

- Repository skills live in `.agents/skills/`.
- Prefer explicit skill invocation for deterministic workflows.

## Pull requests

Include:

1. what changed,
2. why,
3. validation commands run,
4. follow-up tasks.
