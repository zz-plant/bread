# Diff Audit
Audit of changed files against authorized scope in `WORK_ORDER.md`.

## Scope Compliance
- [x] All changed files are in authorized scope
- [x] No prohibited files modified (no archive copy written, no deploy config changed)

## Changed Files
| File | In Scope | Notes |
|------|----------|-------|
| src/pages/index.astro | Yes | Home title only |
| astro.config.mjs | Yes | `redirects` config; sitemap filter derived from it |
| src/pages/blog/the-story-of-bread.astro (deleted) | Yes | Replaced by config redirect |
| src/pages/archive/narrative-history.astro (deleted) | Yes | Replaced by config redirect |
| tests/seo.test.ts | Yes | Title length, sitemap filter, no `Astro.redirect()` stubs |
| src/layouts/ArchiveLayout.astro, src/pages/archive/[...slug].astro, src/pages/story/index.astro | Yes | Import order only (biome safe fix) |
| public/favicon.svg | Yes | Added `<title>` (biome a11y error) |
| .work-custody/* | Yes | Custody records |
