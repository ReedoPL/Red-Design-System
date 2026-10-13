# Red design system

A complete, LLM-readable brand kit for creating clean Red designs: web pages, quote journeys, slides, social creative and email. Built from the supplied Red brand guide and original artwork, with the same familiar entry points as the Protect Line design system.

**Start here:** [DESIGN.md](DESIGN.md) is the visual contract. [AGENTS.md](AGENTS.md) gives the reading order. [LLM_CONTEXT.md](LLM_CONTEXT.md) is the compact handoff for tools with limited context.

## Brand at a glance

| Element | Rule |
| --- | --- |
| Brand name | Red; Red.co.uk when referring to the domain. Keep the original wordmark. |
| Canvas | Warm cream `#fdf3e6` |
| Accent | Red red `#ce4b38` |
| Copy | Ink `#271d1d`, copy only |
| Type | Vesper Libre regular 400 and bold 700 for headings and body |
| Illustration | Supplied Red artwork, at most one mascot composition per page |
| Restricted colours | `#f9d5cb` and `#5d71ab` require explicit permission; excluded from default CSS |
| Copy approach | Clear, warm British English; sentence case; no pressure or invented claims |

The colour, font and illustration rules come from [the source PDF](brand/source/red-brand-guidelines-v1.pdf). Component styling, spacing, type sizes and the proposed copy voice are **implementation defaults**, not claims of prior brand approval. See [source provenance](brand/provenance.md).

Visual references: [desktop example](preview/screenshots/kit-desktop.png) · [mobile example](preview/screenshots/kit-mobile.png).

## Use with an LLM

Link or clone this repository in your design or coding tool. Give it this instruction:

> Use the Red design system in this repository. Read AGENTS.md, DESIGN.md, colors_and_type.css and brand/voice.md. Reuse the matching components and template. Create a responsive [asset] for [audience and purpose]. Use the supplied assets, keep to the default palette and explain any missing source or publication dependency.

For a small context window, provide `LLM_CONTEXT.md`, `colors_and_type.css`, `assets/manifest.json` and the relevant template and styles. Do not upload a source PDF alone and expect the model to infer component behaviour. More ready-to-use briefs are in [prompts/](prompts/README.md).

`CLAUDE.md`, [Cursor rules](.cursor/rules/00-red-brand.mdc) and `AGENTS.md` support common agent entry points. No particular tool UI or proprietary import process is required.

## Preview and validate

Node 22+; no install or build dependencies.

```bash
git clone https://github.com/ReedoPL/Red-Design-System.git
cd Red-Design-System
npm run check
npm run preview
```

Open `http://127.0.0.1:3000/kit/` for the complete page and `http://127.0.0.1:3000/preview/` for the catalogue. Fonts are bundled locally. The specimens also work when opened directly; local HTTP is best for font loading and testing. The form demonstration runs locally and sends nothing.

## What is included

| Path | Purpose |
| --- | --- |
| [DESIGN.md](DESIGN.md) | Brand rules, layout, responsive behaviour and accessibility |
| [tokens/tokens.json](tokens/tokens.json) | Canonical machine-readable tokens and restricted-colour metadata |
| [colors_and_type.css](colors_and_type.css) | Generated CSS variables and local font faces |
| [styles/base.css](styles/base.css) | Base typography, reset and focus styles |
| [components/](components/README.md) | Buttons, header, hero, cards, FAQ, forms, notices, quotations and footer |
| [kit/index.html](kit/index.html) | Complete responsive marketing-page example |
| [templates/](templates/README.md) | Landing, product, quote, thank-you, slide, three social formats and email |
| [preview/index.html](preview/index.html) | Visual catalogue: brand, colours, type, spacing, components and assets |
| [assets/manifest.json](assets/manifest.json) | Exact paths, dimensions, original filenames, hashes and use notes |
| [brand/](brand/provenance.md) | Source evidence, proposed voice and publication dependencies |
| [qa/](qa/README.md) | Automated checks, visual review and release checklist |

## Maintaining the system

1. Change token values in `tokens/tokens.json`, then run `npm run build:tokens`.
2. Update `DESIGN.md` and the affected component, template and preview.
3. Run `npm run check` and review at mobile and desktop sizes.
4. For new artwork, preserve originals and update the asset manifest with permission and provenance.
5. Record changes in [CHANGELOG.md](CHANGELOG.md).

The repository is public for straightforward tool integration. Brand artwork remains proprietary; see [LICENSE.md](LICENSE.md). Permission to use the kit for internal design does not imply approval of a customer-facing financial promotion.
