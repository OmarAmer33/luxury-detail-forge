# Booking flow: CRM appointment + time-aware slots

Two files change for logic (`src/lib/booking-rules.ts`, `src/routes/api/public/send-booking-email.ts`), one for wiring (`src/routes/book.tsx`), plus one small test file for the rules. No packages, no schema change, no change to honeypot, gclid, Supabase insert, Resend call, email body, or the Ads conversion.

## Problem 2 first (the appointment depends on it)

### Shared rules in `booking-rules.ts`
- `MIN_NOTICE_MINUTES = 240` (client) and `SERVER_GRACE_MINUTES = 15`. The server accepts a slot 225+ minutes away.
- `slotMinutes("2:30 PM") -> 870`, a small parser for the existing slot strings.
- `timesFor(date, now, noticeMin)`: the weekday list as today, minus slots on today's date (shop tz) that start less than `noticeMin` from now. Past dates return `[]`.
- `openDays()` drops a day when `timesFor` is empty for it. This replaces the current last-start check, so today disappears once nothing 4+ hours out remains.
- `dateTimeIssues(date, time, now = new Date(), noticeMin = MIN_NOTICE_MINUTES)` adds, in order after the existing Sunday check:
  - past date: "That date has passed — please pick another day."
  - slot inside the window: "That time is less than 4 hours away — please pick a later time or another day."
  - The existing Sunday, Saturday and "Pick a time" messages stay as they are.
- The server calls `dateTimeIssues(..., new Date(), MIN_NOTICE_MINUTES - SERVER_GRACE_MINUTES)`. The client uses the full 240.

**Why 15 minutes of grace and not more:** the CRM itself enforces 4 hours. Any grace we allow is a window where the server accepts a request the CRM will reject. That request still lands, through the fallback and flagged `booking-conflict`. 15 minutes covers a normal form fill and keeps those flagged requests rare. 30 minutes would also work if you'd rather never bounce a slow visitor.

### Hydration safety in `book.tsx`
- Add `const [now, setNow] = useState<Date | null>(null)`. Set it in `useEffect` on mount and refresh it every 60 seconds.
- `availableTimes = now && date ? timesFor(date, now, MIN_NOTICE_MINUTES) : []`. The server render and the first client render both see `[]` (`date` is also empty then), so they match.
- When a refresh removes the selected time, clear it, as the date-change handler already does.
- The submit-time schema check uses a fresh `new Date()`.

## Problem 1: appointment creation

### Order inside the existing CRM block
```text
upsert -> (contactId?) -> tag DELETE -> tag POST "website-booking"
       -> appointment (validation ON)
            rejected as a slot/validation error -> retry with bypass flags
                                                   -> tag POST "booking-conflict"
-> [block ends] -> Resend email -> response
```
The appointment goes **after** the website-booking tag on purpose. The tag starts the shop's workflow, so it stays the higher-priority call if time runs short. Tell me if your workflow reads appointment data and needs it to exist first.

### The call
`POST /calendars/events/appointment` with:
- `calendarId` `kvdrEOu2P9nDoZIlMR7j`, `locationId`, `contactId`
- `startTime` / `endTime` as ISO with the real offset
- `appointmentStatus: "new"`, `toNotify: false`
- title "Website request — {service} — {name}"

On the retry, add `ignoreFreeSlotValidation: true` and `ignoreDateRange: true`.

### (a) Slot validation: agree, with one refinement
Retry **only** when the first attempt returns a 4xx that isn't 401/403. Do not retry on a timeout, a 5xx or an auth error. Bypassing validation won't fix those, and a timed-out first call may actually have created the event, which would give you a duplicate. Auth and scope errors get their own log line so a missing calendar scope is obvious.

### (b) Duration: agree
`SERVICE_DURATION_MINUTES` lives in `booking-rules.ts` with only the four known values: Full Detail 180, Interior 90, Exterior 90, VIP 240. A documented `DEFAULT_DURATION_MINUTES = 30` placeholder covers everything else. When the default is used, the appointment title gets the suffix " (duration TBD)" so the shop can see the block is a placeholder. That is a label, not an invented number.

### (c) Offset without a library
`Intl.DateTimeFormat("en-US", { timeZone: SHOP_TZ, timeZoneName: "longOffset" })` gives "GMT-04:00" or "GMT-05:00" for a specific instant:
1. Guess the instant as the wall time plus 5 hours, in UTC.
2. Read the zone's offset at that instant.
3. Rebuild the instant with that offset and read the offset again.
4. Use the confirmed offset.

The second read handles the November 1 changeover. This works in Cloudflare Workers and modern browsers. If the format isn't supported, a fallback works out the offset by formatting the instant into its parts and comparing with UTC. Tests cover Oct 31 (-04:00), Nov 2 (-05:00) and Mar 9, 2027 (-04:00).

### (d) Time budget
Raise the overall CRM budget from 8 to **10 seconds** and keep the 4-second cap per call.

Before each appointment call, skip it if less than 1.5 seconds remain. The conflict tag is skipped the same way. Every skip is logged ("GHL appointment skipped: budget").

Worst case, the email starts within about 10 seconds. The usual case adds roughly 0.5–1 second.

## Verification (nothing goes through the live form)
- Unit tests for `booking-rules`: notice filter at 2:00 PM, today dropped, past date rejected, grace boundary (224 vs 225 minutes), the DST offsets, and duration lookup. These assume the project's test runner is available; nothing will be installed. If it's missing, the same checks run as a one-off script instead.
- Browser check at 390px with the booking endpoint blocked:
  - before the cutoff, today shows only slots 4+ hours away
  - after the cutoff, today has no chip
  - no hydration warnings
- Type check and build.
- **Live CRM check needs your approval first.** One appointment call, directly to the CRM (not through the site), for the existing test contact "ZZ API Shape Test":
  - a far-future date, `toNotify: false`, status `new`
  - then delete it with `DELETE /calendars/events/{id}`
  - this confirms the field names and that the token has calendar write scope

## Assumptions to confirm
1. The CRM field names (`appointmentStatus`, `toNotify`, `ignoreFreeSlotValidation`, `ignoreDateRange`) come from the public v2 API and aren't yet verified against your account. The live check above confirms them.
2. The private integration token may need the calendars/events write scope added. If it lacks it, the appointment fails quietly and the email is unaffected.
3. The 3-per-day cap and the 4-hour notice are both "slot" rejections, so the fallback covers them.
4. Appointment titles and the "(duration TBD)" suffix are my wording. Change them freely.
