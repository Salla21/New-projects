'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchByDate } from '@/lib/data';
import { useContentData } from '@/lib/hooks';
import { formatDate, getNextDate, getPreviousDate } from '@/lib/dates';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface DateArchiveClientProps {
  date: string;
}

export function DateArchiveClient({ date }: DateArchiveClientProps) {
  const fetchFn = useCallback(() => fetchByDate(date), [date]);
  const { data, loading, error, retry } = useContentData(fetchFn);

  const previousDate = getPreviousDate(date);
  const nextDate = getNextDate(date);
  const formattedDate = formatDate(date);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Archive', href: '/archive' },
    { label: formattedDate },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <SectionHeader title="Date Archive" icon={<Calendar className="h-6 w-6" />} />
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <SectionHeader title="Date Archive" icon={<Calendar className="h-6 w-6" />} />
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />
      <SectionHeader title="Date Archive" icon={<Calendar className="h-6 w-6" />} />

      <div className="mt-6">
        {/* Date display and navigation */}
        <div className="mb-6 flex items-center justify-between rounded-card bg-surface-card p-card-pad shadow-card">
          <Link
            href={`/archive/${previousDate}`}
            className="flex items-center gap-1 rounded-button px-3 py-2 text-body-sm font-medium text-orange transition-colors hover:bg-surface-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous day
          </Link>
          <div className="text-center">
            <p className="text-h3 text-ink">{formattedDate}</p>
          </div>
          <Link
            href={`/archive/${nextDate}`}
            className="flex items-center gap-1 rounded-button px-3 py-2 text-body-sm font-medium text-orange transition-colors hover:bg-surface-muted"
          >
            Next day
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {data.length === 0 ? (
          <EmptyState
            title="No Content for This Date"
            description={`There are no news items available for ${formattedDate}. Try navigating to a different date.`}
            icon={<Calendar className="h-12 w-12" />}
          />
        ) : (
          <ContentGrid items={data} />
        )}
      </div>
    </div>
  );
}
