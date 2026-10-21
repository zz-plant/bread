# Parking Lot
Adjacent findings discovered during work that are out of authorized scope. Do not act on these unless explicitly authorized.

## Findings
| Date | Finding | Suggested Next Step |
|------|---------|---------------------|
| 2026-09-24 | Several image files hold different artwork than their filenames say. `public/radio/bread-fm-botaz-dj-polo-aug-30.jpg` is the "SHL & Prawns, Wed Feb 1" Radio Valencia card; `public/bread-botaz-prawns-tf1000-2024-02-24.jpg` is the Long Bread Summer (July 10) flyer. Radio show and flyer card labels, and some event "Flyer image" source links, therefore point at the wrong art. | Done 2026-10-21: every file opened, 35 renamed to match their art (one only gained its year; two moved between `public/` and `public/radio/`), references updated. |
| 2026-09-24 | Resident links on `/archive/radio-shows/` disagree with `src/content/roster/*.json` (e.g. Prawns SoundCloud `soundcloud.com/prawns` vs `soundcloud.com/pkj`; Adam Kraft `adamkraftneindanke` vs `adam_kraft`). | Owner confirms the right handles; then render the directory from the roster collection instead of hardcoding it. |
| 2026-09-24 | Dead code: `src/components/homepage/StatsSidebar.astro`, `src/components/ClickHint.astro`, `src/config/navLinks.ts` (points at nonexistent `/about/`, `/events/`, `/roster/`), `src/data/flyers.ts`, `src/data/radio-shows.ts`, `createYearVenueChips` and the `quick`/`year`/`venue` filters in `eventFilters.ts`, unused `imageListStructuredData` in flyers/radio pages. | Delete in a cleanup PR. |
| 2026-09-24 | Roster schema drops `web` and `tw` links (Botaz's site, Cage A's Twitter) because `content.config.ts` only allows sc/ig/bc/ra. | Add the keys to the schema and render them in `PeopleTab.astro`. |
| 2026-09-24 | `README.md` still describes a "minimal static-site starter" with a blog and `/blog/` index that no longer exist; `AGENTS.md` says `npm run lint` runs `astro check` (it runs biome). | Refresh both docs. |
| 2026-09-24 | `npm ci` fails with an ERESOLVE peer conflict (`@astrojs/cloudflare@14` vs `astro@7.3`); `bun install --frozen-lockfile` works. | Regenerate `package-lock.json` or drop it in favor of `bun.lock`. |
| 2026-09-24 | Homepage nav (Archive, Flyers, Radio shows, Timeline, Story) differs from every other page (Home, Archive, Story). | Pick one nav set. |
| 2026-10-08 | `/archive/`, `/archive/overview/`, and `/archive/people-network/` are thin (under 200 words of body text each). | Owner adds substance (who, where, what happened) to each page. |
| 2026-10-08 | Several page titles omit BREAD and say little on their own: "Event List", "Start Here", "People", "Timeline". | Done in the follow-up to PR #78: BaseLayout appends " · BREAD". The base words are still vague ("People · BREAD"); the owner may want more specific titles. |
| 2026-10-08 | Biome lints only the frontmatter of `.astro` files, so every import or variable used in the template is reported as unused (94 of the 121 warnings). | Turn off `noUnusedImports`/`noUnusedVariables` for `*.astro` in `biome.json`, as Biome's docs advise for Astro. |
| 2026-10-08 | `astro check` in `npm run build` reports "Result (0 files)": `tsconfig.json` `include` lists only `./worker-configuration.d.ts`, which does not exist, so nothing is type-checked. With Astro's default include there are 14 errors (AudioTabs, index.astro props, map.astro, e2e spec). | Restore the default include, fix the 14 errors, add `@types/leaflet`. |
| 2026-10-08 | `wrangler.toml` (`pages_build_output_dir = "./dist"`) is a leftover Pages config. Wrangler reads `wrangler.jsonc` first, and the build points deploys at `dist/client/wrangler.json`, so the toml is never used. `AGENTS.md` still says the site deploys to Cloudflare Pages. | Done: `wrangler.toml` deleted and the `AGENTS.md` deployment notes now name the `bread` Worker. |
| 2026-10-08 | A separate Pages project `bread` (bread-6vf.pages.dev, no Git connection) still serves an older copy of the site, with the bare "BREAD" title. | Owner decides whether to delete it or redirect it to bread.fm. |
| 2026-10-08 | Both prebuild scripts import `sharp`, which is not in `package.json`; it arrives through astro's `optionalDependencies` and miniflare. | Done in the follow-up to PR #80: `sharp@^0.34.5` declared as a devDependency; `bun.lock` and `package-lock.json` gain one line each. |
| 2026-10-08 | `generate-responsive-images.mjs` resizes all 164 raster files in `public/`, including 41 `/drive/` files no page shows (the flyer list dedupes by basename). They are 193 MB of the 461 MB input, so they lengthen the cold image step and add files to the deploy. | Either feed the script the rendered list (flyers.json, radio-shows.json, home and story lists) or prune duplicates from `public/drive/`. |
| 2026-10-08 | The two `bread5*-11x17` poster scans compress poorly: their 640 px WebP is 244–281 KB and the PNG fallback 520 KB. | Lower quality for those files, or re-export the originals without the grain. |
| 2026-10-08 | Workers Builds build cache keeps `node_modules/.astro` for Astro projects. The image step's reuse check reads `public/_img/`, which a fresh clone lacks, so every CI build runs the cold path. | If CI time matters, enable the build cache and move the reuse store under `node_modules/.astro/`. |
| 2026-10-08 | `npm run build` runs `prebuild` twice: npm's automatic `prebuild` hook, then the explicit `npm run prebuild`. The second image pass is a 0.3 s no-op; data and OG generation run twice. | Drop the explicit `npm run prebuild &&` from `build`, or rename the script. |

## 2026-10-14 follow-up

No adjacent implementation changes included. The repo has no software changelog or GitHub release history; consider brief site-change notes when reader-visible behavior changes.

## 2026-10-21 follow-up

| Date | Finding | Suggested Next Step |
|------|---------|---------------------|
| 2026-10-21 | `docs/assets/source.svg`, the declared "design source", reads "bread.fm — ambient audio, generative soundscapes", and `scripts/generate-scenes.ts` renders it onto hue-rotated navy cards (README/GitHub previews). Template leftovers, not BREAD. | Point `source.svg` at `BREAD_LOCKUP` and regenerate the scenes on black (needs `rsvg-convert`). |
| 2026-10-21 | BREAD #7 lists Endgame, but its flyer (Celestial Trax, Distal, Cage A + Prawns + Botaz) does not. | Owner confirms the lineup. |
| 2026-10-21 | Toasted Trax #2's flyer gives the venue as Codeword, 917 Folsom St; the event record says "San Francisco". | Update the venue if the owner agrees. |
| 2026-10-21 | Flyers exist for nights with no event record: BREAD #4 (Feb 15, 2016 day party), BREAD + Nightsweats (Apr 23, 2016), BREAD #13 (Feb 24, 2017, Milk Bar), and the Feb 13, 2015 pilot. | Add event JSONs with `flyer` set. |
| 2026-10-21 | `public/radio/null` is a 1-byte file (a newline); the data script skips it by name. | Delete it. |
