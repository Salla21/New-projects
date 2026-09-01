# Requirements Document

## Introduction

The Smiling Coast Hub is a publicly accessible Gambian news and media aggregation platform. It consolidates newspaper headlines, television reports, YouTube videos, radio programmes, podcasts, government announcements, regional reporting, diaspora stories, and community-impact stories into a single, mobile-first interface. Phase 1 delivers a statically exported Next.js application with local JSON fixture data, responsive design, anonymous preferences, and comprehensive accessibility. The platform requires no registration, no paywalls, and no authentication pop-ups.

## Glossary

- **Platform**: The Smiling Coast Hub web application
- **Content_Item**: A single piece of aggregated media described by the shared TypeScript content schema (id, title, summary, sourceId, sourceName, sourceUrl, originalUrl, publishedAt, collectedAt, region, categories, contentType, thumbnailUrl, author, language, isGoodNews, isOfficialSource, embedUrl, status)
- **Content_Type**: One of: article, video, podcast, radio, social, official-update
- **Region**: One of the seven Gambian administrative regions: Banjul, Kanifing, West Coast, North Bank, Lower River, Central River, Upper River
- **Category**: A topic classification: Politics, Business, Technology, Sports, Diaspora
- **Source**: An originating media outlet or publisher identified by a unique sourceId
- **Fixture_Data**: Realistic local JSON sample data representing Gambian news content, stored in public/data/
- **Preference_Store**: Anonymous client-side storage via localStorage for user preferences
- **Static_Export**: A pre-rendered HTML/CSS/JavaScript build with no runtime server requirement
- **Content_Card**: A UI component displaying a Content_Item summary with headline, source, date, thumbnail, and link to original
- **Date_Archive**: A navigable collection of Content_Items organised by publication date
- **Source_Directory**: A listing of all content sources with metadata and links to source-specific pages
- **Embed_Placeholder**: A non-loading placeholder shown for third-party media until the user explicitly clicks play or view

## Requirements

### Requirement 1: Static Application Architecture

**User Story:** As a platform maintainer, I want the application to export as static HTML/CSS/JavaScript, so that it can be hosted on any static file server without compute costs.

#### Acceptance Criteria

1. THE Platform SHALL use Next.js App Router with `output: "export"` configuration to produce a fully static build
2. THE Platform SHALL generate all pages as pre-rendered HTML files during the build process
3. THE Platform SHALL load Content_Item data from local JSON files in the public/data/ directory
4. THE Platform SHALL function without a running Node.js server after build completion
5. IF a JSON data file is missing or malformed, THEN THE Platform SHALL display a clear error state instead of crashing

### Requirement 2: Content Data Schema and Storage

**User Story:** As a developer, I want a consistent content schema and file-based storage model, so that all components consume data in a predictable format.

#### Acceptance Criteria

1. THE Platform SHALL define a shared TypeScript type for Content_Item with fields: id, title, summary, sourceId, sourceName, sourceUrl, originalUrl, publishedAt, collectedAt, region, categories, contentType, thumbnailUrl, author, language, isGoodNews, isOfficialSource, embedUrl, status
2. THE Platform SHALL enforce strict TypeScript typing for all Content_Item usage with no implicit `any` types
3. THE Platform SHALL store fixture data in JSON files at: data/latest.json, data/trending.json, data/good-news.json, data/dates/YYYY-MM-DD.json, data/regions/{region-slug}.json, data/categories/{category-slug}.json, data/sources/{source-id}.json
4. THE Platform SHALL populate fixture data with realistic Gambian content samples including accurate source names, plausible headlines, and region-appropriate stories
5. THE Platform SHALL include fixture data covering all seven Regions and all five Categories

### Requirement 3: Homepage Layout and Sections

**User Story:** As a reader, I want a homepage that presents multiple content sections at a glance, so that I can quickly find stories relevant to my interests.

#### Acceptance Criteria

