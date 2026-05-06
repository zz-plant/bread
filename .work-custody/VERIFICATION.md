# Verification
Command-level evidence of testing, linting, and validation. Update in real time as commands are run.

## Detected Repo Commands
- test: None detected
- lint: `npm run lint` (runs `astro check` for type/content validation)
- typecheck: `astro check` (included in `npm run lint` and `npm run build`)

## Evidence Log
| Date | Command | Exit Code | Output Summary |
|------|---------|-----------|---------------|
| 2026-05-06 | npm run lint | 0 | 0 errors, 0 warnings, 0 hints from astro check |
| 2026-05-06 | rename .md to .mdx | 0 | Converted the-story-of-bread.md and bread-san-francisco-dj-collective.md to .mdx |
| 2026-05-06 | npm install @astrojs/mdx | 0 | Installed MDX integration |
| 2026-05-06 | update astro.config.mjs | 0 | Added mdx() to integrations |
| 2026-05-06 | create src/pages/story.astro | 0 | Created story page rendering the-story-of-bread.mdx content |
| 2026-05-06 | npm run lint (after MDX) | 0 | 0 errors, 0 warnings, 0 hints - MDX files now recognized |