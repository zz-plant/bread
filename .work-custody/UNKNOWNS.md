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

Settled the same day from the owner's Gmail and Drive (read-only search; the mailers and listings named in VERIFICATION): the Radio Valencia show's year (2017), the BREAD #4 date (Monday February 15, 2016) and its headliner, the BREAD #1, BREAD #12 and Roska venues, the last night's lineup, the New Year stream's total, the Six Years beneficiaries. The "$12,000" total was not documented anywhere and is out of the copy.

| Date | Question | Impact | Mitigation |
|------|----------|--------|------------|
| 2026-11-10 | The Tokyo nights (2023-03-16, 03-19), Slug Bar (2023-04-19) and the SoMa night (2024-03-21) left no trace in Gmail or Drive. Their dates may be Instagram post dates, the Slug Bar lineup is unknown, and the Tokyo and Oakland pins are placed from general knowledge (Space Tokyo at a city-centre placeholder). | Low | Owner supplies dates, lineups and addresses. |
| 2026-11-10 | Amounts raised by Six Years of BREAD and Long Bread Summer are not on record. | Low | Owner supplies them if wanted. |
| 2026-11-10 | The BREAD + Nightsweats afterhours had a street address in the day-of mailer. It is left off the site on purpose: the flyer calls it a "top secret location" and it may not be a public venue. | Low | Owner decides whether to name it. |
| 2026-11-10 | BREAD #3: the flyer in `public/` prints Kieran Loftus, but the RA and Eventbrite titles do not; the record follows the listings (Sha Sha Kimbo, no Kieran Loftus). BREAD #2 lists both Lyeform (flyer) and Victoria Kim (BREAD's first-year guest list). | Low | Owner confirms. |
| 2026-11-10 | "Bruno's" for 2389 Mission St and "Club 6ix" for the Sure Thing showcase come from the owner's own schedule document, not a public listing. The showcase lineup (Route 8, Asquith) is from the same document and the research notes. | Low | Owner glance. |

Confirmed by the owner on 2026-11-10: Toasted Trax #2 took place, and dhra is Judy. Also confirmed: BREAD hosted Addison Groove once, at BREAD #4 on 2016-02-15; the separate "Addison Groove special" record dated 2015-11-13 is deleted. The story no longer hedges the first, and Judy's card and the People page now credit the DHRA set at Toasted Trax #1.
