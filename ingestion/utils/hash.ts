import { createHash } from 'crypto';

export function generateId(url: string): string {
  const normalised = normaliseUrl(url);
  return createHash('sha256').update(normalised).digest('hex').slice(0, 16);
}

export function normaliseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.search = '';
    let path = parsed.pathname;
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }
    parsed.pathname = path;
    return parsed.toString().toLowerCase();
  } catch {
    return url.toLowerCase().replace(/\/$/, '');
  }
}
