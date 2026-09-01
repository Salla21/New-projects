import { Region, Category, ContentType } from './content';

export interface SearchFilters {
  query: string;
  region: Region | null;
  category: Category | null;
  contentType: ContentType | null;
  sourceId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'date' | 'daterange';
  options?: { value: string; label: string }[];
}

export interface ActiveFilters {
  [filterId: string]: string | null;
}
