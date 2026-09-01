import { readFileSync, existsSync } from 'fs';
import { logger } from '../utils/logger';
import type { Connector, SourceConfig, RawEntry } from '../types';

interface ManualEntry {
  title?: string;
  originalUrl?: string;
  publishedAt?: string;
  author?: string;
  description?: string;
  thumbnailUrl?: string;
}

export const manualConnector: Connector = {
  async fetch(source: SourceConfig): Promise<RawEntry[]> {
    if (!source.manualFile) {
      logger.error('Manual source missing manualFile path', { sourceId: source.id });
      return [];
    }

    if (!existsSync(source.manualFile)) {
      logger.warn(`Manual file not found: ${source.manualFile}`, { sourceId: source.id });
      return [];
    }

    try {
      const raw = readFileSync(source.manualFile, 'utf-8');
      const entries: ManualEntry[] = JSON.parse(raw);

      const valid: RawEntry[] = [];
      for (const entry of entries) {
        if (!entry.title || !entry.originalUrl || !entry.publishedAt) {
          logger.warn('Manual entry missing required fields, skipping', { sourceId: source.id, entry });
          continue;
        }
        valid.push({
          title: entry.title,
          link: entry.originalUrl,
          publishedAt: entry.publishedAt,
          author: entry.author,
          description: entry.description,
          thumbnailUrl: entry.thumbnailUrl,
        });
      }

      logger.info(`Manual loaded ${valid.length} entries`, { sourceId: source.id });
      return valid;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Manual connector failed for ${source.id}: ${message}`, { sourceId: source.id });
      return [];
    }
  },
};
