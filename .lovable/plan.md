# v4 — Content Edits + Resend Booking Email

## PART A — Content & pricing edits

**`src/routes/ceramic-coating.tsx`**
- Remove "Aftercare kit and wash instructions" from includes list.
- Pricing: 2-Year `$850 → $950`; 5-Year `$950 → $1,000`; Motorcycle `$300 → $350`.

**`src/routes/paint-protection.tsx`**
- Remove "Headlight and fog light protection" from includes.
- Replace any "computer-cut / pre-cut templates" language with hand-cut positioning: "flawless fit — no templates, no computer-cut patterns." Add "hand-cut as standard" to intro.

**`src/routes/detailing.tsx`**
- Elite Wash pricing: `$115 / $115 / $140 → $99 / $115 / $140`.

**`src/routes/vip-showroom.tsx`**
- Cars `$515 → $600`; SUVs `$665 → $750`.
- Update meta description and `og:description` to reflect new pricing.

**`src/routes/car-wraps.tsx`**
- Remove "Care kit and finish-specific wash instructions" from includes.

**`src/routes/reviews.tsx` + `src/routes/index.tsx`**
- Replace all 4 reviewer names (Sarah Mejia, Racsaida Morel, Diana Franco, Vincent Gonzalez) with `[ Reviewer name · pending content pull · Oct 2025 forward only ]`.

---

## PART B — Resend booking email integration

### New: `src/routes/api/public/send-booking-email.ts`

TanStack server route, `POST` handler. Same-origin, no CORS needed.

- **Zod schema** mirrors `book.tsx`:
  - Required: `name` (2–100), `phone` (7–30), `email` (valid, ≤255), `vehicle` (2–120), `condition`, `service`, `date`, `time`.
  - Optional: `hearAbout`, `notes` (≤1000).
  - Honeypot: `website` — `z.string().max(0).optional()`.
- **Honeypot**: if `website` is non-empty → return `{ success: true }` immediately, no send.
- **Resend call** via raw `fetch` to `https://api.resend.com/emails`:
  - `Authorization: Bearer ${process.env.RESEND_API_KEY}` (read inside handler).
  - `from: "Top Elite Auto <bookings@mail.topeliteauto.com>"`
  - `to: ["topeliteauto01@gmail.com", "topeliteautomarketing@gmail.com"]`
  - `reply_to: <customer email>` (snake_case)
  - `subject: "New booking request — {service} — {name}"`
  - Plain-text body + HTML body with all submitted fields.
- **Response**: `{ success: true }` on 200 from Resend; `{ success: false, error: <message> }` on failure (forwarding Resend's `message`).
- No DB writes, no retry logic, no logging of PII beyond the email itself.

### `src/routes/book.tsx` edits

- Add hidden honeypot input: `<input name="website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position:'absolute', left:'-9999px' }} />`.
- Add `website: z.string().max(0).optional()` to schema.
- Replace `fetch("/api/booking", ...)` with `fetch("/api/public/send-booking-email", ...)`.
- Check response `success` flag; on `success: false` → set `status="error"` (existing fallback copy fires).
- Keep all existing fields, validation, dropdowns, Sunday block, success state.

### Secret

Request `RESEND_API_KEY` via `secrets--add_secret` once we're in build mode. User is handling domain verification for `mail.topeliteauto.com` in parallel.

---

## Files touched

`ceramic-coating.tsx`, `paint-protection.tsx`, `detailing.tsx`, `vip-showroom.tsx`, `car-wraps.tsx`, `index.tsx`, `reviews.tsx`, `book.tsx`, **new** `src/routes/api/public/send-booking-email.ts`.

## Out of scope

GHL integration, DB storage of submissions, form analytics, design system changes, structural/layout changes.
