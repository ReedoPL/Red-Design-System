# Red: agent working agreement

## Objective

Create clean, recognisable Red designs from this repository. Use British English. Never infer Red rules from the Protect Line brand: their typography, palettes and visual character differ.

## Required reading order

1. This file.
2. `DESIGN.md`: visual contract and hard constraints.
3. `colors_and_type.css`: generated runtime tokens; edit `tokens/tokens.json` if changing the system itself.
4. `brand/voice.md` and `brand/publication.md` for copy and source dependencies.
5. `assets/manifest.json` and `assets/README.md` to choose actual assets.
6. Matching specimen in `components/` and matching starter in `templates/`; `kit/index.html` shows a complete composition.

`brand/source/red-brand-guidelines-v1.pdf` is the authority for approved brand foundations. If a later approved source contradicts an implementation default, update the system and record the evidence. Do not silently override a sourced rule.

## Non-negotiable source rules

- Red `#ce4b38`, background `#fdf3e6`, ink `#271d1d` for copy only.
- Vesper Libre: bold headings and subheadings, regular body. No Poppins, Lora, Inter or sans-serif redesign.
- Only supplied logo variants; no logo recreation, stretching or unapproved recolouring.
- At most one mascot composition per page, including partial mascot art and scenes containing Red.
- Source PDF requests explicit permission before publication of mascot imagery, babies and bubbles. Internal design work requested by the user is authorised: prepare the concrete design and list any remaining publication dependency; do not interrupt routine construction.
- New mascot poses must be explicitly requested; never generate or invent replacements as part of routine layout work.
- The secondary swatches `#f9d5cb` and `#5d71ab` require explicit permission. They are not default UI tokens.

## System defaults

- Cream-led, mostly flat, editorial compositions; red accents, thin ink rules, generous space.
- Sentence case; clear, warm proposed voice. No jargon without explanation, fear tactics or pressure.
- Use `--color-*`, `--font-*`, `--spacing-*` and layout tokens. `colors_and_type.css` is generated; do not edit it directly.
- Normal copy and links: ink on cream. Red on cream and cream on red are large-text combinations only.
- Primary CTA label: at least 20px bold (default `--font-size-button`). Do not shrink it.
- Native `details` for FAQ; functional mobile navigation; labelled form fields, visible focus and textual errors.
- Desktop and mobile must work without horizontal overflow. Honour reduced motion.
- Never copy Protect Line statistics, legal statements, offers, reviews or product claims into Red.

## Working commands

`npm run check` validates generated tokens, assets, internal references, palette use and mascot counts. `npm run preview` serves locally. No dependency installation is required.

## Complete handoff

Provide the design, tested sizes, any asset or claim marked `[REQUIRES SOURCE]`, and any remaining publication dependency. Internal template demonstrations are not live integrations. Keep demo form success wording honest; no submission occurred. Follow `qa/checklist.md` before delivering.
