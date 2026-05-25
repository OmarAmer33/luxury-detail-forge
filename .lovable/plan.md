## Fix: Honeypot autofill failure + illegible dropdown options

### Bug 1 — Honeypot field triggers browser autofill, silent submission failure
Chrome/Safari autofill the hidden `name="website"` input. Client Zod (`.max(0)`) rejects it, `errs.website` is set with no renderer, `scrollIntoView` jumps to the off-screen hidden input → user sees a scroll and nothing else.

### Bug 2 — `<select>` options render white-on-white
Options inherit `color: white` from the select on the dark form surface; OS-default option background is also white. Options are only visible on hover. Affects Vehicle Condition, Service, Preferred Time, How did you hear about us.

### Changes

**1. `src/routes/book.tsx`**
- Rename honeypot: `name="website"` → `name="_hp_url_check"` on the `<input>` and in the Zod schema key.
- Add `data-lpignore="true"` and `data-1p-ignore` attributes (password-manager defense).
- Relax client Zod: `_hp_url_check: z.string().optional()` (drop `.max(0)`). Server decides spam.

**2. `src/routes/api/public/send-booking-email.ts`**
- Rename schema field `website` → `_hp_url_check`, change to `z.string().optional().default("")` (drop `.max(0)` so the explicit honeypot check actually runs instead of failing at parse time).
- Update honeypot check: `if (d._hp_url_check && d._hp_url_check.length > 0) return Response.json({ success: true });` — bots get a fake 200 indistinguishable from real submissions.

**3. `src/styles.css`**
- Add scoped rule so options are legible inside the booking form's dark surface:
  ```css
  .surface-dark select option {
    color: #0A0A0A;
    background-color: #FFFFFF;
  }
  ```
- Verify in `book.tsx` that `.surface-dark` is the actual wrapping class (it is, per current source); if not, scope to whatever container class is in use.

### Verification after build
- Chrome (non-incognito) `/book`: fill form → submit → success state renders, POST returns 200.
- Bot submission with `_hp_url_check` filled → server returns silent `{ success: true }`, no email sent.
- All four selects: open dropdown in Chrome and Safari → options are dark text on white background, readable without hover. Note: macOS Safari may use OS-native dropdowns that ignore styling — accepted limitation.

### Out of scope
No other validation, UI, copy, or component changes.