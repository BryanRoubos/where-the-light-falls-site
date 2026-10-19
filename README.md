# Where the Light Falls — illustrated novel website

A static, spoiler-safe website introducing the dark fantasy novel **Where the Light Falls**. No build step or runtime dependencies. GitHub Pages-compatible hash routing.

## Branch and publication rules

- **Editing branch:** `preview/illustrated-journey`. A push to this branch triggered the repository's Pages build/deployment workflow at commit `c08b65d`; its name does not guarantee an isolated preview.
- **Deployment control:** Treat pushes to the editing branch as potentially publishing. Obtain explicit approval before pushing or changing deployment settings; confirm the current Pages source and deployment result rather than assuming a separate public branch. Do not change `main` during routine cleanup.
- **Private canon source:** `BryanRoubos/where-the-light-falls-author/canon-v2/`. The website is a curated *public* presentation, not an automatic canon export.
- **Spoiler boundary:** keep unpublished character outcomes, surprise revelations, private assignments, investigative mechanics and ending details out of this repository, including routes, source comments, HTML and metadata. Any committed text is effectively public even if not linked in the UI. Consult the private author files for the specific spoiler review; do not reproduce their contents here.
- **Canon boundary:** distinguish established facts from speculative illustration details. No unapproved character biographies, emblems, exact maps or invented scene dialogue.
- **Image approval:** use only artwork explicitly approved for public display. Use each illustration once in the reading journey; the full-size viewer may show the opened illustration. Do not delete unused studies or concept art without approval.

## Project files

| File | Purpose |
|---|---|
| `index.html` | Document shell, semantic navigation, shared preview metadata, CSS order |
| `app.js` | Hash router, public lore entries, illustrated main-page reading journey and image viewer |
| `styles.css` | Foundation, archive and older layout styles |
| `editorial.css` | Novel-first page hierarchy and supporting cast styling |
| `mobile.css` | Responsive overrides for phones and tablets |
| `reader.css` | Reader paths, level selector, optional lore and related-entry cards |
| `assets/images/` | Approved hero image and retained reference render |
| Root PNG files | Currently displayed illustrations and **retained unused** concepts; display alone does not establish approval (see below) |

**CSS cascade order is important:** `styles.css` → `editorial.css` → `mobile.css` → `reader.css`. Preserve this order until the older CSS rules are deliberately consolidated with visual regression testing.

## Artwork inventory

**Retained but hidden:** `Lanterns Over the Mistbound Harbour.png` — exploratory River Captain portrait; not displayed in the website until the artwork and character appearance are approved. Its detailed visual-development record remains private, and depicted traits are not automatically canon.

**Currently used:** `assets/images/upper-city-gate-concept-01.png` (Upper City access article); `assets/images/the-grand-crossing.png` (hero); `Candlelit Medieval Stone Hideout.png`; `assets/images/districts/middle-heights-concept-07.png`; `Elias Above the Misty Cliff City.png`; `Mira Overlooking the Lanternlit Canyon City.png`; `assets/images/districts/deepwater-concept-07.png`; `assets/images/districts/upper-heights-concept-11.png`; `Where the Light Falls_ Gothic Cityscape.png`.

**District artwork approved for website integration (19 October 2026):** The creator explicitly requested upload and website replacement with the three iteration 07 illustrations: `assets/images/districts/deepwater-concept-07.png`, `assets/images/districts/middle-heights-concept-07.png` and `assets/images/districts/upper-heights-concept-07.png`. Each is a native 1672 × 941 PNG, displayed at its natural aspect ratio without cropping or stretching. Previous `Lower Level.png`, `Middle Level.png` and `Upper Level.png` remain retained but are no longer displayed. Approval applies to these images for public concept-art use; incidental architecture, props and routes do not become written canon. A repository push and a successful Pages deployment are separate operational facts.

