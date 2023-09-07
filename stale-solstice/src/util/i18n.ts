let lang: Language = 'en';
const arrayMap: Record<Language, number> = { en: 0, es: 1 };

export type Language = ReturnType<typeof getLangFromUrl>;

export function getLang() {
  return lang;
}

export function setLang(url: URL) {
  lang = getLangFromUrl(url);
}

export function t(value: null | undefined): null;
export function t(value: string[]): string;
export function t<T = string>(value: Record<Language, T>): T;
export function t<T>(value: Record<Language, () => T>): T;

export function t<T>(
  value:
    | null
    | undefined
    | string[]
    | Record<Language, string>
    | Record<Language, () => T>
) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[arrayMap[lang]] || value[0] || 'MISSING TRANSLATION';
  }

  const key = value[lang] || value.en;

  if (typeof key === 'function') {
    return key();
  }

  return key || 'MISSING TRANSLATION';
}

export function getLangFromUrl(url: URL) {
  return url.pathname.startsWith('/es') ? 'es' : 'en'
}
