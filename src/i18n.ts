const uniq = <T>(x: T[]) => Array.from(new Set(x));

export const MISSING_TRANSLATION = 'MISSING TRANSLATION';
export const languages = ['en', 'es'] as const;
export type Language = (typeof languages)[number];
export type Translatable = Record<Language, string> | string[];

const defaultLang = 'en';

export function multilingualPage() {
  return languages.map((x) => ({
    params: { lang: x },
    props: { lang: x },
  }));
}

export function useTranslations(url: URL) {
  const lang = getLangFromUrl(url);

  return { lang, tr, i18n };

  function tr(value: null | undefined): null;
  function tr(value: string[]): string;
  function tr(value: Translatable): string;
  function tr<T = string>(value: Record<Language, T>): T;
  function tr<T>(value: Record<Language, () => T>): T;
  function tr<T>(
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
      return value[languages.indexOf(lang)] || value[0] || MISSING_TRANSLATION;
    }

    const key = value[lang] || value.en;

    if (typeof key === 'function') {
      return key();
    }

    return key || MISSING_TRANSLATION;
  }

  function i18n(parts: TemplateStringsArray, ...params: Translatable[]) {
    const requireTr = params.filter((x) => typeof x !== 'string');

    if (!requireTr.length) {
      return String.raw(parts, ...params);
    }

    const languages = uniq(
      requireTr.flatMap((x) => Object.keys(x))
    ) as Language[];

    const values = languages.map((lang) => [
      lang,
      String.raw(parts, ...params.map(tr)),
    ]);

    return Object.fromEntries(values);
  }
}

function getLangFromUrl(url: URL) {
  const lang = url.pathname.replace(/^\//, '').split('/')[0] as Language | '';
  return lang && languages.includes(lang) ? lang : defaultLang;
}
