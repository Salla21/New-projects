import { TopicPageContent } from './TopicPageContent';

export function generateStaticParams() {
  return [
    { slug: 'politics' },
    { slug: 'business' },
    { slug: 'technology' },
    { slug: 'sports' },
    { slug: 'diaspora' },
  ];
}

export default function TopicPage() {
  return <TopicPageContent />;
}
