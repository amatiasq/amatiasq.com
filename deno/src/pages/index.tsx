import React from 'react';
import { AmqDocument } from '../templates/AmqDocument.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { getPagePathRelativeTo, getPagesPath } from '../generate/pages.ts';

const pages = await getPagesPath(import.meta.url);

export default (props: any) => {
  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />
      <ul>
        {pages.map(x => (
          <li>
            <a href={getPagePathRelativeTo(import.meta.url, x)}>{x}</a>
          </li>
        ))}
      </ul>
    </AmqDocument>
  );
};
