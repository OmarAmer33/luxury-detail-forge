## v5 — Post-launch content & structure edits

Five fixes across booking form, detailing page, new tint page, nav, and home grid. No design system changes.

### Fix 1 — Booking form service list
**`src/routes/book.tsx`** — In `services` array, insert "Interior Detail" and "Exterior Detail" after "Full Detail" and before "Paint Correction". Final order: Ceramic Coating, PPF, Vinyl Wrap, Full Detail, Interior Detail, Exterior Detail, Paint Correction, VIP Detail (Top Tier), Window Tint, Not sure.

### Fix 2 — Detailing wording
**`src/routes/detailing.tsx`** — Find line with "leather cleaning and conditioning" (or similar combined phrasing) and change to just "leather cleaning". Leave the standalone leather-conditioning add-on intact.

### Fix 3 — New Window Tint page
**`src/routes/window-tint.tsx`** (NEW) — TanStack route at `/window-tint` using `ServicePage` pattern.

- Hero: eyebrow "Window Tint", title "Heat-rejecting tint, done right.", subtitle as specified, reuse an existing detailing/tint image asset.
- Intro paragraph per spec.
- Includes list (5 items) per spec.
- `pricing` prop on `ServicePage` → Block 1 "Full Vehicle Tint": Standard $300, Carbon $375, Ceramic $500 (all "Starting").
- Inline sections below `ServicePage` (same wrap-in-fragment pattern currently used on detailing page for tint):
  - Block 2 "Windshield Tint": Standard $160, Carbon $190, Ceramic $250.
  - Block 3 "Front Windows Only (2 windows)": Standard $100, Carbon $150, Ceramic $250 + clarification line "Two front side windows — for vehicles that come factory-tinted in the rear and need the fronts matched."
- Process steps: Consult / Prep / Install / Cure (copy per spec).
- CTA: "Book your tint" → `/book`.
- `head()` metadata with route-specific title, description, og:title/description, og:image (hero image).

### Fix 4 — Remove tint section from detailing page
**`src/routes/detailing.tsx`** — Delete the inline Window Tint section composed below `ServicePage`. Detailing page should contain only the five detail tiers (Elite Wash, Maintenance, Interior, Exterior, Full) plus add-ons.

### Fix 5 — Nav + home grid
**`src/components/site/Nav.tsx`** — Add `{ to: "/window-tint", label: "Window Tint" }` between Detailing and VIP Showroom in the `links` array. (Both desktop nav and mobile menu inherit from the same array — no other changes needed.)

**`src/routes/index.tsx`** — Restructure services grid:
- Add Window Tint card (6th card) linking to `/window-tint`.
- Remove `md:col-span-2 lg:col-span-2` from VIP card — becomes standard width, keep gold "Top Tier" badge.
- New order: Row 1 — Ceramic / PPF / Wraps; Row 2 — In-Shop Detailing / Window Tint / VIP Showroom.
- Change heading "Five ways to elevate." → "Six ways to elevate."

### Out of scope
Review content, social URLs, design tokens, form submission logic, server route, any other copy/pricing.

### Files touched
- `src/routes/book.tsx`
- `src/routes/detailing.tsx`
- `src/routes/window-tint.tsx` (new)
- `src/components/site/Nav.tsx`
- `src/routes/index.tsx`
