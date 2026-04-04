import Head from 'next/head';
import Button from '@/components/ui/Button';
import styles from '@/styles/ErrorPage.module.css';

export default function ComingSoon() {
  const missingPages = [
    'Sign In / Sign Up',
    'User Dashboard',
    'Submit a Tool',
    'Request a Demo',
    'Company (About, Blog, Careers)',
    'Resources (Docs, API, Community)',
    'Legal (Privacy, Terms)',
  ];

  return (
    <>
      <Head>
        <title>Coming Soon — Stacklist</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>🚀</div>
          <h1 className={styles.title}>Coming Soon</h1>
          <p className={styles.description}>
            We're working hard to bring this section to life. Here's what we are currently building:
          </p>

          <ul className={styles.missingList}>
            {missingPages.map((page) => (
              <li key={page} className={styles.missingItem}>
                <span className={styles.bullet}>•</span> {page}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button href="/" variant="primary" size="lg">Return Home</Button>
            <Button href="/products" variant="secondary" size="lg">Browse Tools</Button>
          </div>
        </div>
      </div>
    </>
  );
}
