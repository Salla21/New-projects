import { DateArchiveClient } from './DateArchiveClient';

export function generateStaticParams() {
  return [
    { date: '2025-07-28' },
    { date: '2025-07-27' },
    { date: '2025-07-26' },
    { date: '2025-07-25' },
    { date: '2025-01-15' },
  ];
}

export default async function DateArchivePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return <DateArchiveClient date={date} />;
}