**Retained but not referenced by the reading journey:** `Cliffside City in Golden Mist.png`, `Misty Harbor Market Beneath Cliffside Bridges.png`, `The Grand Gate Market District.png`, `Elias Clothing Concept Board.png`, `Graphite Character Study Sheet.png`, `Graphite Portrait Studies on Aged Paper.png`, `Graphite Portrait Studies on Textured Paper.png`, `Graphite Portrait Study Sheet.png`, `Rugged Adventurer Outfit Sketch.png`, `Where the Light Falls_ City of Bridges.png`, and `assets/images/parchment-grand-crossing.png`. Do not assume these are approved for publication. Relocation or removal requires an explicit asset decision.

## Public lore coverage

The archive contains 30 curated entries covering geography, districts, origins, institutions, citizenship, economic dependence, everyday life, supporting characters and established story foundations. The main introduction and Story page explain the search premise; the chronology distinguishes the city’s origins, Lower City growth and later upheaval. Related links, world categories and archive search expose the additional material.

Public copy uses confirmed facts and clearly identifies unfinished designs or prose. It excludes major revelations, private investigative mechanics and unapproved proposals. Names, identities, engineering plans, dates and scene dialogue are not invented to fill gaps. Artwork and its approval status are unchanged by this text expansion.

## Local testing

Run `python -m http.server 8000` from the repository root and open `http://localhost:8000/`.

Before approving a release:

1. Open the main journey and individual `#/lore/<id>` routes; make sure the archive filters and image viewer work.
2. Check 320px, 375px, 390px, tablet and desktop widths. Inspect image crops, text flow, nav toggle, and horizontal overflow.
3. Test in-page `#read-...` navigation from a fresh load and when already on another route. The sticky header must not obscure headings.
4. Check all links, the full-page reading order, illustration single-use placement and WCAG AA text contrast.
5. Inspect the diff for private plot spoilers, invented canon, unapproved imagery or misleading publication status.
6. Review social previews against the *actual deployed URL* and successful deployment commit. A branch push may trigger Pages, but a queued job or repository upload does not confirm that it is live.

## Maintenance guidelines

- Keep a visual record for every newly added illustration in the private author repository: image/version, approval status, face, skin appearance, hair, clothing, materials and textures, environmental details, color and light, ideas still under consideration. Do not turn visible props into confirmed lore.

- Prefer one focused, clearly named style rule over repeated overrides. Consolidate legacy selectors only after comparing screenshots at mobile and desktop widths.
- Keep public story copy in `app.js` and private plot development in the author repository; do not mirror private Markdown here.
- Do not add a placeholder signup or nonexistent excerpt. Every CTA must resolve to an existing route or action.
- Update this README when file layout or publication controls change.

## Reader experience

Lead with the search premise and development status. Offer story, people and city paths; reveal background lore through native expandable sections. The level selector links each district to its existing illustration and lore record, without presenting a surveyed map. Related-entry cards explain what readers will find next. Keep every interactive control usable by keyboard and honor reduced-motion preferences. No signup, excerpt or purchase action is presented until a real destination exists.

**Upper City entrance concept:** Creator-approved for the access article on 19 October 2026. The wider Upper Heights district image remains in the main journey. The district illustration shows an intermediate gate on the approach; the monumental illustration shows the main Upper City gate. They do not create alternative authorized Upper City entrances. Exact architecture, routes and banner designs remain interpretations. Native 1672 × 941 PNG; original source retained.

**Creator-confirmed art process:** Concepts originate in Bryan Roubos’s own pencil-and-paper drawings and are subsequently developed with AI assistance. Keep both parts of this credit in public process descriptions and artwork attribution. Do not invent original drawing-file references or undocumented per-file transformation steps.

**Upper Heights replacement — 19 October 2026:** Creator approved fresh concept 11 for Git upload and website replacement. Current displayed asset: `assets/images/districts/upper-heights-concept-11.png` (native 1672 × 941 PNG). Concept 07 and earlier assets remain retained as history. Deepwater, Middle Heights and the separate main Upper City gate image are unchanged. The new district painting depicts an intermediate gate, not the main Upper City admission boundary. Artwork selection does not establish exact architecture, routes, heraldry or named people.
