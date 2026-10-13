# Red visual contract

This is the practical design contract for an LLM or designer creating Red assets. The source PDF defines foundations; this repository turns them into usable design patterns. Read [provenance](brand/provenance.md) for the distinction between source rules and proposed defaults.

## 1. Character and composition

Red should feel warm, familiar and clear. The original hand-drawn wordmark and tactile mascot artwork supply its character. Keep the surrounding layout simple enough for them to breathe.

- Use cream as the dominant canvas, with ink copy and focused red accents.
- Use an editorial rhythm: substantial headline, short supporting paragraph, one clear next action, then thin rules and open content sections.
- Keep body copy left-aligned and readable. Avoid excessive centred paragraphs.
- Use illustrations purposefully. One well-placed Red composition is more recognisable than repeated mascot stamps.
- Do not import Protect Line’s navy/pink palette, Poppins/Lora pairing or floating pill navigation. Do not substitute another brand’s design language.

These composition principles are system defaults derived from the supplied examples, not a newly asserted official style guide.

## 2. Colour and contrast

| Source role | Token | Value | Default use |
| --- | --- | --- | --- |
| Red red | `--color-red` | `#ce4b38` | Emphasis, large headlines, CTA fill, accents |
| Background | `--color-cream` | `#fdf3e6` | Page and component canvas |
| Black (copy only) | `--color-ink` | `#271d1d` | Body, labels, links, headings; thin functional rules are a system default |

The PDF also supplies `#f9d5cb` and `#5d71ab` with explicit-permission restrictions. The latter is labelled “Pink” in the source although visually blue. Preserve the hex and restriction; do not resolve the typo into permission to use it. Both remain metadata, not default CSS variables.

**Ink is not a dark background theme.** The ink square in the colour catalogue is only a specimen swatch. White is present in the supplied white logo, not a fourth default UI surface. The cream canvas is the default.

| Pair | Contrast | Rule |
| --- | --- | --- |
| Ink / cream | 14.96:1 | Normal and large copy |
| Red / cream, either direction | 4.08:1 | Large text only; non-text focus/borders pass 3:1 |
| White / red | 4.48:1 | Large text only; below 4.5:1 for normal text |
| Ink / red | 3.66:1 | Not normal copy; avoid in the default patterns |

“Large text” means at least 24px regular or about 18.67px bold at the rendered size. Primary CTAs use **20px bold**. Never round 4.48 up to 4.5 or shrink the label to 16px. Red filled panels contain large bold headlines and a large-label inverse button only; move ordinary explanatory copy outside onto cream. Red inline links at body size are not permitted: use ink text and red underline.

Use CSS variables for runtime styles. No invented shades, opacity treatments that weaken copy contrast, or arbitrary success/error palette. Status needs a word or symbol as well as colour. Email is the documented exception for inline copies of approved token values.

## 3. Typography

The PDF specifies Vesper Libre bold for headings and subheadings and regular for body. Use only bundled 400 and 700 files. No accent font, synthetic italic or sans-serif replacement.

| Role | Default | Weight |
| --- | --- | --- |
| Display | Fluid 40–72px | 700 |
| H1 | Fluid 36–56px | 700 |
| H2 | Fluid 28–40px | 700 |
| H3 / lead | 24px | 700 heading / 400 lead |
| Body | 18px, line-height 1.6 | 400 |
| Supporting copy | 16px | 400 |
| CTA label | 20px, line-height 1.4 | 700 |

Sizes and line heights are implementation defaults. Use sentence case, short paragraphs and a reading measure of roughly 62 characters. Use red within a headline only where the large-text threshold holds. Avoid long all-caps text, decorative tracking and outlined words.

Georgia is a practical email/failure fallback only; finished web or exported creative must render Vesper Libre. The two TTF files are self-hosted with the SIL Open Font License. Font loading should not depend on a Google Fonts network request.

## 4. Logos and illustration

Use exact files from [the manifest](assets/manifest.json): primary red wordmark on cream, white wordmark on red. Preserve aspect ratio and artwork. Never type “Red.” in another script font as a logo, trace a new logo, rotate, stretch, recolour or add effects.

The PDF shows square and titled lockups, but supplied files contain the standalone wordmarks only. Missing vector, greyscale or titled versions are `[REQUIRES SOURCE]`; do not manufacture an approved lockup. As a conservative system default, leave at least half the displayed logo height clear on each side, with a minimum 24px margin. This ratio is not specified numerically in the PDF.

Mascot rules from PDF pages 7–9:

