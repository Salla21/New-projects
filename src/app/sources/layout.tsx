import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources Directory',
  description: 'All content sources aggregated by The Smiling Coast Hub. Browse Gambian media outlets, newspapers, TV stations, and radio programmes.',
  openGraph: {
    title: 'Sources Directory | The Smiling Coast Hub',
    description: 'Browse all Gambian media sources in one directory.',
  },
};

export default function SourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
