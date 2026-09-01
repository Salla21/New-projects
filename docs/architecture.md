# Architecture Documentation

## Overview

The Smiling Coast Hub is a statically exported Next.js 15 application that aggregates and presents Gambian news and media content. The application uses the App Router with `output: "export"` to produce a fully pre-rendered HTML/CSS/JS bundle deployable to any static file server.

### Key Architectural Decisions

1. **Static Export**: No runtime server required. All pages are pre-rendered at build time.
2. **Client-Side Data Loading**: JSON files in `public/data/` are fetched at runtime via `fetch()` in React client components.
3. **Component-Driven UI**: A shared `ContentCard` component ensures consistent content display across all pages.
4. **Anonymous Preferences**: localStorage provides user preference persistence without authentication.
5. **Performance-First**: Lazy loading, code splitting, embed placeholders, and optimised images ensure fast load times.

---

## Page Routing Structure

All routes use the Next.js App Router (`src/app/`):

| Route | Description |
|-------|-------------|
| `/` | Homepage with 10 content sections |
| `/latest` | Chronological feed of all latest news |
| `/regions` | Overview of all 7 Gambian regions |
| `/regions/[slug]` | Content filtered by region |
| `/topics` | Overview of all 5 topic categories |
| `/topics/[slug]` | Content filtered by category |
| `/watch` | Video content (contentType: video) |
| `/listen` | Audio content (contentType: podcast, radio) |
| `/good-news` | Positive and community-impact stories |
| `/diaspora` | Stories relevant to Gambians abroad |
| `/archive` | Date archive with date picker |
| `/archive/[date]` | Content for a specific date (YYYY-MM-DD) |
| `/sources` | Source directory listing all outlets |
| `/sources/[id]` | Content from a specific source |
| `/search` | Search results with multi-filter system |
| `/about` | Platform mission and approach |
| `/editorial-policy` | Content selection criteria |
| `/corrections` | Corrections and takedown policy |
| `/privacy` | Privacy policy (localStorage, no tracking) |
| `/contact` | Contact methods |

Dynamic routes (`[slug]`, `[date]`, `[id]`) use `generateStaticParams()` to enumerate all valid paths at build time.

---

## Component Hierarchy

```
RootLayout
├── SkipLink
├── Header
│   ├── Logo
│   ├── PrimaryNav (desktop)
│   ├── SearchBar
│   └── MobileMenuButton → MobileNav (overlay)
├── Main (page content)
│   ├── Homepage
│   │   ├── TopHeadlines (featured ContentCards)
│   │   ├── LatestSection
│   │   ├── RegionExplorer (7 region links)
│   │   ├── TrendingSection
│   │   ├── GoodNewsSection
│   │   ├── WatchSection
│   │   ├── ListenSection
│   │   ├── DiasporaSection
│   │   ├── SourceDirectoryPreview
│   │   └── DateSelector
│   ├── ContentListPages (Regions, Topics, Sources, etc.)
│   │   ├── Breadcrumbs
│   │   ├── ContentGrid
│   │   │   └── ContentCard (repeated)
│   │   ├── EmptyState (when no items)
│   │   └── ErrorState (on fetch failure)
│   └── SearchPage
│       ├── SearchBar
│       ├── FilterBar
│       └── ContentGrid (results)
└── Footer
    ├── FooterNav
    └── Attribution
```

### Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `ContentCard` | `src/components/ContentCard.tsx` | Renders a single content item (headline, summary, source, date, region, type) |
| `ContentGrid` | `src/components/ContentGrid.tsx` | Responsive grid layout (1→2→3→4 columns) |
| `ContentTypeBadge` | `src/components/ContentTypeBadge.tsx` | Icon/label indicator for content type |
| `EmbedPlaceholder` | `src/components/EmbedPlaceholder.tsx` | Deferred embed loader (no iframe until click) |
| `EmptyState` | `src/components/EmptyState.tsx` | Message when no content is available |
| `ErrorState` | `src/components/ErrorState.tsx` | Error display with retry button |
| `LoadingSkeleton` | `src/components/LoadingSkeleton.tsx` | Content-appropriate loading placeholder |
| `SearchBar` | `src/components/SearchBar.tsx` | Text input with search functionality |
| `FilterBar` | `src/components/FilterBar.tsx` | Multi-criteria filter controls |
| `Breadcrumbs` | `src/components/Breadcrumbs.tsx` | Hierarchical navigation trail |
| `SectionHeader` | `src/components/SectionHeader.tsx` | Consistent section title with optional "View all" link |
| `Header` | `src/components/Header.tsx` | Site header with navigation |
| `Footer` | `src/components/Footer.tsx` | Site footer with secondary links |
| `MobileNav` | `src/components/MobileNav.tsx` | Hamburger menu overlay |
| `SkipLink` | `src/components/SkipLink.tsx` | Accessibility skip-to-content link |

