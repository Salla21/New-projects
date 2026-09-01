# Implementation Plan: The Smiling Coast Hub — Phase 1 MVP

## Overview

This plan implements the Phase 1 local MVP as a statically exported Next.js application with local JSON fixture data. Tasks are grouped into five phases: Foundation (project setup, types, utilities, fixture data), Core Components (shared UI library), Pages (all routes), Features (preferences, search, SEO), and Quality (tests, accessibility, documentation). Each task builds incrementally on previous work, ensuring no orphaned code.

## Tasks

- [ ] 1. Phase 1A — Foundation
  - [ ] 1.1 Initialise Next.js project with TypeScript, Tailwind CSS, ESLint, Prettier
    - Create Next.js app with App Router and `output: "export"` in `next.config.ts`
    - Configure `tsconfig.json` with `strict: true`
    - Install and configure Tailwind CSS with PostCSS
    - Install and configure ESLint with strict TypeScript rules
    - Install and configure Prettier
    - Install Vitest, React Testing Library, fast-check, @testing-library/jest-dom
    - Install Playwright
    - Create `vitest.config.ts` and `playwright.config.ts`
    - Create `.env.example` with documented environment variables
    - _Requirements: 1.1, 1.2, 1.4, 19.1, 20.3_

  - [ ] 1.2 Configure Tailwind design system tokens
    - Extend `tailwind.config.ts` with custom colour palette (surface, ink, gambia, sand, error, warning, success, info)
    - Add custom typography scale (display, h1, h2, h3, body, body-sm, caption) with Inter font stack
    - Add custom spacing tokens (section, card-gap, card-pad, nav-height)
    - Add custom borderRadius (card, badge, button) and boxShadow (card, card-hover, nav)
    - Install shadcn/ui and Lucide Icons
    - Create `src/styles/globals.css` with base Tailwind directives and font import
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 12.2_

  - [ ] 1.3 Define TypeScript type definitions
    - Create `src/types/content.ts` with ContentItem, ContentType, Region, Category, ContentStatus types
    - Create `src/types/source.ts` with SourceInfo interface
    - Create `src/types/preferences.ts` with UserPreferences interface and StoredPreferences wrapper
    - Create `src/types/filters.ts` with SearchFilters, FilterConfig, ActiveFilters interfaces
    - Create `src/types/index.ts` barrel export
    - _Requirements: 2.1, 2.2_

  - [ ] 1.4 Implement shared utility functions
    - Create `src/lib/data.ts` with fetchContentList, fetchLatest, fetchTrending, fetchGoodNews, fetchByRegion, fetchByCategory, fetchByDate, fetchBySource, fetchSources functions
    - Create `src/lib/search.ts` with searchContent (case-insensitive title+summary match), filterContent (multi-criteria AND logic), sortByDate functions
    - Create `src/lib/dates.ts` with formatDate (human-readable, no ISO artifacts), getNextDate, getPreviousDate functions
    - Create `src/lib/utils.ts` with truncateSummary (max 280 chars + ellipsis) and other shared helpers
    - Create `src/lib/preferences.ts` with getPreferences, setPreferences, resetPreferences, isStorageAvailable functions using versioned schema
    - _Requirements: 1.3, 1.5, 9.2, 9.4, 8.3, 8.6, 16.1, 14.1, 14.5, 14.6_

  - [ ] 1.5 Implement custom React hooks
    - Create `src/lib/hooks/useContentData.ts` with loading/error/retry pattern
    - Create `src/lib/hooks/usePreferences.ts` with preference read/write/reset and availability check
    - Create `src/lib/hooks/useSearch.ts` with query, filters, results, and clear logic
    - _Requirements: 25.1, 25.3, 25.4, 14.1, 9.2_

  - [ ] 1.6 Generate JSON fixture data
    - Create `public/data/latest.json` with 15–20 realistic Gambian ContentItems covering all regions and categories
    - Create `public/data/trending.json` with 10–12 items
    - Create `public/data/good-news.json` with 8–10 items where isGoodNews is true
    - Create `public/data/dates/2024-01-15.json` and `public/data/dates/2024-01-14.json` with date-specific items
    - Create `public/data/regions/{banjul,kanifing,west-coast,north-bank,lower-river,central-river,upper-river}.json`
    - Create `public/data/categories/{politics,business,technology,sports,diaspora}.json`
    - Create `public/data/sources/{the-standard,the-point,foroyaa,grts,freedom-radio}.json` with source metadata and items
    - Include all ContentItem fields, realistic Gambian headlines, proper region assignment, and multiple content types (article, video, podcast, radio)
    - _Requirements: 2.3, 2.4, 2.5, 19.4_

