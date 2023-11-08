import type { StringifiedDate } from '../../internals/date';
import type { Translatable } from '../../internals/i18n';

export interface CareerMetadata {
  from: StringifiedDate;
  to: StringifiedDate;
  org: Translatable;
  link: string;
  role: Translatable;
  labels: Translatable[];
  bullets: Translatable[];
  hide?: true;
}
