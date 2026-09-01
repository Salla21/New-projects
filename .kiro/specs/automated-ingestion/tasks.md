# Implementation Plan: Automated Ingestion

## Overview

Build a TypeScript Node.js ingestion pipeline that fetches content from Gambian media sources, normalises to ContentItem schema, deduplicates, tags, and writes JSON files to `public/data/`. Runs via `npm run ingest` locally and GitHub Actions cron in production. Sequential processing, fail-forward per source, git-as-state-store.

## Tasks

- [ ] 1. Setup project structure and core interfaces
  - [ ] 1.1 Install ingestion dependencies and configure tsconfig
    - Add `rss-parser`, `fast-xml-parser`, `yaml` to dependencies in package.json
    - Create `ingestion/tsconfig.json` with strict mode, targeting Node.js (ES2022, NodeNext module resolution)
    - Add `"ingest": "npx tsx ingestion/index.ts"` script to package.json
    - Update `vitest.config.ts` include to add `"ingestion/**/*.test.ts"`
    - _Requirements: 13.1, 13.4_

  - [ ] 1.2 Create core type definitions
    - Create `ingestion/types.ts` with `SourceConfig`, `RawEntry`, `Connector`, `TaggingConfig`, `DataFile` interfaces
    - Define `Region` and `Category` type unions matching existing frontend types
    - _Requirements: 1.1, 1.3_

  - [ ] 1.3 Create utility modules
    - Create `ingestion/utils/logger.ts` — structured JSON logger with timestamp, level, message fields (INFO, WARN, ERROR)
    - Create `ingestion/utils/hash.ts` — SHA-256 deterministic ID from normalised URL
    - Create `ingestion/utils/rate-limit.ts` — per-domain rate limiter (2s min between requests, respects HTTP 429)
    - _Requirements: 12.1, 12.2, 12.3, 17.1, 17.2, 17.3, 17.4_

- [ ] 2. Implement connectors
  - [ ] 2.1 Implement RSS connector
    - Create `ingestion/connectors/rss.ts` using `rss-parser` (RSS 2.0 + Atom support)
    - Extract title, link, pubDate, author, description from each entry
    - Handle HTTP errors and malformed XML by logging and returning empty array
    - Apply rate limiting and set User-Agent header `TheSmilingCoastHub/1.0 (+https://thesmilingcoasthub.com)`
    - Implement retry logic (2 retries with exponential backoff)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 12.1, 12.2_

  - [ ] 2.2 Implement YouTube connector
    - Create `ingestion/connectors/youtube.ts`
    - When `YOUTUBE_API_KEY` env var set: use YouTube Data API v3 `/search` endpoint
    - When no API key: fall back to public RSS feed `https://www.youtube.com/feeds/videos.xml?channel_id={channelId}`
    - Extract title, video URL, publishedAt, thumbnail, description; set embedUrl and contentType "video"
    - Handle API errors by logging and returning empty array
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 2.3 Implement Podcast connector
    - Create `ingestion/connectors/podcast.ts` using `rss-parser` with custom iTunes fields
    - Extract title, link (enclosure/guid), pubDate, author, duration, description
    - Always set contentType to "podcast"
    - Handle HTTP errors by logging and returning empty array
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 2.4 Implement Manual connector
    - Create `ingestion/connectors/manual.ts`
    - Read JSON file from path specified in `source.manualFile`
    - Validate each entry has title, originalUrl, publishedAt; skip invalid with warning log
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 2.5 Create connector registry/factory
    - Create `ingestion/connectors/index.ts` with `getConnector(type)` function
    - Return correct connector based on connectorType field
    - _Requirements: 1.3_

