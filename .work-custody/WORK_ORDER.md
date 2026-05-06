# Work Order
## Objective
Resolve repo inconsistencies identified during work custody setup:
1. Blog format mismatch (convert .md to .mdx, install MDX integration)
2. Fix /story/ route (create missing page)
3. Verify event data confidence values
4. Confirm build process handles data generation (already done)

## Authorized Scope
### Allowed
- `src/content/blog/` (rename .md to .mdx)
- `astro.config.mjs` (add MDX integration)
- `package.json` (add @astrojs/mdx dependency)
- `src/pages/story.astro` (create missing story page)
- `src/content/events/` (review confidence values)

### Not Allowed
- `src/content/archive/` (archive content is out of scope)
- `wrangler.jsonc` (Cloudflare config)
- Creating new blog content (thin blog content is a separate task)

## Required Verification
- Run `npm run lint` to validate all changes
- Verify .mdx files are recognized (no "No entry type found" warnings)
- Confirm /story/ route renders correctly
- Check event confidence values

## Status
- [ ] Draft
- [ ] In Progress
- [x] Complete
- [ ] Blocked