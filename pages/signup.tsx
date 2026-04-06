import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoggedIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    router.replace('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const ok = await signup({ name, email, password });
    setLoading(false);

    if (ok) {
      router.push('/');
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Create account — Stacklist</title>
        <meta name="description" content="Create a Stacklist account to discover, compare, and manage the best B2B SaaS tools." />
      </Head>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo mark */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white font-bold text-lg shadow-lg shadow-brand-200 mb-4">
              SL
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Start discovering the best B2B tools
            </p>
          </div>

          {/* Card */}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {error && (
              <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                  placeholder="Alex Morgan"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                  placeholder="you@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                  placeholder="Min. 6 characters"
                />
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="confirm" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                  placeholder="Same as above"
                />
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/coming-soon" className="text-brand-600 hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link href="/coming-soon" className="text-brand-600 hover:underline">Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <div className="mt-5">
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
