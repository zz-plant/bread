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
| 2026-10-08 | Responsive images: bun install --frozen-lockfile | 0 | 803 packages |
| 2026-10-08 | npm run build (baseline, origin/main 5d098c9) | 0 | 15 s; pages embed `/drive/`, `/radio/`, and top-level originals directly |
| 2026-10-08 | Lighthouse 13.5.0 mobile, local `astro preview`, 3 runs, median (before) | - | `/`: score 70, 28,197 KiB, LCP 123.3 s. `/story/`: 99, 88 KiB, LCP 1.6 s. `/archive/flyers/`: 74, 44,122 KiB, LCP 7.0 s. `/archive/radio-shows/`: 74, 10,479 KiB, LCP 18.3 s |
| 2026-10-08 | Experiment: `imageService: "compile"` + `import.meta.glob` of `public/radio/*` + one `<Picture>` | 0 | Build works with the adapter, but all 22 matched originals were copied into `dist/client/_astro/` and Astro deleted only the one it transformed, leaving 21 duplicates. Reverted; chose a sharp prebuild script |
| 2026-10-08 | node scripts/generate-responsive-images.mjs (cold / warm) | 0 | 164 originals, 31 s / 0.3 s (M1 Max, 216 s CPU); 1,164 files, 38 MB; AVIF dropped for 5 images where it was larger than WebP |
| 2026-10-08 | npm run lint | 0 | 0 errors; 130 warnings (121 before). The 9 new ones are biome's known Astro false positive: imports used only in the template (see PARKING_LOT) |
| 2026-10-08 | npm test | 0 | 4 files, 27 tests (3 new in tests/images.test.ts). Without `dist/` the 2 built-page tests skip |
| 2026-10-08 | tests/images.test.ts against an origin/main export + its build | 1 | All 3 fail: 4 computed-src `<img>` in src/; flyers/home/story/radio embed originals up to 10,951 KB; no `<picture>` |
| 2026-10-08 | npm run build (after, cold image cache) | 0 | 43 s; astro check 0 errors (checks 0 files, see PARKING_LOT); 10 pages |
| 2026-10-08 | Built HTML audit | - | home 4, story 6, flyers 100, radio 21 `<picture>`; 0 raw originals in `<img>`; 1 `fetchpriority="high"` on home, flyers, radio; story all lazy |
| 2026-10-08 | Lighthouse 13.5.0 mobile, local `astro preview`, 3 runs, median (after) | - | `/`: score 98, 224 KiB, LCP 2.1 s. `/story/`: 99, 94 KiB, LCP 1.6 s (+6 KiB is uncompressed `<picture>` markup; the preview does not compress HTML, gzip adds 0.5 KiB). `/archive/flyers/`: 94, 1,286 KiB, LCP 2.7 s. `/archive/radio-shows/`: 93, 457 KiB, LCP 3.0 s |
| 2026-10-08 | Playwright full-page scroll, image bytes (before → after) | - | home 27.41 → 0.09 MB; story 30.10 → 0.13 MB; flyers 244.94 → 1.55 MB; radio 10.15 → 0.20 MB |
| 2026-10-08 | Screenshots 390/1280 px, 4 pages, pixelmatch | - | Page heights identical; 0 differing pixels outside image boxes; image boxes identical except 1 px height rounding on tall flyers that the frame clips. First pass found a 19 px shift on home and shorter boxes in galleries: `<source>` elements became grid items under `display: contents`; fixed with `source { display: none }` |
| 2026-10-08 | astro dev on :4394 | - | home 4 and flyers 100 `<picture>`; `/_img/*.avif` served; server stopped |
| 2026-10-08 | npx wrangler deploy --dry-run | 0 | Reads `wrangler.jsonc` → `dist/client/wrangler.json`; 1,385 asset files; none over 25 MiB |
| 2026-10-08 | Workers Builds check on PR #80 (dbb4ced) | success | Preview alias https://perf-responsive-images-bread.kanavj.workers.dev: home has 4 `<picture>`; `/_img/*.avif` returns `image/avif` with `cache-control: public, max-age=31536000, immutable`; originals still served at `/drive/...` |
| 2026-10-08 | Lighthouse 13.5.0 mobile, single run, live bread.fm vs PR preview | - | `/`: 64, 28,181 KiB, LCP 68.4 s → 99, 165 KiB, LCP 1.8 s. `/story/`: 92, 93 KiB, LCP 2.7 s → 99, 68 KiB, LCP 1.7 s (bread.fm makes 6 more requests than the workers.dev preview, so `/story/` is not like for like) |
| 2026-10-08 | Declare sharp: `npm install --package-lock-only --save-dev sharp@^0.34.5` (scratch copy) | 1 | ERESOLVE: `@astrojs/cloudflare@14.3.4` peer `astro@^7.2.0` vs the lock's astro (the parked conflict) |
| 2026-10-08 | Same with `--legacy-peer-deps` (scratch copy) | 0 | 2,763 insertions, 1,326 deletions in package-lock.json: a full regeneration, so not used; root entry edited by hand instead |
| 2026-10-08 | bun install (after adding `"sharp": "^0.34.5"`) | 0 | 803 packages; bun.lock diff is one line in the root devDependencies |
| 2026-10-08 | bun install --frozen-lockfile | 0 | No changes |
| 2026-10-08 | `node -e "import('sharp')"` | 0 | sharp 0.34.5 from `node_modules/sharp` |
| 2026-10-08 | npm ls sharp --package-lock-only | 0 | `sharp@0.34.5` at the root, deduped under astro and miniflare; no "invalid" on sharp (astro and wrangler show the pre-existing stale-lock "invalid") |
| 2026-10-08 | npm run lint | 0 | 0 errors, 130 warnings (unchanged) |
| 2026-10-08 | npm run build | 0 | 37 s with a cold image cache; 10 pages |
| 2026-10-08 | npm test (after build) | 0 | 4 files, 27 tests passed |
| 2026-10-08 | Workers Builds check on PR #81 (9c284db) | success | Preview alias https://chore-declare-sharp-bread.kanavj.workers.dev: home 200; `/_img/bread-x-grime-city-150213-show-78b9db1f98-320.avif` 200 `image/avif` (responsive-image step ran); `/og/home.png` 200 `image/png` (OG step ran) |

