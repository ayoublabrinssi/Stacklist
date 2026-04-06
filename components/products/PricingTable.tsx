import React from 'react';
import type { PricingTier } from '@/types';
import Button from '@/components/ui/Button';

interface PricingTableProps {
  tiers: PricingTier[];
  productName: string;
}

function CheckIcon() {
  return (
    <svg
      className="shrink-0 w-5 h-5 text-brand-500 mt-0.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8.5l3.5 3.5 7-7" />
    </svg>
  );
}

export default function PricingTable({ tiers, productName }: PricingTableProps) {
  return (
    <section className="py-10 sm:py-14 border-t border-slate-100" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center mb-3">
        Simple, transparent pricing
      </h2>
      <p className="text-base text-slate-500 text-center max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
        Start for free, scale as you grow.
        {tiers.some((t) => t.trialDays) &&
          ` All plans include a ${
            tiers.find((t) => t.trialDays)?.trialDays
          }-day free trial of ${productName} Pro.`}
      </p>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col flex-1 min-w-[280px] max-w-md bg-white rounded-2xl p-6 sm:p-8 transition-transform duration-200 ${
              tier.highlighted
                ? 'border-2 border-brand-500 shadow-xl shadow-brand-500/10 md:-translate-y-2'
                : 'border border-slate-200 shadow-sm md:mt-4 hover:shadow-md'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-3 py-1 bg-brand-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-sm" aria-label="Most popular plan">
                Most popular
              </div>
            )}

            <div className="mb-8 border-b border-slate-100 pb-8">
              <div className="text-lg font-semibold text-slate-900 mb-2">{tier.name}</div>
              <div className="flex items-baseline mb-4 gap-1.5">
                {tier.price === null ? (
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">Custom</span>
                ) : tier.price === 0 ? (
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">Free</span>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">${tier.price}</span>
                    <span className="text-sm font-medium text-slate-500">/ {tier.billingPeriod}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">{tier.description}</p>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1" aria-label={`${tier.name} plan features`}>
              {tier.features.map((feature, featureIndex) => (
                <li key={`${tier.name}-feature-${featureIndex}`} className="flex items-start gap-3 text-sm text-slate-600 leading-snug">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                fullWidth
                href="/coming-soon"
              >
                {tier.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
