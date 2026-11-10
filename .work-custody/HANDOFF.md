# Handoff
State to resume work if interrupted, or hand off to another agent/reviewer. Update before stopping work.

## Current State
- `sharp` is declared in `package.json` devDependencies as `^0.34.5`, the version astro's optional dependency already resolved. `bun.lock` and `package-lock.json` each gain that one line in the root entry; no resolved version changed (`npm ls sharp --package-lock-only` shows `sharp@0.34.5` at the root, deduped under astro and miniflare).
- `package-lock.json` is still stale against `package.json` (astro 6.4.2 vs `^7.2.2`, wrangler 4.95 vs `^4.123.0`), so `npm ci` still fails; that stays parked.

## Next Steps
- Workers Builds passed on PR #81; its preview alias (https://chore-declare-sharp-bread.kanavj.workers.dev) serves the sharp-built `/_img/` and `/og/` files. Merge is the owner's step.

## Open Items
- See PARKING_LOT.md (stale package-lock.json, 41 unrendered originals processed, grainy bread5 posters, CI cache, double prebuild) and UNKNOWNS.md.

## Blockers
- None

## 2026-10-14 follow-up handoff

PNG validation decodes pixels instead of inferring quality from byte size. `getHomepageData(Astro.site)` restores omitted website, collection and event records. Shared schemas identify the website and images; story previews use Article type. Timeline gets collection/breadcrumb data, and ArchiveLayout now publishes gallery image inventories already computed by the pages. Eleven regression checks cover integrity and structured metadata. Local lint/build/assets and all 38 tests pass. See the draft PR for review.

## 2026-10-21 follow-up handoff

The site now uses the crew's own visual language: the traced toast-stack + "bread" mark in the header, hero, footer, favicons and OG cards; a black-and-white frame like the BREAD FM cards; Archivo condensed caps for lineups, dates and headings; square corners; a flyer beside each event that has one; OG cards laid over a wall of that page's flyers. Before that, 35 art files were renamed to match what is printed on them, so flyer and radio captions are right. Lint, build, tests, asset and design checks pass; screenshots at three widths show no overflow. Open questions for the owner are in UNKNOWNS (font choice, original logo vector, radio year) and PARKING_LOT (BREAD #7 lineup, TT#2 venue, flyers without events, docs/assets template).

## 2026-11-10 follow-up handoff

The story, timeline, overview, people, event list, map and radio copy now tell one account: a pilot at F8 in February 2015, twelve nights in 2016, Underground SF and the Radio Valencia show in 2017, the last club night in May 2018, three fundraiser streams in 2021, BREAD FM again from 2022. The old copy put the Radio Valencia show after the streams, counted BREAD #10 and "Parameter x BREAD" as two nights, called Toasted Trax a partner night, and had no ending for the club years. Four nights whose flyers were already on the site now have event records (pilot, #4, Nightsweats, #13), and five records were corrected from their own flyers. Owner checks are in UNKNOWNS (the $12,000 figure, Judy as co-founder, the radio year, the #4 date, whether Toasted Trax #2 happened).

Later the same day: the Tokyo and Oakland nights are on the homepage and map (the map groups venues by city and has Bay Area and Tokyo views; its pins, broken in the built site, now load). A read-only search of the owner's Gmail and Drive then settled most of the open facts and corrected several: Addison Groove headlined BREAD #4, BREAD #1 and #12 were at F8, Roska was at Underground SF, the New Year stream raised $6,360, and the "$12,000" total had no source and is gone. What is still open is in UNKNOWNS.
