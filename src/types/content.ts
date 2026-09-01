export type ContentType = 'article' | 'video' | 'podcast' | 'radio' | 'social' | 'official-update';

export type Region = 'banjul' | 'kanifing' | 'west-coast' | 'north-bank' | 'lower-river' | 'central-river' | 'upper-river';

export type Category = 'politics' | 'business' | 'technology' | 'sports' | 'diaspora';

export type ContentStatus = 'published' | 'developing' | 'corrected' | 'retracted';

export interface ContentItem {
  id: string;
  title: string;
  summary: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  publishedAt: string; // ISO 8601
  collectedAt: string; // ISO 8601
  region: Region;
  categories: Category[];
  contentType: ContentType;
  thumbnailUrl: string | null;
  author: string | null;
  language: string;
  isGoodNews: boolean;
  isOfficialSource: boolean;
  embedUrl: string | null;
  status: ContentStatus;
}
