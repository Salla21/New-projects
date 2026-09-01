import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Archive',
  description: 'Browse Gambian news by date. Navigate through the archive to find stories published on any day.',
  openGraph: {
    title: 'Date Archive | The Smiling Coast Hub',
    description: 'Browse Gambian news by publication date.',
  },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