---

## Data Flow

```
JSON Files (public/data/) → fetch() → Data Layer (lib/data.ts)
    → Custom Hooks (useContentData) → React Components → Render
```

### Detailed Flow

1. **Build time**: Next.js pre-renders all pages as static HTML. Dynamic routes are enumerated via `generateStaticParams()`.
2. **Page load**: Browser loads pre-rendered HTML for instant content display.
3. **Hydration**: React hydrates the page, client components initialise.
4. **Data fetch**: `useContentData` hook calls data layer functions which `fetch()` JSON files from `/data/`.
5. **Preferences**: `usePreferences` hook reads localStorage for personalisation.
6. **Rendering**: Components receive data and render ContentCards with appropriate filtering/sorting.
7. **Error handling**: Each section independently handles fetch failures, displaying ErrorState with retry.

### Data Layer Functions (`src/lib/data.ts`)

```typescript
fetchLatest()           → /data/latest.json
fetchTrending()         → /data/trending.json
fetchGoodNews()         → /data/good-news.json
fetchByRegion(slug)     → /data/regions/{slug}.json
fetchByCategory(slug)   → /data/categories/{slug}.json
fetchByDate(date)       → /data/dates/{date}.json
fetchBySource(sourceId) → /data/sources/{sourceId}.json
fetchSources()          → /data/sources/index.json
```

### Custom Hooks (`src/lib/hooks/`)

| Hook | Purpose |
|------|---------|
| `useContentData(fetchFn)` | Manages loading/error/retry state for data fetching |
| `usePreferences()` | Reads/writes user preferences from localStorage |
| `useSearch(allContent)` | Manages search query, filters, and results |

---

## Content Schema

### ContentItem Interface

The core data type representing a single piece of aggregated media:

```typescript
interface ContentItem {
  id: string;              // Unique identifier (e.g., "art-001")
  title: string;           // Headline text
  summary: string;         // Short description (max 280 chars displayed)
  sourceId: string;        // Identifier for the originating source
  sourceName: string;      // Display name of the source (e.g., "The Standard")
  sourceUrl: string;       // Source's website URL
  originalUrl: string;     // Direct link to the original story
  publishedAt: string;     // ISO 8601 timestamp of publication
  collectedAt: string;     // ISO 8601 timestamp when aggregated
  region: Region;          // One of 7 Gambian regions
  categories: Category[];  // Topic classifications
  contentType: ContentType; // Media format
  thumbnailUrl: string | null; // Optional thumbnail image URL
  author: string | null;   // Optional author name
  language: string;        // Content language (default: "en")
  isGoodNews: boolean;     // Positive/community-impact story flag
  isOfficialSource: boolean; // Government or official source flag
  embedUrl: string | null; // URL for embedded media (video/audio players)
  status: ContentStatus;   // Publication status
}
```

### Enumerated Types

```typescript
type ContentType = 'article' | 'video' | 'podcast' | 'radio' | 'social' | 'official-update';

type Region = 'banjul' | 'kanifing' | 'west-coast' | 'north-bank'
            | 'lower-river' | 'central-river' | 'upper-river';

type Category = 'politics' | 'business' | 'technology' | 'sports' | 'diaspora';

type ContentStatus = 'published' | 'developing' | 'corrected' | 'retracted';
```

### SourceInfo Interface

```typescript
interface SourceInfo {
  id: string;                  // Unique source identifier
  name: string;                // Display name
  description: string;         // Brief description of the outlet
  websiteUrl: string;          // Source website URL
  contentTypes: ContentType[]; // Types of content this source produces
  isOfficialSource: boolean;   // Government or official flag
  logoUrl: string | null;      // Optional source logo
}
```

---

## JSON File Structure and Naming Convention

All fixture data lives in `public/data/`:

```
public/data/
├── latest.json                    # Most recent items across all sources
├── trending.json                  # Popular/trending items
├── good-news.json                 # Items where isGoodNews: true
├── dates/
│   ├── 2024-07-14.json           # Items published on specific dates
│   └── 2024-07-15.json
├── regions/
│   ├── banjul.json               # Items from each region
│   ├── kanifing.json
│   ├── west-coast.json
│   ├── north-bank.json
│   ├── lower-river.json
│   ├── central-river.json
│   └── upper-river.json
├── categories/
│   ├── politics.json             # Items by topic category
│   ├── business.json
│   ├── technology.json
│   ├── sports.json
│   └── diaspora.json
└── sources/
    ├── index.json                # Source directory (array of SourceInfo)
    ├── the-standard.json         # Source metadata + items
    ├── the-point.json
    ├── foroyaa.json
    ├── grts.json
    ├── freedom-radio.json
    ├── kerr-fatou.json
    ├── the-fatu-network.json
    └── eye-africa-tv.json
```

