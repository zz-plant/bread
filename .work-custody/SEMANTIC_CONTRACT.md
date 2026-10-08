# Semantic Contract
## Success Criteria
Search engines get a homepage title that says what BREAD was, and a sitemap that lists only canonical, indexable URLs. Legacy URLs move to `/story/` with an HTTP 301 instead of a `noindex` meta-refresh page.

## Acceptance Criteria
- [x] Home title is "BREAD — San Francisco club night and radio show, 2015–2024" (58 characters)
- [x] Redirects live in `astro.config.mjs` `redirects`; the sitemap filter reads the same object, so new redirects stay out of the sitemap
- [x] `dist/client/_redirects` lists both legacy paths, with and without trailing slash, as 301 to `/story/`
- [x] Every URL in the built sitemap is self-canonical and has no robots meta
- [x] `npm run lint`, `npm test`, `npm run build` pass

## Out of Scope
- Content for short archive pages
- Titles of other pages
- Deploy-config cleanup (`wrangler.toml`, the `bread` Pages project)
