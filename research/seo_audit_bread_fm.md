# SEO Audit: bread.fm

Date: 2026-02-18  
Scope: Technical SEO + on-page signals from the Astro codebase and production build output in `dist/`.

## Method

- Built the site locally and reviewed generated HTML.
- Checked metadata coverage for each rendered page (title/description/canonical/social tags/H1).
- Reviewed Astro configuration and layout templates for global SEO defaults.
- Spot-checked sitemap output and crawl-control assets.

## Executive summary

**Current state:** The site has a good baseline (indexable static HTML, descriptive titles on most pages, sitemap generation enabled, and JSON-LD present), but several high-impact SEO fundamentals are missing or misconfigured.

**Most important blockers:**
1. `site` is configured as `https://example.com`, causing incorrect canonical-like absolute URLs in structured data and sitemap output.
2. No global canonical tags are emitted on most pages.
3. No Open Graph/Twitter metadata is emitted, reducing social discovery and click-through quality.
4. No `robots.txt` is present in `public/`.

## Findings

### 1) Incorrect production origin in Astro config (**Critical**)

- `astro.config.mjs` sets `site: 'https://example.com'`.
- Generated JSON-LD URLs and sitemap entries therefore reference the wrong domain.

**Impact:** Search engines may attribute pages to an invalid domain, weakening indexing, canonicalization, and rich result trust.

### 2) Canonical tags are mostly missing (**High**)

- Build output check showed canonical tags absent on 11/12 pages.
- Only `archive/narrative-history/index.html` currently includes a canonical link.

**Impact:** Duplicate or parameterized versions may split ranking signals; canonical ambiguity increases crawl inefficiency.

### 3) Social metadata missing site-wide (**High**)

- No `og:title`, `og:description`, `og:url`, `og:type`, `og:image`.
- No `twitter:card` tags.

**Impact:** Social link previews underperform; lower CTR from shared links and messaging platforms.

### 4) Robots control file missing (**Medium**)

- No `public/robots.txt` found.

**Impact:** Crawlers can still discover via links/sitemaps, but crawl directives and sitemap discovery are less explicit.

### 5) One page missing meta description and H1 (**Medium**)

- `archive/narrative-history/index.html` has `desc_len=0` and `h1_count=0` in generated output.

**Impact:** Weaker relevance/snippet quality and semantic heading structure for that page.

### 6) Positive signals already present (**Strengths**)

- Sitemap plugin installed and generating `sitemap-index.xml`.
- JSON-LD present on core pages.
- Clean static HTML output and generally sensible title/description usage on most pages.

## Prioritized remediation plan

### P0 (same day)

1. Set correct production domain in `astro.config.mjs` (e.g., `https://bread.fm`).
2. Add global canonical tag in `BaseLayout.astro` using `Astro.url` + `Astro.site`.
3. Add default Open Graph + Twitter card tags in `BaseLayout.astro`.
4. Add `public/robots.txt` with `Sitemap: https://bread.fm/sitemap-index.xml`.

### P1 (this week)

1. Add per-page social image strategy (default image + page-level overrides).
2. Ensure all pages have exactly one meaningful H1 and non-empty description.
3. Add Organization schema and sameAs profiles (SoundCloud, Instagram, etc.) where validated.

### P2 (next sprint)

1. Add content-level keyword targeting for archive/topic pages.
2. Introduce FAQ/HowTo/Event structured data only where semantically correct.
3. Add automated SEO checks in CI (meta/canonical/h1 linting).

## Suggested implementation details

- Extend `BaseLayout` props with:
  - `canonical?: string`
  - `ogImage?: string`
  - `noindex?: boolean`
- Derive canonical as `new URL(Astro.url.pathname, Astro.site).toString()` when `Astro.site` exists.
- Emit `rel="canonical"`, OG tags, and `twitter:card` (`summary_large_image` if image exists).
- Keep page titles unique and concise; maintain descriptions around 140–160 chars where possible.

## Validation commands used

```bash
npm ci
npm run build
python - <<'PY'
from pathlib import Path
from bs4 import BeautifulSoup
root=Path('dist')
print('path|title_len|desc_len|canonical|og_title|twitter_card|h1_count')
for f in sorted(root.rglob('*.html')):
    soup=BeautifulSoup(f.read_text(), 'html.parser')
    title=soup.title.string.strip() if soup.title and soup.title.string else ''
    desc=soup.find('meta',attrs={'name':'description'})
    canon=soup.find('link',attrs={'rel':'canonical'})
    og=soup.find('meta',attrs={'property':'og:title'})
    tw=soup.find('meta',attrs={'name':'twitter:card'})
    h1=len(soup.find_all('h1'))
    print(f"{f.relative_to(root)}|{len(title)}|{len(desc.get('content','')) if desc else 0}|{'yes' if canon else 'no'}|{'yes' if og else 'no'}|{'yes' if tw else 'no'}|{h1}")
PY
```

## Notes

This audit is repository-based and build-output-based. A full production SEO audit should also include live crawling (redirect chains, HTTP headers, robots behavior, Core Web Vitals, and Search Console coverage/performance).
