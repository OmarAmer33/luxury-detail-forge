import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(255),
  vehicle: z.string().trim().min(2).max(120),
  condition: z.string().min(1).max(50),
  service: z.string().min(1).max(100),
  date: z.string().min(1).max(20),
  time: z.string().min(1).max(20),
  hearAbout: z.string().max(50).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
  _hp_url_check: z.string().optional().default(""),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
        if (d.website && d.website.length > 0) {
          return Response.json({ success: true });
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
              to: ["topeliteauto01@gmail.com", "topeliteautomarketing@gmail.com"],
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
