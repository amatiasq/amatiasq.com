import React, { createContext, useContext } from 'react';
import { relative } from 'std/path/mod.ts';
import { getPagePath, SitePage } from '../generate/pages.ts';
import { tr, Translatable } from '../atoms/Lang.tsx';

const Context = createContext<PageUtils>(null as any);

export function usePageUtils() {
  return useContext(Context);
}

export interface PageUtilProps {
  url: SitePage;
}

export const UtilsProvider = Context.Provider;

const urlToSitePage = (url: string) => url.replace('file://', '') as SitePage;

export function createPageUtils(page: string) {
  const path = getPagePath(urlToSitePage(page));

  function Link({ href, children }: { href: string; children: Translatable }) {
    const target = getPagePath(urlToSitePage(href));
    return <a href={relative(path, target)}>{tr(children)}</a>;
  }

  return { Link };
}

export type PageUtils = ReturnType<typeof createPageUtils>;
