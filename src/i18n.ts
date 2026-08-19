const uniq = <T>(x: T[]) => Array.from(new Set(x));

export const MISSING_TRANSLATION = 'MISSING TRANSLATION';
export const languages = ['en', 'es'] as const;
export type Language = (typeof languages)[number];
export type Translatable = string | string[] | Record<Language, string>;

const defaultLang = 'en';

/** Array form is positional and follows `languages`: `[en, es]`. */
export function translate(value: Translatable, lang: Language): string {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[languages.indexOf(lang)] || value[0] || MISSING_TRANSLATION;
  }

  return value[lang] || value.en || MISSING_TRANSLATION;
}

/** The loader splits every markdown body by `---` into one block per language. */
export function localizeBody(
  body: string | string[] | undefined,
  lang: Language
): string {
  const blocks = Array.isArray(body) ? body : [body];
  return blocks[languages.indexOf(lang)] || blocks[0] || '';
}

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
  function tr(value: Translatable): string;
  function tr(value: Translatable | null | undefined): string | null;
  function tr<T = string>(value: Record<Language, T>): T;
  function tr<T>(value: Record<Language, () => T>): T;
  function tr<T>(
    value: null | undefined | Translatable | Record<Language, () => T>
  ) {
    if (!value) {
      return null;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      return translate(value, lang);
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
