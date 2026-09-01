# Project Structure

## Directory Layout

```
the-smiling-coast-hub/
├── .kiro/
│   ├── steering/
│   └── specs/
├── config/
│   └── sources.yaml
├── docs/
├── infrastructure/
│   └── terraform/
├── ingestion/
│   ├── connectors/
│   ├── handlers/
│   ├── schemas/
│   └── tests/
├── public/
│   └── data/
│       ├── latest.json
│       ├── trending.json
│       ├── good-news.json
│       ├── dates/
│       │   └── YYYY-MM-DD.json
│       ├── regions/
│       │   ├── banjul.json
│       │   ├── kanifing.json
│       │   ├── west-coast.json
│       │   ├── north-bank.json
│       │   ├── lower-river.json
│       │   ├── central-river.json
│       │   └── upper-river.json
│       ├── categories/
│       │   ├── politics.json
│       │   ├── business.json
│       │   ├── technology.json
│       │   ├── sports.json
│       │   └── diaspora.json
│       └── sources/
│           └── {source-id}.json
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── lib/
│   ├── types/
│   └── styles/
├── tests/
├── .env.example
├── README.md
└── package.json
```

## File Naming Conventions
- kebab-case for files and folders
- PascalCase for React component files (e.g., `TopHeadlines.tsx`)
- Collocate tests next to source files or in `tests/` for integration/e2e

## Module Organization
- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — Shared reusable UI components
- `src/features/` — Feature-specific components and logic
- `src/lib/` — Utilities, data fetching, helpers
- `src/types/` — Shared TypeScript types and schemas
- `src/styles/` — Global styles and Tailwind config
- `config/` — Source registry and configuration
- `ingestion/` — Lambda handlers and connectors (Phase 2)
- `infrastructure/` — Terraform modules (Phase 3)

## Content Storage Model
JSON files served via CloudFront (or locally in `public/data/` during development).
No traditional database required.

## Configuration Files
- `next.config.ts` — Next.js configuration (static export)
- `tailwind.config.ts` — Tailwind CSS configuration
- `tsconfig.json` — TypeScript configuration (strict mode)
- `.eslintrc.json` — ESLint rules
- `.prettierrc` — Prettier formatting
- `vitest.config.ts` — Vitest configuration
- `playwright.config.ts` — Playwright configuration
- `config/sources.yaml` — Source registry
- `.env.example` — Environment variable documentation

## Build & Deploy
- `npm run dev` — Local development
- `npm run build` — Static export to `out/`
- `npm run test` — Unit tests via Vitest
- `npm run test:e2e` — E2E tests via Playwright
- GitHub Actions deploys static build to S3/CloudFront (Phase 3)
