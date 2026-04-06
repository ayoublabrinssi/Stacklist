import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ToolBagProvider } from '@/lib/context/ToolBagContext';
import ToolBagPanel from '@/components/layout/ToolBagPanel';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToolBagProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Component {...pageProps} />
          </main>
          <Footer />
          <ToolBagPanel />
        </div>
      </ToolBagProvider>
    </AuthProvider>
  );
}
