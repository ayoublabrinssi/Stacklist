import React from 'react';
import styles from './Card.module.css';

type CardVariant = 'default' | 'elevated' | 'flat' | 'interactive';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  onClick,
}: CardProps) {
  return (
    <div
      className={[styles.card, styles[variant], styles[`padding-${padding}`], className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
