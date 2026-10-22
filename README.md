# Where the Light Falls — public reader website

A spoiler-conscious website for an original, novel-first dark fantasy mystery. Readers can explore the city and characters, **read the complete Chapter One** online and share their thoughts with the author.

## Reader links

- Site entry: https://bryanroubos.github.io/where-the-light-falls-site/ (requires GitHub Pages to be enabled and the deployment workflow to succeed)
- Direct chapter: https://bryanroubos.github.io/where-the-light-falls-site/chapter-one.html
- Reader feedback: https://bryanroubos.github.io/where-the-light-falls-site/feedback.html
- Public feedback thread: https://github.com/BryanRoubos/where-the-light-falls-site/issues/1

## How this site is organized

- `index.html`, `app.js`, `styles.css` — story-first home page, public world encyclopedia, characters, and journal.
- `chapter-one.html` — standalone, responsive, readable complete Chapter One; HTML text remains accessible without JavaScript.
- `chapters/chapter-one.md` — exact public approved Chapter One manuscript source. Changes to this Markdown are **not automatically synchronized** to the generated HTML; update both together.
- `feedback.html` — spoiler-aware feedback invitation that links to a GitHub issue (comments require a GitHub account and are public).
- `.github/workflows/deploy-pages.yml` — allowlisted GitHub Pages deployment from `main`.

The reader pages use semantic HTML, a narrow reading column, adjustable font size, a night-reading option, visible focus states, and mobile layouts. The homepage uses a short literary opening, a contained approved Upper City reveal, the approved Elias portrait, and an exact Chapter One excerpt. Responsive WebP delivery copies are listed with their approved PNG sources in the artwork manifest. Lore overview cards and selected articles feature the approved new images; the three approved Chapter One illustrations remain unchanged. The three approved Chapter One illustrations remain unchanged.

## Deployment

The Pages workflow deploys the public allowlist only. It attempts to enable Pages automatically; **if deployment fails because Pages is not configured**, open the repository's **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Then re-run the workflow under Actions.

Live publication is confirmed only when the Pages deployment succeeds and both the home and direct chapter URLs load.

## Public/private boundary

This public repository must contain **only deliberately released reader-facing material**. Never copy or publish the private `BryanRoubos/where-the-light-falls-author` tree, its author-only timelines, drafts, secret plot information, private character revelations, or `canon-v2` prose wholesale.

The author has explicitly approved Chapter One for public sharing; further revisions remain possible. Public character and world entries are editorial summaries rather than an automatic canon export. New concept art requires separate asset approval and spoiler review. Do not automatically present an illustration of an exploratory scene as established canon.

## Reader-feedback limitations

The available feedback method is a public GitHub issue, which requires sign-in. The site does **not** currently collect anonymous submissions or personal data through its own backend. Visitors are informed that comments are public and may contain Chapter One spoilers.

## Local preview

From this repository's root run `python -m http.server 8000` and visit `http://localhost:8000/` and `http://localhost:8000/chapter-one.html`.

## Artwork organization

- `assets/images/chapters/`: approved Chapter One illustrations (preserved).
- `assets/images/characters/`: character imagery, including Mira and Bram.
- `assets/images/districts/`: Upper City, transition, Middle Heights and Deepwater artwork.
- `assets/images/scenes/`: Upper City everyday life, Maren at work and the workshop conversation.
- `artwork/archive/`: superseded source paintings excluded from the deployed site.
- `ARTWORK.md`: asset provenance and production rules.

The workflow copies only `assets/images/` into the output. It also builds crawlable, standalone HTML entries, `sitemap.xml` and `robots.txt`. To request Google indexing, verify the site in Google Search Console, submit the live sitemap and use URL Inspection on the homepage. Indexing timing and eligibility are controlled by Google.

## Outstanding optional illustrations

An Arch coin close-up, interiors and smaller environmental details may add variety later. Only publish these after visual approval and a public-spoiler check.
