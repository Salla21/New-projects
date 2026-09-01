import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  variant: 'card' | 'list' | 'hero';
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card bg-surface-card dark:bg-navy-light shadow-card">
      <div className="aspect-video w-full animate-pulse bg-surface-muted dark:bg-navy-lighter" />
      <div className="flex flex-col gap-3 p-card-pad">
        <div className="h-3 w-20 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="mt-2 flex gap-3">
          <div className="h-3 w-16 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
          <div className="h-3 w-20 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        </div>
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="flex items-center gap-4 rounded-card bg-surface-card dark:bg-navy-light p-card-pad shadow-card">
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-card bg-surface-muted dark:bg-navy-lighter" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-3 w-full animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
      </div>
    </div>
  );
}

function SkeletonHero() {
  return (
    <div className="overflow-hidden rounded-card bg-surface-card dark:bg-navy-light shadow-card">
      <div className="aspect-[21/9] w-full animate-pulse bg-surface-muted dark:bg-navy-lighter" />
      <div className="flex flex-col gap-4 p-card-pad">
        <div className="h-6 w-1/2 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted dark:bg-navy-lighter" />
      </div>
    </div>
  );
}

export function LoadingSkeleton({ variant, count = 3 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'hero') {
    return (
      <div className="space-y-card-gap">
        {items.map((i) => (
          <SkeletonHero key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-card-gap">
        {items.map((i) => (
          <SkeletonList key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-card-gap grid-cols-1 sm:grid-cols-2 md:grid-cols-3')}>
      {items.map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
