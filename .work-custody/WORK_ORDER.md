# Work Order
## Objective
Declare `sharp`, which `scripts/generate-og-images.mjs` and `scripts/generate-responsive-images.mjs` import, as a devDependency. Until now it arrived only through astro's `optionalDependencies` and miniflare (PARKING_LOT, 2026-10-08), so an astro or wrangler release that drops or moves it would break `prebuild`.

## Authorized Scope
### Allowed
- `package.json` devDependencies: `sharp` at the version astro already resolves (0.34.5), so the lockfiles change minimally
- `bun.lock` and `package-lock.json` entries for that declaration
- Custody records

### Not Allowed
- Upgrading or moving the resolved sharp version, or any other dependency
- Regenerating `package-lock.json` (parked: `npm ci` fails on a peer conflict, and a full regeneration rewrites ~4,000 lines)
- Script, page, or deploy-config changes

## Required Verification
- `bun install --frozen-lockfile` with the new lockfile; `sharp` resolves to 0.34.5 from the root
- `npm run lint`, `npm test`, `npm run build`
- Workers Builds check on the PR

## Status
- [ ] Draft
- [ ] In Progress
- [x] Complete
- [ ] Blocked
