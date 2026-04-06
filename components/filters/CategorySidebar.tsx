import React from 'react';
import type { CategoryMeta, CategorySlug } from '@/types';
import { categoryCardConfig } from '@/lib/categoryIcons';

type ActiveCategory = CategorySlug | 'all';

interface CategorySidebarProps {
  categories: CategoryMeta[];
  activeCategory: ActiveCategory;
  onCategoryChange: (slug: ActiveCategory) => void;
  totalProducts: number;
  categoryCounts: Record<string, number>;
}

export default function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
  totalProducts,
  categoryCounts,
}: CategorySidebarProps) {
  return (
    <nav className="flex flex-col w-full sm:w-64 shrink-0 max-h-[calc(100vh-100px)] sticky top-[80px] overflow-y-auto pr-4 hidden sm:flex" aria-label="Filter by category">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Categories</div>

      <button
        type="button"
        className={`flex items-center justify-between w-full p-2.5 text-sm font-medium rounded-xl transition-all duration-200   text-left ${
          activeCategory === 'all' 
            ? 'bg-slate-100 text-slate-900 shadow-sm' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
        onClick={() => onCategoryChange('all')}
        aria-current={activeCategory === 'all' ? 'true' : undefined}
      >
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200/60 text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </span>
          All Tools
        </span>
        <span className="text-xs text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-full font-semibold">{totalProducts}</span>
      </button>

      <div className="h-px bg-slate-100 my-2 mx-2" />

      {categories.map((cat) => {
        const config = categoryCardConfig[cat.slug];
        return (
          <button
            key={cat.slug}
            type="button"
            className={`flex items-center justify-between w-full p-2.5 text-sm font-medium rounded-xl transition-all duration-200   text-left ${
              activeCategory === cat.slug 
                ? 'bg-slate-100 text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            onClick={() => onCategoryChange(cat.slug)}
            aria-current={activeCategory === cat.slug ? 'true' : undefined}
          >
            <span className="flex items-center gap-2.5">
              <span className={`flex items-center justify-center w-7 h-7 rounded-lg ${config?.iconStyle ?? 'bg-slate-100 text-slate-500 ring-slate-200'}`}>
                <span className="scale-[0.6]">{config?.icon}</span>
              </span>
              {cat.name}
            </span>
            <span className="text-xs text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-full font-semibold">{categoryCounts[cat.slug] || 0}</span>
          </button>
        );
      })}
    </nav>
  );
}
