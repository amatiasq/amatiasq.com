import React from 'react';
import { RawHtml } from './RawHtml.tsx';

export type Language = 'en' | 'es';

const arrayMap: Record<Language, number> = {
  en: 0,
  es: 1,
};

const LangContext = React.createContext<Language>('en');

export const LangProvider = LangContext.Provider;

export type Translatable = Record<Language, string> | string[] | string;

export interface LangProps {
  tr: Translatable;
}

export function Lang({ tr }: LangProps) {
  const lang = React.useContext(LangContext);

  if (typeof tr === 'string') {
    return <RawHtml html={tr} />;
  }

  if (Array.isArray(tr)) {
    return <RawHtml html={tr[arrayMap[lang]]} />;
  }

  return <RawHtml html={tr[lang] || tr.en || 'INVALID TR'} />;
}