- [ ] 3. Implement pipeline components
  - [ ] 3.1 Implement Normaliser
    - Create `ingestion/pipeline/normalise.ts`
    - Transform RawEntry + SourceConfig → ContentItem
    - Generate deterministic ID via SHA-256 of normalised URL
    - Truncate summary to 280 characters
    - Set collectedAt to current ISO 8601 timestamp, status to "published", language to "en"
    - Use collectedAt as publishedAt when raw entry lacks publication date
    - Never store full article text, only headline + summary + originalUrl
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 14.1, 14.2, 14.3_

  - [ ]* 3.2 Write property tests for Normaliser
    - **Property 2: Normalisation produces valid ContentItem**
    - **Property 3: Deterministic ID generation**
    - **Property 4: Summary truncation**
    - **Property 5: ContentItem JSON round-trip**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.5, 6.6, 6.8, 14.1, 14.3**

  - [ ] 3.3 Implement Deduplicator
    - Create `ingestion/pipeline/deduplicate.ts`
    - Load existing URLs from `public/data/latest.json` into a Set
    - Normalise URLs: lowercase, remove trailing slashes, remove query params
    - Discard items whose normalised URL is already in the set
    - Track accepted URLs for intra-run deduplication
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 3.4 Write property tests for Deduplicator
    - **Property 6: URL-based deduplication with normalisation**
    - **Validates: Requirements 7.1, 7.2, 7.4, 7.5**

  - [ ] 3.5 Implement Tagger
    - Create `ingestion/pipeline/tagger.ts`
    - Assign region from keyword matching against title + summary (default: "banjul")
    - Assign categories from keyword matching (default: empty array)
    - Set isGoodNews from positive-sentiment keywords (default: false)
    - Set isOfficialSource from source config
    - Load keyword maps from tagging config
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 15.1, 15.2, 15.3_

  - [ ]* 3.6 Write property tests for Tagger
    - **Property 7: Region tagging from keywords**
    - **Property 8: Category tagging from keywords**
    - **Property 9: Good-news classification is bidirectional**
    - **Property 10: Official source flag propagation**
    - **Validates: Requirements 8.1, 8.2, 8.5, 8.6, 8.7, 15.1, 15.2**

  - [ ] 3.7 Implement Data Writer
    - Create `ingestion/pipeline/writer.ts`
    - Write `public/data/latest.json` — all items sorted by publishedAt desc
    - Write `public/data/trending.json` — top 20 from most-active sources in last 24h
    - Write `public/data/good-news.json` — items where isGoodNews === true
    - Write `public/data/dates/YYYY-MM-DD.json` — grouped by publish date
    - Write `public/data/regions/{region}.json` — grouped by region
    - Write `public/data/categories/{category}.json` — grouped by category
    - Write `public/data/sources/{sourceId}.json` — grouped by source
    - Wrap all output in `{ items: [...], meta: { generatedAt, count } }` format
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 16.1, 16.2, 16.3_

  - [ ]* 3.8 Write property tests for Data Writer
    - **Property 11: Writer sorting invariant**
    - **Property 12: Writer grouping correctness**
    - **Property 13: Output file structure**
    - **Property 14: Writer JSON round-trip**
    - **Property 15: Trending file invariants**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 16.1, 16.2, 16.3**

- [ ] 4. Checkpoint - Core pipeline components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Main entry point and local runner
  - [ ] 5.1 Implement config loader
    - Create `ingestion/config.ts`
    - Load and parse `config/sources.yaml` using `yaml` package
    - Validate each source has required fields (id, name, connectorType)
    - Log validation errors and skip invalid sources
    - Load tagging config (regionKeywords, categoryKeywords, goodNewsKeywords) from same file
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ]* 5.2 Write property tests for config validation
    - **Property 1: Source config validation rejects invalid entries**
    - **Validates: Requirements 1.2, 5.2, 5.3**

  - [ ] 5.3 Implement main pipeline orchestrator
    - Create `ingestion/index.ts` as the main entry point
    - Load sources config, load existing URLs for dedup
    - Loop through sources sequentially: fetch → normalise → dedup → tag
    - Accumulate all new items, then write all output files
    - Implement fail-forward: catch per-source errors, log, continue
    - Output run summary: total items, sources processed, sources failed
    - Exit with code 1 if >50% sources fail, else exit 0
    - Implement rate limiting (2s between requests to same domain)
    - _Requirements: 10.2, 11.1, 11.2, 11.3, 11.4, 12.1, 13.1, 13.2, 13.3, 13.4, 17.3_

  - [ ]* 5.4 Write property test for failure isolation
    - **Property 16: Failure isolation**
    - **Validates: Requirements 11.2, 11.4**

