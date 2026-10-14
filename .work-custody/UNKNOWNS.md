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
