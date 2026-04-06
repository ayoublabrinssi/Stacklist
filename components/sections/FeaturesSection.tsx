import React from 'react';
import Button from '@/components/ui/Button';

/* ─── Decorative figure components ─── */

/** Orbiting rings – used behind "Smart tool discovery" */
const OrbitFigure = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.12]">
    <div className="relative w-[280px] h-[280px]">
      <div className="absolute inset-0 rounded-full border-2 border-brand-400 animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-brand-300 animate-[spin_14s_linear_infinite_reverse]" />
      <div className="absolute inset-10 rounded-full border border-dashed border-brand-200 animate-[spin_25s_linear_infinite]" />
      <div className="absolute top-2 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-brand-400 animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '0 138px' }} />
      <div className="absolute top-6 left-1/2 w-2 h-2 -ml-1 rounded-full bg-brand-300 animate-[spin_14s_linear_infinite_reverse]" style={{ transformOrigin: '0 110px' }} />
    </div>
  </div>
);

/** Floating bar-chart – used behind "Productivity tracking" */
const BarChartFigure = () => (
  <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.10]">
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      <rect x="10" y="70" width="20" height="50" rx="4" fill="currentColor" className="text-sky-500" />
      <rect x="40" y="40" width="20" height="80" rx="4" fill="currentColor" className="text-sky-400" />
      <rect x="70" y="55" width="20" height="65" rx="4" fill="currentColor" className="text-sky-500" />
      <rect x="100" y="20" width="20" height="100" rx="4" fill="currentColor" className="text-sky-300" />
      <rect x="130" y="35" width="20" height="85" rx="4" fill="currentColor" className="text-sky-400" />
      <path d="M20 65 L50 35 L80 50 L110 15 L140 30" stroke="currentColor" className="text-sky-600" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
    </svg>
  </div>
);

/** Stacked layers – used behind "Curated categories" */
const LayersFigure = () => (
  <div className="absolute top-4 right-4 pointer-events-none opacity-[0.10]">
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect x="20" y="60" width="100" height="60" rx="12" fill="currentColor" className="text-indigo-400" />
      <rect x="10" y="40" width="100" height="60" rx="12" fill="currentColor" className="text-indigo-300" />
      <rect x="30" y="20" width="100" height="60" rx="12" fill="currentColor" className="text-indigo-200" />
    </svg>
  </div>
);

/** Shield pulse – used behind "Secure & trusted" */
const ShieldFigure = () => (
  <div className="absolute bottom-6 right-6 pointer-events-none opacity-[0.10]">
    <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
      <path d="M50 10 L90 30 V65 C90 90 50 110 50 110 C50 110 10 90 10 65 V30 L50 10Z" stroke="currentColor" className="text-emerald-500" strokeWidth="3" fill="none" />
      <path d="M50 25 L78 40 V60 C78 78 50 93 50 93 C50 93 22 78 22 60 V40 L50 25Z" stroke="currentColor" className="text-emerald-400" strokeWidth="2" strokeDasharray="5 4" fill="none" />
      <path d="M35 60 L45 72 L68 48" stroke="currentColor" className="text-emerald-500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/** Grid dots pattern – used behind "Seamless filtering" */
const GridDotsFigure = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08]">
    <svg width="100%" height="100%" viewBox="0 0 200 200">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 24} cy={20 + row * 24} r={row % 2 === col % 2 ? 3 : 2} fill="currentColor" className="text-amber-500" />
        ))
      )}
    </svg>
  </div>
);

/** Star constellation – used behind "Verified ratings" */
const StarsFigure = () => (
  <div className="absolute top-4 right-4 pointer-events-none opacity-[0.10]">
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
      {[{ x: 30, y: 20, s: 12 }, { x: 70, y: 15, s: 16 }, { x: 100, y: 30, s: 10 }, { x: 50, y: 55, s: 14 }, { x: 90, y: 65, s: 11 }].map((star, i) => (
        <polygon
          key={i}
          points={`${star.x},${star.y - star.s} ${star.x + star.s * 0.22},${star.y - star.s * 0.31} ${star.x + star.s * 0.95},${star.y - star.s * 0.31} ${star.x + star.s * 0.36},${star.y + star.s * 0.12} ${star.x + star.s * 0.59},${star.y + star.s * 0.81} ${star.x},${star.y + star.s * 0.38} ${star.x - star.s * 0.59},${star.y + star.s * 0.81} ${star.x - star.s * 0.36},${star.y + star.s * 0.12} ${star.x - star.s * 0.95},${star.y - star.s * 0.31} ${star.x - star.s * 0.22},${star.y - star.s * 0.31}`}
          fill="currentColor"
          className="text-rose-400"
        />
      ))}
      <path d="M30 25 L65 18 L90 35" stroke="currentColor" className="text-rose-300" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  </div>
);

