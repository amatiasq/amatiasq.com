import React from 'react';
import { AmqDocument } from '../templates/AmqDocument.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { getPagePath, getPagesFromDisk } from '../generate/pages.ts';

const pages = await getPagesFromDisk();
console.log(pages.map(x => getPagePath(x)));

export default (props: any) => {
  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />
    </AmqDocument>
  );
};
