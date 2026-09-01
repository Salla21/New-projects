'use client';

import { useCallback, useMemo } from 'react';
import { fetchLatest } from '@/lib/data';
import { useContentData } from '@/lib/hooks';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Newspaper } from 'lucide-react';

export function LatestPageContent() {
  const fetchFn = useCallback(() => fetchLatest(), []);
  const { data, loading, error, retry } = useContentData(fetchFn);
  const { preferences } = usePreferences();

  const sortedItems = useMemo(() => {
    const filtered = preferences.hiddenCategories.length > 0
      ? data.filter(
          (item) => !item.categories.some((cat) => preferences.hiddenCategories.includes(cat))
        )
      : data;
    return [...filtered].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [data, preferences.hiddenCategories]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Latest News" icon={<Newspaper className="h-6 w-6" />} as="h1" />
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Latest News" icon={<Newspaper className="h-6 w-6" />} as="h1" />
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  if (sortedItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Latest News" icon={<Newspaper className="h-6 w-6" />} as="h1" />
        <div className="mt-6">
          <EmptyState
            title="No Latest News"
            description="There are no news items available at the moment. Please check back later."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Latest News" icon={<Newspaper className="h-6 w-6" />} as="h1" />
      <div className="mt-6">
        <ContentGrid items={sortedItems} />
      </div>
    </div>
  );
}
