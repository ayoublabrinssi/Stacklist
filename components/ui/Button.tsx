import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButton extends SharedProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  href?: undefined;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700 hover:border-brand-700 hover:shadow-md active:bg-brand-800 active:translate-y-[1px]',
  secondary: 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm active:bg-slate-100 active:translate-y-[1px]',
  ghost: 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100 hover:text-slate-800 active:bg-slate-200 active:translate-y-[1px]',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:shadow-md active:bg-red-700 active:translate-y-[1px]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer border   disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
  
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, rel } = rest as ButtonAsLink;
    const isExternal = /^(https?:\/\/|mailto:|tel:|\/\/)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
