---
title: Research Methods & Source Confidence
description: Methodology, access constraints, and confidence taxonomy used for BREAD archival claims.
order: 5
updated: 2026-02-14
tags:
  - archive
  - methods
  - confidence
  - sources
---

## Why this page exists

The in-repo research found meaningful evidence, but platform access constraints (notably Instagram/RA anti-bot protections) prevent universal direct verification from this environment.

This page standardizes how claims should be represented until event-level sourcing is complete.

## Source types currently in use

- Indexed snippets quoting public social metadata.
- SoundCloud profile and repost/playlist traces.
- User-provided screenshot extractions.
- User-supplied canonical archive notes and link directories.

## Known access constraints

- Resident Advisor links were often blocked by Cloudflare (403 / anti-bot).
- Instagram profile/post access frequently required login or hit automation walls.
- Some SoundCloud URLs returned constrained HTTP responses even when metadata could still be recovered.

## Confidence taxonomy

Use this per claim/event/person field:

- **verified** — directly confirmed from accessible primary source in-repo.
- **strong** — supported by multiple independent signals but not fully bound to primary artifact snapshots.
- **user-archive** — present in user-supplied canonical notes, pending line-by-line verification.
- **unverified** — plausible but not yet source-backed in this repo.

## Next verification workflow

1. Create event records with source refs (flyers, event pages, posts).
2. Bind roster claims to specific artifacts and dates.
3. Promote confidence labels upward as evidence is attached.
4. Keep unresolved items explicit instead of silently omitting them.

Related: [Channel & Profile Directory](/archive/channel-profile-directory/) and [Timeline & Eras](/archive/timeline/).