1. THE Platform SHALL display the following sections on the homepage in this order: Top Headlines, Latest Across The Gambia, Explore by Region, Trending, Good News, Watch, Listen, Diaspora, Source Directory, Date Selector
2. WHEN the homepage loads, THE Platform SHALL render the Top Headlines section with the most prominent Content_Items
3. THE Platform SHALL display the Explore by Region section with navigation links to all seven Region pages
4. THE Platform SHALL display the Trending section with Content_Items sorted by recency and engagement indicators
5. THE Platform SHALL display the Good News section with Content_Items where isGoodNews is true
6. THE Platform SHALL display the Watch section with Content_Items where contentType is video
7. THE Platform SHALL display the Listen section with Content_Items where contentType is podcast or radio
8. THE Platform SHALL display the Diaspora section with Content_Items categorised under Diaspora
9. THE Platform SHALL display the Source Directory section with links to the full Source_Directory page
10. THE Platform SHALL display the Date Selector section allowing navigation to Date_Archive pages

### Requirement 4: Region Pages

**User Story:** As a reader, I want to browse news by geographic region, so that I can find stories relevant to my area of The Gambia.

#### Acceptance Criteria

1. THE Platform SHALL provide a Regions overview page listing all seven Regions with navigation to each individual Region page
2. THE Platform SHALL provide individual Region pages for: Banjul, Kanifing, West Coast, North Bank, Lower River, Central River, Upper River
3. WHEN a Region page loads, THE Platform SHALL display Content_Items filtered to the specified Region from data/regions/{region-slug}.json
4. THE Platform SHALL display each Content_Item on a Region page as a Content_Card with headline, summary, source name, publication date, and content type indicator
5. IF a Region has no Content_Items, THEN THE Platform SHALL display an informative empty state message

### Requirement 5: Topic Pages

**User Story:** As a reader, I want to browse news by topic category, so that I can follow subjects I care about.

#### Acceptance Criteria

1. THE Platform SHALL provide a Topics overview page listing all five Categories with navigation to each individual Topic page
2. THE Platform SHALL provide individual Topic pages for: Politics, Business, Technology, Sports, Diaspora
3. WHEN a Topic page loads, THE Platform SHALL display Content_Items filtered to the specified Category from data/categories/{category-slug}.json
4. THE Platform SHALL display each Content_Item on a Topic page as a Content_Card with headline, summary, source name, publication date, and region indicator
5. IF a Category has no Content_Items, THEN THE Platform SHALL display an informative empty state message

### Requirement 6: Watch and Listen Pages

**User Story:** As a reader, I want dedicated pages for video and audio content, so that I can find multimedia stories easily.

#### Acceptance Criteria

1. THE Platform SHALL provide a Watch page displaying Content_Items where contentType is video
2. THE Platform SHALL provide a Listen page displaying Content_Items where contentType is podcast or radio
3. WHEN a video Content_Item is displayed, THE Platform SHALL show an Embed_Placeholder instead of loading the third-party embed immediately
4. WHEN the user clicks the play button on an Embed_Placeholder, THE Platform SHALL load the third-party embed using the embedUrl field
5. THE Platform SHALL display video and audio Content_Cards with source name, title, publication date, and a prominent play indicator
6. IF no video or audio Content_Items are available, THEN THE Platform SHALL display an informative empty state message

### Requirement 7: Good News Page

**User Story:** As a reader, I want a dedicated page for positive and community-impact stories, so that I can find uplifting news from The Gambia.

#### Acceptance Criteria

1. THE Platform SHALL provide a Good News page displaying Content_Items where isGoodNews is true
2. THE Platform SHALL display Good News Content_Cards with headline, summary, source name, publication date, region, and a visual indicator of positive content
3. IF no Good News Content_Items are available, THEN THE Platform SHALL display an informative empty state message

### Requirement 8: Date Archive and Historical Navigation

**User Story:** As a reader, I want to browse news by date, so that I can find stories from specific days and review historical coverage.

#### Acceptance Criteria

1. THE Platform SHALL provide a Date Archive page with a date navigation interface
2. WHEN the user selects a date, THE Platform SHALL display Content_Items from data/dates/YYYY-MM-DD.json for the selected date
3. THE Platform SHALL provide navigation controls to move to the previous day and the next day
4. THE Platform SHALL display the selected date prominently on the Date Archive page
5. IF no Content_Items exist for the selected date, THEN THE Platform SHALL display an informative message indicating no content is available for that date
6. THE Platform SHALL format dates consistently using a human-readable format throughout the Date Archive

### Requirement 9: Search and Filtering

