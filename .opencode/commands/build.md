---
description: Build the static site with preflight data generation
agent: build
---

Run `npm run build`. This runs preflight data generation (`scripts/generate-data.mjs`), then `astro check`, then `astro build`. Report any errors.
