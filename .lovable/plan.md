# v3 — Color System Update (Light + Red)

Pure design token swap. No copy, structure, route, or layout changes.

## 1. Token rewrite — `src/styles.css`

Flip `:root` to a light-mode palette and rename gold → red, onyx → section-dark. Remove the `dark` class from `<html>` in `__root.tsx` so the light tokens apply by default.

New token values:

```
--background:        #FFFFFF
--foreground:        #0A0A0A
--section-dark:      #0A0A0A   (was --onyx)
--section-dark-fg:   #FFFFFF
--card:              #FFFFFF
--popover:           #FFFFFF
--primary:           #B91C1C   (was gold)
--primary-foreground:#FFFFFF
--red:               #B91C1C   (replaces --gold)
--red-soft:          #DC2626   (replaces --gold-soft)
--secondary:         #F5F5F5
--muted:             #F5F5F5
--muted-foreground:  #6B6B6B
--accent:            #B91C1C
--accent-foreground: #FFFFFF
--border:            #E5E5E5
--border-dark:       #2A2A2A
--input:             #E5E5E5
--ring:              #B91C1C
--star-gold:         #FCB424
```

Temporarily alias `--color-gold` → `--color-red` and `--color-onyx` → `--color-section-dark` so component classes keep working during the rename. Rename `.gold-underline` → `.red-underline` and keep the old class as an alias mid-rename.

## 2. Component renames (mechanical)

In every file using the tokens:

- `var(--color-gold)` → `var(--color-red)`
- `var(--color-gold-soft)` → `var(--color-red-soft)`
- `var(--color-onyx)` → `var(--color-section-dark)`
- `gold-underline` → `red-underline`

Semantics carry over: gold → red everywhere (eyebrows, CTAs, pricing numbers, accents); onyx → black accent bands.

## 3. Light default + intentional dark accent rhythm

`bg-background` becomes white (now the dominant page color). `bg-[var(--color-section-dark)]` becomes the intentional black accent bands.

Current usage already alternates well — keep existing onyx blocks as the dark accents (ServicePage features + process bands, CtaSection band, etc.). No structural changes.

**Dark-section text + border audit (required):**

Grep for `text-foreground`, `text-foreground/90`, and `border-border` inside any block whose container or ancestor uses `bg-[var(--color-onyx)]` / `bg-[var(--color-section-dark)]`. Override each:

- text → `text-white` (or `text-[var(--color-section-dark-fg)]`)
- border → `border-[var(--color-border-dark)]` or inline `border-[#2A2A2A]`

Highest-risk files:
- `ServicePage.tsx` — "Engineered to last" features band + "How we work" process band
- `CtaSection.tsx` — full dark band before footer
- `Footer.tsx` — entire dark surface
- `vip-showroom.tsx` — includes list and any dark-section content
- Audit `index.tsx`, `reviews.tsx`, `detailing.tsx` for any section-scoped overrides too

## 4. PageHero — keep hero text white over imagery

`src/components/site/PageHero.tsx` renders eyebrow / title / subtitle over a dark-image background. With the global `--foreground` flipping to near-black, inherited text would become unreadable on hero imagery.

Fix: explicitly force white on hero text regardless of global foreground.

- Title `<h1>` → add `text-white`
- Subtitle `<p>` → change `text-muted-foreground` to `text-white/80` (preserve the muted hierarchy without depending on the new light muted token)
- Eyebrow → already uses `text-[var(--color-red)]` after rename; verify the `::before` line still reads on dark imagery (red on dark hero is fine)

This single fix covers every service page hero (ceramic-coating, paint-protection, car-wraps, detailing, vip-showroom).

## 5. Footer

Footer stays dark. Force `bg-[var(--color-section-dark)]` and `text-white` (and white/70 for muted lines) explicitly — don't rely on global foreground.

## 6. Nav

Scrolled nav becomes white-blurred automatically via `bg-background/85`. Logo filter `invert(1) hue-rotate(180deg)` was designed for white-on-black; on the white nav it would render the logo black. **Remove the filter in `Nav.tsx`** so the native red car silhouette shows on white. **Keep the filter in `Footer.tsx`** so the logo stays light on the dark footer.

## 7. VIP "Top Tier" badge

In `index.tsx`, swap badge to red bg + white text.

## 8. Reviews stars

Star icons currently use `text-[var(--color-gold)]`. After step 2 they'd turn red. Change those star icons specifically to `text-[var(--color-star-gold)]` (#FCB424) to keep convention.

## 9. Cleanup

After visual verification, remove the temporary `--color-gold`, `--color-onyx`, and `.gold-underline` aliases from `styles.css`.

## Files touched

`src/styles.css`, `src/routes/__root.tsx`, `src/components/site/Nav.tsx`, `Footer.tsx`, `CtaSection.tsx`, `ServicePage.tsx`, `PageHero.tsx`, `src/routes/index.tsx`, `vip-showroom.tsx`, `detailing.tsx`, `reviews.tsx`, `book.tsx`, `ceramic-coating.tsx`, `paint-protection.tsx`, `car-wraps.tsx`.

## Out of scope

Typography, copy, layout, routes, pricing data, form fields, components, real reviewer names, placeholders.