**User Story:** As a reader, I want to search and filter content by multiple criteria, so that I can find specific stories efficiently.

#### Acceptance Criteria

1. THE Platform SHALL provide a Search Results page accessible from a persistent search input in the navigation
2. WHEN the user enters a search term, THE Platform SHALL filter Content_Items by matching the term against title and summary fields
3. THE Platform SHALL provide filter controls for: date, date range, region, category, source, and content type
4. WHEN the user applies one or more filters, THE Platform SHALL display only Content_Items matching all selected filter criteria
5. WHEN the user combines a search term with filters, THE Platform SHALL apply both the text match and filter criteria simultaneously
6. THE Platform SHALL display the number of matching results on the Search Results page
7. IF no Content_Items match the search and filter criteria, THEN THE Platform SHALL display a clear no-results message with suggestions to modify the search

### Requirement 10: Source Directory and Source Pages

**User Story:** As a reader, I want to see all content sources and browse stories by source, so that I can understand where content originates and follow specific outlets.

#### Acceptance Criteria

1. THE Platform SHALL provide a Source Directory page listing all content sources with source name, description, and content type indicators
2. THE Platform SHALL provide individual Source pages for each source, displaying Content_Items from data/sources/{source-id}.json
3. WHEN a Source page loads, THE Platform SHALL display the source name, description, website link, and all Content_Items from that source
4. THE Platform SHALL indicate whether a source is an official government source using the isOfficialSource field
5. IF a Source has no Content_Items, THEN THE Platform SHALL display the source metadata with an informative empty state message

### Requirement 11: Informational Pages

**User Story:** As a reader, I want access to editorial policies and platform information, so that I can understand how content is curated and how to contact the team.

#### Acceptance Criteria

1. THE Platform SHALL provide an About page explaining the platform mission and approach
2. THE Platform SHALL provide an Editorial Policy page describing content selection criteria and aggregation principles
3. THE Platform SHALL provide a Corrections and Takedown Policy page explaining how errors are corrected and how content removal requests are handled
4. THE Platform SHALL provide a Privacy Policy page describing localStorage usage and the absence of tracking or cookies beyond essential functionality
5. THE Platform SHALL provide a Contact page with methods to reach the platform team
6. THE Platform SHALL provide a custom 404 page with helpful navigation links when a requested page is not found

### Requirement 12: Responsive Mobile-First Design

**User Story:** As a mobile reader on a slower connection, I want the platform to load quickly and display content clearly on small screens, so that I can read news comfortably on my phone.

#### Acceptance Criteria

1. THE Platform SHALL implement a mobile-first responsive design that adapts from small mobile screens (320px minimum) through tablet to desktop viewports
2. THE Platform SHALL use Tailwind CSS with Gambian-inspired colours: warm white/light neutral backgrounds, dark navy/charcoal text, and red, blue, green accents derived from the Gambian flag
3. THE Platform SHALL render Content_Cards in spacious compact layouts with strong typography and clear visual hierarchy
4. THE Platform SHALL provide a responsive navigation system that functions on both mobile and desktop viewports
5. THE Platform SHALL display lightweight loading skeletons for content sections during data fetching
6. THE Platform SHALL use only subtle CSS transitions without heavy animation libraries
7. THE Platform SHALL achieve passing Core Web Vitals scores as measured by Lighthouse

### Requirement 13: Performance Optimisation

**User Story:** As a reader on a 3G connection, I want pages to load within 3 seconds, so that I can access news without long waits.

#### Acceptance Criteria

1. THE Platform SHALL lazy-load images and noncritical media below the initial viewport fold
2. THE Platform SHALL defer loading of third-party social embeds until the user explicitly clicks the play or view button
3. THE Platform SHALL maintain a small JavaScript bundle by using code splitting and tree shaking
4. THE Platform SHALL serve optimised images with appropriate formats and responsive sizing
5. THE Platform SHALL pre-render all pages at build time to eliminate server-side rendering latency
6. WHILE the page is loading, THE Platform SHALL display content-appropriate loading skeletons to indicate progress

### Requirement 14: Anonymous Local Preferences

**User Story:** As a returning reader, I want the platform to remember my preferences without requiring registration, so that I see personalised content sections on subsequent visits.

#### Acceptance Criteria

