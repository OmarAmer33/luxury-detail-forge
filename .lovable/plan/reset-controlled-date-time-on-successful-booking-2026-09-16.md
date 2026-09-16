# Reset controlled date/time on successful booking

Add two state resets to the success branch in `src/routes/book.tsx` so that clicking "Submit another" fully clears the form.

## Change

**File:** `src/routes/book.tsx`

In the success branch of `handleSubmit`, after `form.reset();`, add:

```tsx
setDate("");
setTime("");
```

No other code is changed.

## What is preserved

- `gtag` conversion event position and content
- `trackLeadSubmit()` position
- `setStatus("success")` position
- Zod schema, Saturday rule, Sunday rule
- Time slot lists and date-aware filtering logic
- `src/routes/api/public/send-booking-email.ts` untouched
- Honeypot and gclid input untouched

## Verification

1. `bun run build` passes.
2. Playwright or browser check: submit a valid booking, click "Submit another", confirm date and time fields are blank while other fields are also blank.
