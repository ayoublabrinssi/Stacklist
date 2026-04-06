import Head from 'next/head';
import Button from '@/components/ui/Button';

export default function ComingSoon() {
  const missingPages = [
    'Sign In / Sign Up - completed ',
    'User Dashboard - completed ',
    'Submit a Tool - pending ',
    'Request a Demo - pending ',
    'Company (About, Blog, Careers) - pending ',
    'Resources (Docs, API, Community) - pending ',
    'Legal (Privacy, Terms)',
  ];

  return (
    <>
      <Head>
        <title>Coming Soon — Stacklist</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center bg-white">
        <div className="flex flex-col items-center max-w-lg">
          <div className="text-8xl md:text-9xl mb-6 select-none opacity-80 mix-blend-multiply">🚀</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Coming Soon</h1>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-md mx-auto">
            We're working hard to bring this section to life. Here's what we are currently building:
          </p>

          <ul className="text-left w-full max-w-xs mx-auto mb-10 space-y-2">
            {missingPages.map((page) => (
              <li key={page} className="flex items-center text-slate-600 text-[15px] p-2 bg-slate-50 rounded-lg border border-slate-100 shadow-sm font-medium">
                <span className="text-brand-500 mr-3 text-lg leading-none shrink-0">•</span> {page}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">Return Home</Button>
            <Button href="/products" variant="secondary" size="lg" className="w-full sm:w-auto">Browse Tools</Button>
          </div>
        </div>
      </div>
    </>
  );
}
