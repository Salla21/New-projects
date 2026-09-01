'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchBar } from './SearchBar';
import { MobileNav } from './MobileNav';
import { SkipLink } from './SkipLink';
import { GambianFlagBadge } from './GambianFlag';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/latest', label: 'Latest' },
  { href: '/regions', label: 'Regions' },
  { href: '/topics', label: 'Topics' },
  { href: '/watch', label: 'Watch' },
  { href: '/listen', label: 'Listen' },
  { href: '/listen-live', label: 'Live' },
  { href: '/good-news', label: 'Good News' },
  { href: '/diaspora', label: 'Diaspora' },
];

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <SkipLink />

      <header className="sticky top-0 z-40 bg-navy shadow-nav">
        <div className="mx-auto flex h-nav-height max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <GambianFlagBadge />
            <span className="text-h3 font-bold text-white">
              The Smiling Coast <span className="text-orange">Hub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-body-sm font-medium transition-colors border-b-2',
                    isActive
                      ? 'border-b-orange text-white'
                      : 'border-b-transparent text-white/70 hover:text-white hover:border-b-white/40'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop search */}
          <div className="hidden items-center gap-2 lg:flex">
            <div className="w-64">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search..."
                variant="dark"
                className="[&_button]:hidden"
              />
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="rounded-button p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange/50 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
