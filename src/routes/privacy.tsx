import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Top Elite Auto" },
      { name: "description", content: "How Top Elite Auto (Magnum Details LLC) collects, uses and protects information submitted through topeliteauto.com, and the choices you have." },
      { property: "og:title", content: "Privacy Policy — Top Elite Auto" },
      { property: "og:description", content: "How Top Elite Auto collects, uses and protects information submitted through topeliteauto.com, and the choices you have." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/privacy" }],
  }),
  component: PrivacyPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-2xl md:text-3xl">{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 leading-relaxed text-muted-foreground">{children}</p>;
}

function PrivacyPage() {
  return (
    <section className="container-luxe pb-28 pt-32 md:pt-40">
      <div className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-6 text-5xl md:text-6xl">Privacy Policy</h1>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Last updated: October 15, 2026
        </p>

        <div className="mt-12 space-y-1 text-base">
          <P>
            Top Elite Auto is a trade name of Magnum Details LLC ("we", "us",
            "our"). This policy explains what information we collect through
            topeliteauto.com, how we use it, and the choices you have.
          </P>

          <H2>Information you give us</H2>
          <P>
            When you submit a booking request, we collect your name, phone
            number, email address, details about your vehicle, your preferred
            date and time, how you heard about us, and any notes you add. You
            provide this voluntarily. We do not require an account, and we do
            not collect payment details through this website.
          </P>

          <H2>Information collected automatically</H2>
          <P>
            Our website collects limited technical information automatically,
            including your IP address, browser and device type, the pages you
            view, and the site or advertisement that referred you. We use
            Google Analytics to understand how visitors use the site, and
            Google Ads conversion tracking to measure which advertisements
            lead to booking requests. These services set cookies on your
            device, including cookies named _ga, _gcl_au and _gcl_aw. If you
            arrive from a Google advertisement, a click identifier is recorded
            with your booking request so we can tell which advertisement it
            came from. You can control or delete cookies in your browser
            settings, and you can opt out of Google Analytics using the
            browser add-on at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              https://tools.google.com/dlpage/gaoptout
            </a>
            . Blocking cookies may affect how parts of the site work.
          </P>

          <H2>How we use your information</H2>
          <P>
            We use what you give us to respond to your booking request,
            schedule and carry out work on your vehicle, contact you about
            that work, answer your questions, keep records of jobs we have
            done, meet our legal and tax obligations, and improve our website
            and advertising. If you have separately agreed to receive them, we
            also use your contact details to send service reminders and
            occasional offers.
          </P>

          <H2>Text messages</H2>
          <P>
            If you submit a booking request, you agree to receive texts and
            emails from us about that booking. Marketing texts are separate
            and optional: you receive them only if you tick the optional box
            on the booking form, and your consent to marketing messages is
            never a condition of booking or buying anything from us. Message
            frequency varies, and message and data rates may apply. Reply
            STOP to any text to stop receiving them, or HELP for help. Opting
            out of marketing messages does not stop us contacting you about a
            booking you have made.
          </P>
          <P>
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes. Text messaging
            originator opt-in data and consent are never shared with any
            third party.
          </P>

          <H2>Who we share information with</H2>
          <P>
            We do not sell your personal information, and we do not rent or
            trade it. We share it only with companies that help us run the
            business, including website hosting, email delivery, scheduling
            and customer records, and the analytics and advertising services
            described above, and only so they can perform those services for
            us. We may also disclose information where the law requires it, or
            to protect our rights, property or safety or that of others.
          </P>

          <H2>How long we keep it</H2>
          <P>
            We keep your information for as long as needed for the purposes
            described in this policy, including keeping records of work
            performed on your vehicle, and for as long as the law requires.
            When we no longer need it, we delete it or render it unreadable.
          </P>

          <H2>Security</H2>
          <P>
            We take reasonable steps to protect the information we hold. No
            website or method of transmission is completely secure, so we
            cannot guarantee absolute security.
          </P>

          <H2>Your choices</H2>
          <P>
            You can ask us what personal information we hold about you, ask us
            to correct it, or ask us to delete it, and we will respond as
            required by applicable law. You can opt out of marketing texts by
            replying STOP, and out of marketing emails using the unsubscribe
            link. To make a request, contact us using the details below.
          </P>

          <H2>Children</H2>
          <P>
            This website is not directed to children under 13, and we do not
            knowingly collect personal information from them. If you believe a
            child has given us information, contact us and we will delete it.
          </P>

          <H2>Changes</H2>
          <P>
            We may update this policy. The date at the top shows when it was
            last changed.
          </P>

          <H2>Contact us</H2>
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
