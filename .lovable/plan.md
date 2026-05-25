## Problem

The Nav (top-left header logo) uses the light-background logo and applies `filter: invert(1) hue-rotate(180deg)` when over a dark hero (not scrolled). That filter shifts the crimson red into an orange/coral, same issue we just fixed in the footer.

## Fix

In `src/components/site/Nav.tsx`:
- Import both assets: `logo` (light bg) and `logoDark` (dark bg, the file already copied to `src/assets/logo-dark.png`).
- Swap the `<img src>` based on `scrolled`: use `logoDark` when not scrolled (transparent over dark hero), `logo` when scrolled (white background).
- Remove the `filter: invert(1) hue-rotate(180deg)` style entirely.

Result: the crimson red in the header logo matches the rest of the site in both states.
