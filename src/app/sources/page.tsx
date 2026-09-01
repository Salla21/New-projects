'use client';

import { useState, useEffect, useCallback } from 'react';
import { Building2, BadgeCheck } from 'lucide-react';
import { fetchSources } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import type { SourceInfo } from '@/types';

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSources();
      setSources(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load sources';
      console.error(`[SmCoastHub] Data fetch error: ${message}`);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Sources Directory" icon={<Building2 className="h-6 w-6" />} as="h1" />
        <div className="mt-6">
          <LoadingSkeleton variant="card" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <SectionHeader title="Sources Directory" icon={<Building2 className="h-6 w-6" />} as="h1" />
        <div className="mt-6">
          <ErrorState message={error} onRetry={load} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Sources Directory" icon={<Building2 className="h-6 w-6" />} as="h1" />
      <div className="mt-6 grid grid-cols-1 gap-card-gap sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.websiteUrl || `/sources/${source.id}`}
            target={source.websiteUrl ? '_blank' : undefined}
            rel={source.websiteUrl ? 'noopener noreferrer' : undefined}
            className="flex flex-col gap-3 rounded-card bg-surface-card dark:bg-navy-light p-card-pad border border-surface-border dark:border-navy-lighter shadow-card transition-shadow hover:shadow-card-hover hover:border-orange"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-h3 text-ink dark:text-white">{source.name}</h3>
              {source.isOfficialSource && (
                <span className="flex items-center gap-1 rounded-badge bg-info/10 px-2 py-0.5 text-caption text-info">
                  <BadgeCheck className="h-3 w-3" />
                  Official
                </span>
              )}
            </div>
            <p className="text-body-sm text-ink-muted dark:text-white/70 line-clamp-2">{source.description}</p>
            <div className="flex flex-wrap gap-2">
              {source.contentTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-badge bg-surface-muted dark:bg-navy-lighter px-2 py-0.5 text-caption text-ink-muted dark:text-white/60"
                >
                  {type}
                </span>
              ))}
            </div>
            {source.websiteUrl && (
              <p className="text-caption font-medium text-orange">Visit site →</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
