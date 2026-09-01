import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regions',
  description: 'Browse Gambian news by region. Find stories from Banjul, Kanifing, West Coast, North Bank, Lower River, Central River, and Upper River.',
  openGraph: {
    title: 'Regions | The Smiling Coast Hub',
    description: 'Browse Gambian news by geographic region.',
  },
};

const regions = [
  { slug: 'banjul', name: 'Banjul' },
  { slug: 'kanifing', name: 'Kanifing' },
  { slug: 'west-coast', name: 'West Coast' },
  { slug: 'north-bank', name: 'North Bank' },
  { slug: 'lower-river', name: 'Lower River' },
  { slug: 'central-river', name: 'Central River' },
  { slug: 'upper-river', name: 'Upper River' },
];

export default function RegionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Regions of The Gambia" icon={<MapPin className="h-6 w-6" />} />
      <div className="mt-6 grid grid-cols-1 gap-card-gap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {regions.map((region) => (
          <Link
            key={region.slug}
            href={`/regions/${region.slug}`}
            className="flex items-center gap-3 rounded-card bg-surface-card p-card-pad shadow-card transition-shadow hover:shadow-card-hover"
          >
            <MapPin className="h-5 w-5 flex-shrink-0 text-orange" />
            <span className="text-h3 text-ink">{region.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