### Content List File Format

All content list files follow this structure:

```json
{
  "items": [ /* Array of ContentItem objects */ ],
  "meta": {
    "generatedAt": "2024-07-15T10:00:00Z",
    "count": 15
  }
}
```

### Source File Format

```json
{
  "source": { /* SourceInfo object */ },
  "items": [ /* Array of ContentItem objects from this source */ ]
}
```

### Source Index File Format

```json
{
  "sources": [ /* Array of SourceInfo objects */ ]
}
```

---

## Design System

### Colour Palette

Tailwind CSS design tokens defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | `#FAFAF8` | Warm white page background |
| `surface-card` | `#FFFFFF` | Card background |
| `surface-muted` | `#F5F3EF` | Subtle section backgrounds |
| `ink` | `#1A2332` | Dark navy primary text |
| `ink-muted` | `#4A5568` | Charcoal secondary text |
| `ink-light` | `#718096` | Light grey captions |
| `gambia-red` | `#CE1126` | Red (flag) — alerts, breaking, live |
| `gambia-blue` | `#0C1C8C` | Blue (flag) — links, interactive |
| `gambia-green` | `#3A7728` | Green (flag) — good news, success |
| `sand` | `#D4A843` | Warm gold — highlights, badges |
| `sand-light` | `#F5E6C8` | Light sand — hover backgrounds |

