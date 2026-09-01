import Parser from 'rss-parser';
import { logger } from '../utils/logger';
import { rateLimitedFetch, withRetry } from '../utils/rate-limit';
import type { Connector, SourceConfig, RawEntry } from '../types';

const parser = new Parser();

export const youtubeConnector: Connector = {
  async fetch(source: SourceConfig): Promise<RawEntry[]> {
    const channelId = source.channelId;
    if (!channelId) {
      logger.error('YouTube source missing channelId', { sourceId: source.id });
      return [];
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    try {
      if (apiKey) {
        return await fetchViaApi(source.id, channelId, apiKey);
      } else {
        return await fetchViaRss(source.id, channelId);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`YouTube connector failed for ${source.id}: ${message}`, { sourceId: source.id });
      return [];
    }
  },
};

async function fetchViaApi(sourceId: string, channelId: string, apiKey: string): Promise<RawEntry[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`;

  const response = await withRetry(() => rateLimitedFetch(url));
  if (!response.ok) {
    throw new Error(`YouTube API HTTP ${response.status}`);
  }

  const data = await response.json() as {
    items?: Array<{
      id: { videoId: string };
      snippet: {
        title: string;
        publishedAt: string;
        description: string;
        thumbnails: { medium?: { url: string } };
      };
    }>;
  };

  const entries: RawEntry[] = (data.items || []).map((item) => ({
    title: item.snippet.title,
    link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description?.slice(0, 300),
    thumbnailUrl: item.snippet.thumbnails?.medium?.url,
    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));

  logger.info(`YouTube API fetched ${entries.length} videos`, { sourceId });
  return entries;
}

async function fetchViaRss(sourceId: string, channelId: string): Promise<RawEntry[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const response = await withRetry(() => rateLimitedFetch(feedUrl));
  if (!response.ok) {
    throw new Error(`YouTube RSS HTTP ${response.status}`);
  }

  const xml = await response.text();
  const result = await parser.parseString(xml);

  const entries: RawEntry[] = (result.items || []).map((item) => {
    const videoId = item.id?.replace('yt:video:', '') || '';
    return {
      title: item.title?.trim() || 'Untitled',
      link: item.link || `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: item.pubDate || item.isoDate || undefined,
      description: item.contentSnippet || item.content || undefined,
      thumbnailUrl: videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : undefined,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : undefined,
    };
  });

  logger.info(`YouTube RSS fetched ${entries.length} videos`, { sourceId });
  return entries;
}
