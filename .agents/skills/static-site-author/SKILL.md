---
name: static-site-author
description: Use this skill when creating or editing static-site content pages/posts, especially markdown/MDX with frontmatter and internal links.
---

# static-site-author

## Goal

Produce publication-ready static-site content with consistent metadata and link hygiene.

## Workflow

1. Confirm page intent (post, landing page, docs page).
2. Ensure required frontmatter exists:
   - `title`
   - `description`
   - `date` (for dated content)
   - `draft` (if applicable)
   - `tags` (if applicable)
3. Validate heading hierarchy (`h1` once, nested headings logical).
4. Add or update internal links where relevant.
5. Check for broken relative links if tooling exists.
6. Provide a short summary of SEO-impacting changes (title/description/headings).

## Output contract

- Return:
  - files changed
  - frontmatter added/updated
  - unresolved questions (if any)
