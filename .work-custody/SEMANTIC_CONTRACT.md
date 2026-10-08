# Semantic Contract
## Success Criteria
Every page image comes from a resized copy sized for its slot, so the homepage no longer downloads tens of megabytes, while the archive originals stay at their current URLs and every page looks the same.

## Acceptance Criteria
- [x] No built page embeds a `public/` original over 200 KB in `<img>`/`<source>` `src`/`srcset` (`tests/images.test.ts`)
- [x] Images render as `<picture>` with AVIF (where smaller than WebP) and WebP sources, a JPEG/PNG fallback, `srcset`, `sizes`, and `width`/`height`
- [x] The first image on home, flyers, and radio is `loading="eager"` + `fetchpriority="high"`; the rest are lazy
- [x] Originals in `public/` untouched; gallery links still open them
- [x] Page heights and every image box match before/after at 390 and 1280 px (1 px rounding on clipped tall flyers); 0 changed pixels outside image boxes
- [x] `npm run lint`, `npm test`, `npm run build` pass

## Out of Scope
- Originals' filenames/labels, the unused `/drive/` files, deploy config
