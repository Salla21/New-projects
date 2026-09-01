import type { Metadata } from 'next';
import { PreferencesPanel } from '@/components/PreferencesPanel';
import { Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Preferences',
  description: 'Manage your reading preferences for The Smiling Coast Hub. Select preferred regions, categories, and control your locally stored data.',
};

export default function PreferencesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-orange" />
        <h1 className="text-h1 text-ink">Preferences</h1>
      </div>
      <p className="mt-3 text-body text-ink-muted">
        Customise your reading experience. All preferences are stored locally in your
        browser and never leave your device.
      </p>

      <div className="mt-8">
        <PreferencesPanel />
      </div>
    </div>
  );
}
