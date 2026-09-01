import { ContentItem, Region, Category } from '@/types';
import { SourceInfo } from '@/types';

const DATA_BASE_PATH = '/data';

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${DATA_BASE_PATH}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  if (!text || text.trim().length === 0) {
    throw new Error(`Empty response from ${path}`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON from ${path}`);
  }
}

interface ContentListResponse {
  items: ContentItem[];
  meta: { generatedAt: string; count: number };
}

interface SourceResponse {
  source: SourceInfo;
  items: ContentItem[];
}

export async function fetchLatest(): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>('/latest.json');
  return data.items;
}

export async function fetchTrending(): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>('/trending.json');
  return data.items;
}

export async function fetchGoodNews(): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>('/good-news.json');
  return data.items;
}

export async function fetchByRegion(slug: Region): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>(`/regions/${slug}.json`);
  return data.items;
}

export async function fetchByCategory(slug: Category): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>(`/categories/${slug}.json`);
  return data.items;
}

export async function fetchByDate(date: string): Promise<ContentItem[]> {
  const data = await fetchJson<ContentListResponse>(`/dates/${date}.json`);
  return data.items;
}

export async function fetchBySource(sourceId: string): Promise<SourceResponse> {
  return fetchJson<SourceResponse>(`/sources/${sourceId}.json`);
}

export async function fetchSources(): Promise<SourceInfo[]> {
  const data = await fetchJson<{ sources: SourceInfo[] }>('/sources/index.json');
  return data.sources;
}
