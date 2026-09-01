import { UserPreferences, StoredPreferences } from '@/types';

const PREFERENCE_KEY = 'smiling-coast-hub-preferences';
const PREFERENCE_VERSION = 1;

export const DEFAULT_PREFERENCES: UserPreferences = {
  preferredRegions: [],
  preferredCategories: [],
  hiddenCategories: [],
  recentlyViewed: [],
  savedStories: [],
  readingDuration: {},
  trackingEnabled: true,
};

export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getPreferences(): UserPreferences {
  if (!isStorageAvailable()) return { ...DEFAULT_PREFERENCES };

  try {
    const stored = localStorage.getItem(PREFERENCE_KEY);
    if (!stored) return { ...DEFAULT_PREFERENCES };

    const parsed: StoredPreferences = JSON.parse(stored);
    if (parsed.version !== PREFERENCE_VERSION) {
      // Future: handle migrations
      return { ...DEFAULT_PREFERENCES };
    }
    return { ...DEFAULT_PREFERENCES, ...parsed.data };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function setPreferences(partial: Partial<UserPreferences>): void {
  if (!isStorageAvailable()) return;

  const current = getPreferences();
  const updated: StoredPreferences = {
    version: PREFERENCE_VERSION,
    data: { ...current, ...partial },
  };
  localStorage.setItem(PREFERENCE_KEY, JSON.stringify(updated));
}

export function resetPreferences(): void {
  if (!isStorageAvailable()) return;
  localStorage.removeItem(PREFERENCE_KEY);
}
