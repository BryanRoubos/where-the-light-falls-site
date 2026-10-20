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

The reader pages use semantic HTML, a narrow reading column, adjustable font size, a night-reading option, visible focus states, and mobile layouts. The visual canyon illustration is currently **CSS decoration**, not approved story artwork.

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

## Next visual pass

Build and approve bespoke, spoiler-safe story illustrations for the chapter later. Suggested needs: a clearly ordinary steep Deepwater stairway, the city in afternoon shadow, waterfront trade, and a quieter Maren meeting. Avoid visual details that imply unapproved mechanics or Mira's eventual fate. Integrate only after source and narrative continuity checks.
