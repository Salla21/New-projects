import Link from 'next/link';
import { Home, Newspaper, MapPin, Tag, Search } from 'lucide-react';

export default function NotFound() {
  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/latest', label: 'Latest', icon: Newspaper },
    { href: '/regions', label: 'Regions', icon: MapPin },
    { href: '/topics', label: 'Topics', icon: Tag },
    { href: '/search', label: 'Search', icon: Search },
  ];

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-section text-center sm:px-6 lg:px-8">
      <h1 className="text-display text-ink">Page Not Found</h1>
      <p className="mt-4 text-body text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <p className="mt-2 text-body-sm text-ink-light">
        Try one of these sections to find what you&apos;re looking for:
      </p>

      <nav className="mt-8" aria-label="Helpful navigation links">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-button bg-surface-card px-4 py-2 text-body-sm font-medium text-orange shadow-card transition-shadow hover:shadow-card-hover"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
