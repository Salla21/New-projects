import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  icon?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  accentColor?: 'orange' | 'green' | 'blue' | 'red' | 'default';
  variant?: 'light' | 'dark';
}

const accentBorderMap: Record<string, string> = {
  orange: 'border-l-orange',
  green: 'border-l-success',
  blue: 'border-l-info',
  red: 'border-l-error',
  default: 'border-l-orange',
};

export function SectionHeader({ title, viewAllHref, icon, as: Tag = 'h2', accentColor = 'default', variant = 'light' }: SectionHeaderProps) {
  const isDark = variant === 'dark';

  return (
    <div className={cn('flex items-center justify-between border-l-[3px] pl-4', accentBorderMap[accentColor])}>
      <Tag className={cn('flex items-center gap-2 text-h2 font-bold', isDark ? 'text-white' : 'text-ink dark:text-white')}>
        {icon && <span className="text-lg">{icon}</span>}
        {title}
      </Tag>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={cn(
            'text-body-sm font-medium hover:underline',
            isDark ? 'text-orange hover:text-orange-hover' : 'text-orange hover:text-orange-hover'
          )}
        >
          View all →
        </Link>
      )}
    </div>
  );
}
