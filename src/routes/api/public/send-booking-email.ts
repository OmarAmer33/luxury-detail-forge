import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { dateTimeIssues } from "@/lib/booking-rules";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(255),
  vehicle: z.string().trim().min(2).max(120),
  condition: z.string().min(1).max(50),
  service: z.string().min(1).max(100),
  date: z.string().max(20).default(""),
  time: z.string().max(20).default(""),
  hearAbout: z.string().max(50).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
  _hp_url_check: z.string().optional().default(""),
  gclid: z.string().max(200).optional().default(""),
  marketingConsent: z.boolean().optional().default(false),
}).superRefine((data, ctx) => {
  // Same date/time rules as the /book form (shared module).
  for (const issue of dateTimeIssues(data.date, data.time)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: [issue.path], message: issue.message });
  }
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---- GoHighLevel CRM sync -------------------------------------------------
const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const GHL_LOCATION_ID = "JSUxqKsmjxVTSBVYfxDc";
const GHL_BOOKING_TAG = "website-booking";

type BookingData = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
};

// Single place to correct the CRM custom-field mapping.
const GHL_CUSTOM_FIELDS: { key: string; value: (d: BookingData) => string }[] = [
  { key: "vehicle", value: (d) => d.vehicle },
  { key: "service_requested", value: (d) => d.service },
  { key: "requested_date", value: (d) => formatLongDate(d.date) },
  { key: "requested_time", value: (d) => d.time },
];

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2026-10-16" -> "Friday, October 16". Built from parts (UTC math) so it
// never shifts a day due to local-time parsing.
function formatLongDate(s: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "");
  if (!m) return "";
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const day = Number(m[3]);
  if (mo < 1 || mo > 12 || day < 1 || day > 31) return "";
  const wd = new Date(Date.UTC(y, mo - 1, day)).getUTCDay();
  return `${WEEKDAYS[wd]}, ${MONTHS[mo - 1]} ${day}`;
}

function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

function buildGhlUpsertBody(d: BookingData) {
  const name = d.name.trim();
  const ws = /\s+/.exec(name);
  const firstName = ws ? name.slice(0, ws.index) : name;
  const lastName = ws ? name.slice(ws.index + ws[0].length) : "";
  return {
    locationId: GHL_LOCATION_ID,
    firstName,
    ...(lastName ? { lastName } : {}),
    email: d.email,
    phone: toE164(d.phone),
    source: "Website booking form",
    customFields: GHL_CUSTOM_FIELDS.map((f) => ({ key: f.key, field_value: f.value(d) })),
  };
}


