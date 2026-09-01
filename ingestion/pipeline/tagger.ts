import type { ContentItem, TaggingConfig, Region, Category } from '../types';

/**
 * Applies region, category, and good-news tagging to content items
 * based on keyword matching in title and summary.
 */
export function tag(items: ContentItem[], config: TaggingConfig): ContentItem[] {
  for (const item of items) {
    const text = `${item.title} ${item.summary}`.toLowerCase();

    item.region = matchRegion(text, config.regionKeywords);
    item.categories = matchCategories(text, config.categoryKeywords);
    item.isGoodNews = matchGoodNews(text, config.goodNewsKeywords);
  }

  return items;
}

function matchRegion(
  text: string,
  regionKeywords: Record<Region, string[]>
): Region {
  for (const [region, keywords] of Object.entries(regionKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return region as Region;
      }
    }
  }
  return 'banjul';
}

function matchCategories(
  text: string,
  categoryKeywords: Record<Category, string[]>
): Category[] {
  const matched: Category[] = [];

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        matched.push(category as Category);
        break;
      }
    }
  }

  return matched;
}

function matchGoodNews(text: string, keywords: string[]): boolean {
  for (const keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}
