# Work Order
## Objective
Stop bread.fm from serving full-size archive originals as page images. Lighthouse 13.5.0 (mobile) on the live homepage: score 60, 28 MB transferred, LCP 57 s, because four originals (10.9 MB, 8.9 MB, 6.0 MB, 2.2 MB) from `public/drive/` are used as `<img src>`. Serve resized, compressed images at their display sizes on every page that shows `/drive/` (or other public/) originals, with the visual design unchanged.

## Authorized Scope
### Allowed
- Image markup on the pages that render archive images: home (`src/components/EventPanel.astro`), `/story/`, `/archive/flyers/`, `/archive/radio-shows/`
- A build-time image step: Astro's `astro:assets` if it works with the Cloudflare adapter and static output, otherwise a sharp prebuild script that writes variants (AVIF or WebP plus a fallback, explicit width/height, `srcset`/`sizes`, lazy below the fold, eager + `fetchpriority="high"` for the largest first-screen image)
- `package.json` `prebuild`, `.gitignore` for generated output
- Cache headers for the generated, content-hashed files (`public/_headers`)
- A test that fails when a page embeds a raw `/drive/` (public/) original over a size threshold
- `AGENTS.md` lines that describe the build steps and image handling

### Not Allowed
- Moving, deleting, or re-encoding the originals in `public/` (this is an archive; the galleries link to them)
- Visual design changes
- Deploying, changing Cloudflare projects, `wrangler.jsonc`/`wrangler.toml`
- Parked items from earlier rounds (wrong flyer labels, tsconfig/`astro check`, dead code)

## Required Verification
- Lighthouse 13.5.0 `--only-categories=performance` against a local preview of the build, before and after, for `/` and `/story/`: total transfer, LCP, score
- `npm run lint`, `npm test`, `npm run build`
- Screenshots at 390 and 1280 px, before and after, compared
- Workers Builds check on the PR

## Status
- [ ] Draft
- [ ] In Progress
- [x] Complete
- [ ] Blocked
