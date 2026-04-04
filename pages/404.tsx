import Head from 'next/head';
import Button from '@/components/ui/Button';
import styles from '@/styles/ErrorPage.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found — Stacklist</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            Sorry, we couldn't find the page you're looking for. It might have been removed or the link is incorrect.
          </p>
          <div className={styles.actions}>
            <Button href="/" variant="primary" size="lg">Return Home</Button>
            <Button href="/products" variant="secondary" size="lg">Browse Tools</Button>
          </div>
        </div>
      </div>
    </>
  );
}
