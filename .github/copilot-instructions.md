# bread — Copilot Instructions

## Quick Commands

```bash
npm install && npm run dev   # Start dev server
npm run build                 # Production build
npm run lint                  # Biome check
npm run format                # Biome format
npm run test                  # Vitest
```

## Key Paths

- `src/` — Application source
- `public/` — Static assets
- `tests/` — Vitest test suite

## Conventions

- **Package manager:** npm
- **Linter/Formatter:** Biome
- **Tests:** Vitest
- **Pre-commit:** Husky runs Biome on staged files
- **Commit style:** Conventional Commits

## Pre-Commit Rule

```bash
npm run lint   # Run before pushing.
```
