import React from 'react';
import styles from './FilterTag.module.css';

interface FilterTagProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
}

export default function FilterTag({ label, count, active = false, onClick }: FilterTagProps) {
  return (
    <button
      type="button"
      className={[styles.filterTag, active ? styles.active : styles.inactive]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
}
