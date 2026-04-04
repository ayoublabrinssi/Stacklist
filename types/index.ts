export const CATEGORY_MAP = {
  productivity: 'Productivity',
  devtools: 'DevTools',
  analytics: 'Analytics',
  crm: 'CRM',
} as const;

export type CategorySlug = keyof typeof CATEGORY_MAP;
export type Category = (typeof CATEGORY_MAP)[CategorySlug];

export interface PricingTier {
  name: 'Free' | 'Pro' | 'Enterprise';
  price: number | null; // null = custom pricing
  billingPeriod: 'month' | 'year' | 'custom';
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  trialDays?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  categorySlug: CategorySlug;
  tags: string[];
  logoPlaceholder: {
    initials: string;
    color: string;
  };
  pricingTiers: PricingTier[];
  featured: boolean;
  rating: number; // 1–5
  reviewCount: number;
  website: string;
}

export interface CategoryMeta {
  name: Category;
  slug: CategorySlug;
  description: string;
  color: string;
  icon: string;
}

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'rating';

export interface FilterState {
  search: string;
  category: CategorySlug | 'all';
  sort: SortOption;
}
