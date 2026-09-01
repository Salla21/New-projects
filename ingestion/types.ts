import type { ContentItem, Region, Category, ContentType } from '../src/types/content';

export type { ContentItem, Region, Category, ContentType };

export interface SourceConfig {
  id: string;
  name: string;
  connectorType: 'rss' | 'youtube' | 'podcast' | 'manual';
  url?: string;
  channelId?: string;
  manualFile?: string;
  region?: Region;
  isOfficialSource?: boolean;
  contentType?: ContentType;
  enabled?: boolean;
}

export interface RawEntry {
  title: string;
  link: string;
  publishedAt?: string;
  author?: string;
  description?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  duration?: string;
}

export interface Connector {
  fetch(source: SourceConfig): Promise<RawEntry[]>;
}

export interface TaggingConfig {
  regionKeywords: Record<Region, string[]>;
  categoryKeywords: Record<Category, string[]>;
  goodNewsKeywords: string[];
}

export interface DataFile {
  items: ContentItem[];
  meta: {
    generatedAt: string;
    count: number;
  };
}

export interface IngestConfig {
  sources: SourceConfig[];
  tagging: TaggingConfig;
}