- [ ] 2. Phase 1B — Core Components
  - [ ] 2.1 Implement ContentCard component with variants
    - Create `src/components/ContentCard.tsx` with props: item (ContentItem), variant ('compact' | 'featured' | 'media')
    - Render headline, truncated summary (280 chars), sourceName, formatted publishedAt, region indicator, contentType badge, thumbnail, and "Read original story" link
    - Show EmbedPlaceholder for video/podcast/radio items with embedUrl
    - Apply Tailwind design tokens for styling (card shadow, border radius, spacing)
    - Create `src/components/ContentTypeBadge.tsx` with Lucide icon per content type
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 16.1, 16.2, 16.3, 16.4_

  - [ ] 2.2 Implement EmbedPlaceholder component
    - Create `src/components/EmbedPlaceholder.tsx` with props: embedUrl, thumbnailUrl, title
    - Show thumbnail with play overlay button — do NOT load iframe until user clicks
    - On click, replace placeholder with iframe loading the embedUrl
    - Provide accessible button label for screen readers
    - _Requirements: 6.3, 6.4, 13.2_

  - [ ] 2.3 Implement ContentGrid and layout components
    - Create `src/components/ContentGrid.tsx` with responsive column grid (1→2→3→4 columns based on breakpoint)
    - Create `src/components/SectionHeader.tsx` with title and optional "View all" link
    - _Requirements: 12.1, 12.3_

  - [ ] 2.4 Implement LoadingSkeleton, EmptyState, and ErrorState components
    - Create `src/components/LoadingSkeleton.tsx` with variants: card, list, hero; configurable count
    - Create `src/components/EmptyState.tsx` with title, description, optional Lucide icon
    - Create `src/components/ErrorState.tsx` with message, optional retry callback button
    - _Requirements: 12.5, 4.5, 5.5, 25.1, 25.4_

  - [ ] 2.5 Implement SearchBar and FilterBar components
    - Create `src/components/SearchBar.tsx` with text input, search icon, onSearch callback
    - Create `src/components/FilterBar.tsx` with dynamic filter controls (select, date) driven by FilterConfig array
    - _Requirements: 9.1, 9.3, 9.4_

  - [ ] 2.6 Implement Breadcrumbs component
    - Create `src/components/Breadcrumbs.tsx` accepting BreadcrumbItem[] (label, href)
    - Use semantic nav element with aria-label="Breadcrumb"
    - _Requirements: 18.5_

  - [ ] 2.7 Implement Navigation (Header, Footer, MobileNav)
    - Create `src/components/Header.tsx` with logo, primary nav links (Homepage, Latest, Regions, Topics, Watch, Listen, Good News, Diaspora, Search), search input, mobile menu button
    - Create `src/components/Footer.tsx` with footer nav links (About, Editorial Policy, Corrections, Privacy, Contact, Source Directory) and attribution
    - Create `src/components/MobileNav.tsx` with accessible hamburger menu overlay, focus trap, ESC to close
    - Create `src/components/SkipLink.tsx` for skip-to-content accessibility
    - Highlight currently active nav item
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 15.3_

  - [ ] 2.8 Implement RootLayout with providers
    - Create `src/app/layout.tsx` with HTML lang attribute, Inter font, SkipLink, Header, main content area, Footer
    - Wrap children with any context providers needed (preferences)
    - Add global metadata (site title, description)
    - _Requirements: 15.1, 12.4, 24.1_

