import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diaspora',
  description: 'News and stories for the Gambian diaspora. Stay connected to community events and issues relevant to Gambians abroad.',
  openGraph: {
    title: 'Diaspora | The Smiling Coast Hub',
    description: 'News and stories for the Gambian diaspora.',
  },
};

export default function DiasporaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
