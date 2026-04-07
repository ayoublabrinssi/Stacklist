import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/data';
import { useScroll } from '@/lib/hooks/useScroll';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';
import { useAuth } from '@/lib/auth/AuthContext';
import { useToolBag } from '@/lib/context/ToolBagContext';

// NAV_LINKS is now dynamically generated inside the component leveraging the auth state

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { savedTools, setIsBagOpen } = useToolBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrolled = useScroll(10);

  const navLinks = isLoggedIn
    ? [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Browse Tools' },
        { href: '/my-tools', label: 'My Tools' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Browse Tools' },
        ...CATEGORIES.map((cat) => ({ href: `/category/${cat.slug}`, label: cat.name })),
      ];

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => { setMenuOpen(false); setDropdownOpen(false); };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <header
      className={`sticky top-0 z-50 h-16 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm supports-[backdrop-filter]:bg-white/60'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 shrink-0 group rounded-lg no-underline" onClick={() => setMenuOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-sm group-hover:shadow group-hover:scale-105 transition-all duration-200">
            SL
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Stack<span className="text-brand-600">list</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? router.pathname === '/' : router.asPath.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors no-underline',
                  isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                ].join(' ')}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {/* Tool Bag Icon */}
          <button
            onClick={() => setIsBagOpen(true)}
            className="group relative flex items-center justify-center p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all focus:outline-none"
            aria-label="View saved tools"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {savedTools.length > 0 && (
              <span className="absolute 1 top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                {savedTools.length}
              </span>
            )}
          </button>

          {isLoggedIn && user ? (
            /* ── Logged-in: User menu ── */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {initials}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {user.name}
                </span>
                <svg className={`hidden sm:block w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link href="/settings" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors no-underline">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors no-underline">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 py-1">
                    <button
                      type="button"
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged-out: Sign in / Get started ── */
            <div className="hidden md:flex items-center gap-3">
              <Button href="/login" variant="secondary" size="sm">Sign in</Button>
              <Button href="/signup" variant="primary" size="sm">Get started</Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuToggleIcon open={menuOpen} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 flex flex-col md:hidden overflow-y-auto">
          <nav className="flex flex-col p-6 gap-2 flex-grow" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => {
              const isActive = href === '/' ? router.pathname === '/' : router.asPath.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors no-underline ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto p-6 space-y-4 border-t border-slate-100 bg-slate-50/50">
            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <Button href="/settings" variant="secondary" size="md" fullWidth>
                  Settings
                </Button>
                <Button variant="danger" size="md" fullWidth onClick={() => { logout(); setMenuOpen(false); }}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" size="md" fullWidth>Sign in</Button>
                <Button href="/signup" variant="primary" size="md" fullWidth>Get started</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
