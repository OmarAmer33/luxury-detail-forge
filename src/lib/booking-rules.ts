// Shared booking rules — imported by both the /book form and the booking API
// route so client and server validation can never disagree. Browser-safe.

export const weekdayTimes = [
  "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
];
export const saturdayTimes = [
  "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
];

export const SHOP_TZ = "America/New_York";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Current calendar date in the shop's timezone, as YYYY-MM-DD. */
export function todayInShopTz(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SHOP_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Minutes since midnight in the shop's timezone. */
export function minutesNowInShopTz(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** Day of week (0=Sun) for a YYYY-MM-DD string, timezone-independent. -1 if invalid. */
export function weekdayOf(v: string): number {
  if (!DATE_RE.test(v)) return -1;
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return -1;
  return dt.getUTCDay();
}

export function timesForDay(day: number): string[] {
  return day === 0 || day < 0 ? [] : day === 6 ? saturdayTimes : weekdayTimes;
}

function addDays(v: string, n: number): string {
  const [y, m, d] = v.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Whole calendar days from a to b (both YYYY-MM-DD). */
function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

// ---- Minimum notice --------------------------------------------------------
/** The CRM calendar requires 4 hours notice; the form offers exactly that. */
export const MIN_NOTICE_MINUTES = 240;
/** Server-only slack so a slot chosen a few minutes ago isn't bounced on submit. */
export const SERVER_GRACE_MINUTES = 15;

/** "2:30 PM" -> 870 minutes since midnight. NaN if unparseable. */
export function slotMinutes(t: string): number {
  const m = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(t);
  if (!m) return NaN;
  const h = (Number(m[1]) % 12) + (m[3] === "PM" ? 12 : 0);
  return h * 60 + Number(m[2]);
}

/** Minutes from `now` until `time` on `date`, both in shop wall-clock terms. */
export function minutesUntil(date: string, time: string, now: Date = new Date()): number {
  return dayDiff(todayInShopTz(now), date) * 1440 + slotMinutes(time) - minutesNowInShopTz(now);
}

/** Slots for a date that are at least `noticeMin` away. Past dates and Sundays -> []. */
export function timesFor(
  date: string,
  now: Date = new Date(),
  noticeMin: number = MIN_NOTICE_MINUTES,
): string[] {
  const day = weekdayOf(date);
  if (day <= 0) return [];
  if (dayDiff(todayInShopTz(now), date) < 0) return [];
  return timesForDay(day).filter((t) => minutesUntil(date, t, now) >= noticeMin);
}

/**
 * Next `span` calendar days from today (shop tz), Sundays removed. A day is
 * dropped when no slot on it meets the minimum notice.
 */
export function openDays(span = 21, now: Date = new Date()): string[] {
  const today = todayInShopTz(now);
  const out: string[] = [];
  for (let i = 0; i < span; i++) {
    const v = addDays(today, i);
    if (timesFor(v, now).length > 0) out.push(v);
  }
  return out;
}

export const SUNDAY_MSG = "We're closed Sundays — please pick another day.";
export const SATURDAY_MSG = "Saturdays we close at 1pm — please pick a morning slot.";
export const PAST_DATE_MSG = "That date has passed — please pick another day.";
export const NOTICE_MSG = "That time is less than 4 hours away — please pick a later time or another day.";

type Issue = { path: "date" | "time"; message: string };

/**
 * Identical date/time rules used by both client and server schemas.
 * The server passes `MIN_NOTICE_MINUTES - SERVER_GRACE_MINUTES`.
 */
export function dateTimeIssues(
  date: string,
  time: string,
  now: Date = new Date(),
  noticeMin: number = MIN_NOTICE_MINUTES,
): Issue[] {
  if (!date) return [{ path: "date", message: "Pick a date" }];
  const day = weekdayOf(date);
  if (day === -1) return [{ path: "date", message: "Pick a date" }];
  if (day === 0) return [{ path: "date", message: SUNDAY_MSG }];
  if (dayDiff(todayInShopTz(now), date) < 0) return [{ path: "date", message: PAST_DATE_MSG }];
  if (!time) return [{ path: "time", message: "Pick a time" }];
  if (day === 6 && !saturdayTimes.includes(time)) return [{ path: "time", message: SATURDAY_MSG }];
  if (!timesForDay(day).includes(time)) return [{ path: "time", message: "Pick a time" }];
  if (minutesUntil(date, time, now) < noticeMin) return [{ path: "time", message: NOTICE_MSG }];
  return [];
}

// ---- Appointment length ----------------------------------------------------
/**
 * Published durations from the shop's pricing sheet. Only these four are known.
 * These feed the appointment TITLE only ("approx. 3 hrs"). They do NOT set the
 * calendar block length: the CRM calendar allows at most three duration
 * options and has one (30 min), so every appointment is created at
 * CALENDAR_BLOCK_MINUTES and the shop resizes it when confirming.
 */
export const SERVICE_DURATION_MINUTES: Record<string, number> = {
  "Full Detail": 180,
  "Interior Detail": 90,
  "Exterior Detail": 90,
  "VIP Detail (Top Tier)": 240,
};
/** Fallback for services with no published duration; titled "(duration TBD)". */
export const DEFAULT_DURATION_MINUTES = 30;
/** Every CRM appointment is this long, whatever the service (calendar's only option). */
export const CALENDAR_BLOCK_MINUTES = 30;

/** "Website request — Full Detail (approx. 3 hrs) — Jane Smith" */
export function appointmentTitle(service: string, name: string): string {
  const m = SERVICE_DURATION_MINUTES[service];
  const len = m ? `approx. ${m / 60} hrs` : "duration TBD";
  return `Website request — ${service} (${len}) — ${name}`;
}

export function durationFor(service: string): { minutes: number; known: boolean } {
  const m = SERVICE_DURATION_MINUTES[service];
  return m ? { minutes: m, known: true } : { minutes: DEFAULT_DURATION_MINUTES, known: false };
}

// ---- Timestamps with the real New York offset ------------------------------
function offsetAt(instantMs: number): string {
  try {
    const name = new Intl.DateTimeFormat("en-US", { timeZone: SHOP_TZ, timeZoneName: "longOffset" })
      .formatToParts(new Date(instantMs))
      .find((p) => p.type === "timeZoneName")?.value;
    const m = /GMT([+-]\d{2}):?(\d{2})/.exec(name ?? "");
    if (m) return `${m[1]}:${m[2]}`;
  } catch {
    /* fall through */
  }
  // Fallback: compare the zone's wall clock with UTC for the same instant.
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: SHOP_TZ, hourCycle: "h23", year: "numeric", month: "2-digit",
      day: "2-digit", hour: "2-digit", minute: "2-digit",
    }).formatToParts(new Date(instantMs)).map((x) => [x.type, x.value]),
  );
  const wall = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  const diff = Math.round((wall - Math.floor(instantMs / 60000) * 60000) / 60000);
  const sign = diff < 0 ? "-" : "+";
  const a = Math.abs(diff);
  return `${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}

function offsetMinutes(off: string): number {
  const sign = off.startsWith("-") ? -1 : 1;
  const [h, m] = off.slice(1).split(":").map(Number);
  return sign * (h * 60 + m);
}

/** "2026-11-02", 570 -> "2026-11-02T09:30:00-05:00" (offset correct for that date). */
export function shopIso(date: string, minutes: number): string {
  const [y, mo, d] = date.split("-").map(Number);
  const wallMs = Date.UTC(y, mo - 1, d, 0, minutes);
  let off = offsetAt(wallMs + 5 * 3_600_000);
  off = offsetAt(wallMs - offsetMinutes(off) * 60_000);
  const local = new Date(wallMs).toISOString().slice(0, 19);
  return `${local}${off}`;
}
