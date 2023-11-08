import type { StringifiedDate } from '../../internals/date';
import type { Translatable } from '../../internals/i18n';

export interface BlogPostMetadata {
  published?: StringifiedDate;
  title: Translatable;
  tags?: Translatable[];
  draft?: true;
}