- [ ] 3. Checkpoint — Foundation and components complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Phase 1C — Pages
  - [ ] 4.1 Implement Homepage with all 10 sections
    - Create `src/app/page.tsx` as client component using useContentData hooks
    - Implement TopHeadlines section (featured ContentCards)
    - Implement Latest section (compact ContentCards from latest.json)
    - Implement RegionExplorer section with links to 7 region pages
    - Implement Trending section (from trending.json)
    - Implement GoodNews section (isGoodNews filter)
    - Implement Watch section (contentType === 'video')
    - Implement Listen section (contentType === 'podcast' or 'radio')
    - Implement Diaspora section (category includes 'diaspora')
    - Implement SourceDirectory preview section
    - Implement DateSelector section with navigation
    - Each section wrapped with error boundary pattern (ErrorState on failure)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 25.3_

  - [ ] 4.2 Implement Latest News page
    - Create `src/app/latest/page.tsx` fetching from data/latest.json
    - Display Content_Items sorted by publishedAt descending as ContentCards
    - Show EmptyState if no items available
    - Include PageMeta for SEO
    - _Requirements: 22.1, 22.2, 22.3_

  - [ ] 4.3 Implement Regions overview and individual region pages
    - Create `src/app/regions/page.tsx` listing all 7 regions with RegionCard components and navigation links
    - Create `src/app/regions/[slug]/page.tsx` with generateStaticParams for all 7 region slugs
    - Fetch and display Content_Items from data/regions/{slug}.json
    - Include Breadcrumbs (Home > Regions > {Region Name})
    - Show EmptyState if region has no content
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ] 4.4 Implement Topics overview and individual topic pages
    - Create `src/app/topics/page.tsx` listing all 5 categories with navigation links
    - Create `src/app/topics/[slug]/page.tsx` with generateStaticParams for all 5 category slugs
    - Fetch and display Content_Items from data/categories/{slug}.json
    - Include Breadcrumbs (Home > Topics > {Topic Name})
    - Show EmptyState if category has no content
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 4.5 Implement Watch page
    - Create `src/app/watch/page.tsx` filtering contentType === 'video' items
    - Display media-variant ContentCards with EmbedPlaceholder
    - Show EmptyState if no video content available
    - _Requirements: 6.1, 6.3, 6.4, 6.5, 6.6_

  - [ ] 4.6 Implement Listen page
    - Create `src/app/listen/page.tsx` filtering contentType === 'podcast' or 'radio' items
    - Display media-variant ContentCards with EmbedPlaceholder
    - Show EmptyState if no audio content available
    - _Requirements: 6.2, 6.5, 6.6_

  - [ ] 4.7 Implement Good News page
    - Create `src/app/good-news/page.tsx` fetching from data/good-news.json
    - Display ContentCards with positive visual indicator (green accent, heart/smile icon)
    - Show EmptyState if no good news content available
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 4.8 Implement Diaspora page
    - Create `src/app/diaspora/page.tsx` fetching from data/categories/diaspora.json
    - Display ContentCards with headline, summary, source, date, region
    - Show EmptyState if no diaspora content available
    - _Requirements: 21.1, 21.2, 21.3_

  - [ ] 4.9 Implement Date Archive page with navigation
    - Create `src/app/archive/page.tsx` with date picker defaulting to today
    - Create `src/app/archive/[date]/page.tsx` with generateStaticParams for available dates
    - Fetch and display Content_Items from data/dates/{date}.json
    - Implement previous/next day navigation using getNextDate/getPreviousDate
    - Display selected date prominently
    - Show EmptyState if no content for selected date
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 4.10 Implement Sources directory and individual source pages
    - Create `src/app/sources/page.tsx` listing all sources with SourceCard components (name, description, content types, official indicator)
    - Create `src/app/sources/[id]/page.tsx` with generateStaticParams for all source IDs
    - Display source metadata (name, description, website link) and Content_Items from that source
    - Include Breadcrumbs (Home > Sources > {Source Name})
    - Show EmptyState with source metadata if no items
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 4.11 Implement Search results page
    - Create `src/app/search/page.tsx` using useSearch hook
    - Display SearchBar prominently with FilterBar below
    - Show result count and ContentCard grid for matching items
    - Show informative no-results state with suggestions
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ] 4.12 Implement informational pages (About, Editorial Policy, Corrections, Privacy, Contact)
    - Create `src/app/about/page.tsx` with platform mission and approach content
    - Create `src/app/editorial-policy/page.tsx` with content selection criteria
    - Create `src/app/corrections/page.tsx` with corrections and takedown policy
    - Create `src/app/privacy/page.tsx` describing localStorage usage and no-tracking policy
    - Create `src/app/contact/page.tsx` with contact methods
    - Style all with consistent typography and semantic HTML
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 4.13 Implement custom 404 page
    - Create `src/app/not-found.tsx` with helpful message and navigation links to key sections
    - _Requirements: 11.6, 25.2_

