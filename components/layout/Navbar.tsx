import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Browse Tools' },
  { href: '/category/productivity', label: 'Productivity' },
  { href: '/category/devtools', label: 'DevTools' },
  { href: '/category/analytics', label: 'Analytics' },
  { href: '/category/crm', label: 'CRM' },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>SL</div>
          <span className={styles.logoText}>
            Stack<span>list</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
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

        <div className={styles.actions}>
          <Button href="/products" variant="secondary" size="sm" className="signIn">
            Sign in
          </Button>
          <Button href="/products" variant="primary" size="sm">
            Get started
          </Button>
          <button className={styles.mobileMenuBtn} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
