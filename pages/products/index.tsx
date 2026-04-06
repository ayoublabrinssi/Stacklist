import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';
import type { Product, CategoryMeta, CategorySlug, SortOption } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { searchProducts } from '@/lib/utils';
import ProductGrid from '@/components/products/ProductGrid';
import { categoryCardConfig } from '@/lib/categoryIcons';

interface ProductsPageProps {
  products: Product[];
  categories: CategoryMeta[];
}

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  return {
    props: {
      products: PRODUCTS,
      categories: CATEGORIES,
    },
  };
};

const ProductsPage: NextPage<ProductsPageProps> = ({ products, categories }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('featured');

  // Pre-fill search from ?search= query param (e.g. from tag chip clicks)
  useEffect(() => {
    if (router.isReady && typeof router.query.search === 'string') {
      setSearch(router.query.search);
    }
  }, [router.isReady, router.query.search]);

  const categoryCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((acc, p) => {
      acc[p.categorySlug] = (acc[p.categorySlug] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }

    if (search.trim()) {
      result = searchProducts(result, search);
    }

    switch (sort) {
      case 'featured':
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, search, activeCategory, sort]);

  const activeCategoryName = activeCategory === 'all'
    ? null
    : categories.find((c) => c.slug === activeCategory)?.name;

  return (
    <>
      <Head>
        <title>Browse All B2B Tools — Stacklist</title>
        <meta
          name="description"
          content="Browse 16+ vetted B2B SaaS tools across productivity, DevTools, analytics, and CRM. Filter by category, search by use case."
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse all tools
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {products.length} vetted B2B SaaS tools across {categories.length} categories
          </p>
        </div>

        {/* ── Toolbar: Search + Sort ── */}
        <div className="flex flex-row items-center gap-2 mb-5">
          {/* Search */}
          <div className="relative flex items-center flex-1 group">
            <span className="absolute left-3 text-slate-400 group-focus-within:text-brand-500 transition-colors pointer-events-none" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6" />
                <path d="M12.5 12.5l3.5 3.5" />
              </svg>
            </span>
            <input
              type="search"
              className="w-full h-10 pl-9 pr-9 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, tag, or keyword…"
              aria-label="Search products"
            />
            {search && (
              <button
                className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort — icon-only on mobile, icon+text on sm+ */}
          <div className="relative shrink-0">
            {/* Filter icon (left side) */}
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none h-10 bg-white border border-slate-200 rounded-lg py-0 pl-8 pr-8 sm:pr-9 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300 transition-all w-10 sm:w-auto text-transparent sm:text-slate-700"
            >
              <option value="featured">Featured first</option>
              <option value="rating">Highest rated</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
            {/* Chevron (visible on sm+) */}
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* ── Category pills (horizontal) ── */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all duration-150 ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            All
            <span className={`rounded-full px-1.5 py-px text-[10px] font-bold leading-none ${
              activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {products.length}
            </span>
          </button>

          {categories.map((cat) => {
            const config = categoryCardConfig[cat.slug];
            return (
              <button
                key={cat.slug}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all duration-150 ${
                  activeCategory === cat.slug
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {config && (
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded ${
                    activeCategory === cat.slug ? 'text-white/80' : ''
                  }`}>
                    <span className="scale-[0.35]">{config.icon}</span>
                  </span>
                )}
                {cat.name}
                <span className={`rounded-full px-1.5 py-px text-[10px] font-bold leading-none ${
                  activeCategory === cat.slug ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {categoryCounts[cat.slug] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results info ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
            {activeCategoryName && (
              <> in <span className="font-semibold text-slate-700">{activeCategoryName}</span></>
            )}
            {search && (
              <> for <span className="font-semibold text-slate-700">&ldquo;{search}&rdquo;</span></>
            )}
          </p>
          {(search || activeCategory !== 'all') && (
            <button
              type="button"
              className="text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors"
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Product grid ── */}
        <ProductGrid
          products={filtered}
          emptyMessage="No tools found. Try adjusting your search or clearing the filters."
        />
      </div>
    </>
  );
};

export default ProductsPage;
