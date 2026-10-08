# Work Order
## Objective
Fix two SEO defects on bread.fm: the homepage `<title>` is the bare word "BREAD", and `sitemap-0.xml` lists two meta-refresh redirect stubs (`/blog/the-story-of-bread/`, `/archive/narrative-history/`) that are `noindex` and canonicalize to `/story/`.

## Authorized Scope
### Allowed
- Homepage title in `src/pages/index.astro` (other page titles unchanged; they do not share a "Page | BREAD" pattern)
- `astro.config.mjs`: `redirects` config and a sitemap filter derived from it
- Deleting the two `Astro.redirect()` page stubs that the config redirects replace
- Emitting real HTTP 301s through `_redirects` if the deploy target supports it
- A regression test in `tests/`
- Pre-existing biome errors that block `npm run lint` (import order, favicon `<title>`)

### Not Allowed
- New copy for the short archive pages (`/archive/`, `/archive/overview/`, `/archive/people-network/`); listed as owner follow-up
- Deploying, changing Cloudflare projects, or deleting `wrangler.toml`

## Required Verification
- `npm run lint` (biome) passes
- `npm test`
- `npm run build` (includes `astro check`)
- Built `dist/client/sitemap-0.xml` omits the redirect sources; built home page has the new title
- Redirect sources answer with HTTP 301 when the build is served by wrangler

## Status
- [ ] Draft
- [ ] In Progress
- [x] Complete
- [ ] Blocked
