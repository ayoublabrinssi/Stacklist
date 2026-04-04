import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/data';
import styles from './Navbar.module.css';
import { useScroll } from '@/lib/hooks/useScroll';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Browse Tools' },
  ...CATEGORIES.map((cat) => ({ href: `/category/${cat.slug}`, label: cat.name })),
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScroll(10);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 h-[var(--navbar-height)] w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <div className={styles.logoMark}>SL</div>
          <span className={styles.logoText}>
            Stack<span>list</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === '/' ? router.pathname === '/' : router.asPath.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:block">
            <Button href="/coming-soon" variant="secondary" size="sm">
              Sign in
            </Button>
          </div>
          <Button href="/coming-soon" variant="primary" size="sm">
            Get started
          </Button>
          <button
            className="md:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
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
        <div 
          className="fixed inset-0 top-[var(--navbar-height)] bg-white z-40 flex flex-col md:hidden overflow-y-auto"
        >
          <nav className="flex flex-col p-6 gap-2 flex-grow" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/' ? router.pathname === '/' : router.asPath.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto p-6 space-y-4 border-t border-gray-100 bg-gray-50/50">
            <Button href="/coming-soon" variant="secondary" size="md" fullWidth>
              Sign in
            </Button>
            <Button href="/coming-soon" variant="primary" size="md" fullWidth>
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
