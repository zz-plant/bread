# AGENTS.md

Compact guidance for agentic development in `bread`.

## Objective

`bread` is a static site for bread.fm, built with Astro and deployed to Cloudflare Pages. It serves as a personal/brand site with blog content, archive pages, and OG image generation.

## Canonical Files

Read these first, in order:

- `src/pages/index.astro` — homepage and primary layout
- `src/content.config.ts` — content collections schema (archive, events, roster)
- `astro.config.mjs` — Astro configuration and integrations
- `package.json` — dependencies and scripts

Read these next when the task needs them:

- `src/content/archive/` — archive pages (ordered content)
- `src/content/events/` — event data (JSON with title, date, venue, lineup, confidence)
- `src/content/roster/` — roster data (JSON with name, role, links)
- `src/pages/og/[...slug].svg.ts` — OG image generation
- `src/layouts/` — page layouts
- `src/components/` — reusable components
- `scripts/generate-data.mjs` — preflight data generation
- `wrangler.jsonc` — Cloudflare Workers configuration
- `docs/` — project documentation

## Commands

- `npm run dev` — start Astro dev server
- `npm run build` — preflight data gen + astro check + astro build
- `npm run lint` — runs `astro check` (type/content validation, not traditional lint)
- `npm run format` — Prettier check (not run in CI)
- `npm run preview` — preview production build locally
- `npm run generate-types` — generate Cloudflare types via wrangler

CI order: `npm ci` → `npm run lint` → `npm run build`

## Architecture

**Framework**: Astro 6.x with Cloudflare adapter for static site generation.

**Content Collections**:
- `archive` — ordered content pages (title, description, order, updated, tags)
- `events` — event data (title, date, year, venue, lineup, confidence, status)
- `roster` — roster members (name, role, notes, links, order)

**OG Images**: generated via `.svg.ts` files in `src/pages/og/`. The `[...slug].svg.ts` file handles dynamic OG image generation for homepage and archive pages.

**Key Routes**:
- `/` — homepage (`src/pages/index.astro`)
- `/story/` — canonical story page
- `/archive/` — archive pages (flyers, radio shows, timeline, event ledger, people, venues)
- `/og/*.svg` — OG image endpoints

**Deployment**: Cloudflare Pages via `@astrojs/cloudflare` adapter.

## Skills

Repository skills live in `.agents/skills/`. Prefer explicit skill invocation for deterministic workflows.

- **static-site-author** — Use when creating or editing static-site content pages/posts, especially markdown/MDX with frontmatter and internal links.

## Working Rules

- Content lives in `src/content/` — blog posts in `blog/`, archive pages in `archive/`.
- All blog posts use MDX format with required frontmatter (title, description, date).
- Draft posts have `draft: true` in frontmatter and should not appear in production builds.
- OG images are generated programmatically — avoid manual image creation for social cards.
- The build process runs `scripts/generate-data.mjs` before type checking and building.
- Prefer updating existing components/layouts over creating new ones for small changes.
- Use Cloudflare-specific features (R2, KV, etc.) only when documented in `wrangler.jsonc`.

## Content Standards

- Archive items require `order` number for sorting (non-negative integer).
- Events use `confidence` field ("strong", "user-archive") to indicate verification level.
- Events with `confidence: "unverified"` are filtered from homepage chronology.
- Internal links should use Astro's `<a href="">` or framework-specific routing.

## Anti-Patterns

- Do not create blog posts without proper frontmatter schema validation.
- Do not bypass `astro check` before committing — type/content errors break CI.
- Do not hardcode URLs — use relative paths or Astro's `site` config.
- Do not commit generated files in `dist/` — they're build artifacts.
- Do not add traditional linting tools — `astro check` handles validation.

## Architecture Decisions

- **Astro over Next.js** (2026-05): Chose Astro for static site simplicity and Cloudflare compatibility.
- **MDX for content**: Enables rich content with components while maintaining markdown simplicity.
- **Cloudflare deployment**: Using `@astrojs/cloudflare` adapter for edge deployment.
- **OG image generation**: Programmatic SVG generation via `.svg.ts` files — no manual image assets.
- **No traditional linting**: `astro check` provides type and content validation; Prettier for formatting only.

## Required Output Shape

When completing a substantive task, leave behind:

1. The implemented change (code, content, or configuration)
2. Verification that `npm run lint` passes
3. A brief summary of what changed and why

## Pull Requests

Include: what changed, why, validation commands run, follow-up tasks.

## Work Custody
For non-trivial delegated work, use `.work-custody/`.
Rules:
1. Read `.work-custody/WORK_ORDER.md` before acting.
2. Do not edit outside the authorized scope.
3. Put adjacent findings in `.work-custody/PARKING_LOT.md`.
4. Preserve unresolved uncertainty in `.work-custody/UNKNOWNS.md`.
5. Record command-level evidence in `.work-custody/VERIFICATION.md`.
6. Before stopping, update `.work-custody/HANDOFF.md`.
7. Do not mark work ready unless `.work-custody/READINESS.md` is complete.
