# Design starters

| Template | Use |
| --- | --- |
| [landing-page.html](landing-page.html) | Complete family-focused marketing composition |
| [product-page.html](product-page.html) | Product introduction, balanced explanation and FAQs |
| [quote-page.html](quote-page.html) | Non-submitting form pattern with visible validation |
| [thank-you.html](thank-you.html) | Completion structure with honest demo wording |
| [slide.html](slide.html) | 1280×720, 16:9 presentation artboard |
| [social-square.html](social-square.html) | 1080×1080 creative |
| [social-portrait.html](social-portrait.html) | 1080×1350 creative |
| [social-story.html](social-story.html) | 1080×1920 creative with proposed overlay safe area |
| [email.html](email.html) | 600px table-based email layout |

Starters include illustrative copy rather than approved claims. Replace demo notes and explicit source placeholders only when the relevant evidence exists. Use `brand/publication.md` before releasing a specific customer-facing design.

## Exporting slides and social

The `data-export-width` and `data-export-height` attributes specify target dimensions. Set `.red-artboard` to that exact width, remove the preview container width limit and artboard border in the exporter, wait for fonts/images and capture the artboard only. Its `aspect-ratio` defines height. Do not capture the internal demo note as part of the creative. Container-relative text sizes preserve the intended composition at export size.

## Email exception

Email HTML uses inline values from the default palette and Georgia rather than requiring CSS variables or a web font. This is a compatibility pattern, not a departure from the visual palette. Image sources are local for preview; use approved hosted absolute URLs for delivery. Supply real privacy/unsubscribe/contact and regulatory content. Do not send the template while `[REQUIRES SOURCE]` remains. Validate separately in the actual email client stack.
