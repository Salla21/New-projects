'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { fetchByRegion } from '@/lib/data';
import { useContentData } from '@/lib/hooks';
import { slugToTitle } from '@/lib/text';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { Region } from '@/types';
import { MapPin } from 'lucide-react';

export function RegionPageContent() {
  const params = useParams();
  const slug = params.slug as string;
  const regionName = slugToTitle(slug);

  const fetchFn = useCallback(() => fetchByRegion(slug as Region), [slug]);
  const { data, loading, error, retry } = useContentData(fetchFn);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Regions', href: '/regions' },
    { label: regionName },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <SectionHeader title={regionName} icon={<MapPin className="h-6 w-6" />} />
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
        <SectionHeader title={regionName} icon={<MapPin className="h-6 w-6" />} />
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <SectionHeader title={regionName} icon={<MapPin className="h-6 w-6" />} />
        <div className="mt-6">
          <EmptyState
            title={`No Content for ${regionName}`}
            description={`There are no news items available for the ${regionName} region at the moment. Please check back later.`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />
      <SectionHeader title={regionName} icon={<MapPin className="h-6 w-6" />} />
      <div className="mt-6">
        <ContentGrid items={data} />
      </div>
    </div>
  );
}
