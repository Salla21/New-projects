import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import type { ContentItem, DataFile } from '../types';

const DATA_DIR = join(process.cwd(), 'public', 'data');
const MAX_LATEST = 100;
const MAX_TRENDING = 20;
const TRENDING_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Writes all output JSON files from the combined set of content items.
 */
export function writeAll(items: ContentItem[]): void {
  const generatedAt = new Date().toISOString();

  // Sort all items by publishedAt descending
  const sorted = [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // latest.json — all items, capped at MAX_LATEST
  const latestItems = sorted.slice(0, MAX_LATEST);
  writeDataFile(join(DATA_DIR, 'latest.json'), latestItems, generatedAt);

  // trending.json — top 20 from last 24h
  const now = Date.now();
  const recentItems = sorted.filter(
    (item) => now - new Date(item.publishedAt).getTime() <= TRENDING_WINDOW_MS
  );
  const trendingItems = recentItems.slice(0, MAX_TRENDING);
  writeDataFile(join(DATA_DIR, 'trending.json'), trendingItems, generatedAt);

  // good-news.json
  const goodNewsItems = sorted.filter((item) => item.isGoodNews);
  writeDataFile(join(DATA_DIR, 'good-news.json'), goodNewsItems, generatedAt);

  // dates/YYYY-MM-DD.json
  const byDate = groupBy(sorted, (item) => item.publishedAt.split('T')[0]);
  for (const [date, dateItems] of Object.entries(byDate)) {
    writeDataFile(join(DATA_DIR, 'dates', `${date}.json`), dateItems, generatedAt);
  }

  // regions/{region}.json
  const byRegion = groupBy(sorted, (item) => item.region);
  for (const [region, regionItems] of Object.entries(byRegion)) {
    writeDataFile(join(DATA_DIR, 'regions', `${region}.json`), regionItems, generatedAt);
  }

  // categories/{category}.json — an item can appear in multiple categories
  const byCategory: Record<string, ContentItem[]> = {};
  for (const item of sorted) {
    for (const category of item.categories) {
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(item);
    }
  }
  for (const [category, categoryItems] of Object.entries(byCategory)) {
    writeDataFile(join(DATA_DIR, 'categories', `${category}.json`), categoryItems, generatedAt);
  }

  // sources/{sourceId}.json
  const bySource = groupBy(sorted, (item) => item.sourceId);
  for (const [sourceId, sourceItems] of Object.entries(bySource)) {
    writeDataFile(join(DATA_DIR, 'sources', `${sourceId}.json`), sourceItems, generatedAt);
  }
}

function writeDataFile(filePath: string, items: ContentItem[], generatedAt: string): void {
  const data: DataFile = {
    items,
    meta: {
      generatedAt,
      count: items.length,
    },
  };

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function groupBy(
  items: ContentItem[],
  keyFn: (item: ContentItem) => string
): Record<string, ContentItem[]> {
  const groups: Record<string, ContentItem[]> = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}
