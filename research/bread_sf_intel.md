# Research brief: `instagram.com/bread_sf`

_Date: 2026-02-13_

## Method + limitations

Direct, anonymous scraping of Instagram profile/post pages was blocked (redirect to login and/or rate limiting). Findings below are synthesized from:

- search-result snippets that quote public Instagram metadata,
- SoundCloud profile + repost history for `bread.fm`,
- externally indexed snippets that reference Bread's own bio language.

Because of access limits, treat this as directional intelligence and re-verify manually from the account when logged in.

## High-confidence profile snapshot

From indexed Instagram snippets, `@bread_sf` appears to present as:

- **Name/brand:** `bread.fm` / `@bread_sf`
- **Type:** club night + DJ crew
- **Stated origin:** "since 2014"
- **Contact:** `contact@bread.fm`
- **Indexed profile stats at crawl time:** ~1,076 followers, 881 following, 181 posts

## Roster signals

### Instagram-bio roster handles (indexed)

- `@boatass`
- `@adam_kraft`
- `@_kanav_j`
- `@prawnpop`
- `@tranespotting`
- `@exteeng`
- `@_s_idney_`

### SoundCloud roster handles (bread.fm profile)

- `@cage_a`
- `@pkj`
- `@botaz`
- `@adam_kraft`
- `@tf1000`
- `@exteeng`
- `@xx_shl_xx`

### Interpretation

Roster appears to evolve over time and/or differ by platform branding. The overlap (`adam_kraft`, `exteeng`) suggests a stable core, while other names likely indicate era-specific members, aliases, or frequent collaborators.

## Events/programming signals

Evidence points to a hybrid format: party nights + radio/stream programming.

### Recurring radio formats

- **Bread FM on Internet Public Radio** (playlist + dated episodes through 2023)
- **Bread FM on HKCR** (multiple 2023 episodes)

### Guest/collab patterns seen in episode titles

- Guests and collaborators include `shapes`, `Mithril`, `anti_rocker`, `NATEEEEEEEEEEEE`, `molly turner`, `botaz`, `baowao`, `Lethal Trax`, etc.
- Reposts/collabs reference scenes and artists beyond SF.

### Geography signals

- SoundCloud profile text: **"OAK – LA – ATL – TYO"**, implying multi-city links and booking/network reach outside SF.

## History timeline (inferred)

- **2014:** Instagram bio framing suggests project inception.
- **2015 onward:** indexed business/profile snippets describe regular party organizing in SF.
- **2022:** indexed post snippet references a return/relaunch cadence with Internet Public Radio ("bread rises once again", monthly show language).
- **2023:** strong public trace of radio episodes and collab programming (HKCR + Internet Public Radio).

## Resident Advisor (RA) promoter research

### What was attempted

- Direct access to RA homepage and likely promoter endpoints (`/promoters/*`, `/api/*`, `/graphql`).
- RA search path via `ra.co/search?query=bread sf`.
- Web-index discovery for RA pages tied to Bread (`site:ra.co/promoters bread`, `"bread_sf" "ra.co"`, `"bread.fm" "Resident Advisor"`).

### Observed results

### Browser-based verification run (Playwright)

A browser-driven pass was executed to satisfy the request for web browsing rather than curl-only probing.

- `https://ra.co/` loaded a Cloudflare block page (`Attention Required! | Cloudflare`).
- `https://ra.co/search?query=bread sf` returned the same block state.
- A DuckDuckGo RA query (`site:ra.co/promoters bread sf`) triggered DuckDuckGo's anti-bot challenge, preventing reliable result extraction.

This confirms the earlier constraint with a real browser session: RA data is currently inaccessible from this environment without solving anti-bot controls / using an allowed authenticated session.

- Direct RA requests from this environment consistently returned Cloudflare blocks / HTTP 403.
- Index-assisted lookups did **not** surface a clearly attributable Bread SF promoter page or event archive on RA.
- Given both blocking and missing indexed matches, the current evidence suggests either:
  1. Bread SF has limited/no durable RA footprint under obvious names, or
  2. relevant RA pages exist but are not discoverable from this environment/query set.

