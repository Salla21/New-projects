import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about The Smiling Coast Hub — a publicly accessible Gambian news aggregation platform bringing together media from across The Gambia.',
  openGraph: {
    title: 'About | The Smiling Coast Hub',
    description: 'Learn about The Smiling Coast Hub and our mission.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink">About The Smiling Coast Hub</h1>

      <div className="mt-8 space-y-6 text-body text-ink-muted">
        <section>
          <h2 className="text-h2 text-ink">Our Mission</h2>
          <p className="mt-3">
            The Smiling Coast Hub is a publicly accessible Gambian news and media aggregation
            platform. We bring together newspaper headlines, television reports, YouTube videos,
            radio programmes, podcasts, government announcements, regional reporting, diaspora
            stories, and community-impact stories into a single, mobile-first interface.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">No Barriers to Access</h2>
          <p className="mt-3">
            We believe access to information should be free and open. The Smiling Coast Hub
            requires no registration, no paywalls, and no authentication pop-ups. Everyone
            can browse and discover Gambian news without creating an account.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Mobile-First Design</h2>
          <p className="mt-3">
            Designed for the way Gambians consume media, our platform is built mobile-first.
            Whether you are reading on a phone in Banjul, a tablet in Kanifing, or a desktop
            abroad, the experience adapts to your device. Pages are optimised for fast loading,
            even on slower connections.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Ethical Aggregation</h2>
          <p className="mt-3">
            We respect the work of journalists and content creators. The Smiling Coast Hub
            displays only headlines and brief summaries, always linking back to the original
            source. We never reproduce full articles. Every story is clearly attributed to
            its source, and we encourage readers to visit the original publication for the
            complete story.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Coverage</h2>
          <p className="mt-3">
            We aggregate content from across all seven regions of The Gambia — Banjul,
            Kanifing, West Coast, North Bank, Lower River, Central River, and Upper River —
            covering politics, business, technology, sports, and diaspora stories.
          </p>
        </section>
      </div>
    </div>
  );
}
