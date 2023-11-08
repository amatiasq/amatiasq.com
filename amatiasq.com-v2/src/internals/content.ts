import FastGlob from 'fast-glob';
import type { Showcaseable } from '../content/_meta';
import type { BlogPostMetadata } from '../content/blog/_meta';
import type { CareerMetadata } from '../content/career/_meta';
import { getSlugWithoutDate, parseDate, type StringifiedDate } from './date';
import { t } from './i18n';
import { readMarkdown } from './markdown';

export interface Content<C extends Collection = Collection> {
  readonly collection: C;
  readonly href: string;
  readonly slug: string;
  readonly date: StringifiedDate;
  readonly data: CollectionMetadata[C];
  readonly content: string;
  readonly excerpt: string;
}

export type ContentOf<T extends CollectionMetadata[Collection]> = {
  [C in Collection]: CollectionMetadata[C] extends T ? Content<C> : never;
}[Collection];

export interface CollectionMetadata {
  experiments: Showcaseable;
  projects: Showcaseable;
  talks: Showcaseable;
  blog: BlogPostMetadata;
  career: CareerMetadata;
}

export type Collection = {
  [K in keyof CollectionMetadata]: K;
}[keyof CollectionMetadata];

export async function readCollection<C extends Collection>(
  collection: C,
  filter?: (entry: Content<C>) => boolean,
) {
  const files = FastGlob.sync(`./src/content/${collection}/*.md`);

  const entries = await Promise.all(
    files.map(async (file) => {
      const md = await readMarkdown(file);
      const slug = file.replace(/\.md$/, '').split('/').pop()!;

      return {
        get collection() {
          return collection;
        },
        get href() {
          return `/${collection}/${getSlugWithoutDate(slug)}`;
        },
        get slug() {
          return getSlugWithoutDate(slug);
        },
        get date() {
          return parseDate(slug);
        },
        get data() {
          return md.data;
        },
        get content() {
          return t(md.content);
        },
        get excerpt() {
          return t(md.extract);
        },
      } as Content<C>;
    }),
  );

  return filter ? entries.filter(filter) : entries;
}

export async function readCollectionAsPages<C extends Collection>(
  collection: C,
  filter?: (entry: Content<C>) => boolean,
) {
  const entries = await readCollection(collection, filter);

  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
