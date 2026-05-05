# AGENTS.md

Compact guidance for agentic development in `bread`.

## Commands

- `npm run lint` — runs `astro check` (type/content validation, not traditional lint)
- `npm run format` — Prettier check (not run in CI)

CI order: `npm ci` → `npm run lint` → `npm run build`

## Architecture

**OG images**: generated via `.svg.ts` files in `src/pages/og/`

**Key routes**: `/story/` is canonical (legacy `/blog/the-story-of-bread/` redirects)

## Skills

Repository skills live in `.agents/skills/`. Prefer explicit skill invocation for deterministic workflows.

## Pull requests

Include: what changed, why, validation commands run, follow-up tasks.
