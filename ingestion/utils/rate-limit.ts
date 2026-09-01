const lastRequestTime: Map<string, number> = new Map();
const MIN_DELAY_MS = 2000;
const blockedDomains: Set<string> = new Set();

export async function rateLimitedFetch(url: string, options?: RequestInit): Promise<Response> {
  const domain = new URL(url).hostname;

  if (blockedDomains.has(domain)) {
    throw new Error(`Domain ${domain} is rate-limited (HTTP 429). Skipping.`);
  }

  const lastTime = lastRequestTime.get(domain) || 0;
  const elapsed = Date.now() - lastTime;
  if (elapsed < MIN_DELAY_MS) {
    await new Promise(resolve => setTimeout(resolve, MIN_DELAY_MS - elapsed));
  }

  lastRequestTime.set(domain, Date.now());

  const response = await fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'TheSmilingCoastHub/1.0 (+https://thesmilingcoasthub.com)',
      ...options?.headers,
    },
  });

  if (response.status === 429) {
    blockedDomains.add(domain);
    throw new Error(`HTTP 429 from ${domain}. Domain blocked for this run.`);
  }

  return response;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error = new Error('Unknown error');
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, baseDelayMs * Math.pow(2, attempt)));
      }
    }
  }
  throw lastError;
}
