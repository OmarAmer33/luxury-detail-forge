import { createFileRoute } from "@tanstack/react-router";

const routes = [
  { loc: "https://topeliteauto.com/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://topeliteauto.com/ceramic-coating", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/paint-protection", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/car-wraps", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/detailing", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/window-tint", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/vip-showroom", changefreq: "monthly", priority: "0.9" },
  { loc: "https://topeliteauto.com/reviews", changefreq: "weekly", priority: "0.8" },
  { loc: "https://topeliteauto.com/faq", changefreq: "monthly", priority: "0.8" },
  { loc: "https://topeliteauto.com/service-areas", changefreq: "monthly", priority: "0.7" },
  { loc: "https://topeliteauto.com/book", changefreq: "monthly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>
    <loc>${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
