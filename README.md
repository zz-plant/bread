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
- Blog post route is generated at `/blog/<slug>/`.

## Agentic workflow

- Repository guidance: `AGENTS.md`
- Repo skills: `.agents/skills/`
- Starter content skill: `.agents/skills/static-site-author/SKILL.md`
- Optional Codex + MCP local defaults: `.codex/config.toml`

## Next setup tasks

1. Set the production `site` URL in `astro.config.mjs`.
2. Configure deployment target (Netlify/Cloudflare Pages/GitHub Pages).
3. Add additional skills for QA and release automation.
