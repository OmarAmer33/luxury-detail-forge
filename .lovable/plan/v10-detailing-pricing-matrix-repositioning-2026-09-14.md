# v10 — Detailing pricing matrix + repositioning

## Goal
Rebuild `/detailing` pricing as a 5-row × 3-column responsive matrix and move it from after "Includes" to after "Features" via `ServicePage`'s existing `afterFeatures` slot.

## Files touched
- `src/routes/detailing.tsx` only

## Plan

1. **Add the pricing data array**
   Insert `const detailingMatrix = [...]` near the top of the file with the five packages, subtitles, and Car / SUV-Pickup / 3-Row-XL prices supplied in the prompt.

2. **Remove the built-in `pricing` prop**
   Delete the `pricing={{ tiers: [...], footnote: ... }}` argument from the `<ServicePage>` call. The default `pricing` section will no longer render.

3. **Add `afterFeatures` pricing section**
   Pass an `afterFeatures` prop to `<ServicePage>` containing:
   - A dark `surface-dark` section with `container-luxe`
   - "Pricing" eyebrow, "Pick your detail." title, and the supplied intro copy
   - Desktop table (hidden below `md`) with 5 rows + alternating background
   - Mobile card view (hidden at `md` and up) showing the same 5 rows in stacked cards
   - Footnote: "Starting prices. For our top-tier 4-hour multi-stage detail, see <a href=\"/vip-showroom\">VIP Detail</a>."

4. **Expand JSON-LD offers**
   Replace the existing 5-offer `hasOfferCatalog.itemListElement` in `serviceSchema` with 15 Offer entries (5 packages × 3 sizes) using the exact naming, numeric-string prices, and `priceCurrency: "USD"` format from the prompt.

## Verification
- `bun run build` passes
- `/detailing` renders the matrix between "Engineered to last." and "Every package, every car."
- All 15 prices display correctly in desktop table and mobile cards
- Footnote links to `/vip-showroom`
- `/window-tint` and `/ceramic-coating` remain unchanged
- JSON-LD contains 15 Offer entries with correct prices
- No console errors on `/detailing`