## 2026-10-14 follow-up

- Baseline `bun run assets:check`: 14 valid compressed images rejected by minimum byte counts. New PNG tests also proved a corrupt padded header passed.
- `bun install --frozen-lockfile`: pass; lockfile unchanged.
- `bun run assets:check`: pass, 21 PNGs and source SVG; complete sharp decoding replaces the byte heuristic.
- `npm run lint`: pass with the existing 130 warnings and 12 configuration infos.
- `npm run build`: pass, Astro reports 0 errors/warnings, ten public pages built.
- `npm test`: 7 files, 38 tests pass after build, including the rendered schema tests.
- All ten generated pages: canonical URLs, descriptions, OG/Twitter images and image descriptions present. Home has WebSite/CollectionPage/events; timeline has collection/breadcrumb; galleries expose ImageObject lists; story exposes Article type and image.
- `git diff --check`: pass. No deployment or live-state verification.

## 2026-10-21 follow-up

- Art audit: every top-level `public/bread-*`/`toasted-trax-*` file and every `public/radio/*` card opened and read (annotated crops). 12 of 13 top-level files and 22 of 22 radio cards held other art than their names said; two files were crossed between folders (a radio card in `public/`, the Kelman Duran flyer in `public/radio/`). Renamed with `git mv` through temp names; md5 of each file before == after under its new name (35 files, 0 mismatches).
- `node scripts/generate-data.mjs`: 100 flyers, 22 radio shows (was 21: the Botaz & DJ Polo card was hidden under a flyer name). Captions now match the printed art (e.g. "SHL & Prawns, February 1", "Toasted Trax #1, June 29, 2016"). All 22 radio dates fall on Wednesdays in 2017.
- Every `/…\.(jpg|png)` path in `src/content`, `src/pages`, `src/data/homepage.ts` exists under `public/` (only `/og/*` is generated at build).
- Logo: traced with potracer from `public/drive/bread-13-ig-v4.png` (4500 px; crumbs dropped by colour, specks by `turdsize`); lockup spacing measured from `bread-14-v3-edit.png`. Rendered with sharp and compared by eye against the source.
- `node scripts/generate-icons.mjs`: favicon.svg 4 KB, favicon.ico 32 px PNG-in-ICO, apple-touch-icon 180 px.
- `npm run build`: exit 0; astro check 0 errors / 0 warnings; 10 pages; 11 OG cards in 2.7 s.
- `npm run lint`: exit 0. 133 warnings vs 131 on main: the two new ones are Biome's known false positive for `.astro` imports used only in the template (`Logo`). The two pre-existing format errors (ArchiveLayout, timeline frontmatter) are fixed.
- `npx vitest run`: 7 files, 38 tests pass (after `node node_modules/bun/install.js`, needed only because this checkout was installed with `--ignore-scripts`).
- `npm run check`: assets valid; `impeccable@4.5.2 detect src/` exit 0, no findings.
- Playwright on the built site (`dist/client`) at 1440, 820 and 390 px, eight routes: no horizontal overflow anywhere (the first pass found 46 px on the phone homepage from an old hero size; fixed). Screenshots of home (all three tabs), events, flyers, radio, story, timeline, map, archive, event ledger.

