import { ContentType } from './content';

export interface SourceInfo {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  contentTypes: ContentType[];
  isOfficialSource: boolean;
  logoUrl: string | null;
}