/* ─── Icon components ─── */

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

/* ─── Main component ─── */

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/50" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 max-w-3xl space-y-5 sm:mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-600">Why Stacklist</p>
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to find the&nbsp;
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">perfect tools</span>
          </h2>
          <p className="text-lg text-slate-500 lg:text-xl leading-relaxed">
            Explore features designed to supercharge your software discovery — from intelligent search to verified community reviews.
          </p>
          <div className="pt-2">
            <Button variant="secondary" size="lg" href="/products" className="group">
              Explore tools
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* 1 — Smart tool discovery (large, spans 2 cols) */}
          <div className="relative sm:col-span-2 row-span-2 group rounded-3xl border border-slate-200 bg-white p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-300 hover:-translate-y-1">
            <OrbitFigure />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-transform duration-300 group-hover:scale-110">
                <SearchIcon />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart tool discovery</h3>
              <p className="text-slate-500 leading-relaxed flex-1 text-[15px]">
                Find the perfect B2B SaaS tools with advanced search, AI-powered suggestions, and curated results that match your exact needs. Stop scrolling — start discovering.
              </p>
              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {['bg-brand-200', 'bg-brand-300', 'bg-brand-400', 'bg-brand-500'].map((bg, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-white`} />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium">Trusted by 2k+ teams</span>
              </div>
            </div>
          </div>

          {/* 2 — Secure & trusted */}
          <div className="relative group rounded-3xl border border-slate-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1">
            <ShieldFigure />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-hover:scale-110">
                <ShieldIcon />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Secure &amp; trusted</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every tool is vetted. Trust our directory for enterprise-grade solutions.
              </p>
            </div>
          </div>

          {/* 3 — Seamless filtering */}
          <div className="relative group rounded-3xl border border-slate-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-amber-300 hover:-translate-y-1">
            <GridDotsFigure />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 transition-transform duration-300 group-hover:scale-110">
                <FilterIcon />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Seamless filtering</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Narrow by pricing, features, integrations, and company size.
              </p>
            </div>
          </div>
                    {/* 5 — Productivity tracking */}
          <div className="relative sm:col-span-2 group rounded-3xl border border-slate-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-sky-300 hover:-translate-y-1">
            <BarChartFigure />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 transition-transform duration-300 group-hover:scale-110">
                <ActivityIcon />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Productivity tracking</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Discover tools that automate workflows and connect with your existing stack.
              </p>
            </div>
          </div>

          {/* 4 — Verified ratings (wide, spans 2 cols) */}
          <div className="relative sm:col-span-3 group rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-rose-50/40 p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-rose-300 hover:-translate-y-1">
            <StarsFigure />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 h-full">
              <div className="flex-shrink-0">
                <div className="mb-4 sm:mb-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-100 transition-transform duration-300 group-hover:scale-110">
                  <StarIcon />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified ratings &amp; reviews</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Make informed decisions with detailed product reviews from real professionals. Trust peer experiences to guide your choices.
                </p>
              </div>
              <div className="flex-shrink-0 hidden sm:flex flex-col items-center gap-1 px-6 border-l border-slate-100">
                <span className="text-3xl font-black text-slate-900">4.8</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= 4 ? 'text-amber-400' : 'text-amber-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">avg. score</span>
              </div>
            </div>
          </div>



          {/* 6 — Curated categories */}
          <div className="relative  group rounded-3xl border border-slate-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1">
            <LayersFigure />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-transform duration-300 group-hover:scale-110">
                <LayersIcon />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Curated categories</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                CRM, Marketing, Dev tools — neatly organized so you find them instantly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
