'use client';

import { useState, useEffect, useCallback } from 'react';
import { ContentItem } from '@/types';

interface UseContentDataResult {
  data: ContentItem[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useContentData(
  fetchFn: () => Promise<ContentItem[]>
): UseContentDataResult {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load content';
      console.error(`[SmCoastHub] Data fetch error: ${message}`);
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, retry: load };
}
