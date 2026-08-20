import type { Language, Translatable } from '../i18n';

export interface ImageDeclaration {
  src?: Translatable;
  en?: string;
  es?: string;
  center?: string;
  cardOnly?: boolean;
}

export type TranslatableString = string | string[] | Record<Language, string>;
