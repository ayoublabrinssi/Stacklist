import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import type { Product, CategoryMeta, CategorySlug, SortOption } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import SearchBar from '@/components/filters/SearchBar';
import CategorySidebar from '@/components/filters/CategorySidebar';
import ProductGrid from '@/components/products/ProductGrid';
import styles from '@/styles/Products.module.css';

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
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('featured');

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
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

  return (
    <>
      <Head>
        <title>Browse All B2B Tools — Stacklist</title>
        <meta
          name="description"
          content="Browse 16+ vetted B2B SaaS tools across productivity, DevTools, analytics, and CRM. Filter by category, search by use case."
        />
      </Head>

      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Browse all tools</h1>
          <p className={styles.pageSubtitle}>
            {products.length} vetted B2B SaaS tools across {categories.length} categories
          </p>
        </div>

        <div className={styles.searchRow}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </aside>

          <div className={styles.main}>
            <div className={styles.resultsBar}>
              <p className={styles.resultCount}>
                Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'all' && (
                  <>
                    {' '}in{' '}
                    <strong>
                      {categories.find((c) => c.slug === activeCategory)?.name}
                    </strong>
                  </>
                )}
                {search && (
                  <>
                    {' '}for <strong>&ldquo;{search}&rdquo;</strong>
                  </>
                )}
              </p>

              <div className={styles.sortSelect}>
                <label htmlFor="sort-select">Sort:</label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                >
                  <option value="featured">Featured first</option>
                  <option value="rating">Highest rated</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>
              </div>
            </div>

            <ProductGrid
              products={filtered}
              emptyMessage="Try adjusting your search or clearing the category filter."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
