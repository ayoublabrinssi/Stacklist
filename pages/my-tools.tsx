import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '@/lib/auth/AuthContext';
import { useToolBag } from '@/lib/context/ToolBagContext';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';

export default function MyToolsPage() {
  const { isLoggedIn, user } = useAuth();
  const { requestedTools } = useToolBag();
  const [activeTab, setActiveTab] = useState<'active' | 'requested'>('active');

  // If not logged in, we shouldn't really be here, but we can show a fallback
  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-slate-50/50 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Please log in to view your tools</h1>
        <Button href="/login" variant="primary">Sign In</Button>
      </div>
    );
  }

  // Simulate some active tools (hardcoded from mock data)
  const activeTools = PRODUCTS.filter(p => ['calstack', 'flowdesk'].includes(p.slug));

  return (
    <>
      <Head>
        <title>My Tools - Stacklist</title>
        <meta name="description" content="Manage your active and requested tools." />
      </Head>

      <div className="min-h-[calc(100vh-64px)] bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              My Tools
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Manage the tools you currently have access to, and check the status of your requested tools.
            </p>
          </div>

          {/* Custom Tabs */}
          <div className="flex border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 ${
                activeTab === 'active' 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Active Tools ({activeTools.length})
            </button>
            <button
              onClick={() => setActiveTab('requested')}
              className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'requested' 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Requested Tools 
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'requested' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'}`}>
                {requestedTools.length}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {activeTab === 'active' && (
              <div>
                {activeTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTools.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Active Tools</h2>
                    <p className="text-slate-500 mb-6">You don't have any active tools right now.</p>
                    <Button href="/products" variant="primary">Browse Directory</Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'requested' && (
              <div>
                {requestedTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requestedTools.map((product) => (
                      <div key={product.slug} className="relative">
                        <ProductCard product={product} />
                        {/* Status Overlay Badge */}
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full border border-amber-200 shadow-sm flex items-center gap-1.5 backdrop-blur-sm">
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                           Pending Approval
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="12" y1="12" x2="22" y2="12" />
                        <path d="M12 12 l-6 -6" />
                        <path d="M12 12 l-6 6" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Pending Requests</h2>
                    <p className="text-slate-500 mb-6">You haven't requested any tools recently.</p>
                    <Button href="/products" variant="primary">Find Tools</Button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
