import React from 'react';

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
  const baseStyles = 'inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-0.5 whitespace-nowrap tracking-wide leading-tight transition-colors duration-150 border';
  
  const stateStyles = active
    ? 'bg-brand-100 text-brand-700 border-brand-300'
    : onClick
    ? 'text-slate-600 bg-slate-100 border-slate-200 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 cursor-pointer'
    : 'text-slate-600 bg-slate-100 border-slate-200';

  const classes = [baseStyles, stateStyles, className].filter(Boolean).join(' ');

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={active}
      >
        {showHash && <span className="opacity-50 select-none">#</span>}
        {children}
      </button>
    );
  }

  return (
    <span className={classes}>
      {showHash && <span className="opacity-50 select-none">#</span>}
      {children}
    </span>
  );
}
