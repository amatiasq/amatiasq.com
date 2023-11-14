import { basePath } from './package';

export const languages = ['en', 'es'] as const;
type Language = (typeof languages)[number];

const urlLangExtractor = new RegExp(`^\/(${languages.join('|')})`);
const arrayMap: Record<Language, number> = { en: 0, es: 1 };

let savedLanguage: Language = 'en';

export function setLang(url: URL) {
  savedLanguage = getLangFromUrl(url);
  return savedLanguage;
}

export const MISSING_TRANSLATION = 'MISSING TRANSLATION';

export type Translatable = Record<Language, string> | string[];

export function t(value: null | undefined, lang?: Language): null;
export function t(value: string[], lang?: Language): string;
export function t(value: Translatable, lang?: Language): string;
export function t<T = string>(value: Record<Language, T>, lang?: Language): T;
export function t<T>(value: Record<Language, () => T>, lang?: Language): T;

export function t<T>(
  value:
    | null
    | undefined
    | string[]
    | Record<Language, string>
    | Record<Language, () => T>,
  lang: Language = savedLanguage,
) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[arrayMap[lang]] || value[0] || MISSING_TRANSLATION;
  }

  const key = value[lang] || value.en;

  if (typeof key === 'function') {
    return key();
  }

  return key || MISSING_TRANSLATION;
}

export function getLangFromUrl(url: URL): Language {
  return url.pathname.replace(basePath, '').startsWith('/es') ? 'es' : 'en';
}

export function getPathWithoutLang(url: URL) {
  return url.pathname.replace(urlLangExtractor, '');
}
