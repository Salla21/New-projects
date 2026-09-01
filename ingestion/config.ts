import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import type { IngestConfig, SourceConfig, TaggingConfig } from './types';
import { logger } from './utils/logger';

const CONFIG_PATH = join(process.cwd(), 'config', 'sources.yaml');

/**
 * Loads and validates the ingestion configuration from sources.yaml.
 */
export function loadConfig(configPath: string = CONFIG_PATH): IngestConfig {
  const raw = readFileSync(configPath, 'utf-8');
  const parsed = parse(raw);

  const validSources: SourceConfig[] = [];

  if (!parsed.sources || !Array.isArray(parsed.sources)) {
    throw new Error('Config must contain a "sources" array');
  }

  for (const entry of parsed.sources) {
    if (!isValidSource(entry)) {
      logger.warn('Skipping invalid source entry — missing required fields', {
        entry: JSON.stringify(entry),
      });
      continue;
    }
    validSources.push(entry as SourceConfig);
  }

  const tagging: TaggingConfig = {
    regionKeywords: parsed.tagging?.regionKeywords ?? {},
    categoryKeywords: parsed.tagging?.categoryKeywords ?? {},
    goodNewsKeywords: parsed.tagging?.goodNewsKeywords ?? [],
  };

  logger.info('Config loaded', {
    totalSources: validSources.length,
    enabledSources: validSources.filter((s) => s.enabled !== false).length,
  });

  return { sources: validSources, tagging };
}

function isValidSource(entry: unknown): boolean {
  if (!entry || typeof entry !== 'object') return false;
  const obj = entry as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    obj.id.length > 0 &&
    typeof obj.name === 'string' &&
    obj.name.length > 0 &&
    typeof obj.connectorType === 'string' &&
    ['rss', 'youtube', 'podcast', 'manual'].includes(obj.connectorType)
  );
}
