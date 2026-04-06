import React, { useEffect, useRef } from 'react';
import { useToolBag } from '@/lib/context/ToolBagContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { CATEGORY_VARIANT_MAP } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function ToolBagPanel() {
  const { isBagOpen, setIsBagOpen, savedTools, removeTool, clearBag } = useToolBag();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBagOpen) {
        setIsBagOpen(false);
      }
    };
    if (isBagOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isBagOpen, setIsBagOpen]);

  // Handle clicking outside the panel
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsBagOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isBagOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${
          isBagOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Saved Tools</h2>
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold bg-brand-100 text-brand-700 rounded-full">
              {savedTools.length}
            </span>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close saved tools"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {savedTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-700">No tools saved yet</h3>
              <p className="text-sm text-slate-500 max-w-[250px]">
                Explore the marketplace and save tools you want to evaluate or request later.
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => setIsBagOpen(false)}
              >
                Browse directory
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <button
                  onClick={clearBag}
                  className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  Clear all
                </button>
              </div>

              {savedTools.map((product) => {
                const badgeVariant = CATEGORY_VARIANT_MAP[product.categorySlug] ?? 'default';

                return (
                  <div
                    key={product.slug}
                    className="group relative flex items-start gap-4 p-4 bg-white border border-slate-200/60 rounded-xl hover:border-brand-300 hover:shadow-sm transition-all"
                  >
                    {/* Compact logo */}
                    <Link href={`/products/${product.slug}`} onClick={() => setIsBagOpen(false)}>
                      <div
                        className="flex shrink-0 items-center justify-center w-12 h-12 rounded-lg text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-105"
                        style={{
                          background: `linear-gradient(145deg, ${product.logoPlaceholder.color}ee, ${product.logoPlaceholder.color})`,
                        }}
                      >
                        {product.logoPlaceholder.initials}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/products/${product.slug}`} onClick={() => setIsBagOpen(false)}>
                          <h4 className="text-sm font-bold text-slate-900 truncate hover:text-brand-600 transition-colors">
                            {product.name}
                          </h4>
                        </Link>
                        <button
                          onClick={() => removeTool(product.slug)}
                          className="text-slate-300 hover:text-red-500 p-1 -mr-1 -mt-1 transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <Badge variant={badgeVariant} className="text-[9px] py-0 h-4 mb-2">
                        {product.category}
                      </Badge>
                      <p className="text-xs text-slate-500 line-clamp-1">{product.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedTools.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-3">
            <Button
              href="/request"
              className="w-full flex items-center justify-center gap-2 font-semibold shadow-sm"
            >
              Request Access to Tools 
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Button>
            <p className="text-[11px] text-center text-slate-400">
              Your saved tools list is kept locally on this browser.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
