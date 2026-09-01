import { Suspense } from 'react';
import { SearchClient } from './SearchClient';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Gambian news by keyword, region, category, source, and date. Find stories across all of The Gambia.',
  openGraph: {
    title: 'Search | The Smiling Coast Hub',
    description: 'Search and filter Gambian news content.',
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
