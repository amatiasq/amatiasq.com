import React from 'react';

export type Language = 'en' | 'es';
export type TranslatableString = string | Record<Language, string>;

export type TranslateProps = { lang: Language } & (Record<Language, string> | { value: TranslatableString });

export default function Translate(props: TranslateProps) {
  const { lang } = props;
  const value = 'value' in props ? props.value : props;
  const text = typeof value === 'object' ? value[lang] : value;
  return <>{text || 'SOMETHING WENT WRONG HERE'}</>;
}
