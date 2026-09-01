import { join } from 'path';
import { readFileSync } from 'fs';
import { loadConfig } from './config';
import { getConnector } from './connectors/index';
import { normalise } from './pipeline/normalise';
import { createDeduplicator } from './pipeline/deduplicate';
import { tag } from './pipeline/tagger';
import { writeAll } from './pipeline/writer';
import { logger } from './utils/logger';
import type { ContentItem, DataFile } from './types';

const EXISTING_DATA_PATH = join(process.cwd(), 'public', 'data', 'latest.json');

async function main(): Promise<void> {
  logger.info('Ingestion pipeline starting');

  // Load configuration
  const config = loadConfig();
  const enabledSources = config.sources.filter((s) => s.enabled !== false);

  if (enabledSources.length === 0) {
    logger.warn('No enabled sources found');
    process.exit(0);
  }

  // Create deduplicator from existing data
  const deduplicate = createDeduplicator(EXISTING_DATA_PATH);

  // Track results
  let totalNewItems = 0;
  let sourcesOk = 0;
  let sourcesFailed = 0;
  const allNewItems: ContentItem[] = [];

  // Process each source sequentially
  for (const source of enabledSources) {
    try {
      logger.info('Processing source', { sourceId: source.id, connector: source.connectorType });

      // Get connector and fetch
      const connector = getConnector(source.connectorType);
      const rawEntries = await connector.fetch(source);

      if (rawEntries.length === 0) {
        logger.warn('No entries fetched from source', { sourceId: source.id });
      }

      // Normalise
      const items = normalise(rawEntries, source);

      // Deduplicate
      const newItems = deduplicate(items);

      // Tag
      const taggedItems = tag(newItems, config.tagging);

      allNewItems.push(...taggedItems);
      totalNewItems += taggedItems.length;
      sourcesOk++;

      logger.info('Source processed', {
        sourceId: source.id,
        fetched: rawEntries.length,
        new: taggedItems.length,
      });
    } catch (error) {
      sourcesFailed++;
      const message = error instanceof Error ? error.message : String(error);
      logger.error('Source failed', { sourceId: source.id, error: message });
    }
  }

  // Load existing items and merge with new
  const existingItems = loadExistingItems();
  const mergedItems = [...allNewItems, ...existingItems];

  // Write all output files
  writeAll(mergedItems);

  // Summary
  const totalSources = enabledSources.length;
  logger.info('Ingestion complete', {
    totalNewItems,
    sourcesOk,
    sourcesFailed,
    totalSources,
  });

  console.log(
    `\nSummary: ${totalNewItems} items ingested, ${sourcesOk} sources OK, ${sourcesFailed} sources failed`
  );

  // Exit code 1 if >50% of sources failed
  if (sourcesFailed > totalSources / 2) {
    logger.error('More than 50% of sources failed', { sourcesFailed, totalSources });
    process.exit(1);
  }
}

function loadExistingItems(): ContentItem[] {
  try {
    const raw = readFileSync(EXISTING_DATA_PATH, 'utf-8');
    const data: DataFile = JSON.parse(raw);
    return data.items ?? [];
  } catch {
    return [];
  }
}

main().catch((error) => {
  logger.error('Pipeline crashed', { error: String(error) });
  process.exit(1);
});