1. THE Platform SHALL store user preferences in the browser localStorage without requiring registration or authentication
2. THE Platform SHALL support the following preference types: preferred regions, preferred categories, recently opened stories, hidden categories, reading duration tracking, and saved stories
3. WHEN a user sets preferred regions, THE Platform SHALL highlight content from those regions in relevant sections
4. WHEN a user hides a category, THE Platform SHALL exclude Content_Items from that category in personalised views
5. THE Platform SHALL provide user controls to disable preference tracking, reset all preferences, and clear stored data
6. IF localStorage is unavailable or full, THEN THE Platform SHALL continue functioning with default (non-personalised) behaviour
7. THE Platform SHALL store no personally identifiable information in the Preference_Store

### Requirement 15: Accessibility

**User Story:** As a reader using assistive technology, I want the platform to be fully navigable via keyboard and screen reader, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Platform SHALL use semantic HTML elements (header, nav, main, article, section, aside, footer) to convey document structure
2. THE Platform SHALL provide accessible labels for all interactive elements using aria-label, aria-labelledby, or visible labels
3. THE Platform SHALL support full keyboard navigation including focus management, skip links, and logical tab order
4. THE Platform SHALL maintain accessible colour contrast ratios meeting WCAG 2.1 AA standards between text and background colours
5. THE Platform SHALL provide accessible alt text for all informational images and decorative images marked with empty alt attributes
6. THE Platform SHALL announce dynamic content changes to screen readers using appropriate ARIA live regions
7. THE Platform SHALL provide visible focus indicators for all interactive elements during keyboard navigation

### Requirement 16: Copyright and Attribution Compliance

**User Story:** As a platform operator, I want to ensure all aggregated content respects copyright, so that the platform operates legally and ethically.

#### Acceptance Criteria

1. THE Platform SHALL display only: headline, short summary (maximum 280 characters), source name, publication date, thumbnail where usage is permitted, and a link to the original article
2. THE Platform SHALL include a prominent "Read original story" call-to-action on every Content_Card linking to the originalUrl
3. THE Platform SHALL visually distinguish content types using labels: Independent Reporting, Official Announcement, Opinion, Sponsored, Community Submission, Developing Story
4. THE Platform SHALL attribute every Content_Item to its source by displaying the sourceName prominently on the Content_Card
5. THE Platform SHALL never display the full text of a third-party article

### Requirement 17: Content Card Component

**User Story:** As a developer, I want a reusable Content Card component, so that content is displayed consistently across all pages and sections.

#### Acceptance Criteria

1. THE Platform SHALL provide a reusable Content_Card component that renders headline, summary, source name, publication date, region, content type indicator, and thumbnail
2. THE Platform SHALL render the Content_Card component consistently across homepage sections, region pages, topic pages, search results, and source pages
3. WHEN a Content_Card displays a video or audio Content_Item, THE Platform SHALL show an Embed_Placeholder with a play indicator instead of auto-loading the embed
4. THE Platform SHALL truncate summary text at 280 characters with an ellipsis indicator on Content_Cards
5. THE Platform SHALL indicate the content type visually on each Content_Card using an icon or label

### Requirement 18: Navigation and Site Structure

**User Story:** As a reader, I want clear and consistent navigation, so that I can move between sections and pages without confusion.

#### Acceptance Criteria

1. THE Platform SHALL provide a persistent primary navigation with links to: Homepage, Latest, Regions, Topics, Watch, Listen, Good News, Diaspora, Search
2. THE Platform SHALL provide a footer navigation with links to: About, Editorial Policy, Corrections and Takedown Policy, Privacy Policy, Contact, Source Directory
3. WHEN the viewport is mobile-sized, THE Platform SHALL collapse the primary navigation into an accessible hamburger menu
4. THE Platform SHALL highlight the currently active navigation item to indicate the user's location within the site
5. THE Platform SHALL provide breadcrumb navigation on Region pages, Topic pages, Source pages, and Date Archive pages

### Requirement 19: Testing

**User Story:** As a developer, I want comprehensive automated tests, so that I can confidently make changes without introducing regressions.

#### Acceptance Criteria

