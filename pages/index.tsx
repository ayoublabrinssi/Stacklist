import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { Product, CategoryMeta } from '@/types';
import { CATEGORIES, PRODUCTS, getFeaturedProducts, getProductsByCategory } from '@/lib/data';
import Button from '@/components/ui/Button';
import FilterTag from '@/components/filters/FilterTag';
import ProductGrid from '@/components/products/ProductGrid';
import FeaturesSection from '@/components/sections/FeaturesSection';
import { categoryCardConfig } from '@/lib/categoryIcons';

interface HomeProps {
  featuredProducts: Product[];
  categories: CategoryMeta[];
  totalProducts: number;
  totalReviews: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      featuredProducts: getFeaturedProducts(),
      categories: CATEGORIES,
      totalProducts: PRODUCTS.length,
      totalReviews: PRODUCTS.reduce((acc, p) => acc + p.reviewCount, 0),
    },
  };
};

const Home: NextPage<HomeProps> = ({ featuredProducts, categories, totalProducts, totalReviews }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const displayProducts =
    activeTab === 'all'
      ? featuredProducts
      : featuredProducts.filter((p) => p.categorySlug === activeTab);

  const categoryProductCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = getProductsByCategory(cat.slug).length;
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Stacklist — Discover the Best B2B SaaS Tools</title>
        <meta
          name="description"
          content="Stacklist is the B2B SaaS marketplace for discovering, comparing, and adopting the right tools to scale your business."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-400 opacity-[0.15] blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-200 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-[pulse_2s_ease-in-out_infinite]" />
            {totalProducts}+ tools across {categories.length} categories
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black text-slate-900 tracking-tight leading-[1.05] max-w-4xl mb-6">
            Find the right <span className="text-brand-600 relative inline-block">B2B tools
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-brand-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 8 Q 20 2 50 5 T 100 8" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
              </svg>
            </span> for your team
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10 font-medium">
            Stacklist is the definitive B2B SaaS marketplace to discover, compare, and adopt the tools that scale your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-16">
            <Button href="/products" size="lg" variant="primary" className="sm:w-auto w-full px-10 shadow-xl shadow-brand-100">
              Browse all tools →
            </Button>
            <Button href="/category/devtools" size="lg" variant="secondary" className="sm:w-auto w-full px-8">
              Explore DevTools
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-10 border-t border-slate-100 w-full max-w-4xl">
            <div className="text-center group">
              <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1 transition-transform group-hover:scale-110 duration-300">{totalProducts}+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tools listed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1 transition-transform group-hover:scale-110 duration-300">{categories.length}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1 transition-transform group-hover:scale-110 duration-300">{Math.floor(totalReviews / 1000)}k+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Reviews</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-brand-600 tracking-tighter mb-1 transition-transform group-hover:scale-110 duration-300 tracking-tight">Free</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Category tabs + featured grid */}
      <section className="py-10 sm:py-14 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-2">Featured</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Featured tools</h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:gap-2 transition-all">
            View all →
          </Link>
        </div>

        <div
          className="flex gap-2 mb-8 overflow-x-auto sm:flex-wrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1"
          role="tablist"
          aria-label="Filter by category"
        >
          <FilterTag
            label="All"
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          />
          {categories.map((cat) => (
            <FilterTag
              key={cat.slug}
              label={cat.name}
              count={featuredProducts.filter((p) => p.categorySlug === cat.slug).length}
              active={activeTab === cat.slug}
              onClick={() => setActiveTab(cat.slug)}
            />
          ))}
        </div>

        <div className="mb-6">
          <ProductGrid
            products={displayProducts}
            emptyMessage={
              <>
                No featured tools in this category yet. Check back soon!<br /><br />
                {activeTab !== 'all' && (
                  <Link
                    href={`/category/${activeTab}`}
                    className="text-brand-600 font-medium underline hover:text-brand-700"
                  >
                    See all {categories.find((c) => c.slug === activeTab)?.name} tools →
                  </Link>
                )}
              </>
            }
          />
        </div>
      </section>

      {/* Category promo cards */}
      <section className="py-14 sm:py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">Categories</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Browse by category</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Each category is hand-curated with the top-rated tools in that space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const config = categoryCardConfig[cat.slug as keyof typeof categoryCardConfig];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group relative flex flex-col bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1   no-underline ${config.hoverBorder}`}
                >
                  {/* Decorative background figure */}
                  {config.figure}

                  {/* Icon */}
                  <div className={`relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${config.iconStyle}`}>
                    {config.icon}
                  </div>

                  <h3 className="relative z-10 text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="relative z-10 text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                    {cat.description}
                  </p>

                  {/* Footer */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400">
                      {categoryProductCounts[cat.slug]} tools
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-brand-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      Explore
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Banner */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-500 opacity-20 blur-[100px]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Ready to build your stack?</h2>
          <p className="text-lg sm:text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Compare tools, read honest reviews, and find the right fit for your team — free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/products" size="lg" variant="primary" className="sm:w-auto w-full">
              Start exploring →
            </Button>
            <Button href="/coming-soon" size="lg" className="sm:w-auto w-full !bg-white/15 !text-white !border-white/30 hover:!bg-white/25">
              List your product
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
