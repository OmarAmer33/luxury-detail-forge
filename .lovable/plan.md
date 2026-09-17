# Booking form UX + root metadata fixes

## Files touched
- `src/routes/book.tsx` (Fix 1, Fix 2)
- `src/routes/__root.tsx` (Fix 3)

Nothing else. No API, schema, tracking, conversion, success-branch, honeypot, gclid, time-slot list, or styles.css alias changes.

## Fix 1 — Sunday submissions show only the date error

The time field currently has a hard `min(1)` check, so when Sunday empties the dropdown the empty time field adds a second "Pick a time" error.

Change the `time` field to:

```ts
time: z.string().optional().default(""),
```

Move the "required" time validation into the existing `superRefine` so it can be conditional on the date:

```ts
.superRefine((data, ctx) => {
  if (!data.date) return;
  const d = new Date(data.date + "T12:00:00");
  if (isNaN(d.getTime())) return;
  const day = d.getDay();

  // Time is required except on Sundays, where the date error is the real message.
  if (day !== 0 && !data.time) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["time"],
      message: "Pick a time",
    });
  }

  // Saturdays we close at 1pm — only morning slots from the Saturday list
  // are valid, even if the dropdown is bypassed.
  if (day === 6 && data.time && !saturdayTimes.includes(data.time)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["time"],
      message: "Saturdays we close at 1pm — please pick a morning slot.",
    });
  }
});
```

The Sunday date rule and its text remain unchanged. Weekday/Saturday time lists and Sunday empty-list behavior remain unchanged.

## Fix 2 — Distinguish focus from error on form inputs

In `src/routes/book.tsx`, the shared `fieldClass` currently uses the brand red for focus:

```ts
const fieldClass =
  "w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--color-gold)] focus:outline-none transition-colors";
```

Replace `focus:border-[var(--color-gold)]` with a neutral focus treatment:

```ts
const fieldClass =
  "w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/10 transition-colors";
```

The `--color-gold` alias in `src/styles.css` is left untouched. Only this component's focus state changes.

## Fix 3 — Remove leftover `twitter:site` tag

In `src/routes/__root.tsx`, remove this single entry from the `meta` array:

```ts
{ name: "twitter:site", content: "@Lovable" },
```

All other meta tags, the JSON-LD block, and the gtag script remain exactly as they are.

## Verification

- No booking form submission on any URL, preview or production — the form writes to the live lead database and fires real Google Ads/Analytics conversions.
- Code inspection only: confirm the Sunday-only date error path, the neutral focus class swap, and the removed `twitter:site` tag.
- `bun run build` passes.
