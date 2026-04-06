import React from 'react';
import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string | React.ReactNode;
}

export default function ProductGrid({
  products,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center p-16 text-center bg-white border border-slate-200 rounded-xl border-dashed">
          <div className="text-5xl mb-4 opacity-50">🔍</div>
          <div className="text-xl font-semibold text-slate-700 mb-2">No results found</div>
          <p className="text-sm text-slate-500 max-w-sm">{emptyMessage}</p>
        </div>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
}
