# v8 — Booking submissions database (additive only)

The booking email flow stays byte-for-byte identical. This adds a database write alongside it.

## 0. Enable Lovable Cloud

This project has no backend connected yet (`src/integrations/` does not exist). Enabling Cloud provisions the Postgres database and scaffolds the integration files listed below.

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

- `preferred_date` / `preferred_time` are plain `text` — stored exactly as submitted, no parsing.
- `source` nullable, left null.

## 2. Security (RLS + grants)

- `alter table public.booking_submissions enable row level security;`
- **No grants to `anon` or `authenticated` at all.** The browser roles cannot select, insert, update, or delete.
- `grant all on public.booking_submissions to service_role;` only.
- No RLS policies of any kind — with no policies and no grants, every non-service-role request is denied. The server route writes with the service-role client, which bypasses RLS.
- No client-side query, hook, or component reads this table.

## 3. Service-role key safety (explicit confirmations)

**a. Env var and read location.** The key is `SUPABASE_SERVICE_ROLE_KEY` (paired with `SUPABASE_URL`). It is never read at module scope. The admin client is loaded *inside* the POST handler with `const { supabaseAdmin } = await import("@/integrations/supabase/client.server");` — same constraint that keeps `process.env.RESEND_API_KEY` inside the handler. No `SUPABASE_*` server var is referenced anywhere in this file's top-level scope.

**b. Server-only boundary.** `client.server.ts` is blocked from client bundles by its `.server.ts` filename — the bundler hard-fails any client-reachable import of it. It will be imported from exactly one place: the dynamic `await import(...)` inside the POST handler of `src/routes/api/public/send-booking-email.ts`. Nothing under `src/components/`, no `src/routes/*.tsx`, and no shared helper will import it directly or transitively.

**c. Browser-side files Cloud generates.** Yes — enabling Cloud scaffolds a browser client (`client.ts`, publishable/anon key, safe to ship) and generated TypeScript types (`types.ts`, type-only, no secrets). Both will appear in the diff. The browser client is harmless here precisely because `anon` has zero grants on `booking_submissions`. Neither file will be wired into any component in this change.

**d. Verification after build.** Run a production build and grep the emitted client assets for the secret's env name and value shape:

```bash
bun run build
rg -l "SUPABASE_SERVICE_ROLE_KEY|sb_secret_|service_role" dist/client/ || echo "clean"
```

Expected result: no matches in `dist/client/`. Matches in the server/worker bundle are expected and correct. I will report the grep output.

## 4. Server route edit — `src/routes/api/public/send-booking-email.ts` only

Insert goes **after** the honeypot early-return block, **before** the `const apiKey = process.env.RESEND_API_KEY` lookup:

```text
POST handler
├── parse JSON (400 on failure)                          [unchanged]
├── zod validation (400 on failure)                      [unchanged]
├── honeypot check → silent { success: true } return     [unchanged]
├── NEW: try { await import client.server; insert row } catch { console.error }
│        name, phone, email, vehicle, condition, service,
│        date → preferred_date, time → preferred_time,
│        hearAbout → hear_about, notes → notes
│        status defaults to 'new', source omitted (null)
│        _hp_url_check never written
│        on throw: log and continue — HTTP response identical either way
├── const apiKey = process.env.RESEND_API_KEY (500 if missing)  [unchanged]
├── text/html bodies                                     [unchanged]
├── raw fetch to api.resend.com, reply_to snake_case     [unchanged]
└── identical status codes / JSON responses              [unchanged]
```

Non-negotiables honored: honeypot untouched and still named `_hp_url_check`; `process.env.RESEND_API_KEY` stays inside the handler; raw `fetch()` to Resend, no SDK; `reply_to` unchanged; zod schema, email bodies, recipient, and all status codes unchanged; `book.tsx` untouched.

## 5. Complete file list — created or modified

**Modified (one file, the only code edit):**
- `src/routes/api/public/send-booking-email.ts`

**Created by me:**
- One SQL migration (table + grants + RLS enable)

**Created automatically by enabling Lovable Cloud** (exact set is scaffolded by the integration, expected contents):
- `src/integrations/supabase/client.ts` — browser client, publishable/anon key
- `src/integrations/supabase/client.server.ts` — service-role admin client, server-only
- `src/integrations/supabase/types.ts` — generated database types
- `src/integrations/supabase/auth-middleware.ts` and `auth-attacher.ts` — auth helpers (scaffolded even though unused here)
- `supabase/config.toml` — project config
- `package.json` / lockfile — `@supabase/supabase-js` dependency added
- Environment variables registered (not committed as plaintext secrets): `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, plus `VITE_` counterparts for the browser client

If the scaffold emits anything beyond this list, I will report it rather than let it pass silently. I will not wire any generated file into a component.

## Out of scope

Populating `source`, status transitions, any admin UI for viewing submissions, email behavior changes, any change to `book.tsx` or other files.
