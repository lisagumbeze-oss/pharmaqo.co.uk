# Phase 1: Design System and Setup

Oct 22, 2026 · @Daniel

Phase 1 turns the agreed scope (UK-based, legal sports nutrition store, GBP, UK plus EU shipping) into a design system, page wireframes and a working repo, so Phase 2 can build catalog and checkout without redesign.

## Scope and guardrails

Phase 1 delivers the design system, wireframes for every launch page, the calculator logic spec, and a running repo with seed data. It does not build checkout, payments or shipping rules (Phase 2).

- **Catalog:** legal dietary supplements only: protein, creatine, vitamins, pre-workout, recovery. No prescription, controlled or hormonal products, and no seed data that implies them.
- **Brand name:** held in one config file (`brand.config.ts`) because "Pharmaqo Labs" may be rejected by payment processors and ad platforms. Logo and copy stay swappable.
- **Claims:** product copy states label facts only (serving size, ingredients, protein per serving). Health or performance claims need sign-off from a regulatory consultant before launch.
- **Age gate:** 21+ confirmation on stimulant products, set as a per-product flag.

## Design tokens

The look is clinical-premium: lab-grade trust without a pharmacy feel. Every value below becomes a Tailwind token so nothing is hard-coded in components.

| Token group | Values |
| --- | --- |
| Ink (text, dark surfaces) | #0E1116 |
| Paper (background) | #F6F5F1 |
| Surface (cards) | #FFFFFF |
| Accent (CTAs, badges) | #19C3A6 (hover #12A88E) |
| Muted text | #5B6470 |
| Border | #E3E1DA |
| Success / warning / error | #1F9D55 / #D98A00 / #D64545 |
| Display font | Barlow Condensed 600/700, uppercase, tracking +2% |
| Body font | Inter 400/500/600 |
| Type scale (px) | 12, 14, 16, 18, 22, 28, 36, 48, 64 |
| Spacing scale (px) | 4, 8, 12, 16, 24, 32, 48, 64, 96 |
| Radius | 6 (inputs), 12 (cards), 999 (pills) |
| Shadow | 0 1px 2px rgba(14,17,22,.06), 0 8px 24px rgba(14,17,22,.08) |
| Breakpoints (px) | 480, 768, 1024, 1280 |
| Motion | 150 ms ease-out for hover, 250 ms for drawers |

Accessibility rule: body text on paper is at least 4.5:1 contrast, and the accent colour is never used for small text on white.

## Component library

Build these once in Storybook (or a `/styleguide` route) before any page. Each has default, hover, focus, disabled and loading states.

| Component | Purpose and key details |
| --- | --- |
| Button | Primary (accent), secondary (ink outline), text link; sizes S/M/L; loading spinner |
| Input, select, checkbox, radio, stepper | 44 px minimum touch height; inline validation messages |
| Product card | Image on soft grey, name, short descriptor, price, rating, "Batch tested" badge, quick add |
| Badge set | Batch tested, Vegan, Gluten free, Stimulant, 21+, New, Low stock |
| Price block | Price, per-serving cost, subscribe-and-save price, strike-through when discounted |
| Quantity selector | Minus, plus, direct entry; respects stock limit |
| Cart drawer | Slide-out, line items, free-delivery progress bar, subtotal, checkout button |
| Header | Logo, search, account, cart count; mega menu for 5 categories; mobile bottom sheet nav |
| Trust bar | Free UK delivery threshold, batch tested, secure payments, 30-day returns |
| Filter panel | Category, goal, price, dietary, stimulant-free; chips for active filters |
| Review stars and review list | Verified-purchase flag, helpful votes |
| Nutrition facts table | Per serving and per 100 g, ingredients, allergens, warnings |
| Batch lookup | Input for batch code, result card with lab report link and test date |
| Calculator form shell | Stepper layout, result panel, "Your plan" product list |
| Accordion, tabs, modal, toast, breadcrumb, pagination | Standard, keyboard accessible |
| Cookie banner and age-confirm dialog | Required for UK and EU launch |
| Footer | Shop, support, legal links, newsletter signup, payment icons |

## Page wireframes

Every page is designed mobile first (375 px), then expanded to desktop (1280 px). Blocks are listed top to bottom.

| Page | Blocks, in order |
| --- | --- |
| Home | Announcement bar, header, hero with one headline and one CTA, 5 category tiles, best sellers carousel, "Find your plan" calculator teaser, batch testing explainer, reviews, blog highlights, newsletter, footer |
| Shop and category | Breadcrumb, category intro, filter and sort bar, product grid (2 columns mobile, 4 desktop), pagination, SEO text |
| Product | Gallery, title, rating, price block, flavour and size selectors, subscribe toggle, add to cart, trust bar, tabs (Description, Nutrition, How to use, Reviews), batch lookup, related products |
| Cart and checkout | Cart review, delivery address, delivery method (Royal Mail, DPD), payment, order summary sidebar, guest or login choice |
| Account | Orders, addresses, subscriptions, saved plan from calculators |
| Calculators | Hub page, macro calculator, serving calculator, shared results page with "Your plan" products |
| Batch test results | Search by batch code, list of recent reports, how testing works |
| Blog | Article grid, category filter, article page with related products |
| About, Contact, FAQ | Brand story, contact form, accordion FAQ |
| Legal | Terms, Privacy, Returns, Shipping, Cookie policy |

