'use client';

import { useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useContentData } from '@/lib/hooks';
import { fetchGoodNews } from '@/lib/data';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';

export default function GoodNewsPage() {
  const fetchGood = useCallback(() => fetchGoodNews(), []);

  const { data, loading, error, retry } = useContentData(fetchGood);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <div className="border-l-4 border-success pl-4">
          <SectionHeader
            title="Good News from the Smiling Coast"
            icon={<Heart className="h-6 w-6 text-success" />}
            as="h1"
          />
        </div>
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <div className="border-l-4 border-success pl-4">
          <SectionHeader
            title="Good News from the Smiling Coast"
            icon={<Heart className="h-6 w-6 text-success" />}
            as="h1"
          />
        </div>
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <div className="border-l-4 border-success pl-4">
        <SectionHeader
          title="Good News from the Smiling Coast"
          icon={<Heart className="h-6 w-6 text-success" />}
          as="h1"
        />
      </div>
      <div className="mt-6">
        {data.length === 0 ? (
          <EmptyState
            title="No Good News"
            description="No good news stories available"
          />
        ) : (
          <ContentGrid items={data} />
        )}
      </div>
    </main>
  );
}
