'use client';

import { FileText, Play, Headphones, Radio, Share2, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContentType } from '@/types';

const iconMap: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  article: FileText,
  video: Play,
  podcast: Headphones,
  radio: Radio,
  social: Share2,
  'official-update': Building2,
};

const labelMap: Record<ContentType, string> = {
  article: 'Article',
  video: 'Video',
  podcast: 'Podcast',
  radio: 'Radio',
  social: 'Social',
  'official-update': 'Official Update',
};

interface ContentTypeBadgeProps {
  type: ContentType;
  className?: string;
}

export function ContentTypeBadge({ type, className }: ContentTypeBadgeProps) {
  const Icon = iconMap[type];
  const label = labelMap[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-badge bg-surface-muted px-2 py-0.5 text-caption text-ink-muted',
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </span>
  );
}
