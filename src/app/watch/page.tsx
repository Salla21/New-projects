'use client';

import { useCallback } from 'react';
import { useContentData } from '@/lib/hooks';
import { fetchLatest } from '@/lib/data';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import type { ContentItem } from '@/types';

export default function WatchPage() {
  const fetchVideos = useCallback(async () => {
    const items = await fetchLatest();
    return items.filter((item: ContentItem) => item.contentType === 'video');
  }, []);

  const { data, loading, error, retry } = useContentData(fetchVideos);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Watch" as="h1" />
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Watch" as="h1" />
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Watch" as="h1" />
      <div className="mt-6">
        {data.length === 0 ? (
          <EmptyState
            title="No Videos"
            description="No video content available"
          />
        ) : (
          <ContentGrid items={data} variant="media" />
        )}
      </div>
    </main>
  );
}
