import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watch',
  description: 'Watch the latest video news and reports from The Gambia. Multimedia coverage from Gambian TV stations and content creators.',
  openGraph: {
    title: 'Watch | The Smiling Coast Hub',
    description: 'Watch the latest video news and reports from The Gambia.',
  },
};

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
