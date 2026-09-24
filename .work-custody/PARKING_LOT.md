# Parking Lot
Adjacent findings discovered during work that are out of authorized scope. Do not act on these unless explicitly authorized.

## Findings
| Date | Finding | Suggested Next Step |
|------|---------|---------------------|
| 2026-09-24 | Several image files hold different artwork than their filenames say. `public/radio/bread-fm-botaz-dj-polo-aug-30.jpg` is the "SHL & Prawns, Wed Feb 1" Radio Valencia card; `public/bread-botaz-prawns-tf1000-2024-02-24.jpg` is the Long Bread Summer (July 10) flyer. Radio show and flyer card labels, and some event "Flyer image" source links, therefore point at the wrong art. | Open every file in `public/radio/` and the top-level `public/bread-*.jpg/png`, rename to match the artwork, then re-run `scripts/generate-data.mjs`. |
| 2026-09-24 | Resident links on `/archive/radio-shows/` disagree with `src/content/roster/*.json` (e.g. Prawns SoundCloud `soundcloud.com/prawns` vs `soundcloud.com/pkj`; Adam Kraft `adamkraftneindanke` vs `adam_kraft`). | Owner confirms the right handles; then render the directory from the roster collection instead of hardcoding it. |
| 2026-09-24 | Dead code: `src/components/homepage/StatsSidebar.astro`, `src/components/ClickHint.astro`, `src/config/navLinks.ts` (points at nonexistent `/about/`, `/events/`, `/roster/`), `src/data/flyers.ts`, `src/data/radio-shows.ts`, `createYearVenueChips` and the `quick`/`year`/`venue` filters in `eventFilters.ts`, unused `imageListStructuredData` in flyers/radio pages. | Delete in a cleanup PR. |
| 2026-09-24 | Roster schema drops `web` and `tw` links (Botaz's site, Cage A's Twitter) because `content.config.ts` only allows sc/ig/bc/ra. | Add the keys to the schema and render them in `PeopleTab.astro`. |
| 2026-09-24 | `README.md` still describes a "minimal static-site starter" with a blog and `/blog/` index that no longer exist; `AGENTS.md` says `npm run lint` runs `astro check` (it runs biome). | Refresh both docs. |
| 2026-09-24 | `npm ci` fails with an ERESOLVE peer conflict (`@astrojs/cloudflare@14` vs `astro@7.3`); `bun install --frozen-lockfile` works. | Regenerate `package-lock.json` or drop it in favor of `bun.lock`. |
| 2026-09-24 | Homepage nav (Archive, Flyers, Radio shows, Timeline, Story) differs from every other page (Home, Archive, Story). | Pick one nav set. |
