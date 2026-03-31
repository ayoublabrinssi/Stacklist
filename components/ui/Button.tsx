import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

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

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, rel } = rest as ButtonAsLink;
    const isExternal = href.startsWith('http');
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