- At most **one mascot composition per page**. A partial Red, phone-hands image or classroom scene containing Red counts too.
- Use the supplied original artwork. Do not repaint, stretch, recolour, mirror or generate a new pose as routine layout work.
- Publication needs explicit permission under the source guide. Building requested internal layouts is authorised; record publication dependencies in the handoff.
- Babies and bubbles may add contextual interest but require explicit permission. Keep them restrained; they are not an automatic exception to an illustrated layout’s visual hierarchy.
- Supplied multi-character compositions count as one existing composition; do not build a new collage to evade the one-per-page rule.

Keep illustration separate from interactive controls and legal information. Use `object-fit: contain`. Most example mascot art has a suggested 280px mobile / 420px desktop maximum. Original edge-cropped poses may sit at an edge; do not crop a full pose merely to imitate them. Decorative illustration uses empty alt text; use a factual description when it communicates information absent from the copy.

Medical-looking `red-adviser-illustration.png` needs careful context: it must not imply medical or regulated financial advice. The reward-card illustration is not evidence of a current offer. Worried art must not turn protection messaging into fear or pressure.

## 5. Layout and spacing

| Default | Value |
| --- | --- |
| Container | 1200px maximum |
| Side padding | Fluid 16–32px |
| Section spacing | Fluid 48–80px |
| Reading measure | 62ch |
| Grid gap | 24px |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px |
| Small corner | 4px |
| Optional moderate corner | 8px |
| Touch target | 48px minimum |

Use open sections and thin rules before reaching for boxed cards. Default cards are open content blocks with a red top rule. Buttons have a restrained 4px corner; reserve pills for small tags. Do not add card shadows, glassmorphism, gradients or nested cards. Ink rules are a functional implementation extension to the source’s “copy only” role; keep them thin and avoid ink-filled decorative surfaces.

## 6. Components and behaviour

| Component | Pattern | Required behaviour |
| --- | --- | --- |
| Header | Wordmark, simple links, CTA | Mobile menu works, labelled toggle, expanded state, Escape closes |
| Hero | Left-aligned text + one original illustration | Single-column mobile order: copy, action, art |
| Primary action | Red fill, cream 20px bold text | Visible focus, meaningful destination, 48px target |
| Secondary action | Ink outline/text, cream surface | Clear distinction from primary |
| Inverse action | Cream fill, red 20px bold text | Only on red large-type surfaces |
| Content cards | Open blocks with red top rule | Reflow three → one column |
| FAQ | Native `details` / `summary` | Keyboard operable and usable without JS |
| Form | Persistent labels, hints and errors | Correct types/autocomplete; text errors; no false live submission |
| Progress | Numbered list | Current step exposed with `aria-current="step"` |
| Notice | Ink copy, red rule | Text describes status; colour is not the only signal |
| Quotation | Original approved quote and attribution | Missing evidence remains a labelled placeholder |
| Footer | Cream, wordmark, functional links and legal copy | Current approved statement supplied before publication |

Reference [components/README.md](components/README.md). Do not show decorative hamburger icons without a working menu. The demonstration form deliberately sends nothing; connect actual product logic, validation and data handling in the consuming application.

## 7. Responsive and accessible delivery

- Below 768px: one-column page grids, stacked hero, mobile navigation.
- At 768px and above: two-column hero and three-column content where appropriate.
- 1024px is a wide-layout tuning point; 1200px remains the container maximum.
- Text and buttons may wrap; never crop copy to fit an illustration.
- Test 320/375px mobile, 768px tablet and 1440px desktop, plus keyboard operation.
- Ordinary page text remains readable at 200% zoom. No essential hover-only information.
- Visible focus on controls; reduced motion preference honoured; alt text and headings follow meaning.
- Fixed social/slide artwork scales down as a preview, not as responsive webpage body text. Check legibility at its intended export size and respect platform overlay safe areas.

## 8. Cross-channel patterns

Web starters are in `templates/landing-page.html`, `product-page.html`, `quote-page.html` and `thank-you.html`. Slides use a 16:9 artboard; social uses 1080×1080, 1080×1350 and 1080×1920. Export artboards, not the surrounding demo notes. Story defaults reserve 14% of width at the top and 22% at the bottom as a starting safe area; verify the destination platform’s actual overlays.

Email is a 600px table-based starter with inline copies of default colour values and Georgia fallback. Replace local image sources with approved hosted absolute URLs and supply approved privacy/unsubscribe/footer links before sending. It is a layout pattern, not an email delivery integration.

Do not add unverified statistics, Trustpilot ratings, prices or promises merely to fill a section. See [brand/voice.md](brand/voice.md) and [brand/publication.md](brand/publication.md).

## 9. Handoff standard

A design is ready for internal review when it uses the tokens and actual assets, has functioning relevant controls, passes repository checks, has been inspected at required sizes, and makes source gaps explicit. A public release also needs the specific illustration and financial-promotion content dependencies satisfied. Do not describe unapproved template copy as approved or the design system as a production quoting service.
