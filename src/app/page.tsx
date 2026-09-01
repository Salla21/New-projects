'use client';

import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Heart, Calendar, Radio } from 'lucide-react';
import { useContentData } from '@/lib/hooks';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { fetchLatest, fetchTrending, fetchGoodNews } from '@/lib/data';
import { ContentGrid } from '@/components/ContentGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { HeroBanner } from '@/components/HeroBanner';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import type { ContentItem, Category } from '@/types';

/* ─────────────────────────────────────────────
   Region data for RegionExplorer section
   ───────────────────────────────────────────── */
const regions = [
  { slug: 'banjul', name: 'Banjul' },
  { slug: 'kanifing', name: 'Kanifing' },
  { slug: 'west-coast', name: 'West Coast' },
  { slug: 'north-bank', name: 'North Bank' },
  { slug: 'lower-river', name: 'Lower River' },
  { slug: 'central-river', name: 'Central River' },
  { slug: 'upper-river', name: 'Upper River' },
];

/* ─────────────────────────────────────────────
   Source list for SourceDirectory section
   ───────────────────────────────────────────── */
const sources = [
  { id: 'the-standard', name: 'The Standard' },
  { id: 'the-point', name: 'The Point' },
  { id: 'foroyaa', name: 'Foroyaa' },
  { id: 'whats-on-gambia', name: "What's On Gambia" },
  { id: 'grts', name: 'GRTS' },
  { id: 'kerr-fatou', name: 'Kerr Fatou' },
  { id: 'the-fatu-network', name: 'The Fatu Network' },
  { id: 'eye-africa-tv', name: 'Eye Africa TV' },
];

/* ─────────────────────────────────────────────
   Section 1: Top Headlines
   ───────────────────────────────────────────── */
function TopHeadlines({ items, loading, error, retry }: SectionDataProps) {
  if (loading) return <LoadingSkeleton variant="hero" count={3} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  // Pick top 3 from different sources, prioritizing What's On Gambia
  const headlines = pickDiverseHeadlines(items, 3);
  if (headlines.length === 0) {
    return <EmptyState title="No Headlines" description="Check back soon for the latest stories." />;
  }

  return (
    <ContentGrid items={headlines} columns={3} variant="featured" />
  );
}

/** Pick N headlines from different sources, prioritizing What's On Gambia */
function pickDiverseHeadlines(items: ContentItem[], count: number): ContentItem[] {
  if (items.length === 0) return [];
  
  const sorted = [...items].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const result: ContentItem[] = [];
  const usedSources = new Set<string>();
  
  // First: try to get one from What's On Gambia
  const wog = sorted.find(item => item.sourceId === 'whats-on-gambia');
  if (wog) {
    result.push(wog);
    usedSources.add(wog.sourceId);
  }
  
  // Then fill remaining slots from other unique sources
  for (const item of sorted) {
    if (result.length >= count) break;
    if (!usedSources.has(item.sourceId)) {
      result.push(item);
      usedSources.add(item.sourceId);
    }
  }
  
  return result;
}

/* ─────────────────────────────────────────────
   Section 2: Latest
   ───────────────────────────────────────────── */
function LatestSection({ items, loading, error, retry }: SectionDataProps) {
  if (loading) return <LoadingSkeleton variant="card" count={6} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  // Sort by most recent and skip top headlines (first 3 are used there)
  const sorted = [...items].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const latestItems = sorted.slice(3, 9);
  if (latestItems.length === 0) {
    return <EmptyState title="No Latest News" description="No recent stories to display." />;
  }

  return (
    <ContentGrid items={latestItems} columns={3} variant="compact" />
  );
}

/* ─────────────────────────────────────────────
   Section 3: Region Explorer
   ───────────────────────────────────────────── */
