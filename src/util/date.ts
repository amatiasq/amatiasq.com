import type { Language } from '../i18n';

type FourDigits = `${number}${number}${number}${number}`;
type TwoDigits = `${number}${number}`;
type YearOnly = `${FourDigits}`;
type YearMonth = `${FourDigits}-${TwoDigits}`;
type YearMonthDay = `${FourDigits}-${TwoDigits}-${TwoDigits}`;

export type StringifiedDate = YearOnly | YearMonth | YearMonthDay;

const dateRegex = /^(\d{4})-(?:(\d{2})-)?(?:(\d{2})-)?/;

export function getYear(entry: any) {
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
  locale: Language,
  value: StringifiedDate | Date,
  { omitDay, yearOnly }: { omitDay: boolean; yearOnly: boolean },
) {
  const [year, month, day] = decomposeDate(value);

  if (yearOnly || !month) {
    return `${year}`;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  let formatter: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
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
