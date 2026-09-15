# Google Ads click-ID capture + phone/lead tracking

Three additive changes. No existing behavior changes: email body, honeypot, Resend fetch, insert position, and the existing booking conversion event all stay exactly as they are.

## The gclid flow

```text
Ad click  →  /detailing?gclid=ABC123
                 │
                 ▼
  __root.tsx RootComponent effect (runs on every route change)
    reads window.location.search → "gclid"
    if non-empty: sessionStorage.setItem("tea_gclid", value)   [try/catch]
                 │
                 ▼
  user navigates to /book (value survives, same tab)
                 │
                 ▼
  book.tsx handleSubmit, before validation:
    hidden input name="gclid".value = sessionStorage.getItem("tea_gclid") ?? ""
                 │
                 ▼
  FormData → client zod schema (gclid: z.string().optional().default(""))
    ← without this line the field is dropped, since the POST body is parsed.data
                 │
                 ▼
  POST /api/public/send-booking-email  (JSON body includes gclid)
                 │
                 ▼
  server zod (gclid: z.string().max(200).optional().default(""))
                 │
                 ▼
  supabaseAdmin.insert({ ..., gclid: d.gclid || null,
                              source: d.gclid ? "google-ads" : null })
                 │
                 ▼
  public.booking_submissions.gclid  (text, nullable)
```

The email body never sees gclid or source.

## Part 1 — capture (src/routes/__root.tsx)

In `RootComponent`, add a `useEffect` keyed on the router's current location:

- guard `typeof window === "undefined"` → return
- `new URLSearchParams(window.location.search).get("gclid")`
- if present and non-empty after trim, `sessionStorage.setItem("tea_gclid", value)`
- never write an empty value, so an existing stored id is never clobbered
- whole body in `try { } catch { }`

The gtag loader scripts and JSON-LD in `RootShell` are untouched.

## Part 2 — persist

Migration (additive only):

```sql
ALTER TABLE public.booking_submissions ADD COLUMN gclid text;
```

No other column, RLS, policy, or grant is changed.

`src/routes/book.tsx`:
- hidden input `<input type="hidden" name="gclid" />` next to the honeypot input
- `gclid: z.string().optional().default("")` added to the client schema
- at the top of `handleSubmit`, before `new FormData(form)`, set that input's value from `sessionStorage.getItem("tea_gclid")`, inside try/catch, defaulting to `""`

`src/routes/api/public/send-booking-email.ts`:
- `gclid: z.string().max(200).optional().default("")` in the server schema
- inside the existing insert object add `gclid: d.gclid || null` and `source: d.gclid ? "google-ads" : null`
- nothing else in the handler moves: honeypot check, insert placement, try/catch isolation, `RESEND_API_KEY` read, `reply_to`, raw fetch, and both text and HTML email bodies stay identical

## Part 3 — phone + lead events

New file `src/lib/tracking.ts`:

```ts
export function trackPhoneClick(): void { /* guarded gtag conversion + contact */ }
export function trackLeadSubmit(): void { /* guarded generate_lead */ }
```

Both use the same guard as the existing call (`typeof window !== "undefined" && typeof (window as any).gtag === "function"`), wrap the gtag calls in try/catch, and return void.

Wired to `onClick` on all six `tel:9082933934` links:

| File | Links |
|---|---|
| src/components/site/Nav.tsx | 2 (desktop header, mobile menu) |
| src/components/site/Footer.tsx | 1 |
| src/components/site/CtaSection.tsx | 1 |
| src/routes/book.tsx | 1 (sidebar) |
| src/routes/faq.tsx | 1 |

Each handler only fires the event — no `preventDefault`, no `window.location`, no `event_callback`, no `gtag_report_conversion`. The browser handles the tel: link natively.

In `book.tsx`, `trackLeadSubmit()` is called immediately after the existing `AW-10789482788/J-mTCMjO4fccEKTi6Zgo` conversion event and before `setStatus("success")`.

## Files touched

- migration: add `gclid` column
- `src/routes/__root.tsx`
- `src/routes/book.tsx`
- `src/routes/api/public/send-booking-email.ts`
- `src/lib/tracking.ts` (new)
- `src/components/site/Nav.tsx`, `Footer.tsx`, `CtaSection.tsx`, `src/routes/faq.tsx` (onClick only)

No npm installs. No service page, pricing matrix, or ServicePage changes.

## Verification

1. `bun run build` passes.
2. Load `/detailing?gclid=TESTVALUE`, navigate to `/book`, confirm the hidden input carries the value at submit time.
3. Submit with a mocked endpoint and confirm the POST body contains `gclid`, and that the gtag calls fired are: existing conversion, `generate_lead`, in that order.
4. Confirm a submission without a gclid still posts `gclid: ""` and results in `gclid` and `source` NULL.
5. Click a phone link in a desktop browser and confirm no navigation is intercepted and no console error.