1. THE Platform SHALL include unit tests using Vitest and React Testing Library for all shared components
2. THE Platform SHALL include unit tests for data fetching utilities and filtering logic
3. THE Platform SHALL include Playwright end-to-end tests verifying: homepage rendering, navigation between pages, search functionality, and preference storage
4. THE Platform SHALL use realistic Gambian content in all test fixtures with no Lorem Ipsum placeholder text
5. THE Platform SHALL achieve test coverage for all critical user paths: viewing content by region, by topic, by date, and via search

### Requirement 20: Documentation

**User Story:** As a developer joining the project, I want clear documentation, so that I can set up, understand, and contribute to the project quickly.

#### Acceptance Criteria

1. THE Platform SHALL include a README.md with project overview, local development setup instructions, build commands, and testing commands
2. THE Platform SHALL include architecture documentation describing the page structure, data flow, component hierarchy, and design decisions
3. THE Platform SHALL include a .env.example file documenting all environment variables with descriptions
4. THE Platform SHALL include inline code comments for complex logic and non-obvious design decisions
5. THE Platform SHALL document the content schema and JSON fixture data format in the architecture documentation

### Requirement 21: Diaspora Page

**User Story:** As a member of the Gambian diaspora, I want a dedicated page for diaspora news and stories, so that I can stay connected to community events and issues relevant to Gambians abroad.

#### Acceptance Criteria

1. THE Platform SHALL provide a Diaspora page displaying Content_Items categorised under the Diaspora category
2. THE Platform SHALL display Diaspora Content_Cards with headline, summary, source name, publication date, and relevant region or country indicator
3. IF no Diaspora Content_Items are available, THEN THE Platform SHALL display an informative empty state message

### Requirement 22: Latest News Page

**User Story:** As a reader, I want a chronological feed of all the latest news, so that I can see the most recent stories across all categories and regions.

#### Acceptance Criteria

1. THE Platform SHALL provide a Latest News page displaying Content_Items from data/latest.json sorted by publishedAt in descending order
2. THE Platform SHALL display Content_Items on the Latest News page as Content_Cards with full metadata including region and category indicators
3. IF no Content_Items are available in latest.json, THEN THE Platform SHALL display an informative empty state message

### Requirement 23: Visual Design System

**User Story:** As a designer, I want a cohesive visual design system with Gambian-inspired colours, so that the platform has a distinctive and culturally appropriate identity.

#### Acceptance Criteria

1. THE Platform SHALL use a colour palette consisting of: warm white or light neutral for backgrounds, dark navy or charcoal for primary text, red accent (Gambian flag), blue accent (Gambian flag), green accent (Gambian flag), and optional warm sand or gold accent
2. THE Platform SHALL apply strong typography with clear size hierarchy for headings, subheadings, body text, and captions
3. THE Platform SHALL configure the Tailwind CSS theme to include all brand colours as named design tokens
4. THE Platform SHALL maintain consistent spacing, border radius, and shadow values across all components using Tailwind utility classes
5. THE Platform SHALL use Lucide Icons consistently for all iconography throughout the interface

### Requirement 24: SEO and Metadata

**User Story:** As a platform operator, I want proper SEO metadata on all pages, so that search engines can index and surface Gambian news content effectively.

#### Acceptance Criteria

1. THE Platform SHALL include unique title and meta description tags on every page
2. THE Platform SHALL include Open Graph metadata (og:title, og:description, og:image, og:url) on all content pages
3. THE Platform SHALL generate a sitemap.xml during the build process listing all public pages
4. THE Platform SHALL use semantic heading hierarchy (h1 through h6) correctly on every page with a single h1 per page
5. THE Platform SHALL include structured data (JSON-LD) for news article pages where applicable

### Requirement 25: Error States and Resilience

**User Story:** As a reader, I want clear feedback when something goes wrong, so that I understand the issue and can take action.

#### Acceptance Criteria

1. IF a data file fails to load, THEN THE Platform SHALL display a user-friendly error message in the affected section without crashing the entire page
2. IF the user navigates to a non-existent route, THEN THE Platform SHALL display the custom 404 page with navigation links to key sections
3. THE Platform SHALL isolate failures to individual sections so that one broken data source does not prevent other sections from rendering
4. WHILE a section is recovering from a load failure, THE Platform SHALL provide a retry option for the user
5. THE Platform SHALL log client-side errors to the browser console with descriptive messages for debugging purposes
