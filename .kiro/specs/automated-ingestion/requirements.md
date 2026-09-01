# Requirements Document

## Introduction

Automated Ingestion is Phase 2 of The Smiling Coast Hub. It builds a backend pipeline that connects to real Gambian media sources (newspapers, TV/YouTube, radio, podcasts, official sources), normalises content into the existing ContentItem schema, deduplicates entries, tags them with regions and categories, and writes JSON data files that the Phase 1 static Next.js frontend already reads. The system runs on a schedule via GitHub Actions (cron), handles failures gracefully per-source, and operates both locally (Node.js script) and in production (GitHub Actions triggers ingestion, commits updated data, Vercel auto-deploys). AWS infrastructure is deferred to Phase 3.

## Glossary

- **Ingestion_Pipeline**: The end-to-end system that fetches, normalises, deduplicates, tags, and writes content from external media sources
- **Connector**: A module responsible for fetching content from a specific source type (RSS, YouTube, Podcast RSS, Manual)
- **RSS_Connector**: A connector that fetches and parses RSS/Atom feeds from newspaper and news websites
- **YouTube_Connector**: A connector that fetches latest videos from YouTube channels via API or public feed
- **Podcast_Connector**: A connector that fetches podcast episode metadata from podcast RSS feeds
- **Manual_Connector**: A connector that reads manually curated links for sources without machine-readable feeds
- **Normaliser**: A component that transforms raw connector output into the ContentItem schema
- **Deduplicator**: A component that prevents duplicate content items from being written based on URL matching
- **Tagger**: A component that assigns region and category labels to content items using keyword-based rules
- **ContentItem**: The canonical data schema used by the frontend, defined in `src/types/content.ts`
- **Source_Registry**: A YAML configuration file listing all media sources with their connection details and metadata
- **Data_Writer**: A component that writes normalised, deduplicated, tagged content items into JSON files
- **DLQ**: Dead-letter queue that captures failed ingestion jobs for later inspection
- **Scheduler**: EventBridge-based cron trigger that initiates ingestion runs at configured intervals
- **Job_Queue**: SQS queue that distributes ingestion tasks to processing functions

## Requirements

### Requirement 1: Source Configuration

**User Story:** As a platform maintainer, I want to define media sources in a structured configuration file, so that I can add, remove, or modify sources without changing code.

#### Acceptance Criteria

1. THE Ingestion_Pipeline SHALL read source definitions from a YAML configuration file at `config/sources.yaml`
2. WHEN a source entry is missing required fields (id, name, connectorType), THE Ingestion_Pipeline SHALL log a validation error and skip that source
3. THE Source_Registry SHALL support the following connector types: rss, youtube, podcast, manual
4. WHEN a new source is added to the Source_Registry, THE Ingestion_Pipeline SHALL include that source in the next ingestion run without code changes

### Requirement 2: RSS/Atom Feed Connector

**User Story:** As a platform maintainer, I want the system to fetch and parse RSS/Atom feeds from Gambian newspapers, so that newspaper headlines appear on the platform automatically.

#### Acceptance Criteria

1. WHEN an RSS feed URL is configured for a source, THE RSS_Connector SHALL fetch and parse the feed into a list of raw content entries
2. THE RSS_Connector SHALL extract title, link, publication date, author, and description from each feed entry
3. IF an RSS feed returns an HTTP error or is unreachable, THEN THE RSS_Connector SHALL log the error with the source ID and return an empty result set
4. IF an RSS feed contains malformed XML, THEN THE RSS_Connector SHALL log a parse error with the source ID and return an empty result set
5. THE RSS_Connector SHALL support both RSS 2.0 and Atom feed formats

### Requirement 3: YouTube Video Connector

**User Story:** As a platform maintainer, I want the system to fetch latest videos from Gambian YouTube channels, so that TV and video content appears on the platform automatically.

#### Acceptance Criteria

1. WHEN a YouTube channel ID is configured for a source, THE YouTube_Connector SHALL fetch the latest videos from that channel
2. THE YouTube_Connector SHALL extract video title, video URL, publication date, thumbnail URL, and description from each video entry
3. WHERE a YouTube Data API key is provided, THE YouTube_Connector SHALL use the API for enhanced metadata retrieval
4. WHERE no YouTube Data API key is provided, THE YouTube_Connector SHALL fall back to parsing the channel's public RSS feed
5. IF the YouTube API returns an error or is unreachable, THEN THE YouTube_Connector SHALL log the error and return an empty result set

### Requirement 4: Podcast RSS Connector

**User Story:** As a platform maintainer, I want the system to fetch podcast episodes from Gambian podcast feeds, so that podcast content appears on the platform automatically.

#### Acceptance Criteria

