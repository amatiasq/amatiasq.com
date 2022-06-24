import { basename, extname, relative } from 'std/path/mod.ts';
import { path } from '../util/path.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';
import { isMarkdown, readMarkdown } from './render-md.tsx';

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

export async function getPageMetadata(page: SitePage) {
  if (isMarkdown(page)) {
    const { data, ...rest } = await readMarkdown(page);

    return {
      type: 'md',
      file: page,
      title: getPageTitle(page),
      ...data,
      ...rest,
    };
  }

  return {
    type: 'tsx',
    file: page,
    title: getPageTitle(page),
  };
}

function getPageTitle(page: SitePage) {
  const extension = extname(page);
  const filename = removeDate(basename(page));
  const result = filename.replace(extension, '').replace(/-(\w)/, x => x[1].toUpperCase());
  return firstUppercase(result) || page;
}

function firstUppercase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

function removeDate(text: string) {
  return text.replace(/^\d{4}-(\d{2}-){0,2}/, '');
}
