import React from 'react';
import type { CategoryMeta, CategorySlug } from '@/types';
import { PRODUCTS } from '@/lib/data';
import styles from './CategorySidebar.module.css';

type ActiveCategory = CategorySlug | 'all';

interface CategorySidebarProps {
  categories: CategoryMeta[];
  activeCategory: ActiveCategory;
  onCategoryChange: (slug: ActiveCategory) => void;
}

export default function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  const totalCount = PRODUCTS.length;

  const countByCategory = (slug: CategorySlug) =>
    PRODUCTS.filter((p) => p.categorySlug === slug).length;

  return (
    <nav className={styles.sidebar} aria-label="Filter by category">
      <div className={styles.sidebarTitle}>Categories</div>

      <button
        type="button"
        className={[styles.item, activeCategory === 'all' ? styles.active : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => onCategoryChange('all')}
        aria-current={activeCategory === 'all' ? 'true' : undefined}
      >
        <span className={styles.itemLeft}>
          <span className={styles.dot} style={{ backgroundColor: '#9ca3af' }} />
          All Tools
        </span>
        <span className={styles.count}>{totalCount}</span>
      </button>

      <div className={styles.divider} />

      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          className={[styles.item, activeCategory === cat.slug ? styles.active : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onCategoryChange(cat.slug)}
          aria-current={activeCategory === cat.slug ? 'true' : undefined}
        >
          <span className={styles.itemLeft}>
            <span className={styles.dot} style={{ backgroundColor: cat.color }} />
            {cat.name}
          </span>
          <span className={styles.count}>{countByCategory(cat.slug)}</span>
        </button>
      ))}
    </nav>
  );
}
