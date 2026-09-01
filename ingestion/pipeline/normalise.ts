import type { RawEntry, SourceConfig, ContentItem } from '../types';
import { generateId } from '../utils/hash';

/**
 * Normalises raw entries from a connector into ContentItem objects.
 */
export function normalise(rawEntries: RawEntry[], source: SourceConfig): ContentItem[] {
  const collectedAt = new Date().toISOString();

  return rawEntries.map((raw) => {
    const id = generateId(raw.link);
    const summary = truncateSummary(raw.description ?? '');
    const publishedAt = raw.publishedAt
      ? new Date(raw.publishedAt).toISOString()
      : collectedAt;

    return {
      id,
      title: raw.title.trim(),
      summary,
      sourceId: source.id,
      sourceName: source.name,
      sourceUrl: source.url ?? '',
      originalUrl: raw.link,
      publishedAt,
      collectedAt,
      region: 'banjul', // Default; tagger will override
      categories: [],   // Default; tagger will override
      contentType: source.contentType ?? 'article',
      thumbnailUrl: raw.thumbnailUrl ?? null,
      author: raw.author ?? null,
      language: 'en',
      isGoodNews: false, // Default; tagger will override
      isOfficialSource: source.isOfficialSource ?? false,
      embedUrl: raw.embedUrl ?? null,
      status: 'published',
    };
  });
}

function truncateSummary(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 280) {
    return trimmed;
  }
  return trimmed.slice(0, 277) + '...';
}
