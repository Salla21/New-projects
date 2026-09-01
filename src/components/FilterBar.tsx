'use client';

import { cn } from '@/lib/utils';
import type { FilterConfig, ActiveFilters } from '@/types';

interface FilterBarProps {
  filters: FilterConfig[];
  activeFilters: ActiveFilters;
  onFilterChange: (filterId: string, value: string | null) => void;
  onClear: () => void;
  className?: string;
}

export function FilterBar({ filters, activeFilters, onFilterChange, onClear, className }: FilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some((v) => v !== null && v !== '');

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {filters.map((filter) => {
        if (filter.type === 'select' && filter.options) {
          return (
            <div key={filter.id} className="flex flex-col gap-1">
              <label htmlFor={`filter-${filter.id}`} className="sr-only">
                {filter.label}
              </label>
              <select
                id={`filter-${filter.id}`}
                value={activeFilters[filter.id] ?? ''}
                onChange={(e) => onFilterChange(filter.id, e.target.value || null)}
                aria-label={filter.label}
                className="rounded-button border border-ink-light/20 bg-surface-card px-3 py-2 text-body-sm text-ink focus:outline-none focus:ring-2 focus:ring-orange/50"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (filter.type === 'date') {
          return (
            <div key={filter.id} className="flex flex-col gap-1">
              <label htmlFor={`filter-${filter.id}`} className="sr-only">
                {filter.label}
              </label>
              <input
                id={`filter-${filter.id}`}
                type="date"
                value={activeFilters[filter.id] ?? ''}
                onChange={(e) => onFilterChange(filter.id, e.target.value || null)}
                aria-label={filter.label}
                className="rounded-button border border-ink-light/20 bg-surface-card px-3 py-2 text-body-sm text-ink focus:outline-none focus:ring-2 focus:ring-orange/50"
              />
            </div>
          );
        }

        return null;
      })}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-button px-3 py-2 text-body-sm font-medium text-error hover:bg-error/10 focus:outline-none focus:ring-2 focus:ring-error/50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
