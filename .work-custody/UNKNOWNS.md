# Unknowns
Unresolved uncertainty, risks, or open questions from the work. Preserve these; do not silently drop.

## Open Questions
| Date | Question | Impact | Mitigation |
|------|----------|--------|------------|
| 2026-05-06 | Should the blog post include code snippets comparing Astro vs Next.js? | Medium | Check existing blog posts for code snippet usage conventions |
| 2026-05-06 | Is there a preferred tags array for technical decision posts? | Low | Use ["astro", "static-sites", "architecture"] as default |
| 2026-09-24 | Renamed event titles use a headliner taken from the source URL or flyer filename ("BREAD SF: Mr. Mitch", "BREAD SF: Kelman Duran", "BREAD SF: Gila & Neana", "BREAD SF: Nhac Gay"). Were these the actual billed names? | Low | Owner review; titles are in `src/content/events/*.json`. |
| 2026-09-24 | Dropped the "(noted)" suffix from venues (F8, Mighty, Public Works Loft, Club 6ix, OMG). If "(noted)" meant "unconfirmed", that nuance now lives only in each event's `confidence` field. | Low | Owner review. |
| 2026-09-24 | Radio Valencia shows are undated in filenames. The artwork weekdays fit 2017 or 2023; copy mentions the show without giving a year. | Low | Owner supplies the year. |
| 2026-10-08 | Does anything still deploy to the `bread` Pages project (bread-6vf.pages.dev)? bread.fm itself is served by the `bread` Worker. | Low | Owner confirms before deleting the project. |
| 2026-10-08 | Workers Builds runs on PR branches (preview URLs); confirm main is its production branch, so merging deploys bread.fm. | Low | Check after merge with `curl -sI https://bread.fm/blog/the-story-of-bread/`. |
| 2026-10-08 | How long the image step takes on Workers Builds (2 vCPU free, 4 vCPU paid). Locally it is 31 s of a 43 s cold build using 216 s of CPU. | Low | Read the Workers Builds log on the PR; the 20-minute limit leaves room. |
| 2026-10-08 | Nine originals are CMYK JPEGs (`bread2-smaller.jpg` on the home page among them). sharp converts them with their embedded profile (or its default CMYK profile); browsers do their own conversion. Screenshots showed no visible color shift. | Low | Owner glance at BREAD #2 on the live site after deploy. |

## 2026-10-14 follow-up

No unresolved implementation questions. Metadata was verified against the local generated pages, not production; publication awaits review. Existing Biome warnings remain outside this scope.

## 2026-10-21 follow-up

| Date | Question | Impact | Mitigation |
|------|----------|--------|------------|
| 2026-10-21 | Archivo stands in for the flyers' heavy grotesks (BREAD #2, #3, #7, JLIN). The crew may have a face they'd rather use. | Low | One token (`--font-display`) and one Google Fonts link to change. |
| 2026-10-21 | The traced mark is from one flyer (BREAD #13). If an original vector of the logo exists, it should replace the trace. | Low | Swap the paths in `src/utils/bread-logo.mjs`, then rerun `scripts/generate-icons.mjs`. |
| 2026-10-21 | With the corrected file mapping, all 22 Radio Valencia cards fall on Wednesdays in 2017 (not 2023), which matches the show's 2015–2018 run. The year is still not shown. | Low | Owner confirms 2017; then add it to the radio captions. |
| 2026-10-21 | Event years for renamed flyers came from weekday checks (e.g. Feb 24 is a Friday in 2017, not 2024; the old filename said 2024). | Low | Owner glance at the Flyers page. |

## 2026-11-10 follow-up

| Date | Question | Impact | Mitigation |
|------|----------|--------|------------|
| 2026-11-10 | The story and timeline now say "BREAD's posts put the total raised across the three [streams] at close to $12,000". The figure comes from `research/bread_sf_intel.md` (owner screenshots: "near $12K raised across three streams"; owner notes: "~USD 12,000"), not from a post this session could open. | Medium | Owner confirms the figure, or the two sentences come out (`the-story-of-bread.md`, `timeline.astro`). |
| 2026-11-10 | Judy (dhra) is "Co-founder" in the roster and on the radio page, but the story and People page named only Cage A and Prawns. Both now say "Cage A and Prawns, with Judy (dhra) as co-founder". | Medium | Owner confirms the wording. |
| 2026-11-10 | Radio Valencia: the copy now says the cards' dates fall on Wednesdays in 2017 and places the show in the club years. 2017 and 2023 share a calendar; 2023 is ruled out because BREAD FM's IPR episodes on 2023-03-29 and 2023-04-26 had other lineups than the cards for March 29 and April 26. Owner notes give the show's run as 2015–2018, which the copy does not state. | Low | Owner confirms 2017 and, if known, the run. |
| 2026-11-10 | BREAD #4 is dated 2016-02-15 from its flyer (v4 prints "February 15, 2016"; v3 prints 2015, a typo, since it is a "1 year anniversary"). Owner notes say 2016-02-19. The v4 card also carries a "BREAD MAIL from: addison groove" sticker dated February 2016, while the "Addison Groove special" record is dated 2015-11-13. | Low | Owner confirms the #4 date and whether Addison Groove played #4. |
| 2026-11-10 | Toasted Trax #2 now carries the lineup and venue printed on its flyer (Codeword, 917 Folsom). Owner notes call the night "likely canceled/unlisted"; the record still says `played`, and the story says it "was billed". | Low | Owner confirms whether it happened. |
| 2026-11-10 | BREAD #2 lineup now reads "Rabit, Sheen, Korma, Lyeform, Victoria Kim": Lyeform from the flyer, Victoria Kim from BREAD records. | Low | Owner confirms both played. |
| 2026-11-10 | The long weekend special (2016-09-04) is now at "Bruno's": the flyer prints 2389 Mission St, and owner notes name Bruno's for that night. The Sure Thing showcase is now at "Club 6ix": its Facebook URL gives 60 6th St, and owner notes name Club 6ix for it. BREAD + Nightsweats is dated 2016 from owner notes (the flyer prints only "4/23"). | Low | Owner glance at the Venue map. |
