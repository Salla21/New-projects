import { readFileSync } from 'fs';
import type { ContentItem, DataFile } from '../types';
import { normaliseUrl } from '../utils/hash';

/**
 * Creates a deduplicator function that filters out items already present
 * in the existing data file and tracks new URLs for intra-run dedup.
 */
export function createDeduplicator(existingDataPath: string) {
  const existingUrls = loadExistingUrls(existingDataPath);

  return function deduplicate(items: ContentItem[]): ContentItem[] {
    const result: ContentItem[] = [];

    for (const item of items) {
      const normalised = normaliseUrl(item.originalUrl);
      if (!existingUrls.has(normalised)) {
        existingUrls.add(normalised);
        result.push(item);
      }
    }

    return result;
  };
}

function loadExistingUrls(filePath: string): Set<string> {
  const urls = new Set<string>();

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const data: DataFile = JSON.parse(raw);

    if (data.items && Array.isArray(data.items)) {
      for (const item of data.items) {
        urls.add(normaliseUrl(item.originalUrl));
      }
    }
  } catch {
    // File doesn't exist or is malformed — start fresh
  }

  return urls;
}
