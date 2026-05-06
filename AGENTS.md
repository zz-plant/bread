# AGENTS.md

Compact guidance for agentic development in `bread`.

## Objective

`bread` is a static site for bread.fm, built with Astro and deployed to Cloudflare Pages. It serves as a personal/brand site with blog content, archive pages, and OG image generation.

## Canonical Files

Read these first, in order:

- `src/pages/index.astro` — homepage and primary layout
- `src/content.config.ts` — content collections schema (blog, archive)
- `astro.config.mjs` — Astro configuration and integrations
- `package.json` — dependencies and scripts

Read these next when the task needs them:

- `src/content/blog/` — blog posts (MDX with frontmatter)
- `src/content/archive/` — archive pages (ordered content)
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
- `blog` — MDX posts with frontmatter (title, description, date, draft, tags)
- `archive` — ordered content pages (title, description, order, updated, tags)

**OG Images**: generated via `.svg.ts` files in `src/pages/og/`. The `[...slug].svg.ts` file handles dynamic OG image generation.

**Key Routes**:
- `/` — homepage (`src/pages/index.astro`)
- `/story/` — canonical story page (legacy `/blog/the-story-of-bread/` redirects)
- `/blog/` — blog post listings and individual posts
- `/archive/` — archive pages
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

- Blog post titles should be clear and descriptive.
- Include `description` in frontmatter for SEO and OG images.
- Use `tags` array for categorization (defaults to empty array).
- Archive items require `order` number for sorting (non-negative integer).
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
