import React from 'react';

type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'productivity'
  | 'devtools'
  | 'analytics'
  | 'crm';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-100 text-brand-700',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
  productivity: 'bg-brand-100 text-brand-700',
  devtools: 'bg-sky-100 text-sky-800',
  analytics: 'bg-amber-100 text-amber-800',
  crm: 'bg-emerald-100 text-emerald-800',
};

export default function Badge({
  variant = 'default',
  children,
  dot = false,
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 text-xs font-medium leading-none rounded-full px-2.5 py-1 whitespace-nowrap tracking-wide';
  
  return (
    <span className={[baseStyles, variantStyles[variant], className].filter(Boolean).join(' ')}>
      {dot && <span className={'w-1.5 h-1.5 rounded-full bg-current shrink-0'} aria-hidden="true" />}
      {children}
    </span>
  );
}
