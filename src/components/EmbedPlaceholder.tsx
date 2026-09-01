'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmbedPlaceholderProps {
  embedUrl: string;
  thumbnailUrl?: string | null;
  title: string;
}

export function EmbedPlaceholder({ embedUrl, thumbnailUrl, title }: EmbedPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-card bg-navy">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-surface-muted">
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-navy/10" />
      )}
      <button
        onClick={() => setIsPlaying(true)}
        aria-label={`Play ${title}`}
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'transition-opacity hover:opacity-90'
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-card-hover">
          <Play className="h-6 w-6 fill-current" />
        </span>
      </button>
    </div>
  );
}
