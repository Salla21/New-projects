import { Region, Category } from './content';

export interface UserPreferences {
  preferredRegions: Region[];
  preferredCategories: Category[];
  hiddenCategories: Category[];
  recentlyViewed: string[];
  savedStories: string[];
  readingDuration: Record<string, number>;
  trackingEnabled: boolean;
}

export interface StoredPreferences {
  version: number;
  data: UserPreferences;
}
