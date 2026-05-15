# Information architecture (IA) change proposal

Date: 2026-02-27

## Goal

Create a clearer, archive-first structure so visitors can quickly find:

1. what BREAD is,
2. key history pathways,
3. browsable records (timeline, people, venues, events),
4. long-form narrative context.

## Current IA snapshot

### Primary routes today

- `/` (home)
- `/archive/` and archive detail routes
- `/archive/timeline/`
- `/archive/narrative-history/`
- `/blog/<slug>/` (including `the-story-of-bread`)

### Main friction

1. **Parallel history pathways**: users can reach narrative history from both archive and blog semantics (`/archive/narrative-history/` vs `/blog/the-story-of-bread/`).
2. **Taxonomy mismatch**: the product positioning is archival-first, but long-form history lives under `/blog/`.
3. **Entry-point ambiguity**: home promotes multiple pathways with overlapping labels, making first-click decisions harder than needed.

## Proposed target IA

### Top-level navigation model

Use a stable four-item model:

1. **Home** (`/`)
2. **Archive** (`/archive/`)
3. **Timeline** (`/archive/timeline/`)
4. **Story** (`/story/`)

Rationale: keep discovery shallow while preserving the archive-first mental model.

### Route architecture changes

#### 1) Promote a canonical Story route

- Add canonical route: `/story/` (or `/story/the-story-of-bread/` if multi-story is expected).
- Keep `/blog/the-story-of-bread/` as a redirect during transition.
- Update internal CTAs to point to canonical Story URL.

#### 2) Keep archive as system of record

- Maintain `/archive/` as the index for structured records.
- Retain current archive children (`event-ledger`, `timeline`, `people-network`, etc.).
- Ensure every archive detail page links back to `/archive/` and optionally to `/story/` for narrative context.

#### 3) Clarify home as decision hub

Home should answer two primary intents above the fold:

- “Browse records” → `/archive/`
- “Read the history” → `/story/`

Secondary links (timeline, people, venues) should remain visible but subordinate to those two intents.

## Proposed URL map (after transition)

- `/` — Home
- `/archive/` — Archive index
- `/archive/timeline/`
- `/archive/event-ledger/`
- `/archive/people-network/`
- `/archive/venues-format-shifts/`
- `/archive/channel-profile-directory/`
- `/archive/overview/`
- `/story/` — Canonical narrative history
- `/blog/the-story-of-bread/` → 301 redirect to `/story/`

## Content and labeling changes

1. Reserve the word **Archive** for structured reference sections.
2. Reserve the word **Story** for editorial narrative.
3. De-emphasize **Blog** in global navigation unless additional post frequency justifies a true blog taxonomy.
4. Standardize CTA language:
   - “Explore archive”
   - “Read the story”

## Migration plan

### Phase 1 (low risk)

- Introduce `/story/` route with canonical metadata.
- Add redirects from current story blog slug.
- Update global nav labels and primary CTAs.

### Phase 2 (consistency)

- Audit all internal links and Open Graph references to canonical Story URL.
- Update structured data (`BreadcrumbList` / `CollectionPage`) for new route semantics.

### Phase 3 (cleanup)

- Remove or hide `/blog/` from primary nav if only one narrative page remains.
- Keep legacy redirects for SEO continuity.

## Success metrics

1. Increased click-through from home to first destination (Archive or Story).
2. Reduced backtracking between archive/blog routes.
3. Lower proportion of landings on legacy `/blog/the-story-of-bread/` after redirect period.
4. Faster time-to-content in first-session analytics.

## Validation checklist for implementation PR

- `npm run lint`
- `npm run build`
- Manual route checks:
  - `/` → `/archive/`
  - `/` → `/story/`
  - `/blog/the-story-of-bread/` redirects to `/story/`
