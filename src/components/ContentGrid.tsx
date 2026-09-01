'use client';

import { cn } from '@/lib/utils';
import { ContentCard } from '@/components/ContentCard';
import type { ContentItem } from '@/types';

interface ContentGridProps {
  items: ContentItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'compact' | 'featured' | 'media';
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function ContentGrid({ items, columns, variant = 'compact' }: ContentGridProps) {
  const effectiveColumns = columns ?? (variant === 'compact' ? 3 : 3);
  const gridCols = columnClasses[effectiveColumns] ?? columnClasses[3];

  return (
    <div className={cn('grid gap-4', gridCols)}>
      {items.map((item, index) => (
        <ContentCard key={item.id} item={item} variant={variant} index={index} />
      ))}
    </div>
  );
}
