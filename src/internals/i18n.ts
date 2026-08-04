import { translate, type Language, type Translatable } from '../i18n';

// Global language state - set by the page component
let currentLang: Language = 'en';

export function setLanguage(lang: Language) {
  currentLang = lang;
}

export function getLanguage(): Language {
  return currentLang;
}

export function t(value: null | undefined): null;
export function t(value: Translatable): string;
export function t<T = string>(value: Record<Language, T>): T;
export function t(value: null | undefined | Translatable): string | null {
  return value ? translate(value, currentLang) : null;
}
