import React from 'react';

export type StringDate = `${number}-${number}` | `${number}-${number}-${number}`;

export interface DateProps {
  value: StringDate;
  yearOnly?: boolean;
}

export function DateTime({ value, yearOnly }: DateProps) {
  return <time dateTime={value}>{format(value)}</time>;
}

const monthFormat = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
});

const dayFormat = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
});

function format(value: StringDate) {
  const [year, month, day] = value.split('-');

  const date = new Date(
    // multiline
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10) || 1,
  );

  const formatter = day ? dayFormat : monthFormat;
  return formatter.format(date);
}
