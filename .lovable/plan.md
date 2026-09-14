# Install Google Ads/Analytics tracking

Two-file change only. No package installs, no schema changes, no other pages touched.

## Files modified

- `src/routes/__root.tsx`
- `src/routes/book.tsx`

## Part 1 — Global gtag loader in `src/routes/__root.tsx`

In the `RootShell` component, the `<head>` currently contains:

```tsx
<head>
  <HeadContent />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
  />
</head>
```

Insert the Google tag immediately after `<HeadContent />` and before the existing JSON-LD `<script>`.

Resulting order inside `<head>`:

1. `<HeadContent />`
2. `<script async src="https://www.googletagmanager.com/gtag/js?id=G-X6RCS9SVQW"></script>`
3. Inline gtag init/config script
4. Existing JSON-LD `<script>`

Inline script contents:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-X6RCS9SVQW');
      gtag('config', 'AW-10789482788');
    `,
  }}
/>
```

- Single `gtag.js` loader script only.
- IDs are hard-coded in source as requested; not moved to environment variables.
- Renders on every route because it lives in the root shell.

## Part 2 — Booking conversion event in `src/routes/book.tsx`

In `handleSubmit`, the confirmed-success branch is:

```tsx
if (!res.ok || !json.success) {
  setStatus("error");
  return;
}
setStatus("success");
form.reset();
```

Insert the conversion event immediately before `setStatus("success")`:

```tsx
if (!res.ok || !json.success) {
  setStatus("error");
  return;
}
if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
  (window as any).gtag("event", "conversion", {
    send_to: "AW-10789482788/J-mTCMjO4fccEKTi6Zgo",
  });
}
setStatus("success");
form.reset();
```

- Fires only after the server responds with `success: true`.
- Guarded by `typeof window` and `typeof gtag === "function"` so ad blockers or partial loads cannot crash the form.
- The success screen still renders and `form.reset()` still runs.

## Out of scope / untouched

- `src/routes/api/public/send-booking-email.ts` — no changes.
- Zod schema, honeypot field, form fields, success markup — no changes.
- No npm packages installed.
- No service pages, pricing matrices, `ServicePage`, nav, or footer changes.

## Verification

1. `bun run build` passes.
2. Inspect the rendered `/book` page source; the gtag loader and inline config appear once in `<head>`, before the JSON-LD.
3. Optionally use Playwright or browser devtools to confirm:
   - `window.gtag` is defined on `/book`.
   - A successful form submission calls `gtag("event", "conversion", { send_to: "AW-10789482788/J-mTCMjO4fccEKTi6Zgo" })`.
   - A blocked gtag.js does not prevent the success screen from rendering.
