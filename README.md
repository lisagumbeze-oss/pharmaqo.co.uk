# Pharmaqo — UK Supplement E-Commerce

> **Performance Fuel. Science Led.**

A monorepo powering [pharmaqo.co.uk](https://pharmaqo.co.uk) — a UK-based supplement store built on **Next.js 15**, **Medusa.js v2**, and **Payload CMS**.

---

## Architecture

```
pharmaqo.co.uk/
├── packages/
│   ├── config/              Brand name, shared tsconfigs, Prettier, ESLint
│   │   └── src/brand.config.ts   ← single source of truth
│   ├── ui/                  Design tokens, reusable React components
│   └── calculators/         Macro & serving calculator logic + unit tests
│
├── apps/
│   ├── storefront/          Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4
│   │   └── src/app/         Pages: home, shop, category, product, cart, checkout
│   ├── backend/             Medusa.js v2 · PostgreSQL · GBP + EUR regions
│   │   └── src/scripts/seed.ts
│   └── cms/                 Payload CMS v3 · Blog posts · Batch test reports
│
├── .github/workflows/ci.yml   Lint → Typecheck → Test → Build
├── .husky/pre-commit           lint-staged on commit
└── .lintstagedrc.json
```

## Design Tokens

| Token     | Value       | Usage                        |
| --------- | ----------- | ---------------------------- |
| `ink`     | `#0E1116`   | Primary text, dark surfaces  |
| `paper`   | `#F6F5F1`   | Page background              |
| `surface` | `#FFFFFF`   | Cards                        |
| `accent`  | `#19C3A6`   | CTAs, highlights, badges     |
| `accent-hover` | `#12A88E` | Hover state for accent    |
| `muted`   | `#5B6470`   | Secondary text               |
| `border`  | `#E3E1DA`   | Borders, dividers            |
| `success` | `#1F9D55`   | Positive states              |
| `warning` | `#D98A00`   | Alerts, low stock            |
| `error`   | `#D64545`   | Errors, stimulant badges     |

**Fonts:** Inter (body) · Barlow Condensed (headings, uppercase, +2% tracking)
**Type scale:** 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48 · 64 px
**Spacing:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px
**Radii:** 6 (inputs) · 12 (cards) · 999 (pills)
**Shadows:** `0 1px 2px` (sm) · `0 8px 24px` (md)

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (`npm install -g pnpm`)
- **PostgreSQL** 15+ (local or Docker)

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/your-org/pharmaqo.co.uk.git
cd pharmaqo.co.uk
pnpm install
```

### 2. Set up environment files

```bash
cp apps/storefront/.env.example apps/storefront/.env.local
cp apps/backend/.env.example apps/backend/.env
cp apps/cms/.env.example apps/cms/.env
```

Edit each `.env` file with your database URLs and secrets.

### 3. Create databases

```bash
createdb pharmaqo_medusa
createdb pharmaqo_cms
```

Or via Docker:

```bash
docker run -d --name pharmaqo-pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 postgres:15-alpine

docker exec pharmaqo-pg createdb -U postgres pharmaqo_medusa
docker exec pharmaqo-pg createdb -U postgres pharmaqo_cms
```

### 4. Run migrations & seed

```bash
pnpm --filter backend db:migrate
pnpm seed
```

### 5. Run tests

```bash
pnpm test
```

### 6. Start development

```bash
# Terminal 1 — Backend (port 9000)
pnpm dev:backend

# Terminal 2 — Storefront (port 3000)
pnpm dev:storefront

# Terminal 3 — CMS (port 3001)
pnpm dev:cms
```

## Changing the Brand

All brand identity lives in [`packages/config/src/brand.config.ts`](./packages/config/src/brand.config.ts):

```ts
export const brand = {
  name: 'Pharmaqo',
  tagline: 'Performance Fuel. Science Led.',
  support: { email: 'hello@pharmaqo.co.uk' },
  currency: 'GBP',
  colors: { ink: '#0E1116', paper: '#F6F5F1', accent: '#19C3A6', ... },
  // ...
}
```

Change values here → every app in the monorepo updates.

## Calculators

Pure TypeScript in `packages/calculators/`, unit tested with Vitest:

- **Macro Calculator** — Mifflin-St Jeor RMR × activity factor × goal adjustment (+10% build, −15% cut)
- **Serving Calculator** — body weight × goal-based protein target ÷ protein per serving, capped at label max

```bash
pnpm test              # run all calculator tests
pnpm test:coverage     # with coverage report
```

## Product Guidelines

All products are **legal, over-the-counter food supplements**:

- ✅ Protein, creatine, vitamins, amino acids, caffeine pre-workouts
- ❌ No prescription medicines
- ❌ No controlled substances
- ❌ No hormonal products (SARMs, prohormones, testosterone boosters)

## Scripts Reference

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `pnpm dev:storefront`   | Next.js dev server (port 3000)                  |
| `pnpm dev:backend`      | Medusa dev server (port 9000)                   |
| `pnpm dev:cms`          | Payload CMS dev (port 3001)                     |
| `pnpm build`            | Build all workspaces                            |
| `pnpm build:storefront` | Build Next.js for production                    |
| `pnpm build:backend`    | Build Medusa for production                     |
| `pnpm build:cms`        | Build Payload CMS                               |
| `pnpm seed`             | Seed the Medusa database                        |
| `pnpm test`             | Run calculator unit tests                       |
| `pnpm test:coverage`    | Tests with coverage report                      |
| `pnpm lint`             | Lint all workspaces                             |
| `pnpm typecheck`        | Type-check all workspaces                       |
| `pnpm format`           | Prettier format all files                       |

## CI/CD

GitHub Actions runs on every push/PR to `main`:

1. **Lint** — ESLint across all workspaces
2. **Typecheck** — TypeScript `--noEmit` across all workspaces
3. **Test** — Vitest calculator tests
4. **Build** — storefront + backend production builds

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Storefront | Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS v4 |
| Backend | Medusa.js v2, PostgreSQL, manual fulfillment |
| CMS | Payload CMS v3, Lexical editor, PostgreSQL |
| Design System | `@pharmaqo/ui` — tokens, components, clsx |
| Calculators | `@pharmaqo/calculators` — Mifflin-St Jeor, serving calc |
| Config | `@pharmaqo/config` — brand, tsconfigs, Prettier |
| Tooling | pnpm workspaces, ESLint flat config, Prettier, Husky, lint-staged |
| CI | GitHub Actions |
| Fonts | Inter, Barlow Condensed (Google Fonts) |
| Icons | Lucide React |

## License

Private — all rights reserved.
