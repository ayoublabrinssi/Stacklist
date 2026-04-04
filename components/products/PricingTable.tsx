import React from 'react';
import type { PricingTier } from '@/types';
import Button from '@/components/ui/Button';
import styles from './PricingTable.module.css';

interface PricingTableProps {
  tiers: PricingTier[];
  productName: string;
}

function CheckIcon() {
  return (
    <svg
      className={styles.checkIcon}
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
    <section className={styles.section} aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className={styles.sectionTitle}>
        Simple, transparent pricing
      </h2>
      <p className={styles.sectionSubtitle}>
        Start for free, scale as you grow.
        {tiers.some((t) => t.trialDays) &&
          ` All plans include a ${
            tiers.find((t) => t.trialDays)?.trialDays
          }-day free trial of ${productName} Pro.`}
      </p>

      <div className={styles.tiers}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={[styles.tier, tier.highlighted ? styles.highlighted : '']
              .filter(Boolean)
              .join(' ')}
          >
            {tier.highlighted && (
              <div className={styles.popularBadge} aria-label="Most popular plan">
                Most popular
              </div>
            )}

            <div className={styles.tierHeader}>
              <div className={styles.tierName}>{tier.name}</div>
              <div className={styles.priceRow}>
                {tier.price === null ? (
                  <span className={styles.customPrice}>Custom</span>
                ) : tier.price === 0 ? (
                  <span className={styles.price}>Free</span>
                ) : (
                  <>
                    <span className={styles.price}>${tier.price}</span>
                    <span className={styles.pricePeriod}>/ {tier.billingPeriod}</span>
                  </>
                )}
              </div>
              <p className={styles.tierDescription}>{tier.description}</p>
            </div>

            <ul className={styles.featureList} aria-label={`${tier.name} plan features`}>
              {tier.features.map((feature, featureIndex) => (
                <li key={`${tier.name}-feature-${featureIndex}`} className={styles.feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
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
