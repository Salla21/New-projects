'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function SearchBar({ onSearch, placeholder = 'Search news...', defaultValue = '', className, variant = 'light' }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search news"
          className={cn(
            'w-full rounded-button border px-4 py-2 pl-10 text-body-sm placeholder:text-ink-light focus:outline-none focus:ring-2',
            variant === 'dark'
              ? 'border-white/20 bg-navy-light text-white placeholder:text-white/50 focus:border-orange focus:ring-orange/50'
              : 'border-surface-border bg-surface-card text-ink dark:border-navy-lighter dark:bg-navy-light dark:text-white dark:placeholder:text-white/50 focus:border-orange focus:ring-orange/50'
          )}
        />
        <Search
          className={cn(
            'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
            variant === 'dark' ? 'text-white/50' : 'text-ink-light dark:text-white/50'
          )}
          aria-hidden="true"
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-button bg-orange px-4 py-2 text-body-sm font-medium text-white hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/50"
        aria-label="Submit search"
      >
        Search
      </button>
    </div>
  );
}
