# Risk Register
Tracked risks from the work. Update as risks are identified or mitigated.

## Risks
| Date | Risk | Impact | Mitigation | Status |
|------|------|--------|------------|--------|
| 2026-09-24 | Rewritten copy changes a fact the owner knows better | Medium | Every sentence traced to existing copy, data, source URLs, or artwork; renamed titles listed in UNKNOWNS for review | Open |
| 2026-09-24 | Flyer/radio card labels still wrong because asset filenames are wrong | Medium | Image-by-image pass done 2026-10-21; captions now match the printed art | Closed |
| 2026-10-08 | `_redirects` stops applying if the Worker gains a script that runs before assets (`run_worker_first` or a `main` entry) | Low | Redirect paths also checked under `wrangler dev`; the unit test pins the config; recheck with curl after deploy | Open |
| 2026-10-08 | A page passes ResponsiveImage a path with no variants (file outside `public/`, or prebuild skipped) | Low | The component throws, so the build fails loudly instead of shipping a raw original | Open |
| 2026-10-08 | The `sizes` strings in `src/utils/images.ts` drift if the gallery or featured-strip CSS changes | Low | Only affects which width a browser downloads, not layout; comments name the CSS they mirror | Open |
| 2026-10-08 | Deploy grows by ~1,160 files / 38 MB of variants | Low | Workers static assets allow 20,000 files (free) and 25 MiB per file; dry run reads 1,385 files | Open |

## 2026-10-21 follow-up

| Date | Risk | Impact | Mitigation | Status |
|------|------|--------|------------|--------|
| 2026-10-21 | OG card text uses whatever fonts the build machine has (Archivo is not installed on Workers Builds; Inter or DejaVu render instead) | Low | The logo is paths, not text, and the art carries the card; layout leaves slack for wider fallbacks | Open |
| 2026-10-21 | Archivo loads from Google Fonts; if it fails, headings fall back to Helvetica/Arial at normal width | Low | `display=swap`; fallbacks named in `--font-display` | Open |
| 2026-10-21 | Renamed image URLs break any outside link to an old filename | Low | The old names pointed at the wrong art anyway; no redirects added | Open |
