import { basename, extname } from 'std/path/mod.ts';
import { path } from '../util/path.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';

export type SitePage = 'snowflake SitePage';

const { fromRoot } = path('../..', import.meta.url);
const source = fromRoot('./src/pages');
const target = fromRoot('./dist');

export async function getPagesFromDisk() {
  const files = await getFilesRecursively(source);
  return files.filter(x => !x.endsWith('/_template.tsx')) as SitePage[];
}

export function getPageDestinationOnDisk(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';
  return page.replace(source, `${target}${path}`).replace(extension, newExtension);
}

export function getPagePath(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const flat = page.replace(source, path).replace(extension, '');
  const final = isIndex ? flat.replace(/\/index$/, '') : flat;
  return final || '/';
}

export async function getPagesPath() {
  const pages = await getPagesFromDisk();
  return pages.map(x => getPagePath(x));
}
