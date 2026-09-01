import type { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Smiling Coast Hub team. Feedback, source recommendations, and general enquiries welcome.',
  openGraph: {
    title: 'Contact | The Smiling Coast Hub',
    description: 'Contact The Smiling Coast Hub team.',
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink">Contact Us</h1>

      <div className="mt-8 space-y-6 text-body text-ink-muted">
        <section>
          <h2 className="text-h2 text-ink">Get in Touch</h2>
          <p className="mt-3">
            We welcome feedback, suggestions, source recommendations, and general
            enquiries about The Smiling Coast Hub. Here&apos;s how to reach us.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Email</h2>
          <div className="mt-3 flex items-center gap-3">
            <Mail className="h-5 w-5 text-orange" />
            <a
              href="mailto:contact@thesmilingcoasthub.gm"
              className="font-medium text-orange hover:underline"
            >
              contact@thesmilingcoasthub.gm
            </a>
          </div>
          <p className="mt-2">
            For corrections and takedown requests, please use{' '}
            <a
              href="mailto:corrections@thesmilingcoasthub.gm"
              className="font-medium text-orange hover:underline"
            >
              corrections@thesmilingcoasthub.gm
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Social Media</h2>
          <div className="mt-3 flex flex-wrap gap-4">
            <a
              href="https://twitter.com/smilingcoasthub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-button bg-surface-card px-4 py-2 text-body-sm font-medium text-ink shadow-card transition-shadow hover:shadow-card-hover"
            >
              Twitter / X
            </a>
            <a
              href="https://facebook.com/smilingcoasthub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-button bg-surface-card px-4 py-2 text-body-sm font-medium text-ink shadow-card transition-shadow hover:shadow-card-hover"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/smilingcoasthub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-button bg-surface-card px-4 py-2 text-body-sm font-medium text-ink shadow-card transition-shadow hover:shadow-card-hover"
            >
              Instagram
            </a>
          </div>
          <p className="mt-2 text-body-sm text-ink-light">
            Social media links will be updated once our accounts are active.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Feedback</h2>
          <div className="mt-3 rounded-card border border-ink-light/20 bg-surface-card p-card-pad">
            <div className="flex items-center gap-2 text-ink">
              <MessageSquare className="h-5 w-5 text-orange" />
              <h3 className="text-h3">Share Your Thoughts</h3>
            </div>
            <p className="mt-2 text-body-sm text-ink-muted">
              A feedback form is coming soon. In the meantime, please send your
              thoughts, suggestions, or bug reports to our email address above.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-h2 text-ink">For Media Organisations</h2>
          <p className="mt-3">
            If you represent a Gambian media organisation and would like your content
            included on The Smiling Coast Hub, or if you have questions about how your
            content is displayed, please reach out to us at{' '}
            <a
              href="mailto:contact@thesmilingcoasthub.gm"
              className="font-medium text-orange hover:underline"
            >
              contact@thesmilingcoasthub.gm
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
