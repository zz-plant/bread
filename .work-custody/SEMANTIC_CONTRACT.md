# Semantic Contract
## Success Criteria
Copy reads like it was written by someone from the collective: plain, specific, no research-report hedging, no meta-commentary about "this page" or "this archive pass", and no build details (folders, filenames, "loads only when requested") shown to visitors.

## Acceptance Criteria
- [x] No "(noted)", "pending", "in this pass", "Archive-sourced", "Documented chronology" etc. in visitor-facing files (enforced by test)
- [x] Event titles describe the night, not the research status ("BREAD SF: Mr. Mitch", not "UGSF period event")
- [x] No filler stats ("Page: Archive home", "Main folder images")
- [x] No broken internal links (`/blog/`, `/archive/channel-profile-directory/`, `/archive/venues-format-shifts/`)
- [x] Template tells removed (grain overlay, ghost watermark, `//` top strip, emoji status badges on every card)
- [x] OG cards match the site palette and no longer truncate subtitles
- [x] `npm run lint` adds no errors; `npm test` and `npm run build` pass

## Out of Scope
- Fixing mislabeled image files (see PARKING_LOT)
- Navigation/IA changes
