import { RegionPageContent } from './RegionPageContent';

export function generateStaticParams() {
  return [
    { slug: 'banjul' },
    { slug: 'kanifing' },
    { slug: 'west-coast' },
    { slug: 'north-bank' },
    { slug: 'lower-river' },
    { slug: 'central-river' },
    { slug: 'upper-river' },
  ];
}

export default function RegionPage() {
  return <RegionPageContent />;
}
