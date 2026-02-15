# Browser route critique (3 typical user journeys)

Date: 2026-02-15  
Method: manual route traversal using Playwright against local Astro dev server.

## Route 1 — Home (`/`) → "Timeline & eras"

### What works
- The home page immediately communicates archival intent and visual identity.
- The route taxonomy (timeline, methods, narrative) is present and clear as labels.

### Friction observed
- The homepage is visually dense and relies on hidden tab/panel state. In browser automation, key links such as "Timeline & eras" resolved in the DOM but were not visible/clickable until the right panel state was active.
- As a first-time user, this increases interaction uncertainty: the IA exists, but discoverability is inconsistent.

### Recommendation
- **Needs modification:** make all primary route links persistently visible above the fold, independent of tab state.

---

## Route 2 — Home (`/`) → Story (`/blog/the-story-of-bread/`)

### What works
- The story page has a clear title, concise description, and date metadata.
- The top nav and back link support orientation.

### Friction observed
- There is navigation duplication (global header + in-page "← Back home" + additional archive links in content) that competes for attention.
- The narrative route is grouped under `/blog/`, while the site positioning feels archival-first. This can feel like two parallel information architectures.

### Recommendation
- **Needs modification:** reduce duplicate navigation affordances on content pages (keep one primary back pattern).
- **Needs rebuild (IA):** consider re-framing narrative pages under archival taxonomy (or clearly label why "Blog" exists if it remains).

---

## Route 3 — Archive index (`/archive/`) → Event Ledger (`/archive/event-ledger/`)

### What works
- Archive index provides a maintainable list structure and clear descriptions.
- Event Ledger page fits user expectations for structured historical lookup.

### Friction observed
- Archive index is text-heavy and utilitarian compared with the expressive homepage; the dramatic visual system does not carry over.
- The transition from homepage to archive detail pages feels like moving between two different products.

### Recommendation
- **Needs rebuild (presentation consistency):** unify visual and interaction language between homepage and archive sections.

---

## Consolidated action list

### What can be removed
1. Redundant in-page back links where persistent header navigation already exists.
2. Extra low-signal copy blocks that repeat archival positioning without adding orientation.

### What needs to be rebuilt
1. Cross-route information architecture coherence (home, archive, narrative/blog).
2. Visual system consistency so archive and story routes feel like one product.

### What needs modification
1. Ensure primary route links from home are always visible/clickable without mode switching.
2. Simplify navigation hierarchy on content pages (one dominant wayfinding model).
3. Add explicit "You are here" state in global navigation for Home vs Archive context.

---

## Prioritized implementation plan (P0 / P1 / P2)

### P0 — Critical (address first)
1. **Modify:** make home primary route links always visible/clickable without tab-state dependence.
   - Why P0: this is a route-discovery blocker that can prevent first-click progression.
   - Success signal: a new visitor can reach timeline/story/archive targets in one obvious click path.
2. **Modify/Remove:** simplify content-page wayfinding by removing redundant in-page back links where header nav already handles orientation.
   - Why P0: duplicate navigation creates decision friction on every content page.
   - Success signal: one dominant navigation model per page type.

### P1 — High-value structural improvements
1. **Rebuild:** align information architecture between `/`, `/archive/*`, and narrative pages (`/blog/*` vs archive taxonomy).
   - Why P1: current split introduces conceptual drift but does not always block task completion.
   - Success signal: users can predict where narrative/history content lives without trial-and-error.
2. **Modify:** add explicit active/"you are here" state in global navigation.
   - Why P1: improves orientation and lowers backtracking, especially on deep archive pages.
   - Success signal: active route context is visually clear in header nav.

### P2 — Polish and consistency
1. **Rebuild:** harmonize visual language between homepage and archive/detail pages.
   - Why P2: cohesion issue is noticeable but secondary to discoverability and IA.
   - Success signal: transition across routes feels like one coherent product.
2. **Remove/trim:** reduce repeated archival-positioning copy that does not add route guidance.
   - Why P2: readability optimization after structural/navigation fixes are complete.
   - Success signal: shorter, more actionable page intros with lower cognitive load.

## Validation commands used
- `npm install`
- `npm run dev -- --host 0.0.0.0 --port 4321`
- Playwright script traversal over `/`, `/archive`, `/blog/the-story-of-bread`, and deep links.
- `npm run build`
