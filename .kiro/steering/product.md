# Product Context

## Project Name
The Smiling Coast Hub

## Tagline
The Gambia in One Place

## Description
A publicly accessible Gambian news and media aggregation platform that brings together newspaper headlines, television reports, YouTube videos, public social media content, radio programmes, podcasts, government announcements, regional reporting, diaspora stories, sports, politics, business, technology, and good-news/community-impact stories.

## Target Users
- Gambian citizens seeking consolidated news from multiple sources
- Members of the Gambian diaspora wanting to stay connected
- Researchers, journalists, and policy-makers monitoring Gambian media
- Mobile-first readers on slower connections

## Core Value Proposition
One platform that aggregates all Gambian media — no registration required, no paywalls, mobile-friendly, and accessible on low-bandwidth connections.

## Access Policy
- The complete public platform must be accessible without registration or login
- No compulsory authentication, paywalls, or registration pop-ups
- Optional user accounts may be introduced in a later phase but are outside the MVP

## Content Types Aggregated
- Newspaper headlines
- Television reports
- YouTube videos
- Public Facebook, Instagram, and TikTok links or approved embeds
- Radio programmes
- Podcasts
- Government announcements
- Regional reporting
- Diaspora stories
- Sports, Politics, Business, Technology
- Good-news and community-impact stories

## Regions Covered
- Banjul
- Kanifing
- West Coast
- North Bank
- Lower River
- Central River
- Upper River

## Copyright and Attribution
- Never copy complete third-party articles
- Store and display only: headline, permitted feed excerpt or short summary, source name, publication date, thumbnail (when usage is permitted), original source link
- Always include a "Read original story" call-to-action
- Clearly distinguish: independent reporting, official announcement, opinion, sponsored content, community submission, developing story

## Success Metrics
- Page load time under 3 seconds on 3G connections
- Core Web Vitals passing scores
- Content freshness (automated collection intervals)
- Source reliability (uptime of connectors)
- User engagement via anonymous localStorage preferences

## Implementation Phases
- Phase 1: Local public MVP (static Next.js app with fixture data)
- Phase 2: Automated ingestion (source registry, connectors, normalisation)
- Phase 3: AWS deployment (Terraform, S3, CloudFront, Lambda, EventBridge)
- Phase 4: Future enhancements (documented but not implemented)