- [ ] 5. Checkpoint — All pages implemented
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Phase 1D — Features
  - [ ] 6.1 Implement anonymous preferences system
    - Create preference context provider wrapping the app
    - Implement usePreferences hook with localStorage read/write using versioned schema
    - Add preference controls UI (region selection, category hiding, reset button, disable tracking toggle)
    - Integrate preferences into content views — highlight preferred regions, exclude hidden categories
    - Gracefully degrade when localStorage unavailable
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [ ] 6.2 Implement client-side search and filtering
    - Wire SearchBar in Header to navigate to /search with query param
    - Implement full filter logic in search page using useSearch hook
    - Support text query + region + category + contentType + source + date range filters
    - Display result count and apply all filters simultaneously (AND logic)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ] 6.3 Implement date navigation
    - Wire DateSelector on homepage to navigate to /archive/{date}
    - Implement previous/next day buttons on archive pages
    - Ensure navigation works across month/year boundaries
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 6.4 Implement SEO metadata and sitemap generation
    - Create `src/components/PageMeta.tsx` or use Next.js metadata exports for per-page title, description, OG tags
    - Add metadata to all page files (unique title + description)
    - Create sitemap generation script or use Next.js sitemap feature to produce sitemap.xml at build time
    - Ensure single h1 per page and correct heading hierarchy
    - Add JSON-LD structured data for content pages where applicable
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

