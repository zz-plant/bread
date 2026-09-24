# Diff Audit
Audit of changed files against authorized scope in `WORK_ORDER.md`.

## Scope Compliance
- [x] All changed files are in authorized scope
- [x] No prohibited files modified (no assets renamed, no routes or schema changed)

## Changed Files
| File | In Scope | Notes |
|------|----------|-------|
| src/pages/**, src/components/**, src/layouts/** | Yes | Copy, layout tells, sort/empty-state fixes |
| src/content/** | Yes | Copy rewrites; event titles/venues/lineups; roster notes; broken links removed |
| src/styles/*.css | Yes | Removed grain/watermark; image sizing; defined missing type tokens |
| src/data/homepage.ts, src/utils/eventFilters.ts | Yes | Captions, counts, sort |
| src/utils/og-image-core.mjs, scripts/generate-og-images.mjs | Yes | OG palette, copy, wrap bug |
| scripts/generate-data.mjs | Yes | Flyer title and radio guest heuristics |
| tests/homepage-ux.test.ts | Yes | Copy regression test |
| .work-custody/* | Yes | Custody records |
| src/styles/global.css, src/styles/home.css | Yes | Design pass: tokens, shared components, homepage layout |
| src/layouts/BaseLayout.astro, ArchiveLayout.astro, src/components/Breadcrumbs.astro, CardLink.astro | Yes | Design pass: unified header/nav/footer and page headers |
