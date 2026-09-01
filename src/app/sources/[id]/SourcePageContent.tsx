'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Building2, ExternalLink, BadgeCheck } from 'lucide-react';
import { fetchBySource } from '@/lib/data';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { ContentItem, SourceInfo } from '@/types';

export function SourcePageContent() {
  const params = useParams();
  const id = params.id as string;

  const [source, setSource] = useState<SourceInfo | null>(null);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBySource(id);
      setSource(result.source);
      setItems(result.items);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load source';
      console.error(`[SmCoastHub] Data fetch error: ${message}`);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Sources', href: '/sources' },
    { label: source?.name ?? id },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <SectionHeader title="Source" icon={<Building2 className="h-6 w-6" />} />
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
        <SectionHeader title="Source" icon={<Building2 className="h-6 w-6" />} />
        <div className="mt-6">
          <ErrorState message={error} onRetry={load} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />
      <SectionHeader title={source?.name ?? 'Source'} icon={<Building2 className="h-6 w-6" />} />

      {/* Source metadata */}
      <div className="mt-6 rounded-card bg-surface-card p-card-pad shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-h2 text-ink">{source?.name}</h2>
          {source?.isOfficialSource && (
            <span className="flex items-center gap-1 rounded-badge bg-info/10 px-2 py-0.5 text-caption text-info">
              <BadgeCheck className="h-3 w-3" />
              Official Source
            </span>
          )}
        </div>
        <p className="mt-2 text-body text-ink-muted">{source?.description}</p>
        {source?.websiteUrl && (
          <a
            href={source.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-orange hover:underline"
          >
            Visit website
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Content items */}
      <div className="mt-8">
        {items.length === 0 ? (
          <EmptyState
            title="No Content Available"
            description={`${source?.name ?? 'This source'} has no content items available at the moment.`}
          />
        ) : (
          <ContentGrid items={items} />
        )}
      </div>
    </div>
  );
}
