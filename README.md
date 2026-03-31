# Stacklist

A B2B SaaS marketplace for discovering, comparing, and adopting the right tools to scale your team. Built as a realistic Next.js 14 product simulation.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS + CSS Modules |
| Data | Static mock data (`lib/data.ts`) |
| Rendering | `getStaticProps` / `getStaticPaths` |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or open the project
cd eval-fe-next

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
eval-fe-next/
├── components/
│   ├── filters/          # SearchBar, CategorySidebar, FilterTag
│   ├── layout/           # Navbar, Footer, PageContainer
│   ├── products/         # ProductCard, ProductGrid, ProductDetail, PricingTable
│   └── ui/               # Button, Badge, Card, Input, Tag
├── lib/
│   └── data.ts           # 16 mock products, 4 categories, utility fns
├── pages/
│   ├── _app.tsx          # App shell with Navbar + Footer
│   ├── index.tsx         # Homepage (hero, featured grid, category cards)
│   ├── products/
│   │   ├── index.tsx     # Full product listing with search + sidebar filter
│   │   └── [slug].tsx    # Individual product detail page
│   └── category/
│       └── [slug].tsx    # Category-filtered product listing
├── styles/
│   ├── globals.css       # Tailwind directives + base resets
│   ├── tokens.css        # CSS custom properties (design tokens)
│   ├── Home.module.css
│   ├── Products.module.css
│   └── Category.module.css
└── types/
    └── index.ts          # All TypeScript interfaces and types
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, featured product grid (tabbed by category), and category cards |
| `/products` | Full product catalog with live search, sidebar category filter, and sort |
| `/products/[slug]` | Product detail: description, tags, pricing tier table, request demo CTA |
| `/category/[slug]` | Category-filtered product listing with hero and cross-links |

## Data Model

All products live in `lib/data.ts`. Each product has:

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;           // 'Productivity' | 'DevTools' | 'Analytics' | 'CRM'
  categorySlug: CategorySlug;
  tags: string[];
  logoPlaceholder: { initials: string; color: string };
  pricingTiers: PricingTier[];  // Free / Pro / Enterprise
  featured: boolean;
  rating: number;
  reviewCount: number;
  website: string;
}
```

**16 products across 4 categories:**

- **Productivity** — FlowDesk, NotionFlow, CalStack, Slipbox
- **DevTools** — PipeForge, LogPilot, SeedEnv, ReviewHub
- **Analytics** — Lumiq, Trackly, PulseBoard, SegFlow
- **CRM** — DealPath, SupportIQ, Onboardly, ChurnGuard

## Design System

CSS custom properties are defined in `styles/tokens.css` and cover:

- **Colors** — brand palette (indigo), neutrals, semantic, per-category
- **Typography** — font sizes, weights, line heights
- **Spacing** — `--space-1` through `--space-24`
- **Borders** — radii, widths, colors
- **Shadows** — `xs` through `xl`
- **Transitions** — fast / base / slow

Components use CSS Modules for scoped styles, with Tailwind utilities used sparingly for layout and one-off adjustments.

## Component Conventions

- All components are fully typed with TypeScript interfaces
- No `any` types used
- Props with sane defaults; no required props where sensible defaults exist
- CSS Modules named `ComponentName.module.css` alongside the component
- UI primitives live in `components/ui/`, domain components in their respective folders

## Data Fetching

- `getStaticProps` is used on all listing pages and the homepage
- `getStaticPaths` is used on `[slug]` routes to pre-render all product and category pages at build time
- All pages are fully statically generated — no runtime API calls
- Client-side filtering (search, category, sort) on the products listing page is done with `useMemo`
