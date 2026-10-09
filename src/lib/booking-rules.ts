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

/** Latest start (minutes) for a day: weekday 2:30 PM, Saturday 11:30 AM. */
function lastStartMinutes(day: number): number {
  return day === 6 ? 11 * 60 + 30 : 14 * 60 + 30;
}

/**
 * Next `span` calendar days from today (shop tz), Sundays removed. Today is
 * dropped once its last appointment start has passed.
 */
export function openDays(span = 21, now: Date = new Date()): string[] {
  const today = todayInShopTz(now);
  const mins = minutesNowInShopTz(now);
  const out: string[] = [];
  for (let i = 0; i < span; i++) {
    const v = addDays(today, i);
    const day = weekdayOf(v);
    if (day === 0) continue;
    if (i === 0 && mins > lastStartMinutes(day)) continue;
    out.push(v);
  }
  return out;
}

export const SUNDAY_MSG = "We're closed Sundays — please pick another day.";
export const SATURDAY_MSG = "Saturdays we close at 1pm — please pick a morning slot.";

type Issue = { path: "date" | "time"; message: string };

/** Identical date/time rules used by both client and server schemas. */
export function dateTimeIssues(date: string, time: string): Issue[] {
  if (!date) return [{ path: "date", message: "Pick a date" }];
  const day = weekdayOf(date);
  if (day === -1) return [{ path: "date", message: "Pick a date" }];
  if (day === 0) return [{ path: "date", message: SUNDAY_MSG }];
  if (!time) return [{ path: "time", message: "Pick a time" }];
  if (day === 6 && !saturdayTimes.includes(time)) return [{ path: "time", message: SATURDAY_MSG }];
  if (!timesForDay(day).includes(time)) return [{ path: "time", message: "Pick a time" }];
  return [];
}
