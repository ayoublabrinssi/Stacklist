# Stacklist — Prioritized Fix Plan

---

## 🔴 Critical

---

### C1 — React / Next.js Version Mismatch

**Problem**
The project runs `next@16.2.2` with `react@18.3.1` / `react-dom@18.3.1`. Next.js 16 requires React 19 — React 18 is not a supported peer dependency for this version.

**Impact**
Unsupported configuration. Causes runtime instability, potential hook/concurrent-mode breakage, and will produce peer dependency warnings on every install. May silently cause subtle rendering bugs.

**Fix**
- **Upgrade React to 19 (Required)**
  ```
  npm install react@19 react-dom@19 @types/react@19 @types/react-dom@19
  ```
  Verify no third-party library in [package.json](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/package.json) pins to React 18 before upgrading.
  *(Note: Downgrading Next.js is not an option as Next.js 16 is the required targeted version.)*
- Also fix `"name": "eval-fe-next"` → `"stacklist"` in [package.json](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/package.json)
- Run `npm install` and verify no peer dependency errors remain

**Files**: [package.json](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/package.json)

**Implementation Notes**
React 19 introduced breaking changes to refs (no more `forwardRef` in most cases) and some hook behaviors. Run `tsc --noEmit` and the full build (`next build`) after upgrading to surface any breakage. This project has no complex third-party UI libs so Option A should be low-risk.

---

### C2 — Implement Mobile Navigation Menu

**Problem**
The hamburger button in [Navbar.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/layout/Navbar.tsx) renders with no `onClick`, no state, and no menu — completely non-functional on mobile.

**Impact**
All mobile users cannot navigate beyond the current page. Critical UX breakage.

