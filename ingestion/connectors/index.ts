import type { Connector, SourceConfig } from '../types';
import { rssConnector } from './rss';
import { youtubeConnector } from './youtube';
import { podcastConnector } from './podcast';
import { manualConnector } from './manual';

export function getConnector(type: SourceConfig['connectorType']): Connector {
  switch (type) {
    case 'rss':
      return rssConnector;
    case 'youtube':
      return youtubeConnector;
    case 'podcast':
      return podcastConnector;
    case 'manual':
      return manualConnector;
    default:
      throw new Error(`Unknown connector type: ${type}`);
  }
}
