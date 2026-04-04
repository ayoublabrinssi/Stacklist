import { describe, it, expect } from 'vitest';
import { getStartingPrice, searchProducts } from './utils';
import type { Product } from '@/types';

const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  slug: 'test',
  name: 'Test Product',
  tagline: 'A cool tool',
  description: 'Test description',
  category: 'Productivity',
  categorySlug: 'productivity',
  tags: ['test'],
  logoPlaceholder: { initials: 'T', color: '#000' },
  featured: false,
  rating: 4.5,
  reviewCount: 10,
  website: 'https://test.com',
  pricingTiers: [],
  ...overrides,
});

describe('utils', () => {
  describe('getStartingPrice', () => {
    it('returns "Free plan available" when there is a free tier', () => {
      const p = createMockProduct({
        pricingTiers: [{ name: 'Free', price: 0, billingPeriod: 'month', description: '', features: [], cta: '' }],
      });
      expect(getStartingPrice(p)).toBe('Free plan available');
    });

    it('returns "Custom pricing" when no explicit tiers are matched', () => {
      const p = createMockProduct({ pricingTiers: [] });
      expect(getStartingPrice(p)).toBe('Custom pricing');
    });

    it('returns From $X/mo when a Pro plan exists and no free tier', () => {
      const p = createMockProduct({
        pricingTiers: [{ name: 'Pro', price: 49, billingPeriod: 'month', description: '', features: [], cta: '' }],
      });
      expect(getStartingPrice(p)).toBe('From $49/mo');
    });
  });

  describe('searchProducts', () => {
    const products = [
      createMockProduct({ name: 'Alpha', tags: ['data'] }),
      createMockProduct({ name: 'Beta', tags: ['analytics'] }),
    ];

    it('returns all when query is empty', () => {
      expect(searchProducts(products, '')).toHaveLength(2);
    });

    it('filters correctly by name', () => {
      expect(searchProducts(products, 'alpha')).toHaveLength(1);
      expect(searchProducts(products, 'alpha')[0].name).toBe('Alpha');
    });

    it('filters correctly by tag', () => {
      expect(searchProducts(products, 'analytics')).toHaveLength(1);
      expect(searchProducts(products, 'analytics')[0].name).toBe('Beta');
    });
  });
});
