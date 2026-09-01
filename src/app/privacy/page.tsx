import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'The Smiling Coast Hub privacy policy. No tracking, no cookies, no personal data collection. Your preferences stay on your device.',
  openGraph: {
    title: 'Privacy Policy | The Smiling Coast Hub',
    description: 'Our commitment to your privacy — no tracking, no cookies.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink">Privacy Policy</h1>

      <div className="mt-8 space-y-6 text-body text-ink-muted">
        <section>
          <h2 className="text-h2 text-ink">Our Commitment</h2>
          <p className="mt-3">
            The Smiling Coast Hub is committed to protecting your privacy. We believe
            you should be able to read the news without being tracked. This policy
            explains exactly what data we do and do not collect.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">No Cookies Beyond Essential</h2>
          <p className="mt-3">
            We do not use tracking cookies, analytics cookies, or advertising cookies.
            The only browser storage we use is localStorage for remembering your
            preferences (such as preferred regions and hidden categories). This data
            never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">localStorage for Preferences Only</h2>
          <p className="mt-3">
            If you choose to customise your experience (e.g., selecting preferred regions
            or hiding certain categories), these preferences are stored in your browser&apos;s
            localStorage. This data:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Never leaves your device</li>
            <li>Is never sent to any server</li>
            <li>Contains no personally identifiable information</li>
            <li>Can be cleared at any time through your browser settings or our reset controls</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h2 text-ink">No Tracking</h2>
          <p className="mt-3">
            We do not use Google Analytics, Facebook Pixel, or any other tracking service.
            We do not build user profiles. We do not track which stories you read or how
            long you spend on the site. We do not fingerprint your browser.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">No Personal Data Collection</h2>
          <p className="mt-3">
            The Smiling Coast Hub does not require registration. We never ask for your
            name, email address, phone number, or any other personal information to access
            content. There are no forms that collect personal data.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Your Controls</h2>
          <p className="mt-3">
            You are in full control of any data stored by this platform:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Disable preference tracking through our settings</li>
            <li>Reset all stored preferences with one click</li>
            <li>Clear localStorage through your browser&apos;s developer tools</li>
            <li>Use private/incognito browsing for a completely stateless experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Third-Party Embeds</h2>
          <p className="mt-3">
            When you click to play a video or audio embed, the third-party service
            (e.g., YouTube) may set its own cookies and track your viewing. These embeds
            are never loaded automatically — they only activate when you explicitly click
            the play button.
          </p>
        </section>
      </div>
    </div>
  );
}
