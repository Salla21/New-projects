'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-button p-2 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-colors"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
