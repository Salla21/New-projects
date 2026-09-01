# The Smiling Coast Hub

> The Gambia in One Place

A publicly accessible Gambian news and media aggregation platform. It brings together newspaper headlines, television reports, YouTube videos, radio programmes, podcasts, government announcements, regional reporting, diaspora stories, and more into a single, mobile-first interface.

## Features

- 📱 Mobile-first responsive design
- 🇬🇲 Gambian flag-inspired visual identity
- 📰 Aggregated news from multiple sources
- 🗺️ Browse by region (all 7 Gambian regions)
- 🏷️ Browse by topic (Politics, Business, Technology, Sports, Diaspora)
- 📺 Watch (video content) and Listen (podcasts, radio)
- 🌟 Good News section for positive stories
- 🌍 Diaspora coverage
- 📅 Date archive with day-by-day navigation
- 🔍 Search and multi-filter system
- 💾 Anonymous preferences (localStorage, no registration)
- ♿ Accessible (WCAG 2.1 AA, keyboard navigation, screen readers)
- ⚡ Fast (static export, lazy loading, small bundle)
- 🔒 No registration, no paywalls, no tracking

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library + Playwright
- **Linting:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+

### Installation

```bash
git clone <repository-url>
cd the-smiling-coast-hub
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Produces a static export in the `out/` directory.

### Testing

```bash
npm run test        # Unit tests (Vitest)
npm run test:e2e    # End-to-end tests (Playwright)
npm run lint        # ESLint
npm run format:check # Prettier check
```

## Deployment

### Vercel (Recommended for initial deployment)

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js and deploys

### AWS (Phase 3)

Static export to S3 + CloudFront. See `infrastructure/terraform/` (Phase 3).

## Project Structure

```
the-smiling-coast-hub/
├── .kiro/              # Specs and steering files
├── public/data/        # JSON fixture data
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Shared UI components
│   ├── lib/            # Utilities, hooks, data fetching
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── tests/              # E2E tests
├── docs/               # Architecture documentation
└── package.json
```

## Content Schema

See `docs/architecture.md` for the full content schema and data model.

## Implementation Phases

- ✅ Phase 1: Local public MVP (static app with fixture data)
- 🔲 Phase 2: Automated ingestion (RSS, YouTube, podcast connectors)
- 🔲 Phase 3: AWS deployment (S3, CloudFront, Lambda, EventBridge)
- 🔲 Phase 4: Future enhancements (optional accounts, multilingual)

## Contributing

This project welcomes contributions. Please review the architecture documentation before making changes.

## License

All rights reserved.
