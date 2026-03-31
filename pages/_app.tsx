import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
