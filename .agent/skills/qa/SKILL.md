---
name: qa
description: Run the full quality gate. Use before committing any code change.
---

# QA Skill

1. Run Biome lint:

   ```bash
   npm run lint
   ```

2. Run tests:

   ```bash
   npm run test
   ```

3. If any gate fails: fix root cause, re-run. Do NOT chain fix-attempt commits.

## Output

- [ ] `npm run lint` passed
- [ ] `npm run test` passed
