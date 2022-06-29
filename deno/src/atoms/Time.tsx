import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssColor, cssFontSize } from '../theme.ts';

type FourDigits = `${number}` & { length: 4 };
type TwoDigits = `${number}` & { length: 2 };

export type YearMonthDay = `${FourDigits}` | `${FourDigits}-${TwoDigits}` | `${FourDigits}-${TwoDigits}-${TwoDigits}`;

export interface TimeProps {
  value: YearMonthDay;
  omitDay?: boolean;
}

export function Time({ value, omitDay = false }: TimeProps) {
  if (!value) return null;

  const dateStyles = css`
    opacity: 0.8;
    font-family: monospace;
    font-size: ${cssFontSize.xs};
    color: ${cssColor.foreground};
  `;
  // font-size: ${cssFontSize.sm};

  return (
    <time className={dateStyles} dateTime={value}>
      {printDate(value, { omitDay })}
    </time>
  );
}

function printDate(value: YearMonthDay, { omitDay }: { omitDay: boolean }) {
  const [year, month, day] = value.split('-').map(x => parseInt(x, 10));

  if (!month) {
    return year;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  if (!day || omitDay) {
    return new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short' }).format(date);
  }

  return new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}
