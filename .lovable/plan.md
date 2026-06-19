# v7 — Content Edits Plan

Three files touched. No design system changes.

## 1. `src/routes/ceramic-coating.tsx` — pricing & longevity corrections

- **FAQ entry** "How long does ceramic coating last?": update to "2 to 5 years", 5-Year starts at **$1,200**.
- **JSON-LD offer**: 5-Year Ceramic `price` → `"1200"`.
- **"Why it matters" pillar**: rename `5–9 Year Protection` → `2–5 Year Protection`, body adjusted to "multiple years".
- **Pricing card**: 5-Year Ceramic price → `$1,200`.

## 2. `src/components/site/Footer.tsx` — Facebook URL

Replace old `facebook.com/topeliteautollc/` with canonical:
`https://www.facebook.com/people/Top-Elite-Auto-LLC/61584034114671/`

## 3. `src/routes/faq.tsx` — full rebuild into 7 categorized sections

### Data
Replace flat `faqs` array with a `sections` array. Each section: `{ title, anchor, faqs: [{q,a}] }`.

Sections (in order, anchor in parens):
1. Services & Education (`services`) — 9 entries
2. Washing & Maintenance (`washing`) — 5
3. Paint & Exterior (`paint`) — 5
4. Interior (`interior`) — 5
5. Vehicle Specific (`vehicle`) — 4
6. Before & After Your Appointment (`appointment`) — 4
7. Booking & Policies (`booking`) — 4

All Q&A copy is provided verbatim in the v7 prompt and will be used exactly as written.

### Rendering
- Add a top anchor-nav row: small inline list of section titles linking to `#anchor`, styled with existing muted/border tokens (no new design tokens).
- For each section, render an `<h2 id={anchor}>` with the section title, then map its FAQs into the existing Q/A markup (same `<h3>` + `<p>` shape currently used).
- Existing PageHero, JsonLd, "Still have questions?" CTA, and CtaSection blocks remain unchanged.

### JSON-LD
Flatten with `const allFaqs = sections.flatMap(s => s.faqs);` and build `FAQPage` schema from `allFaqs` (schema.org has no section concept).

## Out of scope
Photo gallery, badge toggle, blog route, service-areas route, any other content/design/pricing.

## Files touched
- `src/routes/ceramic-coating.tsx`
- `src/components/site/Footer.tsx`
- `src/routes/faq.tsx`
