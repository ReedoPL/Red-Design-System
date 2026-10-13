# Validation

`npm run check` is dependency-free. It checks:

- Generated CSS matches canonical token JSON.
- All source asset hashes, PNG dimensions and metadata paths match.
- Token references resolve; runtime CSS uses the default palette via variables.
- Restricted swatches do not leak into rendered CSS/HTML.
- HTML local styles, images, scripts, links and anchor IDs resolve.
- Non-catalogue HTML pages contain at most one source mascot composition.
- Source typography/colour primitives remain correct and key contrast combinations meet their intended thresholds.
- Local font files have recognised font headers.

These checks support visual review; they do not prove that every future composition is readable or that a financial promotion is approved. Browser review results for this initial implementation are in `validation-report.md`. Use `checklist.md` for each new design.

## Optional browser check

With Playwright and its Chromium browser installed in your development environment, start `npm run preview` and run `node scripts/browser-check.mjs`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if Chromium is supplied separately. This optional check covers 26 pages at four widths, menu/FAQ/form interaction, fonts, focus, reduced motion, no-JS navigation and export geometry. Screenshots and raw results are generated under `qa/` and excluded from Git.