- [ ] 7. Checkpoint — Features complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Phase 1E — Quality
  - [ ]* 8.1 Write unit tests for utility functions
    - Test `src/lib/data.ts` fetch functions with mocked responses (success, error, 404, malformed JSON)
    - Test `src/lib/search.ts` searchContent and filterContent with realistic data
    - Test `src/lib/dates.ts` formatDate, getNextDate, getPreviousDate
    - Test `src/lib/utils.ts` truncateSummary edge cases
    - Test `src/lib/preferences.ts` get/set/reset/isStorageAvailable
    - _Requirements: 19.2_

  - [ ]* 8.2 Write unit tests for components
    - Test ContentCard renders all required fields for each variant
    - Test EmbedPlaceholder shows placeholder initially and loads iframe on click
    - Test EmptyState and ErrorState render appropriate messages
    - Test SearchBar and FilterBar interaction
    - Test Navigation active state and mobile menu toggle
    - _Requirements: 19.1_

  - [ ]* 8.3 Write unit tests for custom hooks
    - Test useContentData loading, success, error, and retry states
    - Test usePreferences read, write, reset, and unavailable storage
    - Test useSearch query and filter combinations
    - _Requirements: 19.2_

  - [ ]* 8.4 Write property test: Content Filtering Correctness (Property 1)
    - **Property 1: Content Filtering Correctness**
    - Generate random ContentItem arrays and filter criteria, verify only matching items returned and no matching items excluded
    - **Validates: Requirements 3.5, 3.6, 3.7, 3.8, 4.3, 5.3, 6.1, 6.2, 7.1, 21.1**

  - [ ]* 8.5 Write property test: Content Sorting Preserves Date Order (Property 2)
    - **Property 2: Content Sorting Preserves Date Order**
    - Generate random ContentItem arrays with distinct timestamps, verify sorted output maintains descending order
    - **Validates: Requirements 3.4, 22.1**

  - [ ]* 8.6 Write property test: Search and Filter Composition (Property 3)
    - **Property 3: Search and Filter Composition**
    - Generate random items, queries, and filter combinations, verify results match BOTH text and filter criteria
    - **Validates: Requirements 9.2, 9.4, 9.5**

  - [ ]* 8.7 Write property test: ContentCard Rendering Completeness (Property 4)
    - **Property 4: ContentCard Rendering Completeness**
    - Generate random valid ContentItems, verify rendered output contains title, truncated summary, sourceName, formatted date, region, contentType, and originalUrl link
    - **Validates: Requirements 4.4, 5.4, 16.2, 16.3, 16.4, 17.1, 17.5**

  - [ ]* 8.8 Write property test: Summary Truncation (Property 5)
    - **Property 5: Summary Truncation**
    - Generate random strings of varying lengths, verify truncateSummary output is ≤280 chars (+ ellipsis if truncated) and preserves short strings unchanged
    - **Validates: Requirements 16.1, 17.4**

  - [ ]* 8.9 Write property test: Embed Placeholder for Media Items (Property 6)
    - **Property 6: Embed Placeholder for Media Items**
    - Generate random ContentItems with video/podcast/radio type and non-null embedUrl, verify ContentCard renders EmbedPlaceholder instead of auto-loading embed
    - **Validates: Requirements 6.3, 13.2, 17.3**

  - [ ]* 8.10 Write property test: Preference Storage Round-Trip (Property 7)
    - **Property 7: Preference Storage Round-Trip**
    - Generate random valid UserPreferences objects, verify setPreferences then getPreferences returns deeply equal object
    - **Validates: Requirements 14.1**

  - [ ]* 8.11 Write property test: Preference-Based Content Exclusion (Property 8)
    - **Property 8: Preference-Based Content Exclusion**
    - Generate random ContentItem arrays and hidden categories, verify no items from hidden categories appear in filtered output
    - **Validates: Requirements 14.3, 14.4**

  - [ ]* 8.12 Write property test: Date Formatting Consistency (Property 9)
    - **Property 9: Date Formatting Consistency**
    - Generate random valid ISO 8601 date strings, verify formatDate output is non-empty and contains no "T" separator or "Z" suffix
    - **Validates: Requirements 8.6**

  - [ ]* 8.13 Write property test: Date Navigation Arithmetic (Property 10)
    - **Property 10: Date Navigation Arithmetic**
    - Generate random valid YYYY-MM-DD dates, verify getNextDate/getPreviousDate are inverses and produce correct adjacent days
    - **Validates: Requirements 8.3**

  - [ ]* 8.14 Write property test: Data Fetch Error Resilience (Property 11)
    - **Property 11: Data Fetch Error Resilience**
    - Simulate random error conditions (network error, 404, malformed JSON), verify useContentData returns error state without throwing unhandled exception
    - **Validates: Requirements 1.5, 25.1, 25.3**

  - [ ]* 8.15 Write E2E tests with Playwright
    - Test homepage loads and renders all 10 sections
    - Test navigation between pages (regions, topics, watch, listen, good-news, diaspora)
    - Test search workflow (enter query, apply filters, see results)
    - Test preference persistence across page loads (set preference, reload, verify)
    - Test 404 page displays for invalid routes
    - Test keyboard navigation and focus management
    - _Requirements: 19.3, 19.5_

  - [ ]* 8.16 Run accessibility audit
    - Integrate axe-core with Vitest for component-level a11y checks
    - Run Playwright axe-core audit on all pages
    - Verify colour contrast meets WCAG 2.1 AA
    - Verify all images have appropriate alt text
    - Verify ARIA live regions for dynamic content
    - Verify skip link and focus indicators
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_

  - [ ] 8.17 Performance optimisation
    - Implement lazy loading for images below the fold using Next.js Image or native loading="lazy"
    - Implement code splitting with Next.js dynamic imports for heavy sections
    - Verify JavaScript bundle size is reasonable
    - Ensure all pages pre-render successfully with static export
    - _Requirements: 13.1, 13.3, 13.4, 13.5, 13.6_

  - [ ] 8.18 Create documentation
    - Write `README.md` with project overview, local dev setup, build commands, test commands, and architecture summary
    - Write `docs/architecture.md` describing page structure, data flow, component hierarchy, content schema, and design decisions
    - Ensure `.env.example` is up to date with all variables documented
    - Add inline code comments for complex logic
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 9. Final checkpoint — All quality tasks complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All fixture data uses realistic Gambian content — no Lorem Ipsum
- This plan covers Phase 1 LOCAL MVP only — no AWS infrastructure, ingestion, or deployment tasks

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "1.5", "1.6"] },
    { "id": 3, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"] },
    { "id": 4, "tasks": ["2.7", "2.8"] },
    { "id": 5, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12", "4.13"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 7, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14"] },
    { "id": 8, "tasks": ["8.15", "8.16", "8.17", "8.18"] }
  ]
}
```
