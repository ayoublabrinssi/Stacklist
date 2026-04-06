import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Product, CategoryMeta, CategorySlug } from '@/types';
import { CATEGORIES, PRODUCTS, getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import { categoryCardConfig } from '@/lib/categoryIcons';
import ProductGrid from '@/components/products/ProductGrid';

interface CategoryPageProps {
  category: CategoryMeta;
  products: Product[];
  otherCategories: CategoryMeta[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CATEGORIES.map((c) => ({ params: { slug: c.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { notFound: true };
  }

  return {
    props: {
      category,
      products: getProductsByCategory(slug as CategorySlug),
      otherCategories: CATEGORIES.filter((c) => c.slug !== slug),
    },
  };
};

const CategoryPage: NextPage<CategoryPageProps> = ({ category, products, otherCategories }) => {
  const productCountBySlug = (slug: string) =>
    PRODUCTS.filter((p) => p.categorySlug === slug).length;

  const config = categoryCardConfig[category.slug];

  return (
    <>
      <Head>
        <title>{category.name} Tools — Stacklist</title>
        <meta
          name="description"
          content={`Discover the best ${category.name} tools for B2B teams. ${category.description}`}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-6 sm:mb-8 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600 transition-colors   rounded-sm">Home</Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/products" className="hover:text-brand-600 transition-colors   rounded-sm">Products</Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-slate-900 font-semibold" aria-current="page">{category.name}</span>
        </nav>

        {/* Category Hero */}
        <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 sm:mb-12 text-center md:text-left bg-gradient-to-br ${config?.heroGradient ?? 'from-brand-50 to-white'} border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden`}>
          {/* Background blur */}
          <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full ${config?.heroBlurColor ?? 'bg-brand-200'} opacity-[0.15] blur-3xl pointer-events-none`}></div>
          
          {/* Decorative figure */}
          {config?.figure}

          {/* Icon container */}
          <div className={`flex items-center justify-center shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-white border border-slate-100 rounded-3xl shadow-sm relative z-10 ring-1 ${config?.iconStyle ?? 'bg-brand-50 text-brand-600 ring-brand-100'}`} aria-hidden="true">
            <div className="scale-[1.8]">
              {config?.icon}
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">{category.name}</h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-4">{category.description}</p>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest bg-white inline-flex px-3 py-1.5 rounded-full border border-brand-100 shadow-sm">
              {products.length} tool{products.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-14 sm:mb-16">
          <ProductGrid
            products={products}
            emptyMessage={`No tools listed in ${category.name} yet. Check back soon!`}
          />
        </div>

        {/* Other Categories */}
        {otherCategories.length > 0 && (
          <section className="border-t border-slate-100 pt-10 sm:pt-14 pb-4">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-2">More to explore</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Explore other categories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherCategories.map((cat) => {
                const catConfig = categoryCardConfig[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`group relative flex flex-col bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl   no-underline ${catConfig?.hoverBorder ?? 'hover:border-brand-300'}`}
                  >
                    {/* Decorative figure */}
                    {catConfig?.figure}

                    {/* Icon */}
                    <div className={`relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${catConfig?.iconStyle ?? 'bg-brand-50 text-brand-600 ring-brand-100'}`}>
                      {catConfig?.icon}
                    </div>

                    <div className="relative z-10 flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mb-2 truncate transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        {cat.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-400">
                        {productCountBySlug(cat.slug)} tools
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
          </section>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