**Fix**
- Add `const [menuOpen, setMenuOpen] = useState(false)` to [Navbar](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/layout/Navbar.tsx#16-66)
- Wire `onClick={() => setMenuOpen(o => !o)}` to the hamburger button
- Add `aria-expanded={menuOpen}` to the button
- Render a mobile nav drawer/overlay conditionally: `{menuOpen && <MobileMenu links={NAV_LINKS} onClose={() => setMenuOpen(false)} />}`
- Style the drawer in [Navbar.module.css](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/layout/Navbar.module.css) (slide-in or overlay pattern)

**Files**: [components/layout/Navbar.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/layout/Navbar.tsx), [components/layout/Navbar.module.css](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/layout/Navbar.module.css)

**Notes**: Can be a simple `<div>` overlay listing links — does not need to be a complex component.

---

### C3 — Client-Side Bundle Bloat (Scalability Bottleneck)

**Problem**
The entire `PRODUCTS` dataset in `lib/data.ts` is imported directly into client components (e.g., client-side search in `pages/products/index.tsx`, `pages/index.tsx`, `CategorySidebar`). Because this is a static directory without a backend, the entire "database" is shipped directly in the initial client-side JavaScript bundle.

**Impact**
As the product list grows, shipping the database into the browser will cause severe performance degradation and ballooning JS bundle sizes. Initial page load will slow to a crawl.

**Fix**
- Remove direct imports of `PRODUCTS` from all client components.
- Move search and filter logic either to an API route (e.g., `/api/products`) and fetch data client-side, OR implement Server-Side Rendering (`getServerSideProps`) to perform queries on the server.
- Ensure `getStaticProps` only passes down the necessary subset of data rather than the full raw dataset.

**Files**: `pages/products/index.tsx`, `pages/index.tsx`, `components/filters/CategorySidebar.tsx`, `pages/api/products.ts` [NEW]

---

## 🟠 Major

---

### M1 + M2 + (N12) — Centralize Shared Utilities into `lib/utils.ts`

**Problem**
Three pieces of logic are duplicated across files:
1. [getStartingPrice()](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx#20-31) exists in both [ProductCard.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx) and [pages/products/[slug].tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/products/%5Bslug%5D.tsx)
2. `categoryVariantMap` is defined identically in both [ProductCard.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx) and [ProductDetail.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductDetail.tsx)
3. [searchProducts()](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/lib/data.ts#864-875) in [lib/data.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/lib/data.ts) is never called; the page re-implements it inline

**Impact**
Any change to pricing or category logic must be made in 2+ places. Silent divergence risk.

**Fix**
- Create `lib/utils.ts`
- Move [getStartingPrice(product: Product): string](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx#20-31) there and export it
- Export `const CATEGORY_VARIANT_MAP: Record<CategorySlug, BadgeVariant>` as a constant
- Delete the inline duplicates in [ProductCard](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx#32-106) and [ProductDetail](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductDetail.tsx#14-125).
- *(Note: Do not simply reuse `searchProducts()` on the client for `pages/products/index.tsx` as this will exacerbate the C3 Bundle Bloat issue. Move search to the server/API layer instead.)*

**Files**: `lib/utils.ts` [NEW], [components/products/ProductCard.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductCard.tsx), [components/products/ProductDetail.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/products/ProductDetail.tsx), [pages/products/[slug].tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/products/%5Bslug%5D.tsx), [pages/products/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/products/index.tsx)

---

### M3 — Decouple [CategorySidebar](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#14-65) from Global Data

**Problem**
[CategorySidebar](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#14-65) imports `PRODUCTS` directly from `lib/data` to compute per-category counts, ignoring prop-passed data and creating a hidden global dependency.

**Impact**
Violates the component contract (props in → UI out). Makes the component impossible to test or reuse with different data.

**Fix**
- Remove the `import { PRODUCTS }` from [CategorySidebar.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx)
- Add a `counts: Record<CategorySlug | 'all', number>` prop to [CategorySidebarProps](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#8-13)
- Compute the counts in [pages/products/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/products/index.tsx)'s [getStaticProps](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx#17-25) (or with `useMemo`) and pass them down
- Use `counts[cat.slug]` inside the component instead of filtering `PRODUCTS`

**Files**: [components/filters/CategorySidebar.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx), [pages/products/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/products/index.tsx)

---

### M4 — Memoize Expensive Render-Phase Computations

**Problem**
- `categoryProductCounts` in [pages/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx) calls [getProductsByCategory()](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/lib/data.ts#852-855) per category on every render
- [countByCategory](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#21-23) in [CategorySidebar](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#14-65) iterates all products per category per render
- [productCountBySlug](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/category/%5Bslug%5D.tsx#38-40) in [pages/category/[slug].tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/category/%5Bslug%5D.tsx) is re-defined in the render function

**Impact**
Unnecessary recomputation on every re-render. Minor perf now, significant if data grows.

**Fix**
- [pages/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx): wrap `categoryProductCounts` in `useMemo(() => ..., [categories])`
- [CategorySidebar](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/filters/CategorySidebar.tsx#14-65): remove once M3 is applied (counts become a prop)
- [pages/category/[slug].tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/category/%5Bslug%5D.tsx): compute [productCountBySlug](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/category/%5Bslug%5D.tsx#38-40) in [getStaticProps](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx#17-25) and pass as a prop, or at minimum extract as a `useMemo`

**Files**: [pages/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx), [pages/category/[slug].tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/category/%5Bslug%5D.tsx)

---

### M5 — Fix Keyboard Accessibility on [Card](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/ui/Card.tsx#15-35) Component

**Problem**
[Card.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/ui/Card.tsx) sets `role="button"` when an `onClick` is provided but has no `onKeyDown` handler. Keyboard users cannot activate it.

**Impact**
WCAG 2.1 violation (Success Criterion 2.1.1 Keyboard). Users relying on keyboard navigation cannot interact with clickable cards.

**Fix**
- Add `onKeyDown` handler to [Card](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/ui/Card.tsx#15-35):
  ```ts
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
  ```
- Add `tabIndex={onClick ? 0 : undefined}` (already present — confirm it's wired correctly)

**Files**: [components/ui/Card.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/components/ui/Card.tsx)

---

### M6 — Enforce Category Type Consistency

**Problem**
[Category](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts#1-2) (display names) and [CategorySlug](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts#3-4) (URL slugs) are two separate union types in [types/index.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts) that must always be kept in sync manually. This is an implicit invariant with no compiler enforcement.

**Impact**
Adding a new category requires changes in 4+ places with no type-system guardrail.

**Fix**
- Define a single source of truth object:
  ```ts
  export const CATEGORY_MAP = {
    productivity: 'Productivity',
    devtools: 'DevTools',
    analytics: 'Analytics',
    crm: 'CRM',
  } as const;
  export type CategorySlug = keyof typeof CATEGORY_MAP;
  export type Category = (typeof CATEGORY_MAP)[CategorySlug];
  ```
- Update [lib/data.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/lib/data.ts) `CATEGORIES` to derive from `CATEGORY_MAP`
- Remove the separate [Category](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts#1-2) and [CategorySlug](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts#3-4) union type definitions

**Files**: [types/index.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/types/index.ts), [lib/data.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/lib/data.ts)

**Notes**: This is a non-trivial refactor. Ensure all usages compile after the change. TypeScript will catch any missed site.

---

### M7 — Fix Homepage Empty Category Tab State

**Problem**
On the homepage, clicking a category tab filters `featuredProducts` — not all products. A category with no featured products silently shows "No featured tools in this category yet" with no path forward for the user.

**Impact**
Dead-end UX. Users have no way to discover non-featured tools in that category from the home page.

**Fix**
- Either: show the count of **featured** products per tab (not total) — if 0, hide or disable the tab
- Or: link the tab to `/category/${cat.slug}` instead of filtering in-place when count is 0
- Add a "See all {cat.name} tools →" link below the empty state pointing to `/category/${cat.slug}`

**Files**: [pages/index.tsx](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/index.tsx)

---

### M8 — Missing OpenGraph / SEO Meta Tags

**Problem**
`pages/_app.tsx` and individual pages lack `og:title`, `og:description`, `og:image`, and `twitter:` card fallbacks.

**Impact**
For a B2B SaaS directory, SEO and social sharing are critical. Missing tags severely harm discoverability and link-sharing UX.

**Fix**
- Add global fallback `<meta>` tags in a custom `_document.tsx` or `_app.tsx`.
- Ensure dynamic `og:` tags exist on `[slug].tsx` and category pages.

**Files**: `pages/_app.tsx`, `pages/_document.tsx` [NEW], all page files

---

## 🟡 Minor

---

### N1 — Delete [pages/api/hello.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/api/hello.ts)

**Problem**
Default Next.js scaffold file — exposes a useless endpoint with no method guard.

**Fix**
Delete [pages/api/hello.ts](file:///Users/ayoublabrinssi/Documents/dev/Stacklist/pages/api/hello.ts). If no other API routes exist, delete `pages/api/` entirely.

**Files**: `pages/api/hello.ts` [DELETE]

---

### N2 — Remove Dead Components `Card` and `Input`

**Problem**
`Card.tsx` and `Input.tsx` are never imported anywhere. They are dead code.

**Fix**
- Search codebase for any import of `Card` or `Input` to confirm zero usage
- Delete `components/ui/Card.tsx`, `components/ui/Card.module.css`, `components/ui/Input.tsx`, `components/ui/Input.module.css`

**Notes**: Only delete after confirming no usage. If there are future plans for these, leave with a `// TODO: not yet used` comment instead.

---

### N3 — Derive Hero Stats from Data

**Problem**
`pages/index.tsx` hardcodes `"16+"` and `"10k+"` — these will silently become stale.

**Fix**
- Replace `"16+"` with `{products.length}+` (or `{featuredProducts.length}`)
- Replace `"10k+"` with a computed total from `products.reduce((acc, p) => acc + p.reviewCount, 0)`
- Format with `toLocaleString()` for readability

**Files**: `pages/index.tsx`

---

### N4 — Derive Navbar and Footer Links from `CATEGORIES`

**Problem**
`Navbar.tsx` and `Footer.tsx` hardcode category slugs/names. Adding a category to `lib/data.ts` won't update the nav automatically.

**Fix**
- Import `CATEGORIES` from `lib/data` in both `Navbar.tsx` and `Footer.tsx`
- Replace the hardcoded category entries with `.map(cat => ({ href: '/category/' + cat.slug, label: cat.name }))`
- Keep static non-category links (Home, Browse Tools) hardcoded

**Files**: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`

---

### N5 — Fix `ProductCard` Star Rating Display

**Problem**
`StarRating` in `ProductCard.tsx` only shows filled stars (e.g. `★★★★` for 4.7) with no visual max. `ProductDetail.tsx` correctly shows both filled and empty stars.

**Fix**
- Update `StarRating` in `ProductCard.tsx` to match the `ProductDetail` pattern:
  ```tsx
  {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
  ```

**Files**: `components/products/ProductCard.tsx`

---

### N6 — Fix `Button` External Link Hydration Risk

**Problem**
`href.startsWith('http')` misclassifies `mailto:`, `tel:`, and `//` URLs as internal Next.js links. Additionally, resolving routing strategy (`<a>` vs `<Link>`) with a runtime check creates potential hydration mismatch risks if URLs are generated dynamically.

**Fix**
- Replace the detection with:
  ```ts
  const isExternal = /^(https?:\/\/|mailto:|tel:|\/\/)/.test(href);
  ```
- Ensure URL validation is deterministic during both SSR and CSR.

**Files**: `components/ui/Button.tsx`

---

### N7 — Fix Inconsistent `getStaticProps` Export Style

**Problem**
`pages/index.tsx` uses `const getStaticProps = ...` + `export { getStaticProps }` (two statements). All other pages use `export const getStaticProps`.

**Fix**
Change `pages/index.tsx` line 17 to `export const getStaticProps: GetStaticProps<HomeProps> = async () => ...` and remove the separate `export { getStaticProps }` on line 26.

**Files**: `pages/index.tsx`

---

### N8 — Remove Inline Style in `ProductDetail`

**Problem**
`style={{ marginTop: 'var(--space-6)' }}` on line 66 of `ProductDetail.tsx` breaks the CSS Module convention.

**Fix**
Move the margin to `ProductDetail.module.css` under the `.heroCta` class.

**Files**: `components/products/ProductDetail.tsx`, `components/products/ProductDetail.module.css`

---

### N9 — Harden `PricingTable` Feature Key and Static Copy

**Problem**
- Feature `key={feature}` will warn if two features in one tier share text
- "14-day free trial" subtitle is hardcoded for all products universally

**Fix**
- Change key to `key={`${tier.name}-${index}`}` using the loop index alongside tier name
- Add an optional `trialDays?: number` field to `PricingTier` type, and conditionally render the trial copy

**Files**: `components/products/PricingTable.tsx`, `types/index.ts`

---

### N10 — Add CSP and Security Headers

**Problem**
No security headers are configured in `next.config.mjs`.

**Fix**
Add a `headers()` async function in `next.config.mjs`:
```js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }];
}
```
A full CSP can be added later once all external resources are inventoried.

**Files**: `next.config.mjs`

---

### N11 — Add a Test Suite

**Problem**
Zero tests. No framework configured.

**Fix**
- Add `vitest` + `@testing-library/react` (or `jest` if preferred):
  - `npm install -D vitest @testing-library/react @testing-library/jest-dom`
- Write unit tests first for pure functions: `getStartingPrice`, `searchProducts`, `getProductBySlug`, `getCategoryBySlug`
- Add at minimum one render test per page component (`ProductCard`, `ProductGrid`)
- Add `"test": "vitest"` to `package.json` scripts

**Files**: `package.json`, `lib/utils.test.ts` [NEW], `lib/data.test.ts` [NEW]

---

### N12 — Button Component Type Unsafety

**Problem**
`Button.tsx` infers if it's a link or button solely by checking if `href !== undefined` using a generic union type. While it works, this is brittle.

**Fix**
- Refactor the component to use a strictly typed discriminative prop (e.g. `as="button" | "a"`) or implement a standard polymorphic component pattern.

**Files**: `components/ui/Button.tsx`

---

## 🚀 Execution Strategy

### Phase 1 — Critical Fixes *(do immediately)*
| Fix | Risk | Effort |
|---|---|---|
| C1: Upgrade React to 19 | Medium | 15–30 min |
| C2: Implement mobile menu | Low | 1–2 hrs |
| C3: Fix Client-Side Bundle Bloat | Medium | 1-2 hrs |

### Phase 2 — Quick Wins *(low risk, high value)*
| Fix | Risk | Effort |
|---|---|---|
| N1: Delete `hello.ts` | None | 1 min |
| N2: Delete `Card` + `Input` | None | 2 min |
| N7: Fix `getStaticProps` export | None | 2 min |
| N8: Move inline style to CSS | None | 5 min |
| N5: Fix `StarRating` in `ProductCard` | None | 2 min |
| N6: Fix `Button` URL detection | None | 2 min |
| N3: Derive hero stats from data | None | 10 min |
| N10: Add security headers | None | 10 min |

### Phase 3 — Refactoring *(moderate effort, significant improvement)*
| Fix | Risk | Effort |
|---|---|---|
| M1+M2: Create `lib/utils.ts` | Low | 30 min |
| M3: Decouple `CategorySidebar` | Medium | 45 min |
| M4: Add `useMemo` for counts | Low | 20 min |
| M8: Add OpenGraph/SEO Tags | Low | 30 min |
| N4: Derive nav links from data | Low | 20 min |
| N9: Harden `PricingTable` | Low | 15 min |
| N12: Button Type Unsafety | Low | 15 min |

### Phase 4 — Structural Refactors *(higher risk, do last)*
| Fix | Risk | Effort |
|---|---|---|
| M6: Unify `Category`/`CategorySlug` types | **High** — touches all files | 1–2 hrs |
| M7: Fix homepage empty category state | Low-Medium | 30 min |
| M5: Keyboard fix on `Card` | Low | 15 min |

### Phase 5 — Testing *(ongoing)*
| Fix | Risk | Effort |
|---|---|---|
| N11: Add test suite | Low | Half a day to get started |

---

### ⚠️ Highest Breakage Risk
1. **C1 (React/Next version mismatch)** — Upgrade React first, then run `next build` and `tsc --noEmit` to catch any React 19 breaking changes before doing anything else.
2. **C3 (Bundle Bloat / API Migration)** — Moving `PRODUCTS` to the API layer requires rewriting data fetching on several client pages. Check network waterfalls.
3. **M6 (Category type unification)** — touches `types/`, `lib/data.ts`, and every component that references `Category` or `CategorySlug`. Run `tsc --noEmit` after each change.
3. **M3 (CategorySidebar decoupling)** — changes the component API; the parent page must be updated atomically.