### Implications for events/roster/history analysis

- RA could not be used as a primary source here for roster or historical event reconstruction.
- Working sources remain Instagram snippets + SoundCloud/linked ecosystem signals.
- If RA access can be obtained (browser session/cookies), highest-value next step is to check for organizer aliases and artist pages of likely members (`adam_kraft`, `exteeng`, `shl`, etc.) for cross-linked event records.

## Practical implications for this repo

If this repo becomes a Bread static site, information architecture should include:

1. **Events archive** (date, venue, lineup, flyer, recording link).
2. **Roster page with eras** (core members vs collaborators, aliases, links).
3. **History timeline** (key milestones: founding, relaunches, radio residencies, city expansions).
4. **Media hub** (SoundCloud episodes + Instagram post embeds where available).

## Verification backlog

When you have authenticated access to Instagram, confirm:

- exact follower/post counts,
- complete historical member list and join/leave timing,
- canonical event chronology (especially pre-2022 years),
- any official venue partners/residencies not visible in indexed snippets.

## Additional evidence from user-provided screenshots

The following details are extracted from screenshots provided in-thread (Instagram profile/posts, legacy `breadsf.club` page capture, and social repost screenshots).

### Legacy site / historical roster snapshot (`breadsf.club` capture)

A mobile screenshot of `breadsf.club` shows the tagline **"a night / a collective / a feeling - san francisco, ca"** and a roster block:

