import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import styles from './Footer.module.css';

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
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoText}>
              Stack<span>list</span>
            </div>
            <p>
              The B2B SaaS marketplace helping teams discover, compare, and adopt the right tools
              to scale their business.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className={styles.col}>
              <h4>{heading}</h4>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Stacklist, Inc. All rights reserved.</p>
          <nav className={styles.legal} aria-label="Legal navigation">
            <Link href="/coming-soon">Privacy Policy</Link>
            <Link href="/coming-soon">Terms of Service</Link>
            <Link href="/coming-soon">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
