import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  tagline: 'The best tool ever',
  description: 'Test descriptions here.',
  category: 'Productivity',
  categorySlug: 'productivity',
  tags: ['testing'],
  logoPlaceholder: { initials: 'T', color: '#6366f1' },
  featured: true,
  rating: 3.5,
  reviewCount: 42,
  website: 'https://test.com',
  pricingTiers: [{ name: 'Free', price: 0, billingPeriod: 'month', description: '', features: [], cta: '' }],
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Title
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Tagline
    expect(screen.getByText('The best tool ever')).toBeInTheDocument();
    
    // Pricing
    expect(screen.getByText('Free plan available')).toBeInTheDocument();
    
    // Review count
    expect(screen.getByText('(42)')).toBeInTheDocument();
  });
});
