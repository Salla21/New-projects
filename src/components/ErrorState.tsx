'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-section text-center">
      <div className="mb-4 text-error">
        <AlertTriangle className="h-12 w-12" />
      </div>
      <p className="text-body text-ink-muted dark:text-white/70">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-button bg-orange px-4 py-2 text-body-sm font-medium text-white transition-colors hover:bg-orange-hover"
        >
          Try again
        </button>
      )}
    </div>
  );
}
