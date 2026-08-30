import type { Translatable } from '../i18n';

export interface ImageDeclaration {
  src?: Translatable;
  en?: string;
  es?: string;
  center?: string;
  cardOnly?: boolean;
}

