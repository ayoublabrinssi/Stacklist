import React from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import PricingTable from './PricingTable';
import { CATEGORY_VARIANT_MAP } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const badgeVariant = CATEGORY_VARIANT_MAP[product.categorySlug] ?? 'default';

  return (
    <article className="py-4 sm:py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-6 sm:mb-8 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-600 transition-colors   rounded-sm">Home</Link>
        <span className="text-slate-300" aria-hidden="true">/</span>
        <Link href="/products" className="hover:text-brand-600 transition-colors   rounded-sm">Products</Link>
        <span className="text-slate-300" aria-hidden="true">/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-brand-600 transition-colors   rounded-sm">{product.category}</Link>
        <span className="text-slate-300" aria-hidden="true">/</span>
        <span className="text-slate-900 font-semibold" aria-current="page">{product.name}</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-10 sm:mb-12">
        <div
          className="flex shrink-0 items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-3xl text-white font-bold text-4xl tracking-tight shadow-xl ring-8 ring-slate-50 transition-transform duration-500 hover:scale-105"
          style={{ 
            backgroundColor: product.logoPlaceholder.color,
            background: `linear-gradient(135deg, ${product.logoPlaceholder.color}, ${product.logoPlaceholder.color}dd)` 
          }}
          aria-hidden="true"
        >
          {product.logoPlaceholder.initials}
        </div>

        <div className="flex-1 min-w-0 pt-2 text-left">
          <div className="mb-4">
            <Badge variant={badgeVariant} className="text-[11px] uppercase tracking-wider font-bold">
              {product.category}
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
            {product.name}
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-6 font-medium">
            {product.tagline}
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 border border-slate-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'
                    }`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div className="h-4 w-px bg-slate-200 mx-1" />
              <span className="font-bold text-slate-900 text-lg">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-slate-400 font-medium whitespace-nowrap">
                ({product.reviewCount.toLocaleString()} verified reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="/coming-soon" variant="primary" size="lg" className="w-full sm:w-auto px-10 shadow-lg shadow-brand-200">
              Request a Demo
            </Button>
            <Button href={product.website} variant="secondary" size="lg" className="w-full sm:w-auto px-8">
              Visit Website ↗
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mb-10 sm:mb-12" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
          About {product.name}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">{product.description}</p>
      </section>

      {/* Tags */}
      <section className="mb-10 sm:mb-14" aria-labelledby="tags-heading">
        <h3 id="tags-heading" className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-3">
          Tags &amp; Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingTable tiers={product.pricingTiers} productName={product.name} />

      {/* Custom Demo CTA */}
      <section id="request-demo" className="mt-10 sm:mt-14 w-full">
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
            .custom-cta-wrapper {
                font-family: 'Poppins', sans-serif;
            }
        `}} />
        <div className="custom-cta-wrapper w-full flex flex-col items-start justify-center text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-3xl p-6 sm:p-8 md:p-10 lg:pl-12 text-white relative shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl pointer-events-none"></div>

          <div className="flex items-center relative z-10 w-full">
            <div className="flex -space-x-3 pr-4">
              {/* eslint-disable @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                className="size-10 rounded-full border-[3px] border-[#4C0083] hover:-translate-y-px transition z-[1]" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                className="size-10 rounded-full border-[3px] border-[#4C0083] hover:-translate-y-px transition z-[2]" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="image"
                className="size-10 rounded-full border-[3px] border-[#4C0083] hover:-translate-y-px transition z-[3]" />
              {/* eslint-enable @next/next/no-img-element */}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z" fill="#FF8F20" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-300 font-medium">Used by {product.reviewCount ? (product.reviewCount * 12).toLocaleString() : '12k'}+ developers</p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[46px] md:leading-[60px] font-semibold max-w-2xl mt-5 mb-6 bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text relative z-10 tracking-tight">
            Build faster with {product.name}
          </h2>

          <div className="relative z-10">
            <Link href="/coming-soon" className="inline-block px-12 py-3.5 text-white border border-purple-500/50 bg-[#6b21a8]/60 hover:bg-[#6b21a8] hover:border-purple-400 transition-all rounded-full text-sm font-medium shadow-[0_0_15px_rgba(107,33,168,0.5)] cursor-pointer">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
