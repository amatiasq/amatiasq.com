
const arrayMap: Record<Language, number> = { en: 0, es: 1 };

export type Language = ReturnType<typeof getLangFromUrl>;

export function i18n(url: URL) {
  const lang = getLangFromUrl(url);

  return Object.assign(t, { lang });

  function t(value: null | undefined): null;
  function t(value: string[]): string;
  function t<T = string>(value: Record<Language, T>): T;
  function t<T>(value: Record<Language, () => T>): T;
  function t<T>(value: Record<Language, () => Promise<T>>): Promise<T>;

  function t<T>(
    value: null | undefined | string[] | Record<Language, string> | Record<Language, () => T> | Record<Language, () => Promise<T>>
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
}

function getLangFromUrl(url: URL) {
  return url.pathname.startsWith('/es') ? 'es' : 'en'
}
