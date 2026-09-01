import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-section text-center">
      <div className="mb-4 text-ink-light dark:text-white/50">
        {icon ?? <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="text-h3 text-ink dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-body-sm text-ink-muted dark:text-white/70">{description}</p>
    </div>
  );
}
