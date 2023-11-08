import type { Content } from './content';
import { setLang } from './i18n';

type FourDigits = `${number}${number}${number}${number}`;
type TwoDigits = `${number}${number}`;
type YearOnly = `${FourDigits}`;
type YearMonth = `${FourDigits}-${TwoDigits}`;
type YearMonthDay = `${FourDigits}-${TwoDigits}-${TwoDigits}`;

export type StringifiedDate = YearOnly | YearMonth | YearMonthDay;

const dateRegex = /^(\d{4})-(?:(\d{2})-)?(?:(\d{2})-)?/;

export function getLocale(url: URL) {
  const lang = setLang(url);
  const locales = {
    en: 'en-US',
    es: 'es-ES',
  };
  return locales[lang] || 'default';
}

export function getYear(entry: Content) {
  const match = entry.date.match(dateRegex);
  return match && match[1] ? parseInt(match[1], 10) : null;
}

export function getSlugWithoutDate(slug: string) {
  return slug.replace(dateRegex, '');
}

export function parseDate(slug: string): StringifiedDate | null {
  const match = slug.match(dateRegex);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;

  if (!month) {
    return year as YearOnly;
  }

  if (!day) {
    return `${year}-${month}` as YearMonth;
  }

  return `${year}-${month}-${day}` as YearMonthDay;
}

export function printDate(
  locale: ReturnType<typeof getLocale>,
  value: StringifiedDate | Date,
  { omitDay }: { omitDay: boolean },
) {
  const [year, month, day] = decomposeDate(value);

  if (!month) {
    return `${year}`;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  let formatter: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (!day || omitDay) {
    formatter = {
      year: 'numeric',
      month: 'short',
    };
  }

  return new Intl.DateTimeFormat(locale, formatter)
    .format(date)
    .replace(/^[a-z]/g, (x) => x.toUpperCase())
    .replace(/Sept/, 'Sep');
}

function decomposeDate(value: StringifiedDate | Date) {
  return typeof value === 'string'
    ? (value.split('-').map((x) => parseInt(x, 10)) as [
        number,
        number?,
        number?,
      ])
    : [value.getFullYear(), value.getMonth() + 1, value.getDate()];
}
