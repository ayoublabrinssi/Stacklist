# Stacklist — Codebase Audit Report

---

## 1. Project Understanding

**Purpose**: Stacklist is a B2B SaaS product discovery/marketplace — a static directory of curated software tools with category browsing, search/filter, and per-product detail pages with pricing.

**Tech Stack**:
- Framework: **Next.js 14/15** (Pages Router) with TypeScript
- Styling: **CSS Modules** + **Tailwind CSS** (loaded via `globals.css`)
- Data: **Static in-memory data** (`lib/data.ts`) — no database, no external API
- Tooling: ESLint (`next/core-web-vitals`, `next/typescript`), PostCSS

**Architecture**: Flat monolith — pages router, static generation (`getStaticProps`/`getStaticPaths`), all data served from a single hardcoded file. No backend, no auth, no external data fetching.

**Entry Point & Execution Flow**:
1. `pages/_app.tsx` → wraps every page in `<Navbar />` + `<Footer />`
2. `pages/index.tsx` → home page, featured products + category tabs
3. `pages/products/index.tsx` → full browseable/filterable product list
4. `pages/products/[slug].tsx` → individual product detail
5. `pages/category/[slug].tsx` → category-scoped product list
6. `lib/data.ts` → the single source of truth for all data (exported constants + query helpers)

---

## 2. Structure Analysis

**Overall**: Clean and well-organized for this scale. Separation of concerns is mostly respected.

| Aspect | Finding |
|---|---|
| Folder structure | ✅ Logical: `pages/`, `components/{ui,layout,filters,products}`, `lib/`, `types/` |
| Naming conventions | ✅ PascalCase components, camelCase helpers, consistent module CSS co-location |
| Separation of concerns | ⚠️ Minor violations (see §3) |
| Unused components | ⚠️ `Card.tsx` and `Input.tsx` exist in `components/ui/` but are **never imported** anywhere |
| `pages/api/hello.ts` | ⚠️ Default Next.js scaffold file left in production — serves `{ name: "John Doe" }` with no purpose |

---

## 3. File-by-File Analysis

### `lib/data.ts`
- **Purpose**: Single source of truth. Exports `CATEGORIES`, `PRODUCTS`, and helper functions.
- **Issues**:
  - All product `website` fields are `https://example.com/*` — placeholder data, not real.
  - `searchProducts()` (line 864) is a complete, correct helper but is **never called** anywhere. Client-side filtering in `pages/products/index.tsx` re-implements the same logic inline, creating duplication.
  - No slug uniqueness enforcement — duplicate slugs would silently cause wrong product to be served (first match wins in `find()`).
  - No ID uniqueness enforcement — IDs like `p-1`, `d-1`, `a-1`, `c-1` follow category-prefixed convention but this is not validated.
  - Rating values (e.g. `4.7`, `4.8`) are hardcoded floats with no validation against the `1–5` range stated in the type comment.

### `types/index.ts`
- **Purpose**: Shared TypeScript types for the whole app.
- **Issues**:
  - `Category` and `CategorySlug` are both separate union types but must always be kept in sync manually. Adding a new category requires changes in **4 places**: `Category`, `CategorySlug`, `CATEGORIES`, and `PRODUCTS` data — no single source of truth enforced by the type system.
  - `PricingTier.name` is `'Free' | 'Pro' | 'Enterprise'` — this means a product can't have non-standard tier names (e.g. "Starter", "Business") without a type change.
  - `rating` is typed as `number` with only a comment noting `1–5`. No validation is enforced at compile time or runtime.

### `pages/index.tsx`
- **Issues**:
  - `categoryProductCounts` (line 36–39) is computed **inside the render** on every re-render, calling `getProductsByCategory()` for each category on every tab click. Should be `useMemo`-wrapped or pre-computed in `getStaticProps`.
  - The `activeTab` filter (line 31–34) re-filters `featuredProducts` — not all products. A user selecting "Productivity" on the home page only sees featured productivity tools. If a category has no featured products, the result will be empty with no explanation to the user. This is a potential UX issue / logical confusion.
  - Hero stats ("16+ tools", "10k+ Reviews") are **hardcoded strings**, not derived from data. They will fall out of sync as data grows.
  - `getStaticProps` is declared with `const` but not exported with `export const` on the same line — it uses a separate `export { getStaticProps }` at line 26. This works, but is inconsistent with the other pages which use `export const getStaticProps`.

