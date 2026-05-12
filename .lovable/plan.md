## Top Elite Auto — v2 (final, ready to build)

### 1. VIP Showroom page — full rewrite (`src/routes/vip-showroom.tsx`)
Top-tier ~4-hour multi-stage premium detail (not storage).
- Hero: eyebrow "VIP Detail · Top Tier", title "The full reset.", subtitle on the 4-hour multi-stage premium detail.
- Replace membership/perks with **service inclusions**: full multi-stage decon, hand wash, clay bar, iron remover, deep interior (vacuum + steam + leather conditioning + vent detail), engine bay clean, light paint correction, premium sealant, tire & wheel detail.
- Pricing: **$515 starting (Cars) / $665 starting (SUVs & Trucks)**, ~4 hours.
- CTA: **"Reserve a VIP Slot"** → `/book`.

### 2. Real reviewer names + clear placeholder copy
Placeholder text everywhere: **`[ Quote from Google review · pending content pass ]`**.
- **Home** (3): Sarah Mejia, Racsaida Morel, Diana Franco. Drop the vehicle line entirely.
- **`reviews.tsx`** (4): Sarah Mejia, Racsaida Morel, Diana Franco, Vincent Gonzalez. Same pattern.

### 3. Home stats row → three stats
- `5.0★` Google Rated
- `Springfield, NJ` Est. 2018
- `Mon–Sat` 9am – 6pm

(Grid → `sm:grid-cols-3`.)

### 4. "Starting at" pricing on every service page
Extend `ServicePageProps` with optional `pricing?: { tiers: { name: string; price: string; note?: string }[]; footnote?: string }`. Render between Includes and Process.

- **In-Shop Detailing** — 3-tier (Car / SUV-Pickup / 3-Row-XL):
  - Elite Wash — **$115 / $115 / $140**
  - Maintenance Detail — $180 / $210 / $240
  - Interior Detail — $205 / $230 / $255
  - Exterior Detail — $205 / $230 / $255
  - Full Detail — $330 / $380 / $430
- **Ceramic Coating**: 2-Year starting $850 · 5-Year starting $950 · Motorcycle $300
- **VIP Showroom**: $515 (Cars) / $665 (SUVs & Trucks) starting
- **PPF** & **Wraps**: *"Quote-based — varies by coverage area, vehicle and material."* + Book CTA.

### 5. Window Tint — inline composition on detailing route
**Not** a `ServicePage` prop. Wrap `<ServicePage>` in a fragment on `detailing.tsx` and render the Window Tint section after it.

- Front Windshield Only — $150
- Standard Sedan / Coupe — $290
- Standard SUV — $415
- Ceramic Coupe — $560 (windshield $660)
- Ceramic Sedan — $575 (windshield $760)
- Ceramic SUV (with windshield) — $815
- Box Truck 5% Ceramic — $400

### 6. Home services grid — 5 cards, VIP full-width on bottom row
Order: Ceramic Coating, Paint Protection (PPF), Car Wraps, In-Shop Detailing, VIP Showroom.
Layout (`md:grid-cols-2 lg:grid-cols-3`):
- Ceramic / PPF / Wraps / In-Shop Detailing render as standard cards.
- **VIP Showroom card uses `md:col-span-2 lg:col-span-2`** so it takes the full row at md (avoids an empty cell) and visually dominates at lg. Carries a gold **"Top Tier"** badge.
- Headline: "**Five** ways to elevate."
- Remove the standalone VIP feature section (no double promotion).

### 7. Booking form (`src/routes/book.tsx`)
- Required **Vehicle Condition**: Excellent / Good / Fair / Heavy Use.
- Required **Preferred Time**: 9 AM, 10, 11, 12, 1, 2, 3, 4 PM.
  - *Known gap (not solved here):* late slots can run past close. Derek confirms manually; GHL workflow handles in Phase 3.
- Optional **How did you hear about us**: Google, Instagram, Referral, Drove By, Returning Customer, Other.
- **Block Sundays** via Zod refinement (`new Date(value).getDay() !== 0`) with message "We're closed Sundays — please pick another day." Helper text under the date field: "Closed Sundays."

### 8. "We also do" — home page band
Compact section between Manifesto and Services. Inline pills, no links.
> Paintless Dent Removal · Powder Coating · Headlight Restoration · Ozone Treatment · Engine Bay Detail · Leather Conditioning

(Chrome Delete intentionally omitted — pending client confirmation.)

### 9. Email marked TBD
In `Footer.tsx` and `book.tsx` aside, append small muted tag next to `info@topeliteauto.com`: **"(TBD — pending confirmation)"**.

### Files touched
- `src/routes/index.tsx`
- `src/routes/vip-showroom.tsx`
- `src/routes/reviews.tsx`
- `src/routes/detailing.tsx`
- `src/routes/ceramic-coating.tsx`
- `src/routes/paint-protection.tsx`
- `src/routes/car-wraps.tsx`
- `src/routes/book.tsx`
- `src/components/site/ServicePage.tsx` (only the `pricing` prop)
- `src/components/site/Footer.tsx`

No new dependencies. No schema changes.
