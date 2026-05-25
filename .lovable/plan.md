## Problem

When you share the site link, the preview shows an **old screenshot** of the site (old colors). Two causes:

1. `src/routes/__root.tsx` sets a hardcoded `og:image` / `twitter:image` pointing to an old preview PNG hosted on `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...`. Because the root route's head concatenates into every page match, that old image overrides every leaf route's share preview — including the homepage (which doesn't set its own).
2. iMessage/WhatsApp/Facebook aggressively cache OG images, so even after we fix it the old preview may stick for a while until the cache refreshes.

## Fix

1. **`src/routes/__root.tsx`** — remove the two hardcoded `og:image` and `twitter:image` meta entries from the root `head()`. Per project rules, `og:image` belongs only on leaf routes.
2. **`src/routes/index.tsx`** — add `og:image` and `twitter:image` to the homepage `head()`, pointing to the current hero image (`/src/assets/hero-car.jpg` → use its built URL). Use an absolute URL on `https://topeliteauto.com/...` so crawlers accept it. Also add `og:title`, `og:description`, `og:url`, `og:type: website`, and a `<link rel="canonical">`.
3. Leave the other leaf routes alone — they already set their own `og:image` correctly and will now actually take effect once the root override is removed.

## After deploy

The fix is live the moment you re-publish, but social platforms cache previews. To force a refresh:
- iMessage: long-press the link → it sometimes refetches; otherwise it can take a day or two.
- Facebook/LinkedIn: paste the URL into their respective debuggers and click "Scrape again."
- WhatsApp: append a `?v=2` query string to the link once to bypass its cache.
