import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  showHash?: boolean;
  className?: string;
}

export default function Tag({
  children,
  onClick,
  active = false,
  showHash = true,
  className = '',
}: TagProps) {
  const classes = [
    styles.tag,
    onClick ? styles.clickable : '',
    active ? styles.active : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={active}
      >
        {showHash && <span className={styles.hash}>#</span>}
        {children}
      </button>
    );
  }

  return (
    <span className={classes}>
      {showHash && <span className={styles.hash}>#</span>}
      {children}
    </span>
  );
}
