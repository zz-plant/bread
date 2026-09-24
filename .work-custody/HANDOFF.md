# Handoff
State to resume work if interrupted, or hand off to another agent/reviewer. Update before stopping work.

## Current State
- Copy audit complete across home (Events/People/Listen), archive index, Start Here, Timeline, Event list, People, Flyers, Radio shows, Venue map, Story, and OG cards.
- UI tells removed: grain overlay, ghost "BREAD" watermark, duplicate `//` top strip, eyebrow kickers repeating tab names, green "✓ PLAYED" badge on every card, filler stats.
- UI bugs fixed: "Newest first" didn't reorder cards; featured images forced to 720px tall; map/radio headings used undefined CSS tokens; OG subtitles cut to one word on line 2; OG footer text sat outside the card; broken `/blog/`, `/archive/channel-profile-directory/`, `/archive/venues-format-shifts/` links; no empty state for search.
- Flyer titles no longer come straight from filenames ("Drive archive Img 0530" → "Photo", "BREAD 14 V2 FB Edit" → "BREAD #14").
- New test blocks research-pipeline phrases from coming back.

- Design pass (same PR): warmer low-glare palette and 16px body type; one header/nav on every page (compact single row on phones) and a footer with outbound links; homepage hero + sticky underline tabs; events as a year-grouped listing; swipeable flyer strip on phones; Listen tab as compact player rows (one auto-loads, the rest on tap) instead of 16 empty boxes; flyer/radio galleries show full artwork with captions below; vertical timeline; stacked tables on phones; map fits SF venues only.

## Next Steps
- Owner reviews renamed event titles and venue changes (UNKNOWNS.md).
- Fix mislabeled image files (PARKING_LOT.md, first row). This is the biggest remaining visible problem.

## Open Items
- See PARKING_LOT.md.

## Blockers
- None
