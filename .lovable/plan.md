# v8 — Booking submissions database (additive only)

The booking email flow stays byte-for-byte identical. This adds a database write alongside it.

## 0. Enable Lovable Cloud

This project has no backend connected yet. First step: enable Lovable Cloud (provisions the Postgres database). No other backend work.

## 1. Table: `public.booking_submissions` (migration)

```sql
create table public.booking_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  email         text not null,
  vehicle       text not null,
  condition     text not null,
  service       text not null,
  preferred_date text not null,
  preferred_time text not null,
  hear_about    text,
  notes         text,
  status        text not null default 'new'
                check (status in ('new','quoted','booked','closed')),
  source        text
);
```

- `status` default `'new'`, CHECK constraint limits to the four allowed values.
- `preferred_date` / `preferred_time` are plain `text` — stored exactly as submitted, no parsing.
- `source` nullable, left null for now.

## 2. Security (RLS + grants)

- `alter table public.booking_submissions enable row level security;`
- **No anon or authenticated grants at all.** The browser role never touches this table: no `GRANT ... TO anon`, no `GRANT ... TO authenticated`.
- Only `GRANT ALL ON public.booking_submissions TO service_role;` — the server route writes with the service-role client, which bypasses RLS.
- No SELECT/UPDATE/DELETE policies for any role. No client-side query, hook, or generated type usage in the frontend.

## 3. Server route edit — `src/routes/api/public/send-booking-email.ts` only

Insert goes **after** the honeypot early-return block, **before** the `const apiKey = process.env.RESEND_API_KEY` lookup:

```text
POST handler
├── parse JSON (400 on failure)
├── zod validation (400 on failure)
├── honeypot check → silent { success: true } return   [unchanged]
├── NEW: database insert, wrapped in its own try/catch
│        - load supabaseAdmin via await import('@/integrations/supabase/client.server')
│        - insert one row: name, phone, email, vehicle, condition, service,
│          date → preferred_date, time → preferred_time,
│          hearAbout → hear_about, notes → notes
│        - status defaults to 'new', source omitted (null)
│        - _hp_url_check never written
│        - on throw: console.error(...) and continue — response unchanged
├── RESEND_API_KEY lookup (500 if missing)               [unchanged]
├── build text/html bodies                               [unchanged]
├── raw fetch to api.resend.com with reply_to            [unchanged]
└── identical status codes / JSON responses              [unchanged]
```

Non-negotiables honored: honeypot untouched and named `_hp_url_check`; `process.env.RESEND_API_KEY` stays inside the handler; raw `fetch()` to Resend (no SDK); `reply_to` unchanged; zod schema, email bodies, recipient, and all status codes unchanged; no other file modified (`book.tsx` untouched).

## Out of scope

- Populating `source`, any status transitions, any UI for viewing submissions, email behavior changes, RLS read policies for an admin view.

## Files touched

- New migration (table + grant + RLS enable)
- `src/routes/api/public/send-booking-email.ts` (the only code edit)
