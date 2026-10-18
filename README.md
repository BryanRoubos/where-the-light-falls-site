# Where the Light Falls — public V2 website MVP

**Status:** Local implementation package. Not deployed or committed to the GitHub development branch.

A lightweight, responsive, six-section static lore encyclopedia and concept-book preview. All content is curated for public-facing use; do not add private author Markdown or unreviewed illustrations. No build tools or dependencies. The site uses hash routing so it works from GitHub Pages project subpaths without server rewrites.

## Local preview

From this directory run `python -m http.server 8000` and visit `http://localhost:8000/`.

## Publication controls

- Public lore here is a curated editorial excerpt, not an automated export of canon files.
- No unpublished Mira revelation, Registrar, commissioner, custody timeline, or final-act mechanics.
- No generated or legacy images are included.
- `app.js` is the complete public article/search corpus, so everything inside it is visible to visitors.
- GitHub Pages deployment is **not** configured in this package.
- Public journal entries are examples of style and content, not automatically authorized publications. Review them before going live.

## Remaining work

Content approval, visual polish, real approved illustrations, independent spoiler review, robust automated smoke tests, and a GitHub Discussions URL after repository Discussions is enabled.
