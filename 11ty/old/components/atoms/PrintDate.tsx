import React from 'react';

import Translate, { Language } from './Translate';

const months = [
  { en: 'Jan', es: 'Ene' },
  'Feb',
  'Mar',
  { en: 'Apr', es: 'Abr' },
  'May',
  'Jun',
  'Jul',
  { en: 'Aug', es: 'Ago' },
  'Sep',
  'Oct',
  'Nov',
  { en: 'Dec', es: 'Dic' },
];

export interface PrintDateProps {
  lang: Language;
  date: Date;
}

export default function PrintDate({ lang, date }: PrintDateProps) {
  const datetime = date.toISOString().split('T')[0];
  const month = months[date.getMonth()];
  const day = date.getDate();

  return (
    <time dateTime={datetime}>
      <Translate lang={lang} value={month} /> {day}
    </time>
  );
}
