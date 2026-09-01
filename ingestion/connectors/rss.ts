import Parser from 'rss-parser';
import { logger } from '../utils/logger';
import { rateLimitedFetch, withRetry } from '../utils/rate-limit';
import type { Connector, SourceConfig, RawEntry } from '../types';

const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: ['media:thumbnail', 'media:content'],
  },
});

export const rssConnector: Connector = {
  async fetch(source: SourceConfig): Promise<RawEntry[]> {
    if (!source.url) {
      logger.error('RSS source missing URL', { sourceId: source.id });
      return [];
    }

    try {
      const result = await withRetry(async () => {
        const response = await rateLimitedFetch(source.url!);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} from ${source.url}`);
        }
        const xml = await response.text();
        return parser.parseString(xml);
      });

      const entries: RawEntry[] = (result.items || []).map((item) => {
        const anyItem = item as unknown as Record<string, unknown>;
        const mediaThumbnail = anyItem['media:thumbnail'] as Record<string, unknown> | undefined;
        const thumbnailAttrs = mediaThumbnail?.['$'] as Record<string, unknown> | undefined;
        return {
          title: item.title?.trim() || 'Untitled',
          link: item.link || item.guid || '',
          publishedAt: item.pubDate || item.isoDate || undefined,
          author: item.creator || (anyItem.author as string) || undefined,
          description: item.contentSnippet || item.content || item.summary || undefined,
          thumbnailUrl: (thumbnailAttrs?.url as string) || undefined,
        };
      });

      logger.info(`RSS fetched ${entries.length} items`, { sourceId: source.id });
      return entries.filter(e => e.link);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`RSS connector failed for ${source.id}: ${message}`, { sourceId: source.id });
      return [];
    }
  },
};
