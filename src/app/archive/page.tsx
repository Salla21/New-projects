'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { getTodayDateStr } from '@/lib/dates';

export default function ArchivePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(getTodayDateStr());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      router.push(`/archive/${date}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Date Archive" icon={<Calendar className="h-6 w-6" />} as="h1" />
      <div className="mt-6">
        <p className="mb-4 text-body text-ink-muted">
          Select a date to browse news published on that day.
        </p>
        <div className="flex items-center gap-4">
          <label htmlFor="archive-date" className="text-body-sm font-medium text-ink">
            Choose a date:
          </label>
          <input
            id="archive-date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-button border border-ink-light/20 bg-surface-card px-4 py-2 text-body-sm text-ink focus:outline-none focus:ring-2 focus:ring-orange/50"
          />
        </div>
      </div>
    </div>
  );
}