## 2026-11-10 follow-up

- Flyers opened and read before any copy changed (resized with sharp, viewed): pilot, BREAD #2, #3, #4 (v3 and v4), Nightsweats, #5, #7, #9, #10, long weekend special, Toasted Trax #1 and #2, #13, DJ J Heat, Mr. Mitch, Kelman Duran, New Year, Long Bread Summer, two Radio Valencia cards. Each changed event field is printed on that night's flyer, except the two venue names and the Nightsweats year noted in UNKNOWNS.
- Event counts behind the copy: 23 club nights (5 in 2015, 12 in 2016, 5 in 2017, 1 in 2018), 3 streams; homepage lists 31 events (was 27).
- `npm run lint`: exit 0, 133 warnings and 12 infos as on main (two format errors from this change fixed with `biome format --write`).
- `npm run build`: exit 0; 10 pages built.
- `npm test`: 7 files, 38 tests pass after the build.
- `npm run check:design`: exit 0.
- `git diff --check`: pass.
- Playwright on `dist/client` at 1100 px (story, timeline, people, map, event list, home, radio, overview) and 390 px (story): no horizontal overflow; story, timeline and home screenshots read through. Rendered venue list checked: Club 6ix 2 events, Bruno's, Milk Bar, Codeword 2 events.
- No deployment or live-site check.

### Tokyo and Oakland nights (same day)

- Three event records added from the event list rows; homepage lists 34 events, and the 2023 rows read "BREAD in Tokyo, night 1 / night 2" and "BREAD at Slug Bar".
- Venue map: groups are San Francisco (11), Oakland (1), Tokyo (2), Online (3). Playwright on the built page at 1100 and 390 px: 14 pins; the Bay Area view shows 12 and the Tokyo view 2; the pressed state follows the view; no page errors, no horizontal overflow.
- Found while checking: Leaflet's pin images 404ed in the built site (`/archive/map/marker-icon.png`), so every pin was a broken image, on main too. The script now passes Leaflet the bundled URLs; pins load (natural width 25 px).
- `npm run lint` exit 0 (134 warnings; the new one is the known `.astro` template false positive), `npm run build` exit 0, `npm test` 38 pass.

### Gmail and Drive evidence (same day, read-only)

A background search of the owner's Gmail and Drive, then the claims that change copy re-read directly:

