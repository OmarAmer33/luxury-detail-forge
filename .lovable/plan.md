# Booking form + homepage: three small fixes

## Files touched
- `src/routes/book.tsx` (Fix 1, Fix 2)
- `src/routes/index.tsx` (Fix 3)

Nothing else. No API, schema, honeypot, gclid, tracking, success-branch, slot-list, pricing, or package changes.

## Fix 1 — Sunday empties the time dropdown

In `book.tsx`, the day-aware filtering currently is:

```ts
const availableTimes = day === 6 ? saturdayTimes : weekdayTimes;
```

Change to:

```ts
const availableTimes = day === 0 ? [] : day === 6 ? saturdayTimes : weekdayTimes;
```

A Sunday date (`day === 0`) yields an empty list, so only the disabled "Select a time" placeholder remains. The same `day === 0` guard is added in `handleDateChange`'s `nextTimes` computation so a held selection is cleared when switching to Sunday. The Sunday zod rule and its message ("We're closed Sundays — please pick another day.") are untouched; the weekday and Saturday lists are untouched.

## Fix 2 — Clear a field's error as soon as its value changes

Add one helper inside `Book()`:

```ts
function clearError(field: string) {
  setErrors((prev) => {
    if (!prev[field]) return prev;
    const next = { ...prev };
    delete next[field];
    return next;
  });
}
```

Wire it into every validated field's change handler:

- `name`, `phone`, `email`, `vehicle` (uncontrolled inputs): add `onChange={() => clearError("name")}` (etc.) to each input.
- `condition`, `service` (uncontrolled selects): add `onChange={() => clearError("condition")}` / `clearError("service")`.
- `date`: call `clearError("date")` at the top of the existing `handleDateChange` (which otherwise stays as-is, plus the Fix 1 Sunday guard).
- `time`: extend the existing onChange to `onChange={(e) => { setTime(e.target.value); clearError("time"); }}`.
- `notes`: add `onChange={() => clearError("notes")}`.

No validation rule, error message, or validation timing changes — only when errors are dismissed. `setErrors({})` at the top of `handleSubmit` and the error-setting on failed parse stay exactly as they are.

## Fix 3 — Homepage hero stat

In `index.tsx` line ~94, replace:

```ts
["5.0★", "Google Rated"],
```

with:

```ts
["4.9★", "193 Google Reviews"],
```

The other two stat entries, layout, styling, and three-column grid are unchanged.

## Verification
- No form submission on any URL, preview or production — the form writes to the live lead database and fires real Google Ads/Analytics conversions. The user will test the form manually.
- `bun run build` passes.
- Code inspection only: confirm the Sunday empty-list guard, the `clearError` wiring on every validated field, and the updated homepage stat.
