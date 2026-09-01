'use client';

import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { truncateSummary } from '@/lib/text';
import { formatDateShort } from '@/lib/dates';
import { ContentTypeBadge } from '@/components/ContentTypeBadge';
import { EmbedPlaceholder } from '@/components/EmbedPlaceholder';
import type { ContentItem } from '@/types';

interface ContentCardProps {
  item: ContentItem;
  variant?: 'compact' | 'featured' | 'media';
  index?: number;
}

const regionLabels: Record<string, string> = {
  banjul: 'Banjul',
  kanifing: 'Kanifing',
  'west-coast': 'West Coast',
  'north-bank': 'North Bank',
  'lower-river': 'Lower River',
  'central-river': 'Central River',
  'upper-river': 'Upper River',
};

function shouldShowEmbed(item: ContentItem): boolean {
  return (
    ['video', 'podcast', 'radio'].includes(item.contentType) &&
    item.embedUrl !== null
  );
}

/** Subtle placeholder with source initial watermark */
function ThumbnailPlaceholder({ className, sourceName, isMedia }: { className?: string; sourceName?: string; isMedia?: boolean }) {
  const initial = sourceName ? sourceName.charAt(0).toUpperCase() : 'N';
  return (
    <div className={cn(
      'flex items-center justify-center',
      isMedia ? 'bg-gradient-to-br from-navy via-navy-light to-orange/20' : 'bg-gradient-to-br from-navy to-navy-lighter',
      className
    )}>
      {isMedia ? (
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/90 text-white">
            <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-white/60">{sourceName || 'Watch'}</span>
        </div>
      ) : (
        <span className="text-4xl font-bold text-white/20">{initial}</span>
      )}
    </div>
  );
}

/** Colored dot for source badge */
function SourceDot({ sourceName }: { sourceName: string }) {
  const name = sourceName.toLowerCase();
  let color = 'bg-orange';
  if (name.includes('grts') || name.includes('government')) {
    color = 'bg-info';
  }
  return <span className={cn('inline-block h-2 w-2 rounded-full', color)} aria-hidden="true" />;
}

/** Accent color for featured text-only cards */
function getAccentColor(item: ContentItem): string {
  if (item.isGoodNews) return 'border-t-success';
  if (item.sourceName.toLowerCase().includes('grts')) return 'border-t-info';
  const cats: string[] = item.categories;
  if (cats.includes('politics')) return 'border-t-gambia-red';
  return 'border-t-orange';
}

/** Gambian flag colors cycling: red, blue, green */
const FLAG_HEX_COLORS = ['#CE1126', '#0C1C8C', '#3A7728'] as const;

function getFlagBorderStyle(index: number): React.CSSProperties {
  return { borderLeftColor: FLAG_HEX_COLORS[index % 3], borderLeftWidth: '4px' };
}
function getFlagTopStyle(index: number): React.CSSProperties {
  return { borderTopColor: FLAG_HEX_COLORS[index % 3], borderTopWidth: '4px' };
}

