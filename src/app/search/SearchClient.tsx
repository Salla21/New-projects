'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { fetchLatest } from '@/lib/data';
import { useContentData, useSearch } from '@/lib/hooks';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import type { FilterConfig, ActiveFilters, Region, Category, ContentType } from '@/types';

const FILTER_CONFIGS: FilterConfig[] = [
  {
    id: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'banjul', label: 'Banjul' },
      { value: 'kanifing', label: 'Kanifing' },
      { value: 'west-coast', label: 'West Coast' },
      { value: 'north-bank', label: 'North Bank' },
      { value: 'lower-river', label: 'Lower River' },
      { value: 'central-river', label: 'Central River' },
      { value: 'upper-river', label: 'Upper River' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'politics', label: 'Politics' },
      { value: 'business', label: 'Business' },
      { value: 'technology', label: 'Technology' },
      { value: 'sports', label: 'Sports' },
      { value: 'diaspora', label: 'Diaspora' },
    ],
  },
  {
    id: 'contentType',
    label: 'Content Type',
    type: 'select',
    options: [
      { value: 'article', label: 'Article' },
      { value: 'video', label: 'Video' },
      { value: 'podcast', label: 'Podcast' },
      { value: 'radio', label: 'Radio' },
      { value: 'social', label: 'Social' },
      { value: 'official-update', label: 'Official Update' },
    ],
  },
  {
    id: 'dateFrom',
    label: 'Date From',
    type: 'date',
  },
  {
    id: 'dateTo',
    label: 'Date To',
    type: 'date',
  },
];

export function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const fetchFn = useCallback(() => fetchLatest(), []);
  const { data: allContent, loading, error, retry } = useContentData(fetchFn);

  const { results, resultCount, query, filters, setQuery, setFilters, clearAll } =
    useSearch(allContent);

  // Sync initial query from URL params
  useEffect(() => {
    if (initialQuery && !query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  const handleSearch = (term: string) => {
    setQuery(term);
  };

  const handleFilterChange = (filterId: string, value: string | null) => {
    setFilters({ [filterId]: value } as Record<string, Region | Category | ContentType | string | null>);
  };

  const handleClearFilters = () => {
    clearAll();
  };

  const activeFilters: ActiveFilters = {
    region: filters.region,
    category: filters.category,
    contentType: filters.contentType,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Search" icon={<Search className="h-6 w-6" />} />
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Search" icon={<Search className="h-6 w-6" />} />
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Search" icon={<Search className="h-6 w-6" />} />

      <div className="mt-6 space-y-4">
        <SearchBar
          onSearch={handleSearch}
          defaultValue={initialQuery}
          placeholder="Search Gambian news..."
        />

        <FilterBar
          filters={FILTER_CONFIGS}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        <p className="text-body-sm text-ink-muted">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      </div>

      <div className="mt-6">
        {results.length === 0 ? (
          <EmptyState
            title="No Results Found"
            description="Try adjusting your search terms or filters. You can also browse by region, topic, or date."
            icon={<Search className="h-12 w-12" />}
          />
        ) : (
          <ContentGrid items={results} />
        )}
      </div>
    </div>
  );
}
