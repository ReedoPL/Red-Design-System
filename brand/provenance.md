# Source provenance and confidence

Primary source: [Red brand guidelines, version 1](source/red-brand-guidelines-v1.pdf), nine pages, authored by Chris Reed; PDF metadata creation date 17 March 2025. The original filename was `Brand Guidelines Red.pdf`. The content bytes are unchanged. The Protect Line repository informed structure only.

| Source page | Established rule | Implementation |
| --- | --- | --- |
| 2 | Square and titled logos; domain may be included or omitted with title | Use only supplied wordmarks; title/vector/greyscale lockups remain missing sources |
| 3 | Logo colour cannot change except greyscale or white | Supplied red and white PNGs; no CSS filter or invented variants |
| 4 | Red `#ce4b38`; background `#fdf3e6`; black `#271d1d` copy only | Default palette; ink functional rules documented as an implementation extension |
| 4 | `#f9d5cb` and `#5d71ab` need explicit permission | Metadata only, excluded from generated CSS |
| 5 | Simple hierarchy, easy reading, fast loading, mobile first | Local fonts, no CSS framework, responsive patterns |
| 6 | Vesper Libre bold headings/subheadings; regular body | Bundled 400/700 font faces for all web type |
| 7 | Mascot named Red; permission before publication; special poses explicitly requested | Original asset catalogue; permission dependency in handoff; no routine image generation |
| 8–9 | Mascot once per page at most | Single-composition templates; automated count check |
| 9 | Babies/bubbles used in context; explicit permission requested | Catalogue metadata and restricted publication use |

**Source ambiguity:** page 4 calls the final swatch “Pink”, but it is visually blue and gives `#5d71ab`. This system records both the literal label and the colour; it preserves the restriction. Page 2 has a visual clear-space grid but no numerical unit, so our half-logo-height/24px clearance is a conservative proposed default.

## What is proposed here

The source does not define exact web sizes, grids, radii, button shapes, state styling, breakpoints, social safe areas, voice pillars, legal copy or product details. This system supplies labelled defaults for these. They can be reviewed or refined without changing the sourced palette, type family or artwork.

The proposed tone is warm and clear, inferred from the family-oriented artwork and intended purpose. It is not a quotation from a separate Red tone-of-voice handbook. No Protect Line purpose statement, metrics or legal footer has been inherited.

## Asset chain of custody

Every PNG was renamed to a stable ASCII path without changing its bytes. `assets/manifest.json` records original filename, SHA-256, dimensions, size and context notes. New or replacement artwork must carry its own source and permission record. Font source and licence are in `assets/fonts/README.md` and `assets/fonts/OFL.txt`.

## Known source gaps

- Vector, square/title/domain and greyscale logo exports.
- Explicit numeric logo exclusion-zone/minimum-size specification.
- A Red-specific approved tone-of-voice handbook, if one exists.
- Current approved trading/regulatory footer, postal/contact details, product terms and destination-specific financial-promotion copy.
- Current approved review/ratings data and offer terms.
- Campaign-specific permission to publish the supplied illustration, babies/bubbles or restricted palette.

These gaps do not prevent internal layout construction. Keep them visible before public release.
