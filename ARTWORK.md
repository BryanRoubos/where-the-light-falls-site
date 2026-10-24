# Where the Light Falls — public artwork

Images used on the published site live under `assets/images/`:

- `chapters/` — the three creator-approved Chapter One illustrations; keep these unchanged without fresh approval.
- `characters/` — primary character images.
- `districts/` — district and transition illustrations.
- `scenes/` — supporting narrative and everyday-life artwork.

Retired earlier illustrations are retained under `artwork/archive/` for provenance and **are not deployed** by the Pages workflow. Never automatically release private author-canon documents or illustrations containing unpublished spoilers.

Newly featured paintings: Upper City Grand Reveal and market, Upper Heights to Upper City approach, Middle Heights neighborhood, Deepwater working waterfront, Mira, Maren at work, Bram at work, and workshop conversation (now reserved exclusively as the new unnamed character’s portrait).

Still potentially useful: a small approved Arch coin detail, a quiet Upper City interior, and a more neutral non-panoramic workshop/home illustration. These are suggestions, not published canon.

## Current image selection

Only the nine newly selected world/character/scenes, other separately selected character artwork, and the three Chapter One illustrations are intended for public display. Earlier homepage artwork is archived; historical approval does not override the current visual selection.

Current approved Deepwater World/Lore image: `assets/images/districts/deepwater-working-waterfront.png` (uploaded title: `Deepwater Canyon Harbor.png`, replacing `Mistbound Cliffside Harbour.png` on 24 October 2026). The old webp derivatives were removed because they depict the retired artwork; no unapproved old image should be delivered. The public image does not establish incidental architecture as written canon.

World is the illustrated atlas; Lore is text-forward, with selective use of relevant illustrations. No illustration automatically establishes incidental props or specific historical events as written canon.

## Unnamed character portrait

`assets/images/characters/unnamed-workshop-figure.png` comes from `Guildhall Workshop Conversation.png`. It belongs to the unnamed character profile, not to the generic Lower City political-tensions article or district illustration gallery. Public text is intentionally spoiler-safe; the character’s name, role, workshop event and symbols are not established by the image.

## Curated primary placements

- Homepage: contained Upper City Grand Reveal, followed by the approved Elias portrait (22 Oct 2026 redesign).
- World atlas: canyon city overlook, Upper City market, Upper Heights to Upper City main gate approach, selected Middle Heights quarter, and Deepwater waterfront.
- Characters: existing approved Elias art, selected Mira, Maren, Bram and unnamed workshop figure.
- Chapter One: its three approved illustrations remain unchanged and uncropped.
- Lore: text-first with contextual, minimal image reuse.

Old artwork must not be placed on the live site merely because it remains in Git history. Character likeness and approved scene illustration do not establish incidental banner, emblem, document, building or meeting details as written canon.

## Homepage delivery variants (22 Oct 2026)

The `-home.webp` and `-home-small.webp` files are uncropped delivery copies of the approved Upper City Grand Reveal and Elias portrait, not new artwork. Their manifest entries identify the approved PNG source. The city variants are 1672 and 800 pixels wide; Elias is 640 pixels wide. They retain the full composition and use WebP quality 85. Original PNGs and Chapter One illustrations remain unchanged. The allowlisted copy pipeline validates both PNG and WebP paths and requires derivative source entries to reference approved originals.

## Site-wide delivery variants (22 Oct 2026)

The `-web.webp` and `-small.webp` files retain the full approved source composition. They use WebP quality 83, with a maximum width of 1400 or 640 pixels and a maximum height of 1600 pixels, without upscaling. Manifest records include original source paths and actual dimensions. Static pages select these variants through responsive image tags; the three Chapter One illustrations continue using their original PNGs, unchanged and uncropped.

`districts/novel-social.webp` is a 1200 × 630 social preview containing the full approved Upper City Grand Reveal composition, the novel title, genre and author name on a dark background. It introduces no new scene content. Its approved source is recorded in the manifest.

## Middle Heights establishing landscape (22 Oct 2026)

Creator-approved image `Lanternlit City of the Misty Gorge.png` is published as `assets/images/districts/middle-heights-establishing.png` for the main World atlas Middle Heights section. The earlier approved portrait image remains in `assets/images/districts/middle-heights-neighborhood.png` as a supporting illustration, but not the main World establishing view. The new scene represents a visually approved cross-canyon residential setting; no incidental banners, lights, bridge designs or individual buildings are written canon.
