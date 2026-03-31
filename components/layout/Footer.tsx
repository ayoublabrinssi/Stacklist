import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  Product: [
    { href: '/products', label: 'Browse Tools' },
    { href: '/category/productivity', label: 'Productivity' },
    { href: '/category/devtools', label: 'DevTools' },
    { href: '/category/analytics', label: 'Analytics' },
    { href: '/category/crm', label: 'CRM' },
  ],
  Company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press' },
  ],
  Resources: [
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'API Reference' },
    { href: '#', label: 'Community' },
    { href: '#', label: 'Support' },
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
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
