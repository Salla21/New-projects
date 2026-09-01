'use client';

import { useState, useMemo, useCallback } from 'react';
import { ContentItem, SearchFilters } from '@/types';
import { filterContent } from '@/lib/search';

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  region: null,
  category: null,
  contentType: null,
  sourceId: null,
  dateFrom: null,
  dateTo: null,
};

interface UseSearchResult {
  results: ContentItem[];
  resultCount: number;
  query: string;
  filters: SearchFilters;
  setQuery: (q: string) => void;
  setFilters: (f: Partial<SearchFilters>) => void;
  clearAll: () => void;
}

export function useSearch(allContent: ContentItem[]): UseSearchResult {
  const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS);

  const results = useMemo(
    () => filterContent(allContent, filters),
    [allContent, filters]
  );

  const setQuery = useCallback((q: string) => {
    setFiltersState((prev) => ({ ...prev, query: q }));
  }, []);

  const setFilters = useCallback((partial: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const clearAll = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
  }, []);

  return {
    results,
    resultCount: results.length,
    query: filters.query,
    filters,
    setQuery,
    setFilters,
    clearAll,
  };
}