## Calculators and recommendations

Both calculators run in the browser, store the result in the visitor's session, and save it to the account if they log in. Outputs are label-based information, never medical or health claims, and a short disclaimer sits under every result.

**Macro and calorie calculator**

- Inputs: age, sex, height, weight, activity level (5 options), goal (build, cut, maintain).
- Method: Mifflin-St Jeor for resting energy, multiplied by the activity factor, then adjusted by goal (+10% build, -15% cut).
- Output: daily calories, protein, carbohydrate and fat in grams, with a protein range per kg of body weight.

**Serving calculator**

- Inputs: body weight, goal, selected product.
- Output: servings per day as stated on the label, capped at the label maximum, plus cost per day and days per tub.

**Recommendation logic**

Each product carries tags: goal (build, cut, maintain, recovery), category, protein per serving, stimulant yes or no, dietary flags. The result maps to a filtered "Your plan" list: a protein product that closes the protein gap, plus up to three complements, each with the calculated servings and an add-all-to-cart button. Stimulant products are excluded unless the visitor opts in and confirms age.

## Repo and infrastructure

One monorepo with pnpm workspaces, TypeScript strict mode throughout.

```
repo/
  apps/
    storefront/      Next.js 15, App Router, Tailwind
    backend/         Medusa v2, PostgreSQL
    cms/             Payload CMS (blog, batch reports)
  packages/
    ui/              design system components and tokens
    config/          brand.config.ts, eslint, tsconfig
    calculators/     macro and serving logic, unit tested
  .github/workflows/ CI: lint, typecheck, test, build
```

| Service | Choice | Notes |
| --- | --- | --- |
| Frontend hosting | Vercel | Preview deploy on every pull request |
| Backend hosting | Railway or Render | Medusa needs a long-running Node process |
| Database | Neon Postgres | One branch each for dev, staging, production |
| File storage | Cloudflare R2 | Product images and batch report PDFs |
| CDN, DNS, WAF | Cloudflare | Rate limiting on login and checkout routes |
| Email | Resend | Order confirmation, shipping, password reset |
| Error tracking | Sentry | Frontend and backend |
| Analytics | Plausible or GA4 with consent | Load only after cookie consent |
| Secrets | Vercel and Railway env stores | Never committed; `.env.example` lists every key |

Environments: local, staging, production. Merges to `main` deploy to staging; production deploys by tagged release after a manual check.

## Build prompts and exit criteria

Paste these into Claude Code or Cursor in order. Each prompt ends with a check so you can confirm it worked before moving on.

**Prompt 1: monorepo and config**

```
Create a pnpm monorepo with apps/storefront (Next.js 15, App Router, TypeScript strict, Tailwind), apps/backend (Medusa v2 with PostgreSQL), apps/cms (Payload CMS), and packages/ui, packages/config, packages/calculators. Add ESLint, Prettier, Husky pre-commit, and a GitHub Actions workflow that runs lint, typecheck, test and build. Put the brand name, tagline, support email and currency in packages/config/brand.config.ts and import it everywhere; never hard-code the brand. Add .env.example files listing every variable. Check: pnpm install, pnpm build and pnpm test all pass.
```

**Prompt 2: design tokens**

```
In packages/ui, define Tailwind design tokens: ink #0E1116, paper #F6F5F1, surface #FFFFFF, accent #19C3A6 (hover #12A88E), muted #5B6470, border #E3E1DA, success #1F9D55, warning #D98A00, error #D64545. Load Inter (body) and Barlow Condensed (display, uppercase) with next/font. Add the type scale 12-64 px, spacing scale 4-96 px, radii 6/12/999, and the two shadows. Add dark-on-paper contrast tests. Check: a /styleguide route shows every token.
```

**Prompt 3: components**

```
Build the components in the Component library table as accessible React components in packages/ui with Storybook stories for default, hover, focus, disabled and loading states. Use semantic HTML, visible focus rings, 44 px touch targets, and keyboard support for the drawer, accordion, tabs and modal. Check: Storybook builds, and axe reports no serious violations.
```

**Prompt 4: seed data and shell pages**

```
In apps/backend add a seed script with 5 categories (Protein, Creatine, Vitamins, Pre-Workout, Recovery) and 20 placeholder supplement products. Each has name, price in GBP, serving size, servings per tub, ingredients, allergens, tags (goal, stimulant, dietary) and an age_restricted flag. No prescription, controlled or hormonal products. In apps/storefront build shell pages for home, category, product, cart and batch lookup, mobile first, reading from the backend. Check: the home, category and product pages render seeded data.
```

**Prompt 5: calculators package**

```
In packages/calculators implement Mifflin-St Jeor energy, activity multipliers, goal adjustments (+10% build, -15% cut), macro split, and label-capped serving calculation as pure TypeScript functions with unit tests covering edge cases. Check: tests pass with at least 90% coverage.
```

**Phase 1 exit checklist**

- [x] Brand name decision made or `brand.config.ts` confirmed as the single source
- [x] Design tokens and all components approved in Storybook
- [x] Wireframes for every page approved at 375 px and 1280 px
- [x] Repo builds, tests and deploys a preview to Vercel
- [x] Staging database and backend running with seed data
- [x] Calculator logic unit tested
- [ ] Regulatory consultant and accountant booked for Phase 2 and 4 reviews
