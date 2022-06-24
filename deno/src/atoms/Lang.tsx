import React from 'react';
import { RawHtml } from './RawHtml.tsx';

export type Language = 'en' | 'es';

const arrayMap: Record<Language, number> = { en: 0, es: 1 };

const LangContext = React.createContext<Language>('en');

export const LangProvider = LangContext.Provider;

export type Translatable = Record<Language, string> | string;

export type LangProps = { tr: Translatable | string[] } | { en: string; es: string };

export function Lang(props: LangProps) {
  const tr = 'tr' in props ? props.tr : props;
  const lang = React.useContext(LangContext);

  if (typeof tr === 'string') {
    return <RawHtml html={tr} />;
  }

  if (Array.isArray(tr)) {
    return <RawHtml html={tr[arrayMap[lang]]} />;
  }

  return <RawHtml html={tr[lang] || tr.en || 'INVALID TR'} />;
}

export function tr(...args: [Translatable] | string[]) {
  const content = args.length === 1 ? (args[0] as Translatable) : (args as string[]);
  return <Lang tr={content} />;
}
