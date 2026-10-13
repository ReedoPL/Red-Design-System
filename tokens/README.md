# Machine-readable tokens

`tokens.json` is the canonical input. `colors_and_type.css` is generated with `npm run build:tokens`; `npm run check` rejects drift. `tokens` is a flat map of CSS custom-property names to CSS-ready values; aliases use `var(--name)`. This deliberately simple schema does not claim DTCG compatibility.

The three palette primitives and font family/weights are sourced. Sizes, spacing, breakpoints and component roles are implementation defaults. Restricted palette entries are metadata and must never be exported into the default CSS.

CSS media queries cannot reference custom properties. `48rem` and `64rem` are therefore literal breakpoints in component CSS; keep them aligned with the metadata tokens. Format dimensions and artboard geometry are layout constants, not colour/type exceptions.

Email uses inline token values for client compatibility. If you change a colour, update the email specimen and the contrast table and validate the new pairings. Change sourced brand primitives only with new approved evidence.
