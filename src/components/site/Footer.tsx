import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="surface-dark border-t border-border">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src={logo}
            alt="Top Elite Auto"
            className="h-16 w-auto"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
          />
          <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Springfield, NJ
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Premium ceramic coating, paint protection, wraps and detailing.
            We don't do average.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground gold-underline">Visit</h4>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 text-[var(--color-gold)] shrink-0" />3 Dundar Rd<br/>Springfield, NJ 07081</li>
            <li className="flex gap-3"><Clock size={16} className="mt-0.5 text-[var(--color-gold)] shrink-0" />Mon–Sat · 9am–6pm</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground gold-underline">Contact</h4>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:9082933934" className="flex items-center gap-3 hover:text-[var(--color-gold)]"><Phone size={16} className="text-[var(--color-gold)]" />908.293.3934</a></li>
            <li>
              <a href="mailto:info@topeliteauto.com" className="flex items-center gap-3 hover:text-[var(--color-gold)]"><Mail size={16} className="text-[var(--color-gold)]" />info@topeliteauto.com</a>
              <span className="ml-7 mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">(TBD — pending confirmation)</span>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">
                <Icon size={16} />
              </a>
            ))}
            <a href="https://google.com/maps" aria-label="Google" className="flex h-10 w-10 items-center justify-center border border-border text-xs font-bold text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">G</a>
            <a href="https://yelp.com" aria-label="Yelp" className="flex h-10 w-10 items-center justify-center border border-border text-xs font-bold text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">Y</a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground gold-underline">Services</h4>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {[
              ["Ceramic Coating", "/ceramic-coating"],
              ["Paint Protection", "/paint-protection"],
              ["Car Wraps", "/car-wraps"],
              ["In-Shop Detailing", "/detailing"],
              ["VIP Showroom", "/vip-showroom"],
              ["Reviews & Results", "/reviews"],
            ].map(([label, to]) => (
              <li key={to}><Link to={to as any} className="hover:text-[var(--color-gold)]">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Top Elite Auto. All rights reserved.</span>
          <span>Built in Springfield, NJ</span>
        </div>
      </div>
    </footer>
  );
}
