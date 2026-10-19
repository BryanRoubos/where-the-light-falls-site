# Where the Light Falls — illustrated novel website

A static, spoiler-safe website introducing the dark fantasy novel **Where the Light Falls**. No build step or runtime dependencies. GitHub Pages-compatible hash routing.

## Branch and publication rules

- **Editing branch:** `preview/illustrated-journey` — development and review only. Do not deploy or merge to the public Pages branch without explicit creator approval.
- **Public Pages branch:** separate from this preview; do not modify it as part of routine cleanup.
- **Private canon source:** `BryanRoubos/where-the-light-falls-author/canon-v2/`. The website is a curated *public* presentation, not an automatic canon export.
- **Spoiler boundary:** keep Mira's undisclosed fate, the Registrar's signature revelation, Elias's covert assignment, detention/transfer mechanics, and ending details off public routes, source comments, HTML, and metadata. Any text committed here is effectively public, even if it is not linked in the UI.
- **Canon boundary:** distinguish established facts from speculative illustration details. No unapproved character biographies, emblems, exact maps or invented scene dialogue.
- **Image approval:** use only artwork explicitly approved for public display. Use each illustration once in the reading journey; the full-size viewer may show the opened illustration. Do not delete unused studies or concept art without approval.

## Project files

| File | Purpose |
|---|---|
| `index.html` | Document shell, semantic navigation, shared preview metadata, CSS order |
| `app.js` | Hash router, public lore entries, illustrated main-page reading journey and image viewer |
| `styles.css` | Foundation, archive and older layout styles |
| `editorial.css` | Novel-first page hierarchy and supporting cast styling |
| `mobile.css` | Final responsive overrides for phones and tablets |
| `assets/images/` | Approved hero image and retained reference render |
| Root PNG files | Approved displayed illustrations and **retained unused** concept studies (see below) |

**CSS cascade order is important:** `styles.css` → `editorial.css` → `mobile.css`. Preserve this order until the older CSS rules are deliberately consolidated with visual regression testing.

## Artwork inventory

**Currently used:** `assets/images/the-grand-crossing.png` (hero); `Candlelit Medieval Stone Hideout.png`; `Cliffside City in Golden Mist.png`; `Elias Above the Misty Cliff City.png`; `Mira Overlooking the Lanternlit Canyon City.png`; `Misty Harbor Market Beneath Cliffside Bridges.png`; `The Grand Gate Market District.png`; `Where the Light Falls_ Gothic Cityscape.png`.

**Retained but not referenced by the reading journey:** `Elias Clothing Concept Board.png`, `Graphite Character Study Sheet.png`, `Graphite Portrait Studies on Aged Paper.png`, `Graphite Portrait Studies on Textured Paper.png`, `Graphite Portrait Study Sheet.png`, `Rugged Adventurer Outfit Sketch.png`, `Where the Light Falls_ City of Bridges.png`, and `assets/images/parchment-grand-crossing.png`. Do not assume these are approved for publication. Relocation or removal requires an explicit asset decision.

## Local testing

Run `python -m http.server 8000` from the repository root and open `http://localhost:8000/`.

Before approving a release:

1. Open the main journey and individual `#/lore/<id>` routes; make sure the archive filters and image viewer work.
2. Check 320px, 375px, 390px, tablet and desktop widths. Inspect image crops, text flow, nav toggle, and horizontal overflow.
3. Test in-page `#read-...` navigation from a fresh load and when already on another route. The sticky header must not obscure headings.
4. Check all links, the full-page reading order, illustration single-use placement and WCAG AA text contrast.
5. Inspect the diff for private plot spoilers, invented canon, unapproved imagery or misleading publication status.
6. Review social previews against the *actual deployed URL*: the preview branch's files are not automatically live.

## Maintenance guidelines

- Prefer one focused, clearly named style rule over repeated overrides. Consolidate legacy selectors only after comparing screenshots at mobile and desktop widths.
- Keep public story copy in `app.js` and private plot development in the author repository; do not mirror private Markdown here.
- Do not add a placeholder signup or nonexistent excerpt. Every CTA must resolve to an existing route or action.
- Update this README when file layout or publication controls change.
