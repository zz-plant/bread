# Handoff
State to resume work if interrupted, or hand off to another agent/reviewer. Update before stopping work.

## Current State
- Pages no longer embed archive originals. `scripts/generate-responsive-images.mjs` (last `prebuild` step) writes AVIF, WebP, and a JPEG (or PNG, for images with transparency) at 320/480/640 px for every raster file in `public/` except `og/` into `public/_img/` (gitignored), named `<slug>-<content hash>-<width>.<ext>`. `src/data/responsive-images.json` (gitignored) maps each original's public path to its srcsets and dimensions.
- `src/components/ResponsiveImage.astro` renders `<picture>` from that manifest. `display: contents` on `<picture>` and `display: none` on `<source>` keep the page grids seeing one child, so layout is unchanged. `priority` sets eager + sync decoding + `fetchpriority="high"`; everything else is lazy.
- Used on home (featured visuals, first is priority), `/story/` gallery (all lazy, below the fold), `/archive/flyers/` and `/archive/radio-shows/` (first is priority). Gallery links and structured data still point at the originals.
- `sizes` strings live in `src/utils/images.ts`, measured at 24 viewport widths against `.gallery` (global.css) and `.featured-visual-grid` (home.css).
- `public/_headers` gives `/_img/*` a one-year immutable Cache-Control; the adapter prepends its `/_astro/*` rule to the same file.
- Why not `astro:assets`: it only transforms images imported from `src/`. With `imageService: "compile"` it works with this adapter, but importing from `public/` copies every imported original into `_astro/` and deletes only the transformed ones (verified with a glob of `public/radio/`: 21 duplicates left). Moving the originals into `src/` would change their URLs.

## Next Steps
- Watch the Workers Builds check on the PR; note the image step's time in its log (31 s locally, cold).
- After merge and deploy, re-run Lighthouse against https://bread.fm/ and spot-check `curl -sI https://bread.fm/_img/<file>.avif` for the immutable header.

## Open Items
- See PARKING_LOT.md (sharp not declared, 41 unrendered originals processed, grainy bread5 posters, CI cache, double prebuild) and UNKNOWNS.md.

## Blockers
- None
