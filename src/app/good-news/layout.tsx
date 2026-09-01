import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Good News',
  description: 'Positive stories and community-impact news from The Gambia. Uplifting headlines celebrating progress across the Smiling Coast.',
  openGraph: {
    title: 'Good News | The Smiling Coast Hub',
    description: 'Positive stories and community-impact news from The Gambia.',
  },
};

export default function GoodNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
