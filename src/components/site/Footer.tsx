import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2, MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo-dark.png";

export function Footer() {
  return (
    <footer className="surface-dark border-t border-border" itemScope itemType="https://schema.org/AutoRepair">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src={logo}
            alt="Top Elite Auto"
            className="h-16 w-auto"
          />
          <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground" itemProp="addressLocality">
            Springfield, NJ
          </div>
          <p className="mt-6 text-sm text-muted-foreground" itemProp="description">
            Premium ceramic coating, paint protection, wraps and detailing.
            We don't do average.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground gold-underline">Visit</h4>
          <address className="mt-6 space-y-3 text-sm text-muted-foreground not-italic">
            <div className="flex gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <MapPin size={16} className="mt-0.5 text-[var(--color-gold)] shrink-0" />
              <div>
                <span itemProp="streetAddress">3 Dundar Rd</span><br/>
                <span itemProp="addressLocality">Springfield</span>, <span itemProp="addressRegion">NJ</span> <span itemProp="postalCode">07081</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={16} className="mt-0.5 text-[var(--color-gold)] shrink-0" />
              <span>Mon–Sat · 9am–6pm</span>
            </div>
          </address>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground gold-underline">Contact</h4>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:9082933934" className="flex items-center gap-3 hover:text-[var(--color-gold)]" itemProp="telephone"><Phone size={16} className="text-[var(--color-gold)]" />908.293.3934</a></li>
            <li>
              <a href="mailto:topeliteauto01@gmail.com" className="flex items-center gap-3 hover:text-[var(--color-gold)]" itemProp="email"><Mail size={16} className="text-[var(--color-gold)]" />topeliteauto01@gmail.com</a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/topeliteauto", label: "Top Elite Auto on Instagram" },
              { Icon: Facebook, href: "https://www.facebook.com/people/Top-Elite-Auto-LLC/61584034114671/", label: "Top Elite Auto on Facebook" },
              { Icon: Music2, href: "https://www.tiktok.com/@topeliteauto", label: "Top Elite Auto on TikTok" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">
                <Icon size={16} />
              </a>
            ))}
            <a href="https://maps.app.goo.gl/Hh2Tgnzepbobuz6Z9" target="_blank" rel="noopener noreferrer" aria-label="Top Elite Auto on Google Maps" className="flex h-10 w-10 items-center justify-center border border-border text-xs font-bold text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">G</a>
            <a href="https://www.yelp.com/biz/top-elite-auto-springfield" target="_blank" rel="noopener noreferrer" aria-label="Top Elite Auto on Yelp" className="flex h-10 w-10 items-center justify-center border border-border text-xs font-bold text-foreground/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">Y</a>
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
              ["FAQ", "/faq"],
              ["Service Areas", "/service-areas"],
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
