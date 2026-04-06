import React from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import Badge from '@/components/ui/Badge';
import { getStartingPrice, CATEGORY_VARIANT_MAP } from '@/lib/utils';
import { useToolBag } from '@/lib/context/ToolBagContext';

interface ProductCardProps {
  product: Product;
}

/* ── Compact star rating ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < Math.round(rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-200 fill-slate-200'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Category accent bar colors ── */
const categoryAccentColors: Record<string, string> = {
  productivity: 'from-brand-500 to-brand-600',
  devtools: 'from-sky-400 to-sky-600',
  analytics: 'from-amber-400 to-amber-600',
  crm: 'from-emerald-400 to-emerald-600',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addTool, removeTool, isSaved, setIsBagOpen } = useToolBag();
  const badgeVariant = CATEGORY_VARIANT_MAP[product.categorySlug] ?? 'default';
  const accentGradient =
    categoryAccentColors[product.categorySlug] ?? 'from-brand-500 to-brand-600';
  const startingPrice = getStartingPrice(product);
  const saved = isSaved(product.slug);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeTool(product.slug);
    } else {
      addTool(product);
      setIsBagOpen(true); // Automatically open the bag when saving
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-200/70 no-underline text-inherit"
    >
      {/* Accent top bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${accentGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Save Button (absolute positioned) */}
      <button
        onClick={handleSaveToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 shadow-sm
          ${saved 
            ? 'bg-brand-50 text-brand-600 hover:bg-brand-100' 
            : 'bg-white text-slate-300 hover:text-brand-500 hover:bg-slate-50 border border-slate-100 opacity-0 group-hover:opacity-100'
          }
        `}
        aria-label={saved ? "Remove from saved" : "Save tool"}
      >
        <svg 
          className="w-4 h-4" 
          viewBox="0 0 24 24" 
          fill={saved ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1 pt-6">
        {/* Header: Logo + Name + Category */}
        <div className="flex items-start gap-3.5">
          <div
            className="flex shrink-0 items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-base tracking-tight shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
            style={{
              background: `linear-gradient(145deg, ${product.logoPlaceholder.color}ee, ${product.logoPlaceholder.color})`,
            }}
            aria-hidden="true"
          >
            {product.logoPlaceholder.initials}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 leading-snug mb-1 truncate group-hover:text-brand-700 transition-colors duration-200">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={badgeVariant}
                className="text-[10px] uppercase tracking-wider font-bold py-0 h-[18px]"
              >
                {product.category}
              </Badge>
              <div className="flex items-center gap-1">
                <StarRating rating={product.rating} />
                <span className="text-xs font-semibold text-slate-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        {/* Clickable tag chips */}
        <div className="flex items-center gap-1.5 overflow-hidden mt-auto">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/products?search=${encodeURIComponent(tag)}`;
              }}
              className="inline-flex items-center text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-100 rounded-md px-1.5 py-[2px] whitespace-nowrap cursor-pointer hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors duration-200"
              title={`Search for "${tag}"`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-3 flex items-center justify-between border-t border-slate-100 bg-slate-50/40 group-hover:bg-brand-50/40 transition-colors duration-300">
        <span className="text-[11px] text-slate-400 font-medium">
          {startingPrice}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-1.5 transition-all duration-300">
          Explore
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
