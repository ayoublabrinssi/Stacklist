import React from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import PricingTable from './PricingTable';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const categoryVariantMap: Record<string, 'productivity' | 'devtools' | 'analytics' | 'crm'> = {
    productivity: 'productivity',
    devtools: 'devtools',
    analytics: 'analytics',
    crm: 'crm',
  };

  const badgeVariant = categoryVariantMap[product.categorySlug] ?? 'default';

  return (
    <article className={styles.wrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
        <Link href="/products">Products</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
        <Link href={`/category/${product.categorySlug}`}>{product.category}</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <div
          className={styles.logoLarge}
          style={{ backgroundColor: product.logoPlaceholder.color }}
          aria-hidden="true"
        >
          {product.logoPlaceholder.initials}
        </div>

        <div className={styles.heroText}>
          <div className={styles.categoryBadge}>
            <Badge variant={badgeVariant}>{product.category}</Badge>
          </div>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>

          <div className={styles.heroMeta}>
            <div className={styles.ratingGroup}>
              <span className={styles.stars} aria-hidden="true">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className={styles.ratingNumber}>{product.rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <div className={styles.heroCta} style={{ marginTop: 'var(--space-6)' }}>
            <Button href="#request-demo" variant="primary" size="lg">
              Request a Demo
            </Button>
            <Button href={product.website} variant="secondary" size="lg">
              Visit Website ↗
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className={styles.description} aria-labelledby="about-heading">
        <h2 id="about-heading" className={styles.descriptionTitle}>
          About {product.name}
        </h2>
        <p className={styles.descriptionText}>{product.description}</p>
      </section>

      {/* Tags */}
      <section className={styles.tagsSection} aria-labelledby="tags-heading">
        <h3 id="tags-heading" className={styles.tagsTitle}>
          Tags &amp; Categories
        </h3>
        <div className={styles.tagsList}>
          {product.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingTable tiers={product.pricingTiers} productName={product.name} />

      {/* Demo CTA */}
      <section
        id="request-demo"
        className={styles.demoCta}
        aria-labelledby="demo-heading"
      >
        <h2 id="demo-heading" className={styles.demoTitle}>
          Ready to try {product.name}?
        </h2>
        <p className={styles.demoSubtitle}>
          Join thousands of teams already using {product.name} to level up their workflows.
          Book a 30-minute demo with a product specialist.
        </p>
        <div className={styles.demoActions}>
          <Button href="#" variant="primary" size="lg">
            Request Demo
          </Button>
          <Button href="#" size="lg" className={styles.demoSecondary} variant="secondary">
            Start free trial
          </Button>
        </div>
      </section>
    </article>
  );
}
