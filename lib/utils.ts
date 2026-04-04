import type { Product, CategorySlug } from '@/types';

export const CATEGORY_VARIANT_MAP: Record<CategorySlug, 'productivity' | 'devtools' | 'analytics' | 'crm'> = {
  productivity: 'productivity',
  devtools: 'devtools',
  analytics: 'analytics',
  crm: 'crm',
};

export function getStartingPrice(product: Product): string {
  const freeTier = product.pricingTiers.find((t) => t.name === 'Free' && t.price === 0);
  if (freeTier) return 'Free plan available';

  const proTier = product.pricingTiers.find((t) => t.name === 'Pro' && t.price !== null);
  if (proTier && proTier.price !== null) {
    return `From $${proTier.price}/mo`;
  }

  return 'Custom pricing';
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
