'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '@/types';
import { getPreferences, setPreferences, resetPreferences as resetPrefs, isStorageAvailable, DEFAULT_PREFERENCES } from '@/lib/preferences';

interface UsePreferencesResult {
  preferences: UserPreferences;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  isAvailable: boolean;
}

export function usePreferences(): UsePreferencesResult {
  // Initialize with defaults to avoid SSR/hydration mismatch —
  // localStorage is only read after mount in useEffect.
  const [preferences, setLocalPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const available = isStorageAvailable();
    setIsAvailable(available);
    if (available) {
      setLocalPreferences(getPreferences());
    }
  }, []);

  const updatePreferences = useCallback((partial: Partial<UserPreferences>) => {
    setPreferences(partial);
    setLocalPreferences(getPreferences());
  }, []);

  const resetAll = useCallback(() => {
    resetPrefs();
    setLocalPreferences(getPreferences());
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences: resetAll,
    isAvailable,
  };
}