### `pages/products/index.tsx`
- **Issues**:
  - Duplicates the search logic already in `lib/data.ts#searchProducts()`. Should call the shared helper.
  - `products` is passed as a prop from `getStaticProps` and then used as the `useMemo` dependency, which means all filtering happens on the full dataset at all times. Fine for 16 products but unscalable.
  - The `sort` for `'featured'` case (line 50) only sorts by the boolean flag, but doesn't preserve any secondary stable sort — products within the same featured state have non-deterministic order.

### `pages/products/[slug].tsx`
- **Issues**:
  - `startingPrice` logic (lines 29–35) is **duplicated** verbatim from `ProductCard.tsx#getStartingPrice()`. Should be extracted to a shared utility.
  - `fallback: false` (line 14) means any slug not in `PRODUCTS` returns a 404 at build time. Fine for a static site, but means adding a new product requires a full rebuild — no ISR or `fallback: 'blocking'` strategy.

### `pages/category/[slug].tsx`
- **Issues**:
  - `productCountBySlug` (line 38–39) is defined **inside the render function** and accesses `PRODUCTS` directly — creating a tight coupling to the global data module from inside a page component. It's also re-created on every render with no memoization.
  - Like the product page, `fallback: false` is used — same rebuild caveat applies.
  - `params?.slug as string` (line 21) uses a type assertion without validation. If `slug` is an array (e.g. catch-all route edge case), this would be a runtime error. Safe here since it's `[slug]` not `[...slug]`, but the unsafe cast is a pattern to avoid.

### `pages/api/hello.ts`
- **Issues**:
  - **Leftover scaffold** — serves `{ name: "John Doe" }` to anyone who hits `/api/hello`. Should be deleted.
  - No HTTP method guard — responds to any method (GET, POST, DELETE, etc.).

### `components/layout/Navbar.tsx`
- **Issues**:
  - **Mobile menu button is non-functional** (line 52–60). It renders an SVG hamburger icon but has no `onClick`, no state management, no drawer/menu implementation. Clicking it does nothing. Users on mobile get a broken experience.
  - `NAV_LINKS` hardcodes all category slugs (lines 10–13). Adding a category requires updating this array manually — no derivation from `CATEGORIES`.
  - "Sign in" and "Get started" buttons both link to `/products` (lines 46, 49). Neither is a real auth flow.

### `components/layout/Footer.tsx`
- **Issues**:
  - Most footer links use `href="#"` — About, Blog, Careers, Press, Documentation, API Reference, Community, Support, Privacy Policy, Terms of Service, Cookie Policy are all dead links.
  - `FOOTER_LINKS` also hardcodes category slugs, same maintainability issue as Navbar.

### `components/products/ProductCard.tsx`
- **Issues**:
  - `categoryVariantMap` (lines 33–38) is defined **inside the component function body**, recreated on every render. Should be a constant outside the component.
  - `StarRating` only renders filled stars (`★`.repeat(...)), no empty stars. For a rating of 3.7 (rounds to 4), it shows `★★★★` with no visual indication the max is 5. `ProductDetail.tsx` correctly renders both filled and empty stars — inconsistency between the two.

### `components/products/ProductDetail.tsx`
- **Issues**:
  - Same `categoryVariantMap` problem as `ProductCard.tsx` — defined inside the component, duplicated logic.
  - `style={{ marginTop: 'var(--space-6)' }}` inline style (line 66) breaks the CSS Module pattern used everywhere else.
  - "Request Demo" button links to `href="#request-demo"` (in-page anchor — fine), but "Request Demo" in the bottom CTA section links to `href="#"` (broken link). These should be consistent.
  - "Start free trial" button also links to `href="#"` — placeholder CTA with no destination.

### `components/products/PricingTable.tsx`
- **Issues**:
  - Feature list keys use feature string content as `key` (line 72: `key={feature}`). If two features in a plan share the same text, React will warn about duplicate keys. Unlikely but fragile.
  - "14-day free trial" is mentioned in the subtitle (line 35–36) for ALL products universally. This is hardcoded and may not apply to every product in the catalog.
  - All CTA buttons link to `href="#"` (line 83) — no real checkout, sign-up, or routing.

