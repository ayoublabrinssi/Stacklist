import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Product, CategoryMeta, CategorySlug } from '@/types';
import { CATEGORIES, PRODUCTS, getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import styles from '@/styles/Category.module.css';

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

  return (
    <>
      <Head>
        <title>{category.name} Tools — Stacklist</title>
        <meta
          name="description"
          content={`Discover the best ${category.name} tools for B2B teams. ${category.description}`}
        />
      </Head>

      <div className={styles.page}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <Link href="/products">Products</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span aria-current="page">{category.name}</span>
        </nav>

        {/* Category Hero */}
        <div className={styles.categoryHero}>
          <div className={styles.categoryIconLarge} aria-hidden="true">
            {category.icon}
          </div>
          <div className={styles.categoryHeroText}>
            <h1 className={styles.categoryName}>{category.name}</h1>
            <p className={styles.categoryDescription}>{category.description}</p>
            <p className={styles.categoryCount}>
              {products.length} tool{products.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={products}
          emptyMessage={`No tools listed in ${category.name} yet. Check back soon!`}
        />

        {/* Other Categories */}
        {otherCategories.length > 0 && (
          <section className={styles.otherCategories}>
            <h2 className={styles.otherTitle}>Explore other categories</h2>
            <div className={styles.otherGrid}>
              {otherCategories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className={styles.otherCard}>
                  <span className={styles.otherCardIcon}>{cat.icon}</span>
                  <div className={styles.otherCardText}>
                    <div className={styles.otherCardName}>{cat.name}</div>
                    <div className={styles.otherCardCount}>
                      {productCountBySlug(cat.slug)} tools
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
