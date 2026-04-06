import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search tools by name, category, or keyword…',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative flex items-center w-full max-w-2xl group ${className}`}>
      <span className="absolute left-4 text-slate-400 group-focus-within:text-brand-500 transition-colors pointer-events-none" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="6" />
          <path d="M12.5 12.5l3.5 3.5" />
        </svg>
      </span>
      <input
        type="search"
        className="w-full h-12 pl-11 pr-10 text-base text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      {value && (
        <button
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors  "
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}