- Mailer from contact@bread.fm, 2021-03-12, "six years of bread – tomorrow!": Bread New Year raised $4,240 in donations, half matched, $6,360 in all, for Atlanta Solidarity Fund and National Black Deaf Advocates; Six Years of BREAD raised for DFW Mutual Aid Fund and Women's Prison Book Project, with Gila as guest. Read in full.
- Mailer from info@breadsquad.com, 2016-02-15, "Addison Groove is here for your Monday off" ("BREAD #4 president's day"), and RA listing "Bread #4 with Addison Groove, Supraman & Letta". Seen.
- Mailer from info@breadsf.club, 2016-12-08, "FRI at 1192 Folsom: NA of Nguzunguzu, Dubbel Dutch, TSVI, Jasmine Infiniti", half of presale proceeds to the Gray Area Foundation's relief fund for the Oakland fire; RA listing "Bread #12 with NA, Dubbel Dutch & Tsvi", Fri 9 Dec 2016. Seen.
- Mailer from contact@bread.fm, 2017-07-26, "Bread is back this Friday at UGSF with ... Roska". Seen.
- Mailers from contact@bread.fm, 2018-05-08 to 05-12, "Neana, Gila, London Jade & Bread DJs", with tf1000, exteeng, adam kraft, botaz. Seen.
- Mailer from info@breadsquad.com, 2016-08-18, "Friday at 1192 Folsom: Pinch. Rabit. Logos. Mumdance. Caski": "Our biggest night yet." Seen.
- Toasted Trax 2: Eventbrite page published 2016-10-14, RA listing, mailer 2016-10-20. Seen. Nothing after the night.
- Reported by the search agent and not re-read here: BREAD #1 at 1192 Folsom (screenshot of a public Facebook post in Drive; Eventbrite title with Dreams and Fraxinus); Radio Valencia first show 2017-01-18, weekly (planning doc; SoundCloud episode numbering); BREAD #7 set times without Endgame (mailer 2016-05-21); Route 8 and Asquith at the Sure Thing showcase (schedule doc).
- Nothing found for the Tokyo, Slug Bar and 2024 SoMa nights.
- After the edits: `npm run lint` exit 0, `npm run build` exit 0 (10 pages), `npm test` 38 pass. Homepage lists 33 events; the venue list shows F8 with 8 events and Underground SF with 5; one San Francisco venue is still unknown (the Nightsweats afterhours).

### Two radio episodes (follow-up PR, same day)

- Event records added for the IPR episode of 2022-09-28 (Botaz, Shl) and the first HKCR episode of 2023-06-15, from their event-list rows. Events that share a date now sort by id, so the HKCR announcement stays ahead of the episode on every build.
- `npm run lint` exit 0, `npm run build` exit 0 (10 pages), `npm test` 38 pass. Built homepage lists 35 events with the two rows in date order; the map shows Internet Public Radio and HKCR with 3 events each.

### Codeword and Underground SF pins (same PR)

- OpenStreetMap (Nominatim) geocodes: 917 Folsom St is 37.7798, -122.4036; 424 Haight St is 37.7724, -122.4293 and is tagged "Underground SF". The old pins were about 0.6 and 0.9 miles away. The other addressed pins (F8, Club 6ix, Bruno's, Milk Bar) geocode to within about a block of where they sit and are unchanged.
- `npm run lint` exit 0, `npm run build` exit 0, `npm test` 38 pass. The built map page carries the new coordinates for both venues.

### Unflattering copy (same PR)

- Read every built page's visible text for lines that could read as unflattering, and looked at the 38 photos and miscellaneous images on the Flyers page. Removed one: the note on Judy's roster card ("Later moved in a different musical direction."), a remark about a named person. Left in place and reported to the owner: the sourcing caveats (Toasted Trax #2, unknown lineup and venue rows, "What's missing"), which are statements of what the record does not show.

### Owner confirmations (follow-up PR, same day)

- The owner confirmed that Toasted Trax #2 took place and that dhra is Judy. The story states the second Toasted Trax plainly and drops the line doubting it; Judy's roster card and the People page credit the DHRA set at Toasted Trax #1 (the name is on that night's flyer).
- `npm run lint` exit 0, `npm run build` exit 0 (10 pages), `npm test` 38 pass. The built story has no "was billed" and no "confirms that the second Toasted Trax"; the homepage People tab shows the new note.
