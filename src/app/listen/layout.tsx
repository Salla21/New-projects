import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen',
  description: "Listen to Gambian radio programmes and podcasts. Audio content from across The Gambia's media landscape.",
  openGraph: {
    title: 'Listen | The Smiling Coast Hub',
    description: 'Listen to Gambian radio programmes and podcasts.',
  },
};

export default function ListenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
