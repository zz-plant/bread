# Semantic Contract
## Success Criteria
The build scripts' `sharp` import is backed by a declaration in `package.json`, at the version the build already uses, with no other dependency change.

## Acceptance Criteria
- [x] `package.json` devDependencies list `"sharp": "^0.34.5"`; `bun.lock` and `package-lock.json` each gain only that line in the root entry
- [x] The resolved sharp stays 0.34.5 (hoisted, shared with astro and wrangler's miniflare)
- [x] `bun install --frozen-lockfile`, `npm run lint`, `npm test`, `npm run build` pass
- [x] Workers Builds check passes on the PR

## Out of Scope
- The stale `package-lock.json` (`npm ci` ERESOLVE), other dependency versions
