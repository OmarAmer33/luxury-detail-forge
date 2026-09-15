/**
 * Google Ads / GA4 event helpers.
 *
 * Every call is guarded and wrapped in try/catch: if gtag.js is blocked or
 * only partially loaded, these must be no-ops and must never throw.
 */

function hasGtag(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof (window as any).gtag === "function"
  );
}

/**
 * Fires on tel: link clicks. Does NOT interfere with navigation — no
 * preventDefault, no window.location, no event_callback. The browser handles
 * the tel: link natively so the dialer handoff is never broken.
 */
export function trackPhoneClick(): void {
  if (!hasGtag()) return;
  try {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-10789482788/XssCCIKR-_gcEKTi6Zgo",
    });
    (window as any).gtag("event", "contact", { method: "phone" });
  } catch {
    /* tracking must never break the page */
  }
}

/** Fires after a confirmed booking form submission. */
export function trackLeadSubmit(): void {
  if (!hasGtag()) return;
  try {
    (window as any).gtag("event", "generate_lead", {
      currency: "USD",
      value: 1,
    });
  } catch {
    /* tracking must never break the page */
  }
}
