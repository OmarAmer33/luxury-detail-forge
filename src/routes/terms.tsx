import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Top Elite Auto" },
      { name: "description", content: "Terms and conditions for using topeliteauto.com and for detailing and related services provided by Top Elite Auto, a trade name of Magnum Details LLC." },
      { property: "og:title", content: "Terms & Conditions — Top Elite Auto" },
      { property: "og:description", content: "Terms and conditions for using topeliteauto.com and for detailing and related services provided by Top Elite Auto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/terms" }],
  }),
  component: TermsPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-2xl md:text-3xl">{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 leading-relaxed text-muted-foreground">{children}</p>;
}

function TermsPage() {
  return (
    <section className="container-luxe pb-28 pt-32 md:pt-40">
      <div className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-6 text-5xl md:text-6xl">Terms &amp; Conditions</h1>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Last updated: October 15, 2026
        </p>

        <div className="mt-12 space-y-1 text-base">
          <P>
            These terms apply to your use of topeliteauto.com and to detailing
            and related services provided by Top Elite Auto, a trade name of
            Magnum Details LLC. By using this website or booking our services,
            you agree to them.
          </P>

          <H2>1. Booking requests</H2>
          <P>
            Submitting the form on this website is a request, not a confirmed
            appointment. We will contact you to confirm a date and time. An
            appointment exists only once we have confirmed it with you
            directly.
          </P>

          <H2>2. Quotes and pricing</H2>
          <P>
            Prices shown on this website are starting prices, not quotes. The
            final price depends on the size and condition of the vehicle and
            the work required, and is confirmed with you before work begins.
            We will not carry out additional work beyond what was agreed
            without your approval.
          </P>

          <H2>3. Your vehicle</H2>
          <P>
            You confirm that you own the vehicle or are authorized to arrange
            work on it. Please remove personal belongings before your
            appointment; we are not responsible for items left in a vehicle.
            Tell us before work begins about existing damage, aftermarket
            paint or wraps, mechanical faults, or anything else that could
            affect the work. We take care with every vehicle. We are not
            responsible for pre-existing damage, for wear or defects that
            become visible once a vehicle is cleaned, or for faults in paint,
            trim or components that were present before we started.
          </P>

          <H2>4. Appointments and cancellations</H2>
          <P>
            Please give us as much notice as you can if you need to cancel or
            reschedule, so we can offer the slot to someone else. If a deposit
            is required for a particular service, we will tell you before the
            appointment is confirmed and explain the terms at that time.
          </P>

          <H2>5. Payment</H2>
          <P>
            Payment is due on completion unless we agree otherwise in writing.
          </P>

          <H2>6. Results</H2>
          <P>
            Detailing improves the appearance and condition of a vehicle but
            cannot undo all damage. Results vary with the age, history and
            condition of the vehicle and its paint. Any manufacturer warranty
            on a product we apply is provided by that manufacturer on its own
            terms, and depends on following the care instructions we give you.
          </P>

          <H2>7. Text messages</H2>
          <P>
            If you submit a booking request, you agree to receive texts and
            emails from us about that booking. You must be 18 years of age or
            older to use this SMS service. Marketing texts are optional
            and separate: you receive them only if you tick the optional box
            on the booking form. Consent to marketing messages is not a
            condition of purchasing any service from us. Message frequency
            varies. Message and data rates may apply. Reply STOP to opt out at
            any time, or HELP for help. Mobile carriers are not liable for
            delayed or undelivered messages.
          </P>

          <H2>8. Website content</H2>
          <P>
            The content of this website, including text, images, logos and
            design, belongs to us or our licensors and may not be copied or
            reused without permission. We try to keep the website accurate and
            available but do not guarantee that it will be error-free or
            uninterrupted.
          </P>

          <H2>9. Limitation of liability</H2>
          <P>
            To the fullest extent permitted by law, our total liability
            arising out of or relating to our services or this website is
            limited to the amount you paid us for the service concerned. We
            are not liable for indirect, incidental or consequential losses,
            including loss of use of a vehicle. Nothing in these terms limits
            liability that cannot be limited by law.
          </P>

          <H2>10. Governing law</H2>
          <P>
            These terms are governed by the laws of the State of New Jersey,
            and any dispute will be handled by the courts of New Jersey.
          </P>

          <H2>11. Changes</H2>
          <P>
            We may update these terms. The date at the top shows when they
            were last changed.
          </P>

          <H2>Contact</H2>
          <div className="mt-5 leading-relaxed text-muted-foreground">
            <p>Top Elite Auto</p>
            <p>3 Dundar Rd, Springfield, NJ 07081</p>
            <p>
              Email:{" "}
              <a
                href="mailto:derrick@topeliteauto.com"
                className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                derrick@topeliteauto.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:9082933934"
                className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                (908) 293-3934
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
