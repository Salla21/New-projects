import Link from 'next/link';
import { GambianFlagBadge } from './GambianFlag';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/corrections', label: 'Corrections' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
  { href: '/sources', label: 'Sources' },
  { href: '/preferences', label: 'Preferences' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-section">
        <div className="mb-6 flex items-center gap-2">
          <GambianFlagBadge />
          <span className="text-body-sm font-bold text-white">
            The Smiling Coast <span className="text-orange">Hub</span>
          </span>
        </div>

        <nav aria-label="Footer navigation" className="mb-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-sm text-white/80 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-body-sm text-orange font-medium">
          Proudly Gambian. Free for Everyone.
        </p>
        <p className="mt-2 text-body-sm text-white/60">
          © 2024 The Smiling Coast Hub. The Gambia in One Place.
        </p>
      </div>
    </footer>
  );
}
