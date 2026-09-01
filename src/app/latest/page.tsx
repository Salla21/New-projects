import type { Metadata } from 'next';
import { LatestPageContent } from './LatestPageContent';

export const metadata: Metadata = {
  title: 'Latest News',
  description: 'The latest news from across The Gambia. All regions, all topics, sorted by most recent publication.',
  openGraph: {
    title: 'Latest News | The Smiling Coast Hub',
    description: 'The latest news from across The Gambia.',
  },
};

export default function LatestPage() {
  return <LatestPageContent />;
}
