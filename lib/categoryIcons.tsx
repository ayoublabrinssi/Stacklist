import React from 'react';

/* ── Professional SVG icons per category ── */

const ProductivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const DevToolsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const CrmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ── Decorative background figures per category ── */

const ProductivityFigure = () => (
  <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-[0.06]">
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="60" stroke="currentColor" className="text-brand-500" strokeWidth="1.5" />
      <circle cx="80" cy="80" r="40" stroke="currentColor" className="text-brand-400" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="20" stroke="currentColor" className="text-brand-300" strokeWidth="1" />
      <path d="M20 80 H60 M100 80 H140 M80 20 V60 M80 100 V140" stroke="currentColor" className="text-brand-400" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="80" cy="20" r="3" fill="currentColor" className="text-brand-400" />
      <circle cx="140" cy="80" r="3" fill="currentColor" className="text-brand-400" />
      <circle cx="80" cy="140" r="3" fill="currentColor" className="text-brand-400" />
      <circle cx="20" cy="80" r="3" fill="currentColor" className="text-brand-400" />
    </svg>
  </div>
);

const DevToolsFigure = () => (
  <div className="absolute -bottom-2 -right-2 pointer-events-none opacity-[0.06]">
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <rect x="20" y="20" width="110" height="110" rx="16" stroke="currentColor" className="text-sky-500" strokeWidth="1.5" />
      <rect x="35" y="35" width="80" height="80" rx="10" stroke="currentColor" className="text-sky-400" strokeWidth="1" strokeDasharray="5 4" />
      <path d="M55 65 L65 75 L55 85" stroke="currentColor" className="text-sky-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="75" y1="85" x2="100" y2="85" stroke="currentColor" className="text-sky-400" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="75" x2="95" y2="75" stroke="currentColor" className="text-sky-300" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  </div>
);

const AnalyticsFigure = () => (
  <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-[0.06]">
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      <path d="M10 100 Q40 40 70 70 T130 30 T150 50" stroke="currentColor" className="text-amber-500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M10 100 Q40 40 70 70 T130 30 T150 50 V120 H10 Z" fill="currentColor" className="text-amber-400" fillOpacity="0.15" />
      <circle cx="70" cy="70" r="3" fill="currentColor" className="text-amber-500" />
      <circle cx="130" cy="30" r="3" fill="currentColor" className="text-amber-500" />
      <circle cx="10" cy="100" r="2.5" fill="currentColor" className="text-amber-400" />
    </svg>
  </div>
);

const CrmFigure = () => (
  <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-[0.06]">
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <circle cx="75" cy="50" r="18" stroke="currentColor" className="text-emerald-500" strokeWidth="1.5" />
      <circle cx="40" cy="100" r="14" stroke="currentColor" className="text-emerald-400" strokeWidth="1.5" />
      <circle cx="110" cy="100" r="14" stroke="currentColor" className="text-emerald-400" strokeWidth="1.5" />
      <path d="M75 68 L50 90" stroke="currentColor" className="text-emerald-400" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M75 68 L100 90" stroke="currentColor" className="text-emerald-400" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M54 100 L96 100" stroke="currentColor" className="text-emerald-300" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="75" cy="50" r="6" fill="currentColor" className="text-emerald-300" />
      <circle cx="40" cy="100" r="5" fill="currentColor" className="text-emerald-200" />
      <circle cx="110" cy="100" r="5" fill="currentColor" className="text-emerald-200" />
    </svg>
  </div>
);

/* ── Config object ── */

export interface CategoryCardStyle {
  icon: React.ReactNode;
  iconStyle: string;
  hoverBorder: string;
  figure: React.ReactNode;
  /** Gradient used for hero backgrounds */
  heroGradient: string;
  /** Accent color for hero blurs */
  heroBlurColor: string;
}

export const categoryCardConfig: Record<string, CategoryCardStyle> = {
  productivity: {
    icon: <ProductivityIcon />,
    iconStyle: 'bg-brand-50 text-brand-600 ring-brand-100',
    hoverBorder: 'hover:border-brand-300',
    figure: <ProductivityFigure />,
    heroGradient: 'from-brand-50 to-white',
    heroBlurColor: 'bg-brand-200',
  },
  devtools: {
    icon: <DevToolsIcon />,
    iconStyle: 'bg-sky-50 text-sky-600 ring-sky-100',
    hoverBorder: 'hover:border-sky-300',
    figure: <DevToolsFigure />,
    heroGradient: 'from-sky-50 to-white',
    heroBlurColor: 'bg-sky-200',
  },
  analytics: {
    icon: <AnalyticsIcon />,
    iconStyle: 'bg-amber-50 text-amber-600 ring-amber-100',
    hoverBorder: 'hover:border-amber-300',
    figure: <AnalyticsFigure />,
    heroGradient: 'from-amber-50 to-white',
    heroBlurColor: 'bg-amber-200',
  },
  crm: {
    icon: <CrmIcon />,
    iconStyle: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
    figure: <CrmFigure />,
    heroGradient: 'from-emerald-50 to-white',
    heroBlurColor: 'bg-emerald-200',
  },
};
