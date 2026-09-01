'use client';

import { useState } from 'react';
import { RotateCcw, BookOpen, Bookmark, AlertTriangle } from 'lucide-react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import type { Region, Category } from '@/types';

const ALL_REGIONS: { value: Region; label: string }[] = [
  { value: 'banjul', label: 'Banjul' },
  { value: 'kanifing', label: 'Kanifing' },
  { value: 'west-coast', label: 'West Coast' },
  { value: 'north-bank', label: 'North Bank' },
  { value: 'lower-river', label: 'Lower River' },
  { value: 'central-river', label: 'Central River' },
  { value: 'upper-river', label: 'Upper River' },
];

const ALL_CATEGORIES: { value: Category; label: string }[] = [
  { value: 'politics', label: 'Politics' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'diaspora', label: 'Diaspora' },
];

export function PreferencesPanel() {
  const { preferences, updatePreferences, resetPreferences, isAvailable } = usePreferences();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isAvailable) {
    return (
      <div className="rounded-card border border-warning/30 bg-warning/5 p-card-pad">
        <div className="flex items-center gap-2 text-warning">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-h3">Preferences Unavailable</h2>
        </div>
        <p className="mt-2 text-body-sm text-ink-muted">
          Your browser does not support localStorage or it is disabled. Preferences cannot
          be saved. You can still browse all content with the default view.
        </p>
      </div>
    );
  }

  const toggleRegion = (region: Region) => {
    const current = preferences.preferredRegions;
    const updated = current.includes(region)
      ? current.filter((r) => r !== region)
      : [...current, region];
    updatePreferences({ preferredRegions: updated });
  };

  const togglePreferredCategory = (category: Category) => {
    const current = preferences.preferredCategories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    updatePreferences({ preferredCategories: updated });
  };

  const toggleHiddenCategory = (category: Category) => {
    const current = preferences.hiddenCategories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    updatePreferences({ hiddenCategories: updated });
  };

  const toggleTracking = () => {
    updatePreferences({ trackingEnabled: !preferences.trackingEnabled });
  };

  const clearReadingHistory = () => {
    updatePreferences({ recentlyViewed: [], readingDuration: {} });
  };

  const removeSavedStories = () => {
    updatePreferences({ savedStories: [] });
  };

  const handleReset = () => {
    resetPreferences();
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-8">
      {/* Tracking Toggle */}
      <section>
        <h2 className="text-h3 text-ink">Preference Tracking</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          Control whether your preferences are stored locally.
        </p>
        <label className="mt-3 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={preferences.trackingEnabled}
            onChange={toggleTracking}
            className="h-5 w-5 rounded border-ink-light/30 text-orange focus:ring-orange/50"
          />
          <span className="text-body-sm text-ink">
            {preferences.trackingEnabled ? 'Preference tracking enabled' : 'Preference tracking disabled'}
          </span>
        </label>
      </section>

      {/* Preferred Regions */}
      <section>
        <h2 className="text-h3 text-ink">Preferred Regions</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          Content from selected regions will be highlighted in your feed.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_REGIONS.map((region) => (
            <label
              key={region.value}
              className="flex cursor-pointer items-center gap-2 rounded-button border border-ink-light/20 bg-surface-card px-3 py-2 text-body-sm transition-colors has-[:checked]:border-orange has-[:checked]:bg-orange-light"
            >
              <input
                type="checkbox"
                checked={preferences.preferredRegions.includes(region.value)}
                onChange={() => toggleRegion(region.value)}
                className="h-4 w-4 rounded border-ink-light/30 text-orange focus:ring-orange/50"
              />
              <span className="text-ink">{region.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Preferred Categories */}
      <section>
        <h2 className="text-h3 text-ink">Preferred Categories</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          Stories from preferred categories will be prioritised.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-2 rounded-button border border-ink-light/20 bg-surface-card px-3 py-2 text-body-sm transition-colors has-[:checked]:border-success has-[:checked]:bg-success/10"
            >
              <input
                type="checkbox"
                checked={preferences.preferredCategories.includes(category.value)}
                onChange={() => togglePreferredCategory(category.value)}
                className="h-4 w-4 rounded border-ink-light/30 text-success focus:ring-success/50"
              />
              <span className="text-ink">{category.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Hidden Categories */}
      <section>
        <h2 className="text-h3 text-ink">Hidden Categories</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          Stories from hidden categories will be excluded from your personalised views.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-2 rounded-button border border-ink-light/20 bg-surface-card px-3 py-2 text-body-sm transition-colors has-[:checked]:border-error has-[:checked]:bg-error/10"
            >
              <input
                type="checkbox"
                checked={preferences.hiddenCategories.includes(category.value)}
                onChange={() => toggleHiddenCategory(category.value)}
                className="h-4 w-4 rounded border-ink-light/30 text-error focus:ring-error/50"
              />
              <span className="text-ink">{category.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Data Management */}
      <section>
        <h2 className="text-h3 text-ink">Data Management</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          Manage your locally stored data. None of this data ever leaves your device.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={clearReadingHistory}
            className="flex items-center gap-2 rounded-button border border-ink-light/20 bg-surface-card px-4 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            <BookOpen className="h-4 w-4" />
            Clear reading history
          </button>
          <button
            onClick={removeSavedStories}
            className="flex items-center gap-2 rounded-button border border-ink-light/20 bg-surface-card px-4 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            <Bookmark className="h-4 w-4" />
            Remove saved stories
          </button>
        </div>
      </section>

      {/* Reset All */}
      <section className="border-t border-ink-light/10 pt-6">
        {showConfirmReset ? (
          <div className="rounded-card border border-error/30 bg-error/5 p-card-pad">
            <p className="text-body-sm font-medium text-ink">
              Are you sure? This will reset all preferences to defaults.
            </p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={handleReset}
                className="rounded-button bg-error px-4 py-2 text-body-sm font-medium text-white transition-colors hover:bg-error/90"
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="rounded-button border border-ink-light/20 px-4 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-2 rounded-button border border-error/30 bg-surface-card px-4 py-2 text-body-sm font-medium text-error transition-colors hover:bg-error/5"
          >
            <RotateCcw className="h-4 w-4" />
            Reset all preferences
          </button>
        )}
      </section>
    </div>
  );
}
