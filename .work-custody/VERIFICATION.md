# Verification
Command-level evidence of testing, linting, and validation. Update in real time as commands are run.

## Detected Repo Commands
- test: `npm test` (vitest)
- lint: `npm run lint` (runs `biome check .`)
- typecheck: `astro check` (included in `npm run build`)
- install: `bun install --frozen-lockfile` (`npm ci` currently fails on a peer conflict)

## Evidence Log
| Date | Command | Exit Code | Output Summary |
|------|---------|-----------|---------------|
| 2026-05-06 | npm run lint | 0 | 0 errors, 0 warnings, 0 hints from astro check |
| 2026-05-06 | rename .md to .mdx | 0 | Converted the-story-of-bread.md and bread-san-francisco-dj-collective.md to .mdx |
| 2026-05-06 | npm install @astrojs/mdx | 0 | Installed MDX integration |
| 2026-05-06 | update astro.config.mjs | 0 | Added mdx() to integrations |
| 2026-05-06 | create src/pages/story.astro | 0 | Created story page rendering the-story-of-bread.mdx content |
| 2026-05-06 | npm run lint (after MDX) | 0 | 0 errors, 0 warnings, 0 hints - MDX files now recognized |
| 2026-09-24 | npm run lint (baseline, before changes) | 1 | 7 errors, 129 warnings (pre-existing) |
| 2026-09-24 | npm run lint (after changes) | 1 | 5 errors, 128 warnings; all 5 pre-existing (favicon.svg title, 4 organizeImports) |
| 2026-09-24 | npm test | 0 | 16 passed, including new copy regression test |
| 2026-09-24 | npm run build | 0 | astro check 0 errors/0 warnings/0 hints; build complete |
| 2026-09-24 | Playwright screenshots, 1280px and 390px | 0 | home (3 tabs), archive, timeline, flyers, radio, map, story, overview, ledger, people reviewed |
| 2026-09-24 | Playwright interaction check | 0 | search "zzzz" shows empty state; "rabit" → "2 events"; reset → "Showing 20 of 27" / "Show 7 more"; "Newest first" now puts 2024 first |
| 2026-09-24 | Design pass: npm run lint | 1 | 4 errors, all pre-existing (favicon.svg title, 3 organizeImports); down from 5 |
| 2026-09-24 | Design pass: npm test | 0 | 17 passed (tests updated for new nav/footer and toolbar; added artwork and 16px-input checks) |
| 2026-09-24 | Design pass: npm run build | 0 | astro check 0/0/0; build complete |
| 2026-09-24 | Playwright overflow check, 12 pages at 390/768/1280px | 0 | no horizontal overflow (fixed one at 390px caused by the swipe strip widening the grid column) |
| 2026-09-24 | Playwright interactions | 0 | year headings follow sort and search; empty state; sticky tabs sit under header (57px); switching tabs while deep in the list lands at the top of the new panel; Listen button opens the tab; featured player auto-loads, others load on tap; #event hash reveal; map loads 11 SF pins |
| 2026-09-24 | WCAG contrast of palette | 0 | text 14–16:1, secondary 10–11:1, muted 5.8–6.5:1, accent text 7–8:1; control borders 3.0–3.4:1 |
| 2026-10-08 | bun install --frozen-lockfile | 0 | 803 packages |
| 2026-10-08 | npm run build (baseline, origin/main 36de1cc) | 0 | 12 pages; sitemap 12 URLs incl. `/blog/the-story-of-bread/`, `/archive/narrative-history/` (200 meta-refresh, noindex, canonical /story/) |
| 2026-10-08 | npm run lint (baseline) | 1 | 4 errors (favicon.svg title, 3 organizeImports), 120 warnings |
| 2026-10-08 | npm run lint (after) | 0 | 0 errors, 120 warnings (all pre-existing; changed files add none) |
| 2026-10-08 | npm test | 0 | 3 files, 21 tests passed (4 new in tests/seo.test.ts) |
| 2026-10-08 | npm run build (after) | 0 | astro check 0/0/0 (checks 0 files, see PARKING_LOT); 10 pages; sitemap 10 URLs; `dist/client/_redirects` has 4 rules, 301 to /story/ |
| 2026-10-08 | grep sitemap-0.xml for redirect sources | 0 matches | `the-story-of-bread`, `narrative-history` absent |
| 2026-10-08 | grep title dist/client/index.html | - | `<title>BREAD — San Francisco club night and radio show, 2015–2024</title>` |
| 2026-10-08 | canonical/robots audit of every sitemap URL in dist | - | 10/10 self-canonical, no robots meta |
| 2026-10-08 | npx wrangler dev + curl | - | "Using redirected Wrangler configuration ... Original user's configuration: wrangler.jsonc"; "Parsed 4 valid redirect rules"; both legacy paths, with and without slash, return 301 → /story/; /story/ 200; /_redirects 404 |
| 2026-10-08 | npx wrangler deploy --dry-run | 0 | Reads 220 files from dist/client via dist/client/wrangler.json |
| 2026-10-08 | curl -sI live bread.fm/story vs bread-6vf.pages.dev/story | - | 307 (Workers assets) vs 308 (Pages): bread.fm is served by the Worker |
| 2026-10-08 | Workers Builds check on PR #78 + curl preview alias | success | seo-home-title-sitemap-bread.kanavj.workers.dev: both legacy paths, with and without slash, 301 → /story/; new home title; sitemap 10 URLs, 0 redirect sources |
| 2026-10-08 | Title suffix: npm run lint | 0 | 0 errors; 121 warnings (+1: biome reports the new `toDocumentTitle` import in BaseLayout.astro as unused because it can't see the Astro template; every other import there gets the same false positive) |
| 2026-10-08 | Title suffix: npm test | 0 | 3 files, 24 tests passed; with `toDocumentTitle` stubbed to return its input, 2 tests fail on `src/content/archive/event-ledger.md` |
| 2026-10-08 | Title suffix: npm run build | 0 | 10 pages |
| 2026-10-08 | Built `<title>` audit, dist/client/**/index.html | - | 10/10 name BREAD; longest is the home title at 58 characters; none overflow 60 |
