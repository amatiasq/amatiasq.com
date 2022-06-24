import { relative } from 'std/path/mod.ts';
import React, { PropsWithChildren } from 'react';
import { getPageMetadata, getPagePath, getPagesFromDisk, SitePage } from './pages.ts';
import { Lang, tr, Translatable } from '../atoms/Lang.tsx';

const urlToSitePage = (url: string) => url.replace('file://', '') as SitePage;

export function createPageUtils(page: string) {
  const path = getPagePath(urlToSitePage(page));

  function Link({ href, children }: { href: string; children: Translatable }) {
    const target = getPagePath(urlToSitePage(href));
    return <a href={relative(path, target)}>{tr(children)}</a>;
  }

  return { Link };
}

export async function getAllPages() {
  const pages = await getPagesFromDisk();
  const promises = pages.map(getPageMetadata);
  return Promise.all(promises);
}
