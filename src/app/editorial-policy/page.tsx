import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How The Smiling Coast Hub selects and presents content. Our principles for fair, unbiased Gambian news aggregation.',
  openGraph: {
    title: 'Editorial Policy | The Smiling Coast Hub',
    description: 'Our content selection criteria and aggregation principles.',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-h1 text-ink">Editorial Policy</h1>

      <div className="mt-8 space-y-6 text-body text-ink-muted">
        <section>
          <h2 className="text-h2 text-ink">How Content Is Selected</h2>
          <p className="mt-3">
            The Smiling Coast Hub uses automated aggregation to collect news and media
            content from established Gambian media sources. Content is gathered at regular
            intervals and organised by region, topic, content type, and publication date.
          </p>
          <p className="mt-3">
            We do not manually curate individual stories or inject editorial bias into
            content selection. Our system collects from all available sources equally,
            ensuring diverse perspectives are represented.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">What We Show</h2>
          <p className="mt-3">
            For each piece of content, we display only:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>The headline as published by the source</li>
            <li>A brief summary or excerpt (maximum 280 characters)</li>
            <li>The source name and publication date</li>
            <li>A thumbnail image where usage is permitted</li>
            <li>A direct link to the original story</li>
          </ul>
          <p className="mt-3">
            We never reproduce the full text of any article. Readers are always directed
            to the original source for the complete story.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">How Sources Are Added</h2>
          <p className="mt-3">
            We include established Gambian media outlets that produce original journalism.
            Sources are evaluated based on their track record of publishing factual,
            verifiable content. Both independent and government-affiliated sources are
            included, clearly labelled to help readers understand the origin.
          </p>
          <p className="mt-3">
            If you represent a Gambian media organisation and would like to be included,
            please contact us with details about your publication.
          </p>
        </section>

        <section>
          <h2 className="text-h2 text-ink">Fairness Principles</h2>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>We present content from all regions of The Gambia without geographic bias</li>
            <li>We include stories across the political spectrum without favouring any party</li>
            <li>We clearly label official government sources with a distinct badge</li>
            <li>We distinguish between independent reporting, opinion, and sponsored content</li>
            <li>We do not alter headlines or summaries from original sources</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