- **Prawns** (SF, founded '14)
- **Botaz** (Oakland, joined '15)
- **Gewzer** (Fresno, joined '15)
- **Adam Kraft** (SF, joined '16)
- **TF1000** (SF, joined '16)

This is useful as a dated self-description artifact indicating a 2014 founding and early core-member geography.

### Guest-acts history evidence

A screenshot section titled **"Guest Acts since 2015. SF debuts marked with \*"** lists many names, including (non-exhaustive):

Abyss X, Addison Groove, Air Max '97, Asquith, Ballast, Blackdown, Bleaker, Bok Bok, Caski, Celestial Trax, DBM (Deadboy + Murlo), Dehousy, Distal, DJ J Heat, Doctor Jeep, Dreams, Dubbel Dutch, Endgame, False Witness, Fraxinus, Girl Unit, Helix, Javascript, Jlin, Kid Antoine, Kieran Loftus, Korma, Letta, Logos, Lyeform, Mumdance, NA, Nargiz, Neana, Patrick Brian, Pinch, Rabit (2x), Route 8, Rushmore, Sheen, Supraman, Taraval, The Dance Pit, TSVI, V Kim.

This strongly supports a long-running booking history with UK/US club and bass crossover talent.

### Early Instagram timeline evidence (2015)

One screenshot shows a `bread_sf` post with date **May 27, 2015** and a flyer for **Friday May 29, San Francisco** featuring names including: Kid Antoine, Fraxinus, Rushmore, Dreams, Botaz, Prawns, Staley, Bastiengoat, Nick Ottrando.

This is direct evidence that public event programming was active by mid-2015.

### Pandemic-era livestream / fundraiser evidence (2020–2021)

Screenshots show multiple `bread_sf`/`@breadsf` posts around remote events:

- **Bread New Year 2021** (post date visible: Dec 14, 2020) described as a DJ livestream fundraiser for **Atlanta Solidarity Fund** and **National Black Deaf Advocates**.
- **Long Bread Summer** fundraiser (July 10, 2021) for **Rebuilding Alliance** and **Oxygen for India** with artist tags including `@exteeng`, `@adamkraftlol`, `@holabotaz`, `@tranespotting`, plus others.
- Follow-up screenshot text indicates fundraising outcomes (e.g., $1,675 initial update, later $3,700 split, and near $12K raised across three streams).

These provide concrete social-impact programming signals, not only nightlife promotion.

### Updated roster/history interpretation from screenshot corpus

Combined with prior signals, screenshots suggest at least three eras:

1. **Formation + local party era (2014–2016):** founding + early Bay Area roster build.
2. **Guest-booking growth era (2015 onward):** substantial guest pipeline and SF debuts.
3. **Distributed/livestream era (2020–2021):** cross-city online programming + fundraising + `breadfm`/HKCR-oriented identity.

## User-supplied canonical archive notes (added 2026-02-13)

The following dossier was provided by the user as a canonical historical archive draft. It is preserved here for downstream structuring into events/roster/milestones pages.

> Note: treat this block as **source material pending line-by-line verification** against primary artifacts (RA, flyers, IG posts, ticket links, radio archives).

### Origins & identity (user-supplied)

- Founded/planning phase: 2014; launch/first event: 2015.
- Founders: Cage A (Kanav Jain) and Prawns.
- Mission: response to tech-house dominance in SF nightlife.
- Core genres: Footwork, Grime, Deconstructed Club, Experimental Bass, 160 BPM.
- Tagline: "a night / a collective, and a feeling".
- Radio: biweekly BREAD FM on Radio Valencia; end date is currently unverified in-repo (a prior Jan 2018 note is disputed).
- Visual notes: high-contrast industrial internet-aware flyer language; distinct logotype used as temporary tattoos.

### Residents / roster (user-supplied)

- Cage A (aka zz plant), Prawns, Botaz, Gewzer, Adam Kraft, TF1000 (aka Tranespotting), Misoh, Exteeng.
- Stated stylistic identifiers include:
  - Cage A: structural/architectural club direction.
  - Prawns: UKG/house/bass foundation.
  - Botaz: technical footwork/juke focus.
  - Adam Kraft: maximalist pop-club/high-energy sets.
- Claimed later geographies:
  - Cage A in Chicago, Prawns in LA, Botaz in NYC, TF1000 in Tokyo.
- Other claims:
  - Gewzer co-founded Smokescreen (Fresno).
  - Gewzer released _G(LOVE)S_ on Cyber Spa (May 2016).
  - Exteeng later active as multidisciplinary artist/data scientist.

### Venues (user-supplied)

- F8 / 1192 Folsom (described as primary 2015–2016 base).
- Underground SF (described as primary 2017 base).
- Public Works Loft (BREAD #9), Mighty (BREAD #8), Bruno's (BREAD #11), Codeword (Toasted Trax), Club 6ix (Lobster Theremin showcase), OMG (2018 epilogue/final).

### Timeline claims by era (user-supplied)

#### 2015 — Pilot era

- 2015-02-13: Pilot ("Grime City vs. BREAD") with Helix.
- 2015-05-29: BREAD #1 (Rushmore, Kid Antoine).
- 2015-07-24: BREAD #2 (Rabit, Korma, Sheen, Victoria Kim).
- 2015-11-06: BREAD #3 (Doctor Jeep, Sha Sha Kimbo) + support from 8ulentina/Foozool.
- 2015-11-13: special Addison Groove event.

#### 2016 — Golden era

- 2016-02-19: BREAD #4 residents night (temporary tattoo gimmick).
- 2016-03-25: BREAD #5 with Jlin (claimed SF debut).
- 2016-04-23: Nightsweats collaboration (Air Max '97, False Witness).
- 2016-05-20: BREAD #7 (Distal, Celestial Trax, Endgame).
- 2016-06-16: BREAD #8 (Neana, Bleaker).
- 2016-06-29: Toasted Trax #1 (Abyss X, DJ Spider).
- 2016-07-22: BREAD #9 (Deadboy, Murlo, Blackdown).
- 2016-08-19: BREAD #10 (Tectonic vs Different Circles: Rabit live, Logos, Mumdance, Pinch, Caski).
- 2016-09-04: BREAD #11 (Dehousy, The Dance Pit).
- 2016-10-21: Toasted Trax #2 planned (Iyer, Adam Kraft, Prawns) marked likely canceled/unlisted.
- 2016-11-19: Sure Thing collaboration (Route 8, Asquith; Lobster Theremin showcase framing).
- 2016-12-09: BREAD #12 (NA/Nguzunguzu, TSVI, Dubbel Dutch).

#### 2017–2018 — UGSF era

- 2017-02-24: BREAD #13 residents night.
- 2017-03-24: DJ J Heat + Kieran Loftus.
- 2017-04-28: prior note about a planned Lone + Ase Manual Monarch show was removed per user correction (not planned/canceled).
- 2017-05-26: Mr. Mitch + Kozee.
- 2017-07-28: Roska + Misoh.
- 2017-09-22: Kelman Duran + Suda.
- 2018-01: BREAD FM radio show ends.
- 2018-05-12: final club night at OMG (Gila + Neana).

#### 2021 — Mutual aid & streams

- Claimed pivot: digital mutual-aid fundraising platform.
- Claimed total raised: ~USD 12,000.
- 2021-01-02: BREAD New Year stream (Zaida, Wonja, Color Plus, Gila) for Atlanta Solidarity Fund + NBDA; claim: >$6,300.
- 2021-03-13: Six Years of BREAD stream (resident-led lineup; 8ulentina/Foozool attribution removed per user correction) for DFW Mutual Aid + Women's Prison Book Project; claim: $5,888.50.
- 2021-07-10: Long Bread Summer stream for Rebuilding Alliance + Oxygen for India; collaboration note with Chalane Bauzo / Anónima.

### Operations / trivia / legacy claims (user-supplied)

- Ticket prices are better represented as approximately **$5–$15** (updated from a previously over-specific range).
- Unbooked wishlist names included Yaeji and Acemo.
- Prawns side project: Heavy Hands.
- Legacy claims:
  - Adam Kraft later founded FAKE and GAY.
  - Cage A now runs The Crumple Zone.
  - Exteeng later-practice details are currently unverified in this repo and should not be asserted as fact without sources.
- Archive marker supplied by user: 2026-02-13 marked as 11 years from pilot date.

### Data-model recommendation for next commit

Convert the above into machine-readable content:

1. `src/content/events/*.md` (date, venue, lineup, series_number, confidence, evidence_refs)
2. `src/content/people/*.md` (aliases, role, city_history, notes, confidence)
3. `src/content/milestones/*.md` (radio start/end, fundraising totals, era transitions)
4. a `confidence` enum (`verified`, `strong`, `user-archive`, `unverified`) for transparent provenance.

## User-supplied canonical link directory (added 2026-02-13)

This section preserves the latest user-provided source-of-truth links for channels and member profiles.

> Note: links are preserved as provided. Availability/accessibility may vary by platform or region.

### BREAD collective — main channels

- Audio archive (radio & sets): https://soundcloud.com/breadfm
- Visual archive (Instagram): https://instagram.com/bread_sf
- Event history (Resident Advisor): https://ra.co/promoters/50634
- Radio host (Radio Valencia): http://www.radiovalencia.fm/ (user note: show archive 2015–2018)

### Resident directory (user-supplied)

#### Prawns (Co-Founder)

- SoundCloud: https://soundcloud.com/prawns
- Instagram: https://instagram.com/_prawns
- RA Profile: https://ra.co/dj/prawns

#### Botaz (Brian Aviles)

- SoundCloud: https://soundcloud.com/botaz
- Bandcamp: https://botaz.bandcamp.com/
- Instagram: https://instagram.com/brian_aviles
- RA Profile: https://ra.co/dj/botaz

#### TF1000 (Tranespotting)

- SoundCloud: https://soundcloud.com/tranespotting
- Instagram: https://instagram.com/tf1000_
- RA Profile: https://ra.co/dj/tf1000

#### Adam Kraft

- SoundCloud: https://soundcloud.com/adamkraftneindanke
- Instagram: https://instagram.com/adamkraft_
- RA Profile: https://ra.co/dj/adamkraft

#### Gewzer

- SoundCloud: https://soundcloud.com/gewzer
- Bandcamp (Album): https://cyberspa.bandcamp.com/album/g-love-s
- Instagram: https://instagram.com/gewzer

#### Exteeng

- SoundCloud: https://soundcloud.com/exteeng
- Instagram: https://instagram.com/exteeng
- RA Profile: https://ra.co/dj/exteeng

## Link verification pass (requested: "visit or pull from the ones you can")

Date: 2026-02-13

A direct-access pass was run across the user-supplied directory links. Because several platforms enforce anti-bot protections, outcomes are mixed.

### Reachability summary

- **Accessible / pulled meaningful content:**
  - `https://www.radiovalencia.fm/` (site reachable; current schedule/listen page visible).
  - `https://cyberspa.bandcamp.com/album/g-love-s` (album page reachable; full tracklist visible).
  - `https://soundcloud.com/breadfm` via index proxy extraction (despite 403 on direct fetch, profile metadata and playlist references were still recoverable).
- **Blocked or constrained:**
  - Most `ra.co/*` links returned Cloudflare/403 from this environment.
  - Instagram profile links typically redirected to login walls / anti-automation constraints.
  - Several SoundCloud direct URLs returned 403/404 at HTTP level in this environment even when some metadata could still be recovered through proxy text extraction.

### Concrete pulls added to intel

1. **RA promoter id preserved:** canonical event-history link is `https://ra.co/promoters/50634` (user supplied), but remains inaccessible from this environment due to 403 controls.
2. **BREAD SoundCloud profile pull:** extracted profile descriptor includes **"OAK – LA – ATL – TYO"**, and references playlists including **Bread FM on HKCR** and **Bread FM on Internet Public Radio** with 2023 episode entries.
3. **Gewzer album verification:** `(G)LOVE(S)` page at Cyber Spa Bandcamp is reachable and includes a full multi-track listing, supporting the existence of the release link in the directory.
4. **Radio Valencia host verification:** domain is reachable and exposes current listening/schedule surfaces; historical show-year note (2015–2018) still requires dedicated archive-page verification.

### Link-level caveat

Treat directory links as "canonical pointers" and separate from "fully verified claims." In this environment, anti-bot defenses limit direct confirmation on RA/Instagram; continue using confidence tags when converting into structured content.

## Facebook event URL discovery pass (requested: "find all the fb event urls")

Date: 2026-02-14

Method:

- Queried DuckDuckGo HTML results for `site:facebook.com/events` + Bread SF terms.
- Extracted event URLs from indexed result links.
- Ran `curl -L -I` checks against each URL (all returned HTTP 200 in this environment, though event content itself may still require login).

Discovered event URLs (deduplicated):

1. https://www.facebook.com/events/588841281252200/
2. https://www.facebook.com/events/1694286880828782/
3. https://www.facebook.com/events/1755008908099419/
4. https://www.facebook.com/events/1422866204488341/
5. https://www.facebook.com/events/1796154653948082/
6. https://www.facebook.com/events/d41d8cd9/bread-sf-presents-toasted-trax-2/1792378097640992/
7. https://www.facebook.com/events/d41d8cd9/bread-sf-dj-j-heat-night-slugs-kieran-loftus/1603512559678229/
8. https://www.facebook.com/events/d41d8cd9/bread-3-wdoctor-jeep-patrick-brian-ballast-javascript-sha-sha-kimbo/1013123788738124/
9. https://www.facebook.com/events/d41d8cd9/parameter-x-bread-pinch-rabit-mumdance-logos-caski/1141423065915041/
10. https://www.facebook.com/events/d41d8cd9/bread-sf-mr-mitch-planet-mu-kozee-prawns/277151372731142/
11. https://www.facebook.com/events/60-6th-st-san-francisco-ca-94103-1609-united-states/sure-thing-bread-sf-lobster-theremin-showcase/1062894940491694/
12. https://www.facebook.com/events/d41d8cd9/bread-12-w-na-dubbel-dutch-tsvi/1793167794291121/
13. https://www.facebook.com/events/public-works-sf/bread-9-w-dbm-deadboy-murlo-blackdown/813388422095198/

Caveat:

- This is the complete set discoverable from accessible public search indexing during this pass; additional private/unindexed/deleted events may exist.
