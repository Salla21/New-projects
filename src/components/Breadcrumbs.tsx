import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-body-sm text-ink-muted dark:text-white/70', className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-ink dark:text-white">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href ?? '/'}
                    className="hover:text-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