function RegionExplorer() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
      {regions.map((region) => (
        <Link
          key={region.slug}
          href={`/regions/${region.slug}`}
          className="flex flex-col items-center gap-2 rounded-card bg-surface-card dark:bg-navy-light p-3 border border-surface-border dark:border-navy-lighter shadow-card transition-shadow hover:shadow-card-hover hover:border-orange"
        >
          <MapPin className="h-5 w-5 text-orange" />
          <span className="text-body-sm font-medium text-ink dark:text-white">{region.name}</span>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 4: Trending
   ───────────────────────────────────────────── */
function TrendingSection() {
  const fetchTrendingData = useCallback(() => fetchTrending(), []);
  const { data, loading, error, retry } = useContentData(fetchTrendingData);

  if (loading) return <LoadingSkeleton variant="card" count={4} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (data.length === 0) {
    return <EmptyState title="Nothing Trending" description="No trending stories at the moment." />;
  }

  return <ContentGrid items={data.slice(0, 6)} columns={3} variant="compact" />;
}

/* ─────────────────────────────────────────────
   Section 5: Good News
   ───────────────────────────────────────────── */
function GoodNewsSection() {
  const fetchGoodNewsData = useCallback(() => fetchGoodNews(), []);
  const { data, loading, error, retry } = useContentData(fetchGoodNewsData);

  if (loading) return <LoadingSkeleton variant="card" count={3} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const goodItems = data.filter((item) => item.isGoodNews).slice(0, 3);
  if (goodItems.length === 0) {
    return <EmptyState title="No Good News Yet" description="Positive stories will appear here." icon={<Heart className="h-12 w-12" />} />;
  }

  return (
    <ContentGrid items={goodItems} columns={3} variant="compact" />
  );
}

/* ─────────────────────────────────────────────
   Section 6: Watch
   ───────────────────────────────────────────── */
function WatchSection({ items, loading, error, retry }: SectionDataProps) {
  if (loading) return <LoadingSkeleton variant="card" count={3} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const videoItems = items.filter((item) => item.contentType === 'video').slice(0, 3);
  if (videoItems.length === 0) {
    return <EmptyState title="No Videos" description="Video content will appear here." />;
  }

  return <ContentGrid items={videoItems} columns={3} variant="media" />;
}

/* ─────────────────────────────────────────────
   Section 6b: Live Radio
   ───────────────────────────────────────────── */
function LiveRadioSection() {
  const stations = [
    { name: 'West Coast Radio', frequency: '95.3', url: 'https://westcoast.gm' },
    { name: 'Paradise FM', frequency: '105.7', url: 'https://paradisefm.gm' },
    { name: 'GRTS Radio', frequency: '98.6', url: 'https://grts.gm' },
    { name: 'Capital FM', frequency: '100.4', url: 'https://tunein.com/radio/Capital-FM-1004-s125336/' },
    { name: 'Freedom Radio', frequency: null, url: 'https://freedomnewspaper.com' },
    { name: 'Hot FM', frequency: '104.3', url: 'https://tunein.com/radio/Hot-FM-1043-s125340/' },
    { name: 'Hilltop Radio', frequency: '104.7', url: 'https://tunein.com/radio/Hilltop-Radio-1047-s125341/' },
    { name: 'QRadio', frequency: '103.3', url: 'https://tunein.com/radio/QRadio-1033-s300292/' },
    { name: 'Afri Radio', frequency: '107.6', url: 'https://tunein.com/radio/Afri-Radio-1076-s125338/' },
    { name: 'Star FM', frequency: '96.6', url: 'https://tunein.com/radio/Star-FM-966-s125339/' },
    { name: 'Vibes FM', frequency: '106.1', url: 'https://tunein.com/radio/Vibes-FM-1061-s125342/' },
    { name: 'Senn FM', frequency: '90.5', url: 'https://tunein.com/radio/Senn-FM-905-s125335/' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {stations.map((station) => (
        <a
          key={station.name}
          href={station.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-card bg-surface-card dark:bg-navy-light p-3 border border-surface-border dark:border-navy-lighter shadow-card transition-all hover:shadow-card-hover hover:border-orange group"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 group-hover:bg-orange/20 transition-colors">
            <Radio className="h-5 w-5 text-orange" />
          </div>
          <div className="min-w-0">
            <p className="text-body-sm font-medium text-ink dark:text-white truncate group-hover:text-orange transition-colors">{station.name}</p>
            {station.frequency && (
              <p className="text-caption text-ink-light dark:text-white/60">{station.frequency} FM</p>
            )}
            <p className="text-caption text-orange font-medium">Listen Live →</p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 7: Listen
   ───────────────────────────────────────────── */
function ListenSection({ items, loading, error, retry }: SectionDataProps) {
  if (loading) return <LoadingSkeleton variant="card" count={3} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const audioItems = items
    .filter((item) => item.contentType === 'podcast' || item.contentType === 'radio')
    .slice(0, 3);
  if (audioItems.length === 0) {
    return <EmptyState title="No Audio Content" description="Podcasts and radio shows will appear here." />;
  }

  return <ContentGrid items={audioItems} columns={3} variant="media" />;
}

/* ─────────────────────────────────────────────
   Section 8: Diaspora
   ───────────────────────────────────────────── */
function DiasporaSection({ items, loading, error, retry }: SectionDataProps) {
  if (loading) return <LoadingSkeleton variant="card" count={3} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const diasporaItems = items
    .filter((item) => item.categories.includes('diaspora'))
    .slice(0, 3);
  if (diasporaItems.length === 0) {
    return <EmptyState title="No Diaspora Stories" description="Stories from the Gambian diaspora will appear here." />;
  }

  return <ContentGrid items={diasporaItems} columns={3} variant="compact" />;
}

/* ─────────────────────────────────────────────
   Section 9: Source Directory
   ───────────────────────────────────────────── */
function SourceDirectory() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {sources.map((source) => (
        <li key={source.id}>
          <Link
            href="/sources"
            className="flex items-center gap-2 rounded-card bg-surface-card dark:bg-navy-light px-4 py-3 border border-surface-border dark:border-navy-lighter shadow-card transition-shadow hover:shadow-card-hover hover:border-orange"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange/10 text-sm font-bold text-orange">
              {source.name.charAt(0)}
            </span>
            <span className="text-body-sm font-medium text-ink dark:text-white">{source.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────
   Section 10: Date Selector
   ───────────────────────────────────────────── */
function DateSelector() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card bg-surface-card dark:bg-navy-light p-6 text-center shadow-card border border-surface-border dark:border-navy-lighter">
      <Calendar className="h-7 w-7 text-orange" />
      <h3 className="text-h3 text-ink dark:text-white">Browse by Date</h3>
      <p className="text-body-sm text-ink-muted dark:text-white/70">
        Explore stories from any day in our archive.
      </p>
      <Link
        href="/archive"
        className="rounded-button bg-orange px-6 py-2 text-body-sm font-medium text-white transition-colors hover:bg-orange-hover"
      >
        Go to Archive
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared type for sections that receive latest data
   ───────────────────────────────────────────── */
interface SectionDataProps {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

/* ─────────────────────────────────────────────
   Helper: filter out hidden categories
   ───────────────────────────────────────────── */
function filterHiddenCategories(items: ContentItem[], hiddenCategories: Category[]): ContentItem[] {
  if (hiddenCategories.length === 0) return items;
  return items.filter(
    (item) => !item.categories.some((cat) => hiddenCategories.includes(cat))
  );
}

/* ─────────────────────────────────────────────
   Homepage — assembles all 10 sections
   ───────────────────────────────────────────── */
export default function HomePage() {
  const fetchLatestData = useCallback(() => fetchLatest(), []);
  const { data: latestData, loading: latestLoading, error: latestError, retry: latestRetry } = useContentData(fetchLatestData);
  const { preferences } = usePreferences();

  const filteredLatestData = useMemo(
    () => filterHiddenCategories(latestData, preferences.hiddenCategories),
    [latestData, preferences.hiddenCategories]
  );

  return (
    <div>
      <h1 className="sr-only">The Smiling Coast Hub — The Gambia in One Place</h1>

      {/* Hero Banner */}
      <HeroBanner />

      {/* Section 1: Top Headlines */}
      <section className="py-8" aria-labelledby="top-headlines-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Top Headlines" accentColor="red" />
          <div className="mt-4">
            <TopHeadlines items={filteredLatestData} loading={latestLoading} error={latestError} retry={latestRetry} />
          </div>
        </div>
      </section>

      {/* Section 2: Latest Across The Gambia */}
      <section className="py-8" aria-labelledby="latest-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Latest Across The Gambia" viewAllHref="/latest" accentColor="orange" />
          <div className="mt-4">
            <LatestSection items={filteredLatestData} loading={latestLoading} error={latestError} retry={latestRetry} />
          </div>
        </div>
      </section>

      {/* Section 3: Explore by Region */}
      <section className="py-8 bg-surface-muted dark:bg-navy-light" aria-labelledby="regions-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Explore by Region" viewAllHref="/regions" accentColor="orange" />
          <div className="mt-4">
            <RegionExplorer />
          </div>
        </div>
      </section>

      {/* Section 4: Trending */}
      <section className="py-8" aria-labelledby="trending-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Trending" accentColor="orange" />
          <div className="mt-4">
            <TrendingSection />
          </div>
        </div>
      </section>

      {/* Section 5: Good News from the Smiling Coast */}
      <section className="py-8 bg-surface-muted dark:bg-navy-light" aria-labelledby="good-news-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Good News from the Smiling Coast"
            viewAllHref="/good-news"
            icon={<Heart className="h-5 w-5 text-success" />}
            accentColor="green"
          />
          <div className="mt-4">
            <GoodNewsSection />
          </div>
        </div>
      </section>

      {/* Section 6: Watch — dark navy cinema theme */}
      <section className="py-8 bg-navy" aria-labelledby="watch-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="border-l-[3px] border-l-orange pl-4">
            <h2 className="flex items-center gap-2 text-h2 font-bold text-white">Watch</h2>
            <Link href="/watch" className="text-body-sm font-medium text-orange hover:text-orange-hover hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-4">
            <WatchSection items={filteredLatestData} loading={latestLoading} error={latestError} retry={latestRetry} />
          </div>
        </div>
      </section>

      {/* Section: Live Radio */}
      <section className="py-8" aria-labelledby="radio-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Live Radio" accentColor="orange" />
          <div className="mt-4">
            <LiveRadioSection />
          </div>
        </div>
      </section>

      {/* Section 7: Listen */}
      <section className="py-8 bg-surface-muted dark:bg-navy-light" aria-labelledby="listen-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Listen" viewAllHref="/listen" accentColor="orange" />
          <div className="mt-4">
            <ListenSection items={filteredLatestData} loading={latestLoading} error={latestError} retry={latestRetry} />
          </div>
        </div>
      </section>

      {/* Section 8: Diaspora */}
      <section className="py-8" aria-labelledby="diaspora-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Diaspora" viewAllHref="/diaspora" accentColor="orange" />
          <div className="mt-4">
            <DiasporaSection items={filteredLatestData} loading={latestLoading} error={latestError} retry={latestRetry} />
          </div>
        </div>
      </section>

      {/* Section 9: Sources */}
      <section className="py-8 bg-surface-muted dark:bg-navy-light" aria-labelledby="sources-heading">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Sources" viewAllHref="/sources" accentColor="orange" />
          <div className="mt-4">
            <SourceDirectory />
          </div>
        </div>
      </section>

      {/* Section 10: Date Selector */}
      <section className="py-8" aria-labelledby="date-selector-heading">
        <div className="mx-auto max-w-7xl px-4">
          <DateSelector />
        </div>
      </section>
    </div>
  );
}
