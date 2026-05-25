import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/ceramic-coating", label: "Ceramic Coating" },
  { to: "/paint-protection", label: "Paint Protection" },
  { to: "/car-wraps", label: "Car Wraps" },
  { to: "/detailing", label: "Detailing" },
  { to: "/window-tint", label: "Window Tint" },
  { to: "/vip-showroom", label: "VIP Showroom" },
  { to: "/reviews", label: "Reviews" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center" onClick={() => setOpen(false)} aria-label="Top Elite Auto — home">
          <img
            src={scrolled ? logo : logoDark}
            alt="Top Elite Auto"
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[var(--color-red)] data-[status=active]:text-[var(--color-red)] ${
                scrolled ? "text-foreground/80" : "text-white/85"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:ml-10">
          <a
            href="tel:9082933934"
            className={`hidden text-xs font-semibold uppercase tracking-[0.18em] hover:text-[var(--color-red)] md:inline ${
              scrolled ? "text-foreground/80" : "text-white/85"
            }`}
          >
            908.293.3934
          </a>
          <Link
            to="/book"
            className="hidden bg-[var(--color-red)] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-red-soft)] sm:inline-block"
          >
            Book Now
          </Link>
          <button
            aria-label="Menu"
            className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-luxe flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/85 hover:text-[var(--color-gold)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-3 inline-block bg-[var(--color-gold)] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary-foreground)]"
            >
              Book Now
            </Link>
            <a
              href="tel:9082933934"
              className="mt-2 py-2 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]"
            >
              Call · 908.293.3934
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
