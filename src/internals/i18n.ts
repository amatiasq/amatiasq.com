import { languages, type Language, type Translatable, MISSING_TRANSLATION } from '../i18n';

// Global language state - set by the page component
let currentLang: Language = 'en';

export function setLanguage(lang: Language) {
  currentLang = lang;
}

export function getLanguage(): Language {
  return currentLang;
}

export function t(value: null | undefined): null;
export function t(value: string): string;
export function t(value: string[]): string;
export function t(value: Translatable): string;
export function t<T = string>(value: Record<Language, T>): T;
export function t(
  value:
    | null
    | undefined
    | string
    | string[]
    | Record<Language, string>
): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[languages.indexOf(currentLang)] || value[0] || MISSING_TRANSLATION;
  }

  return value[currentLang] || value.en || MISSING_TRANSLATION;
}
