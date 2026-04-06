import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useToolBag } from '@/lib/context/ToolBagContext';
import Button from '@/components/ui/Button';
import { CATEGORY_VARIANT_MAP } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function RequestPage() {
  const { savedTools, submitRequest } = useToolBag();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API endpoint
    // For now, we'll simulate a successful submission
    setSubmitted(true);
    submitRequest();
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Request Received!
          </h1>
          <p className="text-slate-500 leading-relaxed mb-8">
            Thanks for reaching out. We've received your request for the tools and will get back to your team within 24 hours to help you get started.
          </p>
          <Button href="/products" variant="primary" size="lg" fullWidth>
            Continue exploring
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Request Tools - Stacklist</title>
        <meta name="description" content="Request access to your selected tools" />
      </Head>

      <div className="min-h-[calc(100vh-64px)] bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          
          <div className="mb-10 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Request access
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Fill out the details below to request priority access to the tools you've selected. Our team will help onboard your workspace securely.
            </p>
          </div>

          {savedTools.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Your tool bag is empty</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                You haven't selected any tools to request yet. Browse our directory to find the right B2B solutions for your team.
              </p>
              <Button href="/products" variant="primary" size="lg">
                Browse Directory
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Request Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                      Work email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900">
                      Company / Workspace Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="notes" className="block text-sm font-semibold text-slate-900">
                      How do you plan to use these tools? (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 resize-none"
                      placeholder="e.g. We are looking to replace our current CRM and need 50 seats..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Submit Request
                    </Button>
                    <p className="mt-4 text-xs text-center text-slate-400">
                      By submitting this request, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>

              {/* Selected Tools Summary */}
              <div className="lg:col-span-5 h-auto lg:sticky lg:top-24">
                <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
                  <h3 className="text-xl font-bold mb-2">Request Summary</h3>
                  <p className="text-sm text-slate-400 mb-6 pb-6 border-b border-white/10">
                    You are requesting access for {savedTools.length} tool{savedTools.length === 1 ? '' : 's'}.
                  </p>

                  <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {savedTools.map((product) => {
                      const badgeVariant = CATEGORY_VARIANT_MAP[product.categorySlug] ?? 'default';
                      
                      return (
                        <li key={product.slug} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                          <div
                            className="flex shrink-0 items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-sm shadow-md"
                            style={{
                              background: `linear-gradient(145deg, ${product.logoPlaceholder.color}ee, ${product.logoPlaceholder.color})`,
                            }}
                          >
                            {product.logoPlaceholder.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate mb-1">
                              {product.name}
                            </h4>
                            <Badge variant={badgeVariant} className="text-[10px] py-[1px] px-2 uppercase opacity-90 h-auto">
                              {product.category}
                            </Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total tools</span>
                    <span className="text-2xl font-black text-white">{savedTools.length}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