1. WHEN a podcast RSS feed URL is configured for a source, THE Podcast_Connector SHALL fetch and parse the feed into a list of episode entries
2. THE Podcast_Connector SHALL extract episode title, episode link, publication date, author, duration, and description from each entry
3. IF a podcast feed returns an HTTP error or is unreachable, THEN THE Podcast_Connector SHALL log the error with the source ID and return an empty result set
4. THE Podcast_Connector SHALL set the contentType field to "podcast" for all items produced

### Requirement 5: Manual/Curated Links Connector

**User Story:** As a platform maintainer, I want to manually add content links for sources that lack machine-readable feeds, so that all important Gambian media can appear on the platform.

#### Acceptance Criteria

1. THE Manual_Connector SHALL read curated entries from a JSON file at a path specified in the source configuration
2. WHEN a manual entry contains at minimum a title, originalUrl, and publishedAt, THE Manual_Connector SHALL accept it as valid input
3. IF a manual entry is missing required fields, THEN THE Manual_Connector SHALL log a validation warning and skip that entry

### Requirement 6: Content Normalisation

**User Story:** As a platform maintainer, I want all ingested content normalised into a single schema, so that the frontend can display content from any source uniformly.

#### Acceptance Criteria

1. THE Normaliser SHALL transform raw connector output into valid ContentItem objects matching the schema in `src/types/content.ts`
2. THE Normaliser SHALL generate a unique ID for each content item using a deterministic hash of the original URL
3. THE Normaliser SHALL truncate the summary field to a maximum of 280 characters
4. THE Normaliser SHALL set the collectedAt field to the current ISO 8601 timestamp at the time of normalisation
5. THE Normaliser SHALL set the status field to "published" for all newly ingested items
6. THE Normaliser SHALL set the language field to "en" as the default when no language is detected
7. WHEN the raw content lacks a publication date, THE Normaliser SHALL use the collection timestamp as the publishedAt value
8. FOR ALL valid ContentItem objects, normalising then serialising to JSON then parsing back SHALL produce an equivalent object (round-trip property)

### Requirement 7: Content Deduplication

**User Story:** As a platform maintainer, I want the system to prevent duplicate articles from appearing, so that users see each story only once.

#### Acceptance Criteria

1. THE Deduplicator SHALL identify duplicate content items by comparing original URL values
2. WHEN a content item has an originalUrl that matches an existing item in the output data, THE Deduplicator SHALL discard the new item
3. THE Deduplicator SHALL load existing content item URLs from the current JSON data files before processing new items
4. THE Deduplicator SHALL be case-insensitive when comparing URLs
5. THE Deduplicator SHALL normalise URLs by removing trailing slashes and query parameters before comparison

### Requirement 8: Region and Category Tagging

**User Story:** As a platform maintainer, I want content automatically tagged with regions and categories, so that users can filter content by location and topic.

#### Acceptance Criteria

1. THE Tagger SHALL assign a region to each content item based on keyword matching against the title and summary text
2. THE Tagger SHALL assign one or more categories to each content item based on keyword matching against the title and summary text
3. THE Tagger SHALL use a configurable keyword-to-region mapping loaded from the source configuration
4. THE Tagger SHALL use a configurable keyword-to-category mapping loaded from the source configuration
5. WHEN no region keywords match, THE Tagger SHALL assign the default region "banjul"
6. WHEN no category keywords match, THE Tagger SHALL assign an empty categories array
7. WHEN a source is configured with isOfficialSource set to true, THE Tagger SHALL set the isOfficialSource field to true on all items from that source

### Requirement 9: JSON Data File Output

**User Story:** As a platform maintainer, I want the ingestion system to write JSON files in the exact format the frontend expects, so that new content appears on the website without frontend changes.

#### Acceptance Criteria

1. THE Data_Writer SHALL write content items to `public/data/latest.json` sorted by publishedAt descending
2. THE Data_Writer SHALL write content items grouped by date to `public/data/dates/YYYY-MM-DD.json` files
3. THE Data_Writer SHALL write content items grouped by region to `public/data/regions/{region-slug}.json` files
4. THE Data_Writer SHALL write content items grouped by category to `public/data/categories/{category-slug}.json` files
5. THE Data_Writer SHALL write content items filtered by isGoodNews to `public/data/good-news.json`
6. THE Data_Writer SHALL write content items grouped by sourceId to `public/data/sources/{source-id}.json` files
7. THE Data_Writer SHALL include a meta object with generatedAt (ISO 8601 timestamp) and count fields in each output file
8. THE Data_Writer SHALL wrap content items in an object with an "items" key and a "meta" key matching the existing file format
9. FOR ALL output JSON files, writing then reading then parsing SHALL produce objects equivalent to the in-memory representation (round-trip property)

### Requirement 10: Scheduled Execution

