import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'The Smiling Coast Hub | The Gambia in One Place',
    template: '%s | The Smiling Coast Hub',
  },
  description:
    'A publicly accessible Gambian news and media aggregation platform bringing together newspaper headlines, TV reports, videos, podcasts, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://thesmilingcoasthub.gm',
    siteName: 'The Smiling Coast Hub',
    title: 'The Smiling Coast Hub | The Gambia in One Place',
    description:
      'A publicly accessible Gambian news and media aggregation platform bringing together newspaper headlines, TV reports, videos, podcasts, and more.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thesmilingcoasthub.gm'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('smiling-coast-hub-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface dark:bg-navy text-ink dark:text-white font-sans antialiased transition-colors">
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
