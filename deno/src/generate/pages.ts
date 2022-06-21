import { basename, extname } from 'std/path/mod.ts';
import { path } from '../util/path.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';

export type SitePage = 'snowflake SitePage';

const { fromRoot } = path('../..', import.meta.url);
const source = fromRoot('./src/pages');
const target = fromRoot('./dist');

export function getPagesFromDisk() {
  return getFilesRecursively(source) as Promise<SitePage[]>;
}

export function getPageDestinationOnDisk(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';
  return page.replace(source, `${target}${path}`).replace(extension, newExtension);
}

export function getPagePath(page: SitePage, path = '/') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const flat = page.replace(source, path).replace(extension, '');
  return isIndex ? flat.replace(/\/index$/, '') : flat;
}
