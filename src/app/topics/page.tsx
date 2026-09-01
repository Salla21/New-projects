import Link from 'next/link';
import { Tag } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse Gambian news by topic. Politics, business, technology, sports, and diaspora coverage from across The Gambia.',
  openGraph: {
    title: 'Topics | The Smiling Coast Hub',
    description: 'Browse Gambian news by topic category.',
  },
};

const categories = [
  { slug: 'politics', name: 'Politics' },
  { slug: 'business', name: 'Business' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'diaspora', name: 'Diaspora' },
];

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <SectionHeader title="Topics" icon={<Tag className="h-6 w-6" />} />
      <div className="mt-6 grid grid-cols-1 gap-card-gap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="flex items-center gap-3 rounded-card bg-surface-card p-card-pad shadow-card transition-shadow hover:shadow-card-hover"
          >
            <Tag className="h-5 w-5 flex-shrink-0 text-orange" />
            <span className="text-h3 text-ink">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
