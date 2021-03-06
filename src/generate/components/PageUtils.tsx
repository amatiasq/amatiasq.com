import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  ReactPortal,
  useContext,
} from 'react';
import { relative } from 'std/path/mod.ts';
import { getPagePath } from '../util/getPagePath.ts';
import { SitePage } from '../types/SitePage.ts';
import { Lang, Language, Translatable } from './Lang.tsx';
import { cleanPath } from '../util/cleanPath.ts';

// deno-lint-ignore no-explicit-any
const Context = createContext<PageUtils>(null as any);
const urlToSitePage = (url: string) => url.replace('file://', '') as SitePage;

export function usePageUtils() {
  return useContext(Context);
}

export type PageUtils = ReturnType<typeof createPageUtils>;

export interface UtilsProviderProps extends PropsWithChildren<{}> {
  page: string;
  root: string;
  lang: Language;
}

export function UtilsProvider({
  page,
  root,
  lang,
  children,
}: UtilsProviderProps) {
  const utils = createPageUtils(page, root, lang);
  return <Context.Provider value={utils}>{children}</Context.Provider>;
}

function createPageUtils(page: string, root: string, lang: Language) {
  const pagePath = getPagePath(urlToSitePage(page));
  const basePath = `${root.startsWith('/') ? '' : '/'}${root}`;
  const path = cleanPath(`${basePath}/${pagePath}`);

  return {
    Link: createPageLinkComponent(path, root),
    getUrl: (page: SitePage) => getPagePath(urlToSitePage(page!)),
    basePath,
    path: pagePath,
    lang,
  };
}

function createPageLinkComponent(path: string, root: string) {
  return function Link({
    className,
    href,
    page,
    isParent,
    children,
  }: {
    className?: string;
    href?: string;
    page?: string;
    isParent?: boolean;
    children: Translatable | ReactElement | string | ReactPortal;
  }) {
    const target = href
      ? cleanPath(href)
      : getPagePath(urlToSitePage(page!), root);

    const isActive = target === path;
    const isContained = isParent && !isActive && path.startsWith(target);
    const classes = [
      className,
      isActive ? 'active' : null,
      isContained ? 'parent' : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a href={relative(path, target) || '.'} className={classes}>
        <Lang tr={children} />
      </a>
    );
  };
}
