# bread

A minimal static-site starter built with Astro, with repository conventions for agentic development.

## Getting started

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4321
```

Open <http://localhost:4321>.

## Commands

- `npm run dev` — start local dev server
- `npm run lint` — run Astro type/content checks
- `npm run build` — run checks then build static output to `dist/`
- `npm run preview` — preview built output

## Content workflow

- Blog content lives in `src/content/blog/*.md`.
- Collection schema is defined in `src/content/config.ts`.
- Canonical story route lives at `/story/` (legacy `/blog/the-story-of-bread/` redirects).
- Journal index is available at `/blog/` and non-canonical editorial posts continue at `/blog/<slug>/`.

## Agentic workflow

- Repository guidance: `AGENTS.md`
- Repo skills: `.agents/skills/`
- Starter content skill: `.agents/skills/static-site-author/SKILL.md`
- Optional Codex + MCP local defaults: `.codex/config.toml`

## Implementation status

### Done

- [x] Set production `site` URL in `astro.config.mjs` (`https://bread.fm`).
- [x] Add CI checks for lint/build on pull requests and pushes to `main`.

### Still to implement

- [ ] Configure a deployment target (Netlify/Cloudflare Pages/GitHub Pages).
- [ ] Enable deployment from CI after selecting the target platform.
- [ ] Add additional skills for QA and release automation.
- [ ] Add more posts in `src/content/blog`.
