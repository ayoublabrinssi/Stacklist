import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';

const FOOTER_LINKS = {
  Product: [
    { href: '/products', label: 'Browse Tools' },
    ...CATEGORIES.map((cat) => ({ href: `/category/${cat.slug}`, label: cat.name })),
  ],
  Company: [
    { href: '/coming-soon', label: 'About' },
    { href: '/coming-soon', label: 'Blog' },
    { href: '/coming-soon', label: 'Careers' },
    { href: '/coming-soon', label: 'Press' },
  ],
  Resources: [
    { href: '/coming-soon', label: 'Documentation' },
    { href: '/coming-soon', label: 'API Reference' },
    { href: '/coming-soon', label: 'Community' },
    { href: '/coming-soon', label: 'Support' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 sm:gap-12 lg:gap-16 pb-2 sm:pb-4 lg:pb-6">
          <div>
            <div className="text-xl font-bold text-slate-900 tracking-tight mb-4">
              Stack<span className="text-brand-600">list</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              The B2B SaaS marketplace helping teams discover, compare, and adopt the right tools
              to scale their business.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-slate-900 tracking-tight mb-2">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-slate-500 hover:text-brand-600 transition-colors  outline-none rounded-sm">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Stacklist, Inc. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Legal navigation">
            <Link href="/coming-soon" className="hover:text-slate-600 transition-colors  outline-none rounded-sm">Privacy Policy</Link>
            <Link href="/coming-soon" className="hover:text-slate-600 transition-colors  outline-none rounded-sm">Terms of Service</Link>
            <Link href="/coming-soon" className="hover:text-slate-600 transition-colors  outline-none rounded-sm">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
