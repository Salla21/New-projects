import { SourceClient } from './SourceClient';

export function generateStaticParams() {
  return [
    { id: 'the-standard' },
    { id: 'the-point' },
    { id: 'foroyaa' },
    { id: 'grts' },
    { id: 'freedom-radio' },
    { id: 'eye-africa-tv' },
    { id: 'kerr-fatou' },
    { id: 'the-fatu-network' },
  ];
}

export default async function SourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SourceClient id={id} />;
}
