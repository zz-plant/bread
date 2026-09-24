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
