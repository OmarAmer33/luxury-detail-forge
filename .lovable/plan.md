# v8.2 — Remove duplicate CTAs on /window-tint

## Goal
Eliminate the three consecutive CTA blocks currently rendered at the bottom of `/window-tint` so the page ends with exactly one CTA, matching every other service page.

## Current state
`src/routes/window-tint.tsx` renders:
1. `ServicePage`'s internal `<CtaSection />` ("Ready to give your car the treatment it deserves?").
2. A custom gold "Book your tint" `<Link>` section (lines 195–204).
3. A second explicit `<CtaSection />` (line 206).

`src/components/site/ServicePage.tsx` already renders a single `<CtaSection />` at the end of every service page and does not need changes.

## Changes
Edit **only** `src/routes/window-tint.tsx`:

1. Remove the `CtaSection` import from line 5.
2. Delete the custom "Book your tint" `<section>` block (lines 195–204).
3. Delete the redundant `<CtaSection />` JSX at line 206.

Everything else stays untouched:
- `ServicePage`'s internal final `<CtaSection />`
- The pricing matrix passed via `afterFeatures`
- All `ServicePage` props (`eyebrow`, `title`, `subtitle`, `image`, `intro`, `features`, `includes`, `process`)
- `JsonLd`, `ServiceSeo`, the 9-offer JSON-LD, and the `faqs` array
- `src/components/site/ServicePage.tsx`
- All other service routes

## Verification
- `bun run build` passes.
- `/window-tint` loads with no console errors.
- Only one occurrence of "Ready to give your car the treatment it deserves?" appears on `/window-tint`.
- `/ceramic-coating` renders identically to before (regression witness).
- No linter warnings for an unused `CtaSection` import in `window-tint.tsx`.
