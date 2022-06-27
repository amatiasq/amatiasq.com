import React from 'react';
import { basename } from 'std/path/mod.ts';
import { Translatable, Lang } from '../atoms/Lang.tsx';
import { getDateFrom } from '../generate/pages.ts';
import { AmqDocument } from './AmqDocument.tsx';

export function meta(data: any, file: string) {
  return {
    date: getDateFrom(basename(file)),
  };
}

export default ({ content }: { content: Translatable }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);