### `components/filters/CategorySidebar.tsx`
- **Issues**:
  - Directly imports and accesses `PRODUCTS` from `lib/data` (line 3, 19, 22) to compute counts — bypasses the prop-passed `categories` data and creates a **hidden dependency on the global data module**. The component receives `categories` as props but fetches its own count data independently.
  - `countByCategory` is re-defined on every render with no memoization, iterating the full `PRODUCTS` array for each category render.

### `components/ui/Card.tsx`
- **Issues**:
  - Component is **never used** anywhere in the codebase.
  - When `onClick` is provided, `role="button"` is set but there is no `onKeyDown` handler — keyboard users cannot activate it with Enter/Space. Accessibility violation.

### `components/ui/Input.tsx`
- **Issues**:
  - Component is **never used** anywhere in the codebase.
  - Auto-generated `inputId` (line 26: `label?.toLowerCase().replace(...)`) could collide if two inputs share the same label text on a page. Not unique.

### `components/ui/Button.tsx`
- **Issues**:
  - External link detection relies on `href.startsWith('http')` (line 48). Protocol-relative URLs (`//example.com`) or `mailto:` / `tel:` links would be handled as internal Next.js `<Link>` — potential runtime error.

---

## 4. Dependency & Integration Check

| Finding | Details |
|---|---|
| `CategorySidebar` bypasses props | Imports `PRODUCTS` directly instead of using prop-passed data |
| `getStartingPrice` duplicated | Exists in both `ProductCard.tsx` and `pages/products/[slug].tsx` |
| `categoryVariantMap` duplicated | Defined identically in both `ProductCard.tsx` and `ProductDetail.tsx` |
| `searchProducts` unused | Defined in `lib/data.ts`, re-implemented inline in `pages/products/index.tsx` |
| `Card` and `Input` unused | Dead code |
| No circular deps detected | ✅ Clean import graph |
| Data coupling | Multiple components and pages import `PRODUCTS`/`CATEGORIES` directly from `lib/data`, bypassing consistent prop-passing |

---

## 5. Config & Environment Analysis

| File | Finding |
|---|---|
| `next.config.mjs` | Minimal — only `reactStrictMode: true`. No image domains, no redirects, no headers. |
| `package.json` | `"next": "^16.2.2"` — **Next.js 16 does not exist**. Current stable is 15.x. This likely resolves to a non-existent version and could cause install failures or be overridden by npm. |
| `package.json` | `"eslint-config-next": "^16.2.2"` — same invalid version issue |
| `package.json` | `name` is `"eval-fe-next"` — internal eval/test name, not updated to reflect the real project |
| `.gitignore` | Not reviewed in detail but standard Next.js scaffold is assumed |
| No `.env` files | ✅ No secrets to leak — but also means there is no environment-specific config at all |
| `tsconfig.json` | ✅ Strict mode enabled, `moduleResolution: bundler` — appropriate for Next.js 13+ |
| `tailwind.config.ts` | Tailwind is configured but Tailwind classes appear minimal in actual component files (CSS Modules are the primary pattern) |
| `postcss.config.mjs` | ✅ Standard |

---

## 6. Security Review

| Risk | Severity | Detail |
|---|---|---|
| No exposed secrets | ✅ N/A | Fully static — no API keys, no env vars used |
| `/api/hello` exposes unnecessary surface area | Minor | Unauthenticated, responds to all methods, returns dummy data |
| `href.startsWith('http')` to detect external links | Minor | `mailto:`, `tel:`, `//` URLs would be misclassified, sent to Next.js `<Link>` |
| All `example.com` website URLs | Informational | Not a security risk but all product `website` fields are placeholders |
| No input sanitization on search | Minor | Search input is never sent to a server — client-side only filter — so no injection risk. XSS risk is also low since React escapes output. |
| No CSP headers | Minor | No `Content-Security-Policy` header configured in `next.config.mjs` |
| No rate limiting on API | N/A | The only API route (`/api/hello`) has no business logic to protect |

