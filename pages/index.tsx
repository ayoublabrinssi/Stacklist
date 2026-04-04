import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { Product, CategoryMeta } from '@/types';
import { CATEGORIES, PRODUCTS, getFeaturedProducts, getProductsByCategory } from '@/lib/data';
import Button from '@/components/ui/Button';
import FilterTag from '@/components/filters/FilterTag';
import ProductGrid from '@/components/products/ProductGrid';
import styles from '@/styles/Home.module.css';

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
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {totalProducts}+ tools across {categories.length} categories
          </div>
          <h1 className={styles.heroTitle}>
            Find the right <span>B2B tools</span> for your team
          </h1>
          <p className={styles.heroSubtitle}>
            Stacklist curates the best SaaS software across productivity, developer tooling,
            analytics, and CRM — with real pricing, honest reviews, and side-by-side comparisons.
          </p>
          <div className={styles.heroActions}>
            <Button href="/products" size="lg" variant="primary">
              Browse all tools →
            </Button>
            <Button href="/category/devtools" size="lg" variant="secondary">
              Explore DevTools
            </Button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{totalProducts}+</div>
              <div className={styles.statLabel}>Tools listed</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{categories.length}</div>
              <div className={styles.statLabel}>Categories</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{Math.floor(totalReviews / 1000)}k+</div>
              <div className={styles.statLabel}>Reviews</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>Free</div>
              <div className={styles.statLabel}>Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs + featured grid */}
      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured tools</h2>
          <Link href="/products" className={styles.sectionLink}>
            View all →
          </Link>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Filter by category">
          <FilterTag
            label="All"
            count={featuredProducts.length}
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
      </section>

      <section className={styles.featuredSection}>
        <ProductGrid
          products={displayProducts}
          emptyMessage={
            <>
              No featured tools in this category yet. Check back soon!<br/><br/>
              {activeTab !== 'all' && (
                <Link
                  href={`/category/${activeTab}`}
                  style={{ color: 'var(--color-brand-600)', fontWeight: 500, textDecoration: 'underline' }}
                >
                  See all {categories.find((c) => c.slug === activeTab)?.name} tools →
                </Link>
              )}
            </>
          }
        />
      </section>

      {/* Category promo cards */}
      <section className={styles.categoriesPromo}>
        <div className={styles.categoriesInner}>
          <h2 className={styles.categoriesTitle}>Browse by category</h2>
          <p className={styles.categoriesSubtitle}>
            Each category is hand-curated with the top-rated tools in that space.
          </p>

          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <div className={styles.categoryCardName}>{cat.name}</div>
                <p className={styles.categoryCardDesc}>{cat.description}</p>
                <div className={styles.categoryCardCount}>
                  {categoryProductCounts[cat.slug]} tools
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to build your stack?</h2>
          <p className={styles.ctaSubtitle}>
            Compare tools, read honest reviews, and find the right fit for your team — free forever.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/products" size="lg" variant="primary">
              Start exploring →
            </Button>
            <Button href="/coming-soon" size="lg" className={styles.ctaSecondary} variant="secondary">
              List your product
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
