import React from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className={styles.star} aria-hidden="true">
      {'★'.repeat(Math.round(rating))}
    </span>
  );
}

function getStartingPrice(product: Product): string {
  const freeTier = product.pricingTiers.find((t) => t.name === 'Free' && t.price === 0);
  if (freeTier) return 'Free plan available';

  const proTier = product.pricingTiers.find((t) => t.name === 'Pro' && t.price !== null);
  if (proTier && proTier.price !== null) {
    return `From $${proTier.price}/mo`;
  }

  return 'Custom pricing';
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryVariantMap: Record<string, 'productivity' | 'devtools' | 'analytics' | 'crm'> = {
    productivity: 'productivity',
    devtools: 'devtools',
    analytics: 'analytics',
    crm: 'crm',
  };

  const badgeVariant = categoryVariantMap[product.categorySlug] ?? 'default';

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.header}>
        <div
          className={styles.logo}
          style={{ backgroundColor: product.logoPlaceholder.color }}
          aria-hidden="true"
        >
          {product.logoPlaceholder.initials}
        </div>
        <div className={styles.headerText}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.tagline}>{product.tagline}</div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          <Badge variant={badgeVariant}>{product.category}</Badge>
          {product.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} showHash={false}>
              {tag}
            </Tag>
          ))}
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            <StarRating rating={product.rating} />
            <span>{product.rating.toFixed(1)}</span>
            <span className={styles.ratingCount}>({product.reviewCount.toLocaleString()})</span>
          </div>
          <div className={styles.price}>
            <span>{getStartingPrice(product)}</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        {product.featured ? (
          <span className={styles.featuredBadge}>Featured</span>
        ) : (
          <span />
        )}
        <span className={styles.cta}>
          View details
          <svg
            className={styles.arrow}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 7h12M8 3l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