---

## 7. Testing & Reliability

- **Zero tests exist** — no unit tests, no integration tests, no e2e tests.
- No test framework is configured (`jest`, `vitest`, `playwright`, etc. are absent from `package.json`).

**Critical untested paths**:
- `getStaticPaths` / `getStaticProps` data fetching logic
- All `lib/data.ts` query functions (`getProductBySlug`, `getProductsByCategory`, etc.)
- Client-side filter + sort logic in `pages/products/index.tsx`
- `Button` component's href-detection logic (especially external link branching)
- `Input` component's auto-ID generation (collision edge case)

---

## 8. Final Report — Issues by Severity

### 🔴 Critical

| # | Location | Issue |
|---|---|---|
| C1 | `package.json` | `next` version `^16.2.2` does not exist — could cause install failures in CI or fresh environments |
| C2 | `components/layout/Navbar.tsx:52` | Mobile hamburger menu is **completely non-functional** — no state, no handler, broken on mobile viewports |

### 🟠 Major

| # | Location | Issue |
|---|---|---|
| M1 | `lib/data.ts` | `searchProducts()` is dead code — client pages re-implement the same logic inline |
| M2 | `pages/products/[slug].tsx` + `ProductCard.tsx` | `getStartingPrice` logic is duplicated — one definition should be exported from `lib/data.ts` or a utils file |
| M3 | `ProductCard.tsx` + `ProductDetail.tsx` | `categoryVariantMap` defined identically inside both components — should be a shared constant |
| M4 | `CategorySidebar.tsx` | Bypasses props and directly accesses the global `PRODUCTS` to compute counts — hidden coupling |
| M5 | `pages/index.tsx:36` | `categoryProductCounts` re-computed on every render without `useMemo` |
| M6 | `components/ui/Card.tsx:28` | `role="button"` div has no `onKeyDown` handler — keyboard inaccessible (a11y violation) |
| M7 | `types/index.ts` | `Category` and `CategorySlug` are parallel types requiring manual sync — tight coupling with no type-system enforcement |
| M8 | `pages/index.tsx:31–34` | Filtering `featuredProducts` by category on the homepage can yield 0 results with no contextual message (only generic "No featured tools" shown) |

### 🟡 Minor

| # | Location | Issue |
|---|---|---|
| N1 | `pages/api/hello.ts` | Scaffold file should be deleted — serves no purpose, no method guard |
| N2 | `components/ui/Card.tsx` + `Input.tsx` | Unused components — dead code |
| N3 | `package.json` | `name` is `eval-fe-next` — should reflect actual project name |
| N4 | `Navbar.tsx` + `Footer.tsx` | Category slugs hardcoded — won't auto-update if categories change in `lib/data.ts` |
| N5 | `pages/index.tsx:58,77,85` | Hero stats ("16+", "10k+") are hardcoded strings — not derived from data |
| N6 | `Footer.tsx` | Nearly all links are `href="#"` — dead placeholder links |
| N7 | `ProductDetail.tsx:66` | Inline `style={{ marginTop: 'var(--space-6)' }}` violates the CSS Module convention used everywhere else |
| N8 | `ProductDetail.tsx:114,118` | Bottom CTA buttons link to `href="#"` — inconsistent with the in-page anchor used above |
| N9 | `PricingTable.tsx:35` | "14-day free trial" claim is hardcoded for **all** products regardless of whether each product actually offers one |
| N10 | `PricingTable.tsx:72` | Feature item `key` uses string content — potentially fragile if features share text |
| N11 | `ProductCard.tsx:12–17` | `StarRating` renders only filled stars — `ProductDetail.tsx` renders filled + empty, creating visual inconsistency |
| N12 | `Button.tsx:48` | External link detection via `href.startsWith('http')` misclassifies `mailto:`, `tel:`, `//` URLs |
| N13 | `pages/index.tsx:26` | `getStaticProps` export style inconsistent with other pages (separate `export {}` vs `export const`) |
| N14 | `lib/data.ts` | No slug/ID uniqueness validation — silent first-match behavior if data grows |
| N15 | `next.config.mjs` | No CSP or security headers configured |
| N16 | Throughout | **Zero tests** — no framework, no test files |
