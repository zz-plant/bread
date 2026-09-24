# Work Order
## Objective
Find and fix UI and copy on bread.fm that reads as obviously AI-generated ("vibecoded"): research-pipeline jargon, meta-commentary about the site, implementation details shown to visitors, filler stats, generic template styling, and the small UI bugs that came with them.

## Authorized Scope
### Allowed
- Visitor-facing copy in `src/pages/`, `src/components/`, `src/layouts/`, `src/content/` (archive, blog, events, roster, config)
- Styles in `src/styles/` and page-scoped `<style>` blocks
- Title heuristics in `scripts/generate-data.mjs` (flyer titles, radio guest names)
- OG card copy and palette (`src/utils/og-image-core.mjs`, `scripts/generate-og-images.mjs`)
- Small UI bug fixes found along the way (sort order, broken links, missing CSS tokens, image sizing)
- Regression test in `tests/homepage-ux.test.ts`

### Not Allowed
- Renaming or re-sorting image assets in `public/`
- Changing routes, nav structure, or the content collection schema
- Inventing facts: every rewritten sentence must trace back to existing copy, event data, source URLs, or the artwork itself

## Addendum (2026-09-24): design pass
Follow-up request: "make the graphic design less unimpressive, less displeasing, easier on the eyes, more intuitive across mobile and desktop."
Additionally allowed: rewriting `src/styles/*.css`, page/component markup and scoped styles, `BaseLayout` header/footer/nav, homepage tab script, and updating CSS-string assertions in `tests/homepage-ux.test.ts` to match the new layout.

## Required Verification
- `npm run lint` (biome) introduces no new errors
- `npm test`
- `npm run build` (includes `astro check`)
- Screenshots of home (all tabs), archive, timeline, flyers, radio shows, map, and story at desktop and mobile widths

## Status
- [ ] Draft
- [ ] In Progress
- [x] Complete
- [ ] Blocked