Semantic colours: `error` (#DC2626), `warning` (#F59E0B), `success` (#3A7728), `info` (#0C1C8C).

### Typography

Font stack: `Inter, ui-sans-serif, system-ui, -apple-system, sans-serif`

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 2.5rem | 800 | 1.1 | Hero headlines |
| `h1` | 2rem | 700 | 1.2 | Page titles |
| `h2` | 1.5rem | 700 | 1.3 | Section headers |
| `h3` | 1.25rem | 600 | 1.4 | Card titles |
| `body` | 1rem | 400 | 1.6 | Body text |
| `body-sm` | 0.875rem | 400 | 1.5 | Small body |
| `caption` | 0.75rem | 500 | 1.4 | Captions, labels |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `section` | 3rem (48px) | Between major page sections |
| `card-gap` | 1.5rem (24px) | Between cards in a grid |
| `card-pad` | 1.25rem (20px) | Internal card padding |
| `nav-height` | 4rem (64px) | Fixed navigation height |

### Border Radius and Shadows

- `card`: 0.75rem (12px) — cards and containers
- `badge`: 9999px (full round) — badges and pills
- `button`: 0.5rem (8px) — buttons

Shadows:
- `card`: Subtle elevation for card resting state
- `card-hover`: Raised elevation on hover
- `nav`: Subtle drop shadow for navigation bar

### Responsive Breakpoints (Mobile-First)

- Default: mobile (< 640px) — 1 column
- `sm` (640px): Large phones — 1–2 columns
- `md` (768px): Tablets — 2–3 columns
- `lg` (1024px): Laptops — 3–4 columns
- `xl` (1280px): Desktops

### Icons

Lucide React icons are used throughout. Key mappings:

| Context | Icon |
|---------|------|
| Article | `FileText` |
| Video | `Play` / `Video` |
| Podcast | `Headphones` |
| Radio | `Radio` |
| Social | `Share2` |
| Official Update | `Building2` |
| Good News | `Heart` / `Smile` |
| Search | `Search` |
| Region | `MapPin` |
| Date | `Calendar` |
| External Link | `ExternalLink` |
| Error | `AlertTriangle` |
| Empty | `Inbox` |

---

## Anonymous Preferences System

### Storage Mechanism

User preferences are stored in `localStorage` under the key `smiling-coast-hub-preferences`. No server-side storage, no cookies, no personally identifiable information.

### Versioned Schema

```typescript
interface StoredPreferences {
  version: number;  // Schema version for future migrations
  data: UserPreferences;
}
```

### Preference Fields

```typescript
interface UserPreferences {
  preferredRegions: Region[];        // Highlighted in content views
  preferredCategories: Category[];   // Prioritised in feeds
  hiddenCategories: Category[];      // Excluded from personalised views
  recentlyViewed: string[];          // Content item IDs
  savedStories: string[];            // Bookmarked item IDs
  readingDuration: Record<string, number>; // Item ID → seconds spent
  trackingEnabled: boolean;          // User can opt out entirely
}
```

### Graceful Degradation

- If `localStorage` is unavailable (private browsing, full storage), the app continues with default (non-personalised) behaviour.
- The `isStorageAvailable()` function tests access before any read/write.
- All preference operations are wrapped in try/catch to prevent crashes.

### User Controls

- Toggle preferred regions and categories
- Hide/unhide categories
- Reset all preferences to defaults
- Disable tracking entirely

---

## Search and Filtering

### Client-Side Implementation

All search and filtering happens in the browser. The search page loads content items and applies filters locally.

### Text Search

Case-insensitive matching against `title` and `summary` fields:

```typescript
function searchContent(items: ContentItem[], query: string): ContentItem[] {
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.summary.toLowerCase().includes(lowerQuery)
  );
}
```

### Multi-Criteria Filtering (AND Logic)

All active filters are applied simultaneously. An item must satisfy ALL criteria to appear in results:

- **Region**: `item.region === selectedRegion`
- **Category**: `item.categories.includes(selectedCategory)`
- **Content Type**: `item.contentType === selectedType`
- **Source**: `item.sourceId === selectedSource`
- **Date From**: `item.publishedAt >= dateFrom`
- **Date To**: `item.publishedAt <= dateTo`
- **Text Query**: title or summary contains search term

### URL-Based State

Search query and filters are reflected in URL query parameters for shareability and browser back/forward support.

---

## Performance Strategy

### Static Pre-Rendering

All pages are generated at build time as static HTML. No server-side rendering latency.

### Lazy Loading

- Images below the fold use `loading="lazy"` attribute
- Third-party embeds (YouTube, podcast players) render as `EmbedPlaceholder` components — no iframe loaded until user clicks play

### Code Splitting

- Next.js automatically code-splits per route
- Heavy or optional components use `next/dynamic` for dynamic imports

### Bundle Optimisation

- Tree shaking eliminates unused code
- Tailwind CSS purges unused styles in production
- No heavy animation libraries — CSS transitions only

### Image Optimisation

- `next.config.ts` has `images: { unoptimized: true }` for static export compatibility
- Images use appropriate `width`/`height` attributes to prevent layout shifts

---

## Testing Approach

### Framework Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit and integration tests (fast, ESM-native) |
| **React Testing Library** | Component rendering and interaction testing |
| **fast-check** | Property-based testing |
| **Playwright** | End-to-end browser tests |

### Test Categories

**Unit Tests** (Vitest + RTL):
- Data fetching utilities (success, error, 404, malformed JSON)
- Search and filter logic with realistic data
- Date formatting and navigation arithmetic
- Summary truncation edge cases
- Preference get/set/reset/availability
- Component rendering (ContentCard, EmbedPlaceholder, EmptyState, ErrorState)

**Property-Based Tests** (fast-check):
- Content filtering correctness (no false positives or negatives)
- Date sorting preserves order
- Search + filter composition (AND logic)
- ContentCard rendering completeness
- Summary truncation bounds (≤280 chars)
- Embed placeholder for media items
- Preference storage round-trip
- Preference-based content exclusion
- Date formatting consistency
- Date navigation arithmetic
- Data fetch error resilience

**End-to-End Tests** (Playwright):
- Homepage renders all 10 sections
- Navigation between pages
- Search workflow (query, filter, results)
- Preference persistence across page loads
- 404 page for invalid routes
- Keyboard navigation and focus management

### Test Fixtures

All test fixtures use realistic Gambian content — real source names (The Standard, The Point, Foroyaa, GRTS), plausible headlines, accurate region assignments. No Lorem Ipsum.

### Running Tests

```bash
npm run test        # Vitest unit + property tests
npm run test:e2e    # Playwright end-to-end tests
npm run lint        # ESLint
npm run format:check # Prettier formatting check
```

---

## Deployment Options

### Current: Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js and deploys the static export

### Future (Phase 3): AWS S3 + CloudFront

- Static export (`out/` directory) uploaded to S3 bucket
- CloudFront CDN for global distribution
- Infrastructure managed via Terraform (Phase 3)
- Custom domain with ACM SSL certificate

---

## Error Handling Strategy

### Graceful Degradation

Failures are isolated to individual sections. One broken data source does not prevent the rest of the page from rendering.

### Error Boundary Pattern

Each content section uses the `useContentData` hook which manages loading/error states internally:

```typescript
const { data, loading, error, retry } = useContentData(fetchLatest);

if (loading) return <LoadingSkeleton variant="card" count={4} />;
if (error) return <ErrorState message={error} onRetry={retry} />;
if (data.length === 0) return <EmptyState title="No content available" />;
```

### Console Logging

All errors are logged with a `[SmCoastHub]` prefix for easy filtering in browser dev tools:
- `[SmCoastHub] Data fetch error: {message}`
- `[SmCoastHub] Parse error: {message}`
- `[SmCoastHub] Preference error: {message}`
