import React from 'react';
import { AmqDocument } from '../templates/AmqDocument.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { createPageUtils, getAllPages } from '../generate/page-utils.tsx';

const { Link } = createPageUtils(import.meta.url);
const pages = await getAllPages();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />
      <ul>
        {pages.map(x => (
          <li>
            <Link href={x.type}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </AmqDocument>
  );
};
