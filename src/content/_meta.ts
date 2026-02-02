import type { Language, Translatable } from '../i18n';

export interface ImageDeclaration {
  src?: Translatable;
  en?: string;
  es?: string;
  center?: string;
}

export type TranslatableString = string | string[] | Record<Language, string>;
