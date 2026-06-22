import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const localBusinessJson = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://topeliteauto.com/#business",
  "name": "Top Elite Auto",
  "image": "https://topeliteauto.com/src/assets/hero-car.jpg",
  "url": "https://topeliteauto.com",
  "telephone": "+1-908-293-3934",
  "email": "topeliteauto01@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 Dundar Rd",
    "addressLocality": "Springfield",
    "addressRegion": "NJ",
    "postalCode": "07081",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.6976",
    "longitude": "-74.3254",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00",
    },
  ],
  "priceRange": "$$$",
  "areaServed": {
    "@type": "City",
    "name": "Springfield",
    "containedInPlace": {
      "@type": "State",
      "name": "New Jersey",
    },
  },
  "sameAs": [
    "https://www.instagram.com/topeliteauto",
    "https://www.facebook.com/topeliteautollc/",
    "https://www.tiktok.com/@topeliteauto",
    "https://www.yelp.com/biz/top-elite-auto-springfield",
    "https://maps.app.goo.gl/Hh2Tgnzepbobuz6Z9",
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Top Elite Auto — Detailing & Ceramic · Springfield NJ" },
      { name: "description", content: "Springfield, NJ's premium auto detailing shop. Ceramic coating, paint protection film, wraps and showroom-grade detailing. We don't do average." },
      { name: "author", content: "Top Elite Auto" },
      { property: "og:title", content: "Top Elite Auto — Detailing & Ceramic · Springfield NJ" },
      { property: "og:description", content: "Springfield, NJ's premium auto detailing shop. Ceramic coating, paint protection film, wraps and showroom-grade detailing. We don't do average." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Top Elite Auto — Detailing & Ceramic · Springfield NJ" },
      { name: "twitter:description", content: "Springfield, NJ's premium auto detailing shop. Ceramic coating, paint protection film, wraps and showroom-grade detailing. We don't do average." },
      { property: "og:site_name", content: "Top Elite Auto" },
      { name: "google-site-verification", content: "gdWumQvXSHoLLyWzw-cKsQ6cJgReINJ0fqieuf1jd1g" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
