import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesmilingcoasthub.gm';

  const staticPages = [
    '', '/latest', '/regions', '/topics', '/watch', '/listen',
    '/good-news', '/diaspora', '/archive', '/sources', '/search',
    '/about', '/editorial-policy', '/corrections', '/privacy', '/contact',
    '/preferences',
  ];

  const regions = ['banjul', 'kanifing', 'west-coast', 'north-bank', 'lower-river', 'central-river', 'upper-river'];
  const topics = ['politics', 'business', 'technology', 'sports', 'diaspora'];
  const sources = ['the-standard', 'the-point', 'foroyaa', 'grts', 'freedom-radio', 'eye-africa-tv', 'kerr-fatou', 'the-fatu-network'];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: page === '' ? 1 : 0.8,
    })),
    ...regions.map((slug) => ({
      url: `${baseUrl}/regions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...topics.map((slug) => ({
      url: `${baseUrl}/topics/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...sources.map((id) => ({
      url: `${baseUrl}/sources/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];
}
