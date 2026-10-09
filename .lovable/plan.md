# Booking form: in-page date picker, local "today", matching time rules

## Files that change
- `src/lib/booking-rules.ts` (new): one shared set of rules imported by both the form and the server route. Contains the time slot lists, the "today in America/New_York" helper, the weekday-from-`YYYY-MM-DD` helper, and the date/time validation rules.
- `src/components/site/DateChips.tsx` (new): the date picker.
- `src/routes/book.tsx`: use the shared rules and the new picker.
- `src/routes/api/public/send-booking-email.ts`: change only the Zod `date`/`time` rules. The honeypot, insert, gclid/source, Resend call, recipient, reply_to and email body stay as they are.

No new npm dependency.

## 1. Date picker (I agree with the chip approach)
- Shows the next 21 open days starting from today in New York. Sundays are left out, so you get about 18 chips.
- Each chip has two lines: "THU" in the small uppercase tracking style the form already uses, and "Oct 16" below it. Chips are at least 48px tall with square corners, a `border-border` border and a transparent background, like the other fields.
- The selected chip uses a gold fill with `--color-primary-foreground` text, matching the Send button. It also gets `aria-pressed="true"`.
- Layout is a wrapped grid: 3 columns on mobile, 6 from `md`. I chose wrapping over a horizontal scroller because sideways scrolling inside the Instagram browser often fights with its swipe-back gesture, and some chips would be hidden off screen.
- Chips are `<button type="button">` elements inside a `role="group"` labelled "Preferred date". Using `type="button"` means a tap can never submit the form.
- The value is posted through `<input type="hidden" name="date" value={date}>` in the same `YYYY-MM-DD` format. `FormData`, both Zod schemas and the database stay the same.
- I'll drop the "Closed Sundays." helper text and use "Closed Sundays · showing the next 3 weeks" instead. That also tells visitors why they can't see dates further out. Anyone wanting a later date can say so in Notes or call.
- The chips are generated on the client after the page loads. Until then the area shows a quiet placeholder that is the same height. This stops the server's clock or timezone from deciding what "today" is, and it prevents a mismatch between the server-built page and the phone's version around midnight.

## 2. Local-time "today"
- `todayInNY()` uses `Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" })`, which returns `YYYY-MM-DD` directly. Workers and every target browser support it.
- The weekday is worked out from the `YYYY-MM-DD` parts using UTC. This replaces `new Date(v + "T12:00:00").getDay()`, which depends on the phone's own timezone. The result is the same on the client and the server everywhere.
- The `min=` attribute and its `toISOString()` call are removed completely. No other place in the form or route works out a current date.
- **Decision for you: same-day booking.** On a weekday after 2:30 PM New York time, or a Saturday after 11:30 AM, "today" has no start times left. I suggest leaving today out of the chips at that point. As written, the plan does **not** remove individual past slots from today's time list. That would change your slot logic, so tell me if you want it.

## 3. One time requirement on both sides
These shared rules apply in both schemas:
- `date`: must match `^\d{4}-\d{2}-\d{2}$`, must be a real calendar date, and must not be a Sunday (same message as now).
- `time`: required ("Pick a time") whenever the date is valid and not a Sunday.
- On Saturdays, `time` must be in `saturdayTimes`. On weekdays it must be in `weekdayTimes`.

The server keeps `time: z.string().max(20)` and applies the same `superRefine`. A Sunday date fails on the date alone, so neither side ever shows a second time error. On the server, any failure is still a 400, but valid input from the new form can no longer produce one. The client message behaviour stays exactly as it is now.

## Gaps I found in the brief
- **Why Android fails.** On Android WebView, including the Instagram and Facebook in-app browsers, the native date dialog only works if the app hosting the browser supports it. Many in-app browsers don't, so tapping the field does nothing and you just see "mm/dd/yyyy". Your reading is correct, and the chips avoid the problem completely.
- **Another source of trouble.** `min` was set on the server using the server's own UTC clock, so the server-built page and the phone could disagree. Removing it fixes that too.
- **Jump-to-error would break.** On a failed submit, the form scrolls to `[name="date"]`. A hidden input can't be scrolled to or focused, so I'll make the date error point at the chip group instead (with `tabIndex=-1`).
- **Stale choices.** If someone leaves the page open past midnight, a chip they picked could be in the past. The server rule doesn't reject past dates, to avoid failing real leads, so this is harmless. Tell me if you'd rather reject them.
- **Two forms for date and time.** Picking a chip clears the date error and clears a time that doesn't fit the new day, as `handleDateChange` does now. "Submit another" already resets the date with `setDate("")`.

## Effect on attribution and conversion tracking
None expected. The gclid hidden input and its sessionStorage read, the honeypot, `gtag` conversion `AW-10789482788/J-mTCMjO4fccEKTi6Zgo`, `trackLeadSubmit()`, the success flow, the insert and the Resend call are all untouched. The only server change is stricter checking of `date`/`time`, and the new form always meets it.

## Checking the work (no form submission)
- Read the code and confirm the build passes.
- Unit-test `booking-rules.ts` with `bunx vitest`: today in NY at 23:30 UTC vs 01:00 UTC, weekday from a date string, Sunday rejected, Saturday afternoon slot rejected, empty time rejected on a weekday.
- A Playwright visit to /book with an Android user agent and a 390px screen: take a screenshot, tap a chip, and check the hidden input value and the time list. **Never press Send** and make no POST requests. The script will block `/api/public/send-booking-email` at the network level as a safeguard.
