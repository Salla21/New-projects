import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corrections & Takedown',
  description: 'How to request corrections or content removal from The Smiling Coast Hub. Our policy for handling errors and takedown requests.',
  openGraph: {
    title: 'Corrections & Takedown | The Smiling Coast Hub',
    description: 'Our corrections and content removal policy.',
  },
};

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink">Corrections and Takedown Policy</h1>

      <div className="mt-8 space-y-6 text-body text-ink-muted">
        <section>
          <h2 className="text-h2 text-ink">Requesting a Correction</h2>
          <p className="mt-3">
            If you believe a headline, summary, or attribution displayed on The Smiling
            Coast Hub contains an error, please contact us with:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>The URL of the content on our platform</li>
            <li>A description of the error</li>
            <li>The correct information with supporting evidence</li>
          </ul>
          <p className="mt-3">
            Since we aggregate content from external sources, most corrections need to be
            made at the original source. We will update our displayed information once the
            source publishes a correction.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Requesting Content Removal</h2>
          <p className="mt-3">
            You may request removal of content from The Smiling Coast Hub if:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>You are the copyright holder and object to the headline/summary being displayed</li>
            <li>The content contains defamatory material about you</li>
            <li>The original source has retracted the story</li>
            <li>The content violates applicable laws</li>
          </ul>
          <p className="mt-3">
            Please include your name, contact details, the specific content you want removed,
            and the reason for removal.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Response Times</h2>
          <p className="mt-3">
            We aim to acknowledge all correction and removal requests within 48 hours.
            For urgent matters involving personal safety or legal obligations, we will
            prioritise review within 24 hours. Non-urgent requests are typically resolved
            within 5 working days.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Contact Us</h2>
          <p className="mt-3">
            For corrections and takedown requests, please email us at{' '}
            <a
              href="mailto:corrections@thesmilingcoasthub.gm"
              className="font-medium text-orange hover:underline"
            >
              corrections@thesmilingcoasthub.gm
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