export function ContentCard({ item, variant = 'compact', index = 0 }: ContentCardProps) {
  const showEmbed = shouldShowEmbed(item);
  const summaryLength = variant === 'compact' ? 120 : 180;

  /* ─── COMPACT VARIANT ─── */
  if (variant === 'compact') {
    return (
      <article
        className="group overflow-hidden rounded-card bg-surface-card dark:bg-navy-light border border-surface-border dark:border-navy-lighter shadow-card transition-all duration-200 hover:shadow-card-hover flex flex-row min-h-[90px]"
        style={getFlagBorderStyle(index)}
        aria-label={`${item.title} from ${item.sourceName}`}
      >
        {/* Thumbnail or embed — only if available */}
        {showEmbed && item.embedUrl ? (
          <div className="w-24 shrink-0 sm:w-28">
            <EmbedPlaceholder
              embedUrl={item.embedUrl}
              thumbnailUrl={item.thumbnailUrl}
              title={item.title}
            />
          </div>
        ) : item.thumbnailUrl ? (
          <div className="relative h-full w-20 shrink-0 sm:w-28">
            <img
              src={item.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Text content */}
        <div className="flex flex-1 flex-col justify-center gap-1 overflow-hidden p-2 sm:p-3">
          <h3 className="text-body-sm font-semibold line-clamp-2 text-ink dark:text-white">
            <a
              href={item.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange hover:underline"
            >
              {item.title}
            </a>
          </h3>
          <div className="flex items-center gap-2 text-caption text-ink-light dark:text-white/60">
            <SourceDot sourceName={item.sourceName} />
            <span className="truncate">{item.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={item.publishedAt}>{formatDateShort(item.publishedAt)}</time>
          </div>
        </div>
      </article>
    );
  }

  /* ─── FEATURED VARIANT ─── */
  if (variant === 'featured') {
    // Featured with embed
    if (showEmbed && item.embedUrl) {
      return (
        <article
          className="group overflow-hidden rounded-card bg-surface-card dark:bg-navy-light border border-surface-border dark:border-navy-lighter shadow-card transition-all duration-200 hover:shadow-card-hover flex flex-col"
          aria-label={`${item.title} from ${item.sourceName}`}
        >
          <EmbedPlaceholder
            embedUrl={item.embedUrl}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
          />
          <div className="flex flex-col gap-2 p-4">
            <ContentTypeBadge type={item.contentType} />
            <h3 className="text-h3 font-bold text-ink dark:text-white line-clamp-2">
              <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange hover:underline">
                {item.title}
              </a>
            </h3>
            <div className="flex items-center gap-2 text-caption text-ink-light dark:text-white/60">
              <SourceDot sourceName={item.sourceName} />
              <span>{item.sourceName}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={item.publishedAt}>{formatDateShort(item.publishedAt)}</time>
            </div>
          </div>
        </article>
      );
    }

    // Featured with thumbnail — compact image area
    if (item.thumbnailUrl) {
      return (
        <article
          className="group overflow-hidden rounded-card bg-surface-card dark:bg-navy-light border border-surface-border dark:border-navy-lighter shadow-card transition-all duration-200 hover:shadow-card-hover flex flex-col"
          aria-label={`${item.title} from ${item.sourceName}`}
        >
          <div className="relative h-36 sm:h-40 w-full overflow-hidden">
            <img
              src={item.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col gap-1.5 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <ContentTypeBadge type={item.contentType} />
              <span className="inline-flex items-center rounded-badge bg-orange-light dark:bg-orange/20 px-2 py-0.5 text-caption text-ink dark:text-orange">
                {regionLabels[item.region] ?? item.region}
              </span>
            </div>
            <h3 className="text-h3 font-bold text-ink dark:text-white line-clamp-2">
              <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange hover:underline">
                {item.title}
              </a>
            </h3>
            <p className="text-body-sm text-ink-muted dark:text-white/70 line-clamp-2">
              {truncateSummary(item.summary, summaryLength)}
            </p>
            <div className="mt-auto flex items-center gap-2 text-caption text-ink-light dark:text-white/60">
              <SourceDot sourceName={item.sourceName} />
              <span>{item.sourceName}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={item.publishedAt}>{formatDateShort(item.publishedAt)}</time>
            </div>
          </div>
        </article>
      );
    }

    // Featured WITHOUT thumbnail — text-only card with colored accent strip
    return (
      <article
        className="group overflow-hidden rounded-card bg-surface-card dark:bg-navy-light border border-surface-border dark:border-navy-lighter shadow-card transition-all duration-200 hover:shadow-card-hover flex flex-col"
        style={getFlagTopStyle(index)}
        aria-label={`${item.title} from ${item.sourceName}`}
      >
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <ContentTypeBadge type={item.contentType} />
            <span className="inline-flex items-center rounded-badge bg-orange-light dark:bg-orange/20 px-2 py-0.5 text-caption text-ink dark:text-orange">
              {regionLabels[item.region] ?? item.region}
            </span>
          </div>
          <h3 className="text-lg font-bold text-ink dark:text-white line-clamp-3 leading-snug">
            <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange hover:underline">
              {item.title}
            </a>
          </h3>
          <p className="text-body-sm text-ink-muted dark:text-white/70 line-clamp-2">
            {truncateSummary(item.summary, summaryLength)}
          </p>
          <div className="mt-auto flex items-center gap-2 text-caption text-ink-light dark:text-white/60">
            <SourceDot sourceName={item.sourceName} />
            <span>{item.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={item.publishedAt}>{formatDateShort(item.publishedAt)}</time>
          </div>
          <a
            href={item.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-caption font-medium text-orange hover:text-orange-hover hover:underline"
          >
            Read original story
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </article>
    );
  }

  /* ─── MEDIA VARIANT ─── */
  return (
    <article
      className="group overflow-hidden rounded-card bg-surface-card dark:bg-navy-light border border-surface-border dark:border-navy-lighter shadow-card transition-all duration-200 hover:shadow-card-hover flex flex-col"
      aria-label={`${item.title} from ${item.sourceName}`}
    >
      {showEmbed && item.embedUrl ? (
        <EmbedPlaceholder
          embedUrl={item.embedUrl}
          thumbnailUrl={item.thumbnailUrl}
          title={item.title}
        />
      ) : item.thumbnailUrl ? (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={item.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative h-28 w-full overflow-hidden">
          <ThumbnailPlaceholder className="h-full w-full" sourceName={item.sourceName} isMedia />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <ContentTypeBadge type={item.contentType} />
        <h3 className="text-body-sm font-semibold line-clamp-2 text-ink dark:text-white">
          <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange hover:underline">
            {item.title}
          </a>
        </h3>
        <div className="mt-auto flex items-center gap-2 text-caption text-ink-light dark:text-white/60">
          <SourceDot sourceName={item.sourceName} />
          <span>{item.sourceName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.publishedAt}>{formatDateShort(item.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
