import { cn } from '@/lib/utils';

/**
 * A CSS-based Gambian flag stripe (horizontal bands).
 * The actual Gambian flag: red (top), white stripe, blue (middle), white stripe, green (bottom).
 */
export function GambianFlagStripe({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col h-3', className)} aria-hidden="true">
      <div className="flex-1 bg-gambia-red" />
      <div className="h-[2px] bg-white" />
      <div className="flex-1 bg-gambia-blue" />
      <div className="h-[2px] bg-white" />
      <div className="flex-1 bg-gambia-green" />
    </div>
  );
}

/**
 * Small flag badge for use in the header or inline contexts.
 */
export function GambianFlagBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col h-4 w-6 rounded-sm overflow-hidden border border-white/20',
        className
      )}
      aria-hidden="true"
    >
      <div className="flex-1 bg-gambia-red" />
      <div className="h-[1px] bg-white" />
      <div className="flex-1 bg-gambia-blue" />
      <div className="h-[1px] bg-white" />
      <div className="flex-1 bg-gambia-green" />
    </div>
  );
}
