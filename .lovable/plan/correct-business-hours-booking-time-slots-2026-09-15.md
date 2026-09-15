# Correct business hours + booking time slots

Update the displayed hours everywhere and make the booking form's time dropdown match the real schedule. No schema, email, tracking, honeypot, pricing, or service-page changes.

## Part 1 — Hours text (4 places)

**1. `src/components/site/Footer.tsx` (line ~37)**

Replace `Mon–Sat · 9am–6pm` with:

```
Mon–Fri · 9:30am – 4:30pm
Sat · 9:30am – 1pm
```

(two lines, using a `<br/>` — the footer address block already stacks content this way.)

**2. `src/routes/book.tsx` (line ~292, contact sidebar)**

Replace `Mon – Sat · 9am – 6pm` with:

```
Mon–Fri · 9:30am – 4:30pm
Sat · 9:30am – 1pm
```

(two lines via `<br/>`.)

**3. `src/routes/index.tsx` (line ~96, hero stat grid)**

Chosen approach: keep the single stat so the three-column grid stays intact:

- Big line: `Mon–Sat`
- Caption: `9:30am – 4:30pm · Sat till 1pm`

This is the fallback option from the brief — both full lines will not fit the small caption style legibly, and this reads correctly in the layout.

**4. `src/routes/__root.tsx` — JSON-LD `openingHoursSpecification`**

Replace the single Mon–Sat 09:00–18:00 entry with exactly:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:30",
    "closes": "16:30"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday"],
    "opens": "09:30",
    "closes": "13:00"
  }
]
```

No Sunday entry (omitted = closed, per schema.org). No other JSON-LD change.

## Part 2 — Booking time slots (`src/routes/book.tsx` only)

**Replace the `times` array** with two lists:

```text
Weekdays: 9:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM, 12:00 PM,
          12:30 PM, 1:00 PM, 1:30 PM, 2:00 PM, 2:30 PM
Saturday: 9:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM
```

**Date-aware dropdown filtering:**

- Track the selected date and time in state (the form is currently uncontrolled; date/time become controlled inputs — no other fields change).
- No date → weekday list; weekday → weekday list; Saturday → Saturday list; Sunday → existing Sunday validation handles it, unchanged.
- When the date changes and the currently selected time is not in the new day's list, reset the time to empty (re-show "Select a time"). Prevents the weekday-2:00 PM → Saturday silent-submit case.

**Zod validation (additive only):**

Add a `superRefine` on the schema: if `date` is a Saturday and `time` parses later than 11:30 AM, issue an error on `time`:

> "Saturdays we close at 1pm — please pick a morning slot."

Time parsing compares against the known slot list, not free-form times, so it only fires for values outside the Saturday list. All existing schema fields (Sunday refine, honeypot, gclid, etc.) stay byte-identical.

## Explicitly not changed

- Sunday validation logic or message
- `_hp_url_check` honeypot, gclid hidden input, gclid capture
- Conversion / `generate_lead` events, success branch
- `src/routes/api/public/send-booking-email.ts` — untouched
- Pricing, service pages, `ServicePage`
- No npm packages

## Verification

1. `bun run build` passes.
2. Playwright on `/book`: no date → 11 weekday slots; pick a Saturday → 5 slots; select 2:00 PM on a weekday then switch to Saturday → time clears; bypass dropdown (set value via JS) with a Saturday + 2:00 PM → submission blocked with the exact Saturday message; Sunday still shows the existing Sunday error.
3. Visual check of footer, book sidebar, and home hero stat block.