export const Route = createFileRoute("/api/public/send-booking-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { success: false, error: "Invalid submission" },
            { status: 400 },
          );
        }
        const d = parsed.data;

        // Honeypot — silently succeed without sending
        if (d._hp_url_check && d._hp_url_check.length > 0) {
          return Response.json({ success: true });
        }

        // Record the submission. This must never block, delay, or fail the
        // email — any error is logged and swallowed so the HTTP response is
        // identical whether the insert succeeded or not.
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("booking_submissions").insert({
            name: d.name,
            phone: d.phone,
            email: d.email,
            vehicle: d.vehicle,
            condition: d.condition,
            service: d.service,
            preferred_date: d.date,
            preferred_time: d.time,
            hear_about: d.hearAbout || null,
            notes: d.notes || null,
            gclid: d.gclid || null,
            source: d.gclid ? "google-ads" : null,
            marketing_consent: d.marketingConsent,
          });
          if (error) {
            console.error("booking_submissions insert failed:", error.message);
          }
        } catch (err) {
          console.error("booking_submissions insert threw:", err);
        }

        // GoHighLevel contact sync. Same never-block pattern as the insert:
        // every error is logged and swallowed; the response and email are
        // unaffected whether the CRM succeeds, fails, or hangs. Each fetch
        // is capped at 4s and the whole block at an 8s budget, so the Resend
        // send always starts within 8 seconds even if the CRM is slow.
        try {
          const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
          if (!ghlToken) {
            console.error("GHL sync skipped: GHL_PRIVATE_INTEGRATION_TOKEN not set");
          } else {
            const ghlDeadline = Date.now() + 8000;
            const budgetLeft = () => ghlDeadline - Date.now();
            const isTimeout = (err: unknown) =>
              err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
            const headers = {
              Authorization: `Bearer ${ghlToken}`,
              Version: GHL_API_VERSION,
              "Content-Type": "application/json",
              Accept: "application/json",
            };
            // Single fetch helper so every GHL call honours both the 4s
            // per-call cap and the shared 8s block budget.
            const ghlFetch = (url: string, init: RequestInit) => {
              const left = budgetLeft();
              if (left <= 0) throw new Error("GHL budget exceeded");
              return fetch(url, { ...init, signal: AbortSignal.timeout(Math.min(4000, left)) });
            };

            let contactId: string | undefined;
            try {
              const upsertRes = await ghlFetch(`${GHL_BASE_URL}/contacts/upsert`, {
                method: "POST",
                headers,
                body: JSON.stringify(buildGhlUpsertBody(d)),
              });
              const upsertJson = (await upsertRes.json().catch(() => null)) as
                | { contact?: { id?: string } }
                | null;
              contactId = upsertJson?.contact?.id;
              if (!upsertRes.ok || !contactId) {
                console.error("GHL upsert failed:", upsertRes.status, JSON.stringify(upsertJson));
                contactId = undefined;
              }
            } catch (err) {
              contactId = undefined;
              console.error(isTimeout(err) ? "GHL upsert timed out:" : "GHL upsert threw:", err);
            }

            if (contactId) {
              if (budgetLeft() <= 0) {
                console.error("GHL budget exceeded; skipping tag calls");
              } else {
                const tagBody = JSON.stringify({ tags: [GHL_BOOKING_TAG] });
                try {
                  await ghlFetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
                    method: "DELETE",
                    headers,
                    body: tagBody,
                  });
                } catch (err) {
                  // Expected to no-op for first-time contacts; timeouts are
                  // still logged so they show up in the logs, not silently.
                  if (isTimeout(err)) console.error("GHL tag cleanup timed out:", err);
                }
                try {
                  const addRes = await ghlFetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
                    method: "POST",
                    headers,
                    body: tagBody,
                  });
                  if (!addRes.ok) {
                    console.error("GHL tag add failed:", addRes.status, await addRes.text().catch(() => ""));
                  }
                } catch (err) {
                  console.error(isTimeout(err) ? "GHL tag add timed out:" : "GHL tag add threw:", err);
                }
              }
            }
          }
        } catch (err) {
          console.error("GHL sync threw:", err);
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          return Response.json(
            { success: false, error: "Email service not configured" },
            { status: 500 },
          );
        }

        const subject = `New booking request — ${d.service} — ${d.name}`;

        const textBody = [
          `New booking request from topeliteauto.com`,
          ``,
          `Name:       ${d.name}`,
          `Phone:      ${d.phone}`,
          `Email:      ${d.email}`,
          `Vehicle:    ${d.vehicle}`,
          `Condition:  ${d.condition}`,
          `Service:    ${d.service}`,
          `Date:       ${d.date}`,
          `Time:       ${d.time}`,
          `Heard via:  ${d.hearAbout || "—"}`,
          ``,
          `Notes:`,
          d.notes || "—",
        ].join("\n");

        const rows: [string, string][] = [
          ["Name", d.name],
          ["Phone", d.phone],
          ["Email", d.email],
          ["Vehicle", d.vehicle],
          ["Condition", d.condition],
          ["Service", d.service],
          ["Date", d.date],
          ["Time", d.time],
          ["Heard via", d.hearAbout || "—"],
        ];

        const htmlBody = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0a0a0a;background:#ffffff;padding:24px;">
  <h2 style="margin:0 0 16px;font-size:20px;">New booking request</h2>
  <p style="margin:0 0 20px;color:#555;font-size:14px;">From the topeliteauto.com booking form.</p>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="border-bottom:1px solid #eee;font-weight:600;color:#555;">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <h3 style="margin:24px 0 8px;font-size:14px;">Notes</h3>
  <p style="margin:0;white-space:pre-wrap;font-size:14px;">${escapeHtml(d.notes || "—")}</p>
</body></html>`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: "Top Elite Auto <bookings@mail.topeliteauto.com>",
              to: ["topeliteauto01@gmail.com"],
              reply_to: d.email,
              subject,
              text: textBody,
              html: htmlBody,
            }),
          });

          if (!res.ok) {
            let errMsg = `Resend error ${res.status}`;
            try {
              const errBody = (await res.json()) as { message?: string };
              if (errBody?.message) errMsg = errBody.message;
            } catch {
              /* ignore */
            }
            console.error("Resend send failed:", errMsg);
            return Response.json({ success: false, error: errMsg }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("Resend request threw:", err);
          return Response.json(
            { success: false, error: "Email service unavailable" },
            { status: 502 },
          );
        }
      },
    },
  },
});
