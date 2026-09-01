import type { Metadata } from 'next';
import { Radio, Headphones, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Listen Live',
  description: 'Listen to live Gambian radio stations and podcasts from across The Gambia.',
};

const fmStations = [
  { name: 'West Coast Radio', frequency: '95.3', url: 'https://westcoast.gm', region: 'Greater Banjul' },
  { name: 'Paradise FM', frequency: '105.7', url: 'https://thegambiaradio.com', region: 'National' },
  { name: 'GRTS Radio', frequency: '98.6', url: 'https://grts.gm', region: 'National' },
  { name: 'Capital FM', frequency: '100.4', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'Hot FM', frequency: '104.3', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'Hilltop Radio', frequency: '104.7', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'QRadio', frequency: '103.3', url: 'https://thegambiaradio.com', region: 'National' },
  { name: 'Afri Radio', frequency: '107.6', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'Star FM', frequency: '96.6', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'Vibes FM', frequency: '106.1', url: 'https://thegambiaradio.com', region: 'Greater Banjul' },
  { name: 'Senn FM', frequency: '90.5', url: 'https://thegambiaradio.com', region: 'National' },
  { name: 'Freedom Radio', frequency: null, url: 'https://freedomnewspaper.com', region: 'Online' },
  { name: 'Kerewan Community FM', frequency: '100.5', url: 'https://thegambiaradio.com', region: 'North Bank' },
  { name: 'Brikama Community FM', frequency: '98.0', url: 'https://thegambiaradio.com', region: 'West Coast' },
  { name: 'Farafenni Community FM', frequency: '99.9', url: 'https://thegambiaradio.com', region: 'North Bank' },
];

const onlineStreams = [
  { name: 'Fatu Radio', url: 'https://thefatunetwork.com', type: 'Online Radio' },
  { name: 'Kairo Radio', url: 'https://thegambiaradio.com', type: 'Diaspora' },
  { name: 'Gainako Radio', url: 'https://thegambiaradio.com', type: 'Diaspora' },
  { name: 'Kibaaro Radio', url: 'https://thegambiaradio.com', type: 'Diaspora' },
  { name: 'Seereer Radio', url: 'https://thegambiaradio.com', type: 'Community' },
];

const podcasts = [
  { name: 'Bitilo Podcast', description: 'News, politics and current affairs', url: null },
  { name: 'SeedyShow', description: 'Dialogue and interviews', url: null },
  { name: 'Café Gambiano', description: 'Culture and society', url: null },
  { name: 'Faburama Podcast', description: 'Social issues and community stories', url: null },
  { name: 'For The Gambia Podcast', description: 'Development and diaspora engagement', url: null },
  { name: 'Kerr Fatou - The Brunch', description: 'Weekly current affairs', url: 'https://kerrfatou.com' },
  { name: 'Complex Gambia Podcast', description: 'Gambian affairs discussion', url: null },
];

export default function ListenLivePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink dark:text-white">Listen Live</h1>
      <p className="mt-2 text-body text-ink-muted dark:text-white/70">
        Tune in to live Gambian radio stations, online streams, and podcasts.
      </p>

      {/* FM Radio Stations */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-h2 text-ink dark:text-white border-l-[3px] border-l-orange pl-4">
          <Radio className="h-5 w-5 text-orange" />
          FM Radio Stations
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fmStations.map((station) => (
            <a
              key={station.name}
              href={station.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-card bg-surface-card dark:bg-navy-light p-4 border border-surface-border dark:border-navy-lighter shadow-card transition-all hover:shadow-card-hover hover:border-orange group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange/10 group-hover:bg-orange/20">
                <Radio className="h-6 w-6 text-orange" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold text-ink dark:text-white group-hover:text-orange truncate">{station.name}</p>
                <div className="flex items-center gap-2">
                  {station.frequency && <span className="text-caption text-ink-muted dark:text-white/60">{station.frequency} FM</span>}
                  <span className="text-caption text-ink-light dark:text-white/40">{station.region}</span>
                </div>
                <p className="text-caption font-medium text-orange">Listen Live →</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Online & Diaspora Streams */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-h2 text-ink dark:text-white border-l-[3px] border-l-orange pl-4">
          <ExternalLink className="h-5 w-5 text-orange" />
          Online &amp; Diaspora Streams
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {onlineStreams.map((stream) => (
            <a
              key={stream.name}
              href={stream.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-card bg-surface-card dark:bg-navy-light p-4 border border-surface-border dark:border-navy-lighter shadow-card transition-all hover:shadow-card-hover hover:border-orange group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-info/10 group-hover:bg-info/20">
                <Radio className="h-6 w-6 text-info" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold text-ink dark:text-white group-hover:text-orange truncate">{stream.name}</p>
                <span className="text-caption text-ink-light dark:text-white/40">{stream.type}</span>
                <p className="text-caption font-medium text-orange">Listen →</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Podcasts */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-h2 text-ink dark:text-white border-l-[3px] border-l-orange pl-4">
          <Headphones className="h-5 w-5 text-orange" />
          Gambian Podcasts
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <div
              key={podcast.name}
              className="flex items-center gap-3 rounded-card bg-surface-card dark:bg-navy-light p-4 border border-surface-border dark:border-navy-lighter shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/10">
                <Headphones className="h-6 w-6 text-success" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold text-ink dark:text-white truncate">{podcast.name}</p>
                <p className="text-caption text-ink-muted dark:text-white/60">{podcast.description}</p>
                {podcast.url ? (
                  <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="text-caption font-medium text-orange hover:underline">
                    Listen →
                  </a>
                ) : (
                  <span className="text-caption text-ink-light dark:text-white/40">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Stations link */}
      <div className="mt-10 text-center">
        <a
          href="https://thegambiaradio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-button bg-orange px-6 py-3 text-body-sm font-medium text-white hover:bg-orange-hover transition-colors"
        >
          <Radio className="h-4 w-4" />
          Browse All Gambian Radio Stations
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
