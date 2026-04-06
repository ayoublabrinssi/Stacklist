import React from 'react';

interface FilterTagProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
}

export default function FilterTag({ label, count, active = false, onClick }: FilterTagProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-all duration-150 whitespace-nowrap  ';
  
  const stateStyles = active
    ? 'bg-brand-600 text-white border-brand-600 shadow-sm hover:bg-brand-700 hover:border-brand-700'
    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900';

  const countStyles = active
    ? 'bg-white/25 text-white'
    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700';

  return (
    <button
      type="button"
      className={[baseStyles, stateStyles, !active && 'group'].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
      {count !== undefined && (
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold leading-relaxed transition-colors duration-150 ${countStyles}`}>
          {count}
        </span>
      )}
    </button>
  );
}
