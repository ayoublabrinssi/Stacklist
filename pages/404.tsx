import Head from 'next/head';
import Button from '@/components/ui/Button';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found — Stacklist</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center bg-white">
        <div className="flex flex-col items-center max-w-lg">
          <div className="text-8xl md:text-9xl font-black text-brand-100 select-none mb-6">404</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 -mt-12 relative z-10">Page Not Found</h1>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or the link is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">Return Home</Button>
            <Button href="/products" variant="secondary" size="lg" className="w-full sm:w-auto">Browse Tools</Button>
          </div>
        </div>
      </div>
    </>
  );
}
