# Component specimens

Every specimen is a standalone HTML document that loads `../colors_and_type.css`, `../styles/base.css` and `components.css`. Reuse its semantic markup and `red-*` classes in the consuming project. Asset paths are relative to these specimens; resolve them for your application.

| Specimen | Purpose |
| --- | --- |
| [buttons.html](buttons.html) | Primary, secondary, text link and disabled state |
| [header.html](header.html) | Simple navigation with enhanced mobile menu |
| [hero.html](hero.html) | Headline, action and one mascot composition |
| [cards.html](cards.html) | Open three-step blocks |
| [faq.html](faq.html) | Native keyboard-accessible disclosure |
| [forms.html](forms.html) | Persistent labels, hints, email validation and local demo status |
| [feedback.html](feedback.html) | Textual notice, error and tag patterns |
| [testimonials.html](testimonials.html) | Honest source placeholders; no fake review |
| [footer.html](footer.html) | Cream footer with explicit legal-content dependency |

`components.js` handles mobile-menu expanded state, Escape and local-only form validation. FAQ works without JS. The form sends and stores nothing. In a real form, preserve labels, field-error relationships and honest status copy while replacing the demo handler with application logic.

Do not combine the standalone documents wholesale. Copy the relevant component markup; keep one page `main`, unique IDs and one relevant top-level heading. A complete example is in [../kit/index.html](../kit/index.html).
