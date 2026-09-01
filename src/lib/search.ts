import type { ContentItem, SearchFilters } from '@/types';

export function searchContent(items: ContentItem[], query: string): ContentItem[] {
  if (!query.trim()) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.summary.toLowerCase().includes(lowerQuery)
  );
}

export function filterContent(items: ContentItem[], filters: SearchFilters): ContentItem[] {
  let results = items;

  if (filters.query.trim()) {
    results = searchContent(results, filters.query);
  }
  if (filters.region) {
    const region = filters.region;
    results = results.filter((item) => item.region === region);
  }
  if (filters.category) {
    const category = filters.category;
    results = results.filter((item) => item.categories.includes(category));
  }
  if (filters.contentType) {
    const contentType = filters.contentType;
    results = results.filter((item) => item.contentType === contentType);
  }
  if (filters.sourceId) {
    const sourceId = filters.sourceId;
    results = results.filter((item) => item.sourceId === sourceId);
  }
  if (filters.dateFrom) {
    const dateFrom = filters.dateFrom;
    results = results.filter((item) => item.publishedAt >= dateFrom);
  }
  if (filters.dateTo) {
    const dateTo = filters.dateTo;
    results = results.filter((item) => item.publishedAt <= dateTo);
  }

  return results;
}

export function sortByDate(items: ContentItem[], order: 'asc' | 'desc' = 'desc'): ContentItem[] {
  return [...items].sort((a, b) => {
    const comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    return order === 'desc' ? -comparison : comparison;
  });
}
