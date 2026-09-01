'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const primaryLinks = [
  { href: '/latest', label: 'Latest' },
  { href: '/regions', label: 'Regions' },
  { href: '/topics', label: 'Topics' },
  { href: '/watch', label: 'Watch' },
  { href: '/listen', label: 'Listen' },
  { href: '/good-news', label: 'Good News' },
  { href: '/diaspora', label: 'Diaspora' },
];

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/corrections', label: 'Corrections' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
  { href: '/sources', label: 'Sources' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC handler
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when opening
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when nav is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-navy/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — dark navy theme */}
      <div
        ref={panelRef}
        className={cn(
          'absolute right-0 top-0 h-full w-full max-w-sm bg-navy shadow-card-hover transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4">
          <span className="text-body-sm font-medium text-orange">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-button p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange/50"
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-6">
          <ul className="space-y-1">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-button px-4 py-3 text-h3 text-white hover:bg-white/10 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-white/20" />

          <ul className="space-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-button px-4 py-2 text-body-sm text-white/70 hover:bg-white/10 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
