# Handoff
State to resume work if interrupted, or hand off to another agent/reviewer. Update before stopping work.

## Current State
- Home title now carries city, format, and years (58 characters). Other page titles unchanged.
- The two legacy URLs moved from `Astro.redirect()` page stubs to `redirects` in `astro.config.mjs`. `@astrojs/cloudflare` sets `build.redirects: false` and writes config redirects to `dist/client/_redirects`, which Workers static assets serves as 301s. The stubs had been built as 200 `noindex` meta-refresh pages.
- The sitemap filter reads the same `redirects` object. Astro already leaves config redirects out of its page list, so the filter is a guard, not the fix.
- Sitemap: 12 URLs before, 10 after. The remaining 10 are all self-canonical with no robots meta.
- Deploy target confirmed as a Worker with static assets: wrangler resolves `wrangler.jsonc` before `wrangler.toml`, the build redirects deploys to the generated `dist/client/wrangler.json`, and bread.fm answers trailing-slash requests with 307 (Workers assets) while the `bread` Pages project answers 308.

## Next Steps
- The `bread` Worker is connected to Git through Workers Builds. This branch's build passed, and its preview (https://seo-home-title-sitemap-bread.kanavj.workers.dev) returns the 301s, the new title, and a 10-URL sitemap. Merging to main should deploy production.
- After deploy, check `curl -sI https://bread.fm/blog/the-story-of-bread/` returns 301 and resubmit the sitemap in Search Console.
- See PARKING_LOT.md for follow-ups found along the way.

## Open Items
- See PARKING_LOT.md and UNKNOWNS.md.

## Blockers
- None
