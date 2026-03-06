# User-friendliness improvements for BREAD

Date: 2026-03-06

## High-impact improvements (do first)

1. **Make the homepage primary actions obvious and persistent.**
   - Keep `Archive`, `Timeline`, and `Story/Journal` links visible without relying on any hidden/conditional panel state.
   - Add one dominant CTA row near the hero so first-time visitors can choose a path in one click.

2. **Simplify wayfinding on content pages.**
   - Keep one primary navigation pattern (global header + breadcrumbs where needed).
   - Remove duplicate “back” affordances when they repeat the same destination.

3. **Clarify the Archive vs Journal split.**
   - Add a short explainer at the top of `/archive/` and `/blog/` describing the difference:
     - Archive = canonical records
     - Journal = editorial/narrative context

## Medium-priority UX upgrades

4. **Strengthen orientation with active navigation labels.**
   - Ensure users always see where they are (`Home`, `Archive`, or `Journal`) in the header.

5. **Reduce homepage cognitive load.**
   - Trim repeated descriptive copy and replace with short, scannable labels.
   - Group external links separately from internal route links.

6. **Improve content scanning.**
   - Add concise “what you’ll find” bullets to Archive sections.
   - Keep card descriptions to one sentence when possible.

## Trust and accessibility improvements

7. **Expose data confidence more clearly.**
   - Add a tiny legend for confidence labels (e.g., “strong”, “user-archive”, “unverified”).

8. **Improve keyboard and screen-reader flow.**
   - Keep heading hierarchy strict (`h1` → section `h2`s).
   - Confirm focus styles are consistently visible on all interactive elements.

9. **Make external links more predictable.**
   - Use a consistent external-link indicator and optional note for links that leave the site.

## Suggested success metrics

- Time-to-first-click from homepage to core route (`/archive/`, `/archive/timeline/`, `/blog/the-story-of-bread/`).
- Reduced backtracking rate between `Archive` and `Journal` routes.
- Increased completion rate for “find timeline” and “find story” tasks.
