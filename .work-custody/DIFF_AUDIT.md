# Diff Audit
Audit of changed files against authorized scope in `WORK_ORDER.md`.

## Scope Compliance
- [x] All changed files are in authorized scope
- [x] No prohibited files modified (originals in `public/` untouched; no wrangler config changed)

## Changed Files
| File | In Scope | Notes |
|------|----------|-------|
| scripts/generate-responsive-images.mjs | Yes | New prebuild step: AVIF/WebP/JPEG-or-PNG at 320/480/640 px into `public/_img/`, manifest in `src/data/responsive-images.json` |
| src/components/ResponsiveImage.astro | Yes | `<picture>` from the manifest; throws if an image has no variants |
| src/utils/images.ts | Yes | `sizes` strings measured against the gallery and featured-strip CSS; manifest entry type |
| src/components/EventPanel.astro | Yes | Home featured visuals use ResponsiveImage; first one `priority` |
| src/pages/story/index.astro | Yes | Story gallery uses ResponsiveImage (all lazy, below the fold) |
| src/pages/archive/flyers.astro, src/pages/archive/radio-shows.astro | Yes | Galleries use ResponsiveImage; first image `priority` |
| package.json | Yes | `prebuild` runs the new script last |
| .gitignore | Yes | `public/_img/` |
| public/_headers | Yes | Immutable caching for `/_img/*` (hashed names); the adapter prepends its `/_astro/*` rule |
| tests/images.test.ts | Yes | Source check (no computed-src `<img>`, no raw original over 200 KB) and built-HTML check |
| AGENTS.md | Yes | Build-step list, page-image rule, and the astro:assets decision updated for the new step |
| .work-custody/* | Yes | Custody records |