- [ ] 6. Sources YAML configuration
  - [ ] 6.1 Create sources.yaml with real Gambian media sources
    - Create `config/sources.yaml` with real source entries:
      - The Standard, The Point, Foroyaa (RSS connectors)
      - GRTS TV, Kerr Fatou, Fatu Network (YouTube connectors)
      - Podcast feeds for Gambian podcasts (Podcast connectors)
      - State House, government sources (Manual connectors)
    - Include full tagging config: regionKeywords, categoryKeywords, goodNewsKeywords
    - Verify all feed URLs are reachable
    - _Requirements: 1.1, 1.3, 1.4, 8.3, 8.4, 15.3_

  - [ ] 6.2 Create manual entry JSON files
    - Create `config/manual/` directory
    - Add initial manual entries JSON files for sources without feeds (e.g. State House)
    - _Requirements: 5.1_

- [ ] 7. GitHub Actions workflow
  - [ ] 7.1 Create GitHub Actions ingest workflow
    - Create `.github/workflows/ingest.yml`
    - Configure cron schedule (every 4 hours: `0 */4 * * *`)
    - Steps: checkout, setup Node.js, install deps, run `npm run ingest`
    - After success: git add `public/data/`, commit, push to main
    - Set `YOUTUBE_API_KEY` from GitHub secrets
    - Report failure status if pipeline exits with code 1
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 11.4_

- [ ] 8. Checkpoint - Integration verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Unit and integration tests
  - [ ]* 9.1 Write unit tests for connectors
    - Test RSS connector handles HTTP errors and malformed XML
    - Test YouTube connector API path vs fallback RSS path
    - Test Podcast connector extracts iTunes fields
    - Test Manual connector validates entries and skips invalid
    - Test connector factory returns correct type
    - _Requirements: 2.3, 2.4, 3.3, 3.4, 3.5, 4.3, 5.3, 1.3_

  - [ ]* 9.2 Write unit tests for utilities
    - Test rate limiter enforces 2-second gap between same-domain requests
    - Test rate limiter respects HTTP 429 by halting requests
    - Test User-Agent header is set correctly
    - Test structured log output format (JSON with timestamp, level, message)
    - _Requirements: 12.1, 12.2, 12.3, 17.4_

  - [ ]* 9.3 Write integration test for full pipeline
    - Test full pipeline run against mock feeds (fixture RSS/Atom/JSON served locally)
    - Verify output files match expected structure and content
    - Verify deduplication works end-to-end
    - Verify tagging applied correctly to real-ish data
    - _Requirements: 6.1, 7.1, 8.1, 9.1_

- [ ] 10. Documentation
  - [ ] 10.1 Create ingestion documentation
    - Create `docs/ingestion.md` with:
      - Architecture overview and data flow
      - How to add new sources to `config/sources.yaml`
      - Local development instructions (`npm run ingest`)
      - Environment variables (YOUTUBE_API_KEY)
      - Troubleshooting common issues
      - Output file structure reference
    - Update README.md with ingestion section
    - _Requirements: 13.1, 13.3_

- [ ] 11. Final checkpoint - All tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All code is TypeScript with strict mode enabled
- Dependencies: `rss-parser`, `fast-xml-parser`, `yaml` (runtime); `fast-check`, `vitest` already installed
- The pipeline runs in a single Node.js process — no AWS infrastructure needed

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "5.1"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "3.1", "5.2"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.5"] },
    { "id": 4, "tasks": ["3.4", "3.6", "3.7"] },
    { "id": 5, "tasks": ["3.8", "5.3", "6.1", "6.2"] },
    { "id": 6, "tasks": ["5.4", "7.1"] },
    { "id": 7, "tasks": ["9.1", "9.2", "9.3"] },
    { "id": 8, "tasks": ["10.1"] }
  ]
}
```
