# v8 — Window Tint Pricing Consolidation

## Goal
Consolidate the three separated Window Tint pricing blocks on `/window-tint` into a single matrix placed right after the intro paragraph, so all 9 price points are visible at a glance and lower-price options (windshield, front windows) are not buried below Includes/Process/CTA sections.

Only `src/routes/window-tint.tsx` is modified. No design system changes, no copy changes to non-pricing content, no other pages touched.

## Changes

### 1. Remove `pricing` prop from `<ServicePage>`
Delete the `pricing={{ tiers: [...], footnote: "..." }}` argument so `ServicePage` no longer renders its embedded Full Vehicle pricing section.

### 2. Remove the two `<PriceBlock>` sections and their data constants
- Delete the `windshieldTiers` and `frontTwoTiers` arrays.
- Delete the two `<PriceBlock ...>` JSX calls that render "Windshield Tint" and "Front Windows Only".
- Remove the local `PriceBlock` component definition (it is only used on this page; the separate file is untouched).

### 3. Add unified pricing matrix after `<ServicePage>` and before the Book CTA
Add a new section with:
- `surface-dark` background, `container-luxe`, eyebrow/title/intro matching existing `PriceBlock` styling.
- A responsive HTML table for `md:` and up: rows for Full Vehicle / Windshield / Front Windows Only, columns for Standard / Carbon / Ceramic film.
- A mobile card view below `md:` showing the same 9 prices.
- Data driven by a new `pricingMatrix` array declared at the top of the file.

Pricing values:
| Service | Standard | Carbon | Ceramic |
|---|---|---|---|
| Full Vehicle Tint | $300 | $375 | $500 |
| Windshield Tint | $160 | $190 | $250 |
| Front Windows Only | $100 | $150 | $250 |

Add a small disclaimer below the matrix: "Prices are starting rates. Some vehicles with complex glass profiles may require an in-person quote."

### 4. Expand JSON-LD `serviceSchema`
Update `hasOfferCatalog.itemListElement` from 3 to 9 offers, following the pattern "Standard Film — Full Vehicle", "Carbon Film — Windshield", etc., with prices as numeric strings (no `$`) and `"USD"` currency.

### 5. Remove unused import
Remove the local `PriceBlock` import if it exists (it is defined inline, so this is just cleanup of the component definition). Confirm `CtaSection`, `JsonLd`, `ServiceSeo`, `ServicePage`, `Link`, and `img` imports remain correct.

## What stays unchanged
- Hero, intro paragraph, three film-tier feature cards, What's included bullets, Process steps, Book CTA section, final `<CtaSection />`, and FAQs.
- `ServiceSeo` call and `<JsonLd data={serviceSchema} />` placement (only schema data changes).
- All other routes (`/detailing`, `/ceramic-coating`, etc.) and components.

## Verification
- `bun run build` passes.
- Preview shows all 9 prices in one section, with desktop table and mobile card layouts.
- Section uses dark background and existing tokens (`var(--color-gold)`, `var(--color-onyx)`, `border-border`).
- No console errors on `/window-tint`.
- JSON-LD validates as `Service` with 9 `Offer` entries.
