# v8.1 — Reposition Tint Pricing Matrix + Fix Heading

## Goal
Move the Window Tint pricing matrix so it appears immediately after the film-type feature cards and before the "What's included" section, and replace the meta-commentary section title with customer-facing copy.

Files touched: `src/components/site/ServicePage.tsx` and `src/routes/window-tint.tsx` only.

## Changes

### 1. Add optional `afterFeatures` slot to ServicePage.tsx
- Add `import type { ReactNode } from "react";`.
- Extend `ServicePageProps` with an optional `afterFeatures?: ReactNode;` prop.
- Insert `{props.afterFeatures}` immediately after the closing `</section>` of the "Why it matters / Engineered to last" features section and before the opening of the "What's included" section.
- The slot renders only when provided and carries its own wrapper/styling.

### 2. Move the pricing matrix into the `afterFeatures` slot in window-tint.tsx
- Take the entire unified pricing matrix `<section>` (currently rendered after `<ServicePage />`) and move it into the new `afterFeatures={...}` prop on `<ServicePage>`.
- Remove the standalone pricing matrix section that currently sits between `<ServicePage />` and the "Book your tint" CTA.
- Leave all other `ServicePage` props unchanged.

### 3. Update the pricing matrix heading
Change the `<h2>` text inside the matrix from:

  All tint pricing in one place.

To:

  Pick your film.

No other copy in the matrix changes (eyebrow, intro paragraph, prices, disclaimer footnote all stay the same).

## What stays unchanged
- `ServicePage`'s internal section order and styling for Hero, Intro, Features, Includes, Pricing (legacy prop), Process, internal Book CTA, and final `CtaSection`.
- All other `ServicePage` props and their behavior.
- The `pricingMatrix` array values and the desktop-table / mobile-card responsive layout.
- The 9-offer JSON-LD schema in `window-tint.tsx`.
- The "Book your tint" CTA section and final `CtaSection` after `ServicePage`.
- FAQs, `ServiceSeo`, and `JsonLd` calls.
- All other service pages (`/ceramic-coating`, `/detailing`, `/paint-protection`, `/car-wraps`, `/vip-showroom`) — `afterFeatures` is optional and unused, so they render identically.

## Resulting /window-tint section order
1. Hero
2. Intro / "The standard."
3. Features / "Engineered to last."
4. Pricing matrix / "Pick your film."
5. Includes / "Every package, every car."
6. Process / "How we work."
7. Internal "Get a quote" link
8. Final `CtaSection`
9. FAQs (bottom, via `ServiceSeo`)

## Verification
- `bun run build` passes.
- On `/window-tint`, the pricing matrix appears directly after the three film feature cards and before "What's included".
- The section title reads "Pick your film."
- All 9 prices still display correctly in the desktop table and mobile card layouts.
- `/ceramic-coating` (or another service page) renders with no visible change.
- No console errors on any service page.
