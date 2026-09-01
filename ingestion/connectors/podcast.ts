import Parser from 'rss-parser';
import { logger } from '../utils/logger';
import { rateLimitedFetch, withRetry } from '../utils/rate-limit';
import type { Connector, SourceConfig, RawEntry } from '../types';

const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: [
      ['itunes:duration', 'duration'],
      ['itunes:author', 'itunesAuthor'],
      ['itunes:summary', 'itunesSummary'],
    ],
  },
});

export const podcastConnector: Connector = {
  async fetch(source: SourceConfig): Promise<RawEntry[]> {
    if (!source.url) {
      logger.error('Podcast source missing URL', { sourceId: source.id });
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
        return {
          title: item.title?.trim() || 'Untitled',
          link: item.enclosure?.url || item.link || item.guid || '',
          publishedAt: item.pubDate || item.isoDate || undefined,
          author: (anyItem.itunesAuthor as string) || item.creator || undefined,
          description: (anyItem.itunesSummary as string) || item.contentSnippet || item.content || undefined,
          duration: (anyItem.duration as string) || undefined,
          embedUrl: item.enclosure?.url || undefined,
        };
      });

      logger.info(`Podcast fetched ${entries.length} episodes`, { sourceId: source.id });
      return entries.filter(e => e.link);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Podcast connector failed for ${source.id}: ${message}`, { sourceId: source.id });
      return [];
    }
  },
};