**User Story:** As a platform maintainer, I want the ingestion to run automatically on a schedule, so that content stays fresh without manual intervention.

#### Acceptance Criteria

1. THE Scheduler SHALL trigger the Ingestion_Pipeline via a GitHub Actions cron workflow at a configurable interval defaulting to every 2 hours
2. WHEN the Scheduler triggers, THE Ingestion_Pipeline SHALL process all configured sources sequentially
3. AFTER successful ingestion, THE Scheduler SHALL commit updated JSON files to the repository and push to the main branch
4. WHEN new commits are pushed to the main branch, Vercel SHALL automatically rebuild and deploy the updated site
5. THE Scheduler workflow SHALL be defined in `.github/workflows/ingest.yml`

### Requirement 11: Failure Isolation and Logging

**User Story:** As a platform maintainer, I want failed source fetches captured in logs without affecting other sources, so that I can investigate and retry failures.

#### Acceptance Criteria

1. IF a connector fails to fetch or parse a source after 2 retry attempts, THEN THE Ingestion_Pipeline SHALL log the failure and continue with remaining sources
2. WHEN a source fails, THE Ingestion_Pipeline SHALL continue processing all remaining sources
3. THE Ingestion_Pipeline SHALL output a summary at the end of each run listing successful and failed sources
4. THE GitHub Actions workflow SHALL report failure status if more than 50% of sources fail

### Requirement 12: Rate Limiting and Polite Fetching

**User Story:** As a platform maintainer, I want the system to fetch content politely, so that source websites are not overwhelmed and the platform maintains good relationships with content providers.

#### Acceptance Criteria

1. THE Ingestion_Pipeline SHALL wait a minimum of 2 seconds between HTTP requests to the same domain
2. THE Ingestion_Pipeline SHALL set a descriptive User-Agent header identifying the platform on all outbound HTTP requests
3. THE Ingestion_Pipeline SHALL respect HTTP 429 (Too Many Requests) responses by halting requests to that domain for the current run

### Requirement 13: Local Development Mode

**User Story:** As a developer, I want to run the full ingestion pipeline locally with a single command, so that I can develop and test without AWS infrastructure.

#### Acceptance Criteria

1. WHEN invoked via `npm run ingest`, THE Ingestion_Pipeline SHALL run the complete pipeline locally using Node.js
2. WHILE running in local mode, THE Ingestion_Pipeline SHALL write output directly to the `public/data/` directory
3. WHILE running in local mode, THE Ingestion_Pipeline SHALL read source configuration from `config/sources.yaml`
4. WHILE running in local mode, THE Ingestion_Pipeline SHALL process sources sequentially without requiring SQS or Lambda

### Requirement 14: Copyright Compliance

**User Story:** As a platform maintainer, I want the system to respect copyright by only storing headlines and short summaries, so that the platform complies with fair use and maintains good relationships with publishers.

#### Acceptance Criteria

1. THE Normaliser SHALL store only the headline and a summary of maximum 280 characters per content item
2. THE Normaliser SHALL never store the full text of a third-party article
3. THE Normaliser SHALL preserve the originalUrl linking back to the source article for each content item

### Requirement 15: Good-News Classification

**User Story:** As a platform maintainer, I want positive stories flagged automatically, so that the "Good News" section is populated without manual curation.

#### Acceptance Criteria

1. THE Tagger SHALL set isGoodNews to true on content items matching configurable positive-sentiment keyword patterns
2. WHEN no positive-sentiment keywords match the title or summary, THE Tagger SHALL set isGoodNews to false
3. THE Tagger SHALL load positive-sentiment keyword patterns from the source configuration

### Requirement 16: Trending Content Generation

**User Story:** As a platform maintainer, I want a trending content file generated during each ingestion run, so that the homepage highlights the most recent high-activity stories.

#### Acceptance Criteria

1. THE Data_Writer SHALL write a `public/data/trending.json` file containing the most recent items from the highest number of distinct sources within the last 24 hours
2. THE Data_Writer SHALL limit the trending file to a maximum of 20 content items
3. THE Data_Writer SHALL sort trending items by publishedAt descending

### Requirement 17: Observability and Logging

**User Story:** As a platform maintainer, I want structured logging from the ingestion pipeline, so that I can monitor health and diagnose issues.

#### Acceptance Criteria

1. THE Ingestion_Pipeline SHALL log at INFO level the start and completion of each source fetch with source ID and item count
2. THE Ingestion_Pipeline SHALL log at ERROR level all connector failures with source ID, error type, and error message
3. THE Ingestion_Pipeline SHALL log at INFO level a summary at the end of each run including total items ingested, sources processed, and sources failed
4. THE Ingestion_Pipeline SHALL use structured JSON logging format with timestamp, level, and message fields
