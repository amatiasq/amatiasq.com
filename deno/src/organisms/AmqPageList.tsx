import React from 'react';
import { usePageUtils } from '../atoms/PageUtils.tsx';
import { PageMetadata } from '../generate/pages.ts';

export interface AmqPageListProps {
  name: string;
  list: PageMetadata[];
}

export function AmqPageList({ name, list }: AmqPageListProps) {
  const { Link } = usePageUtils();

  return (
    <>
      <h3>{name}</h3>
      <ul>
        {list.map(x => (
          <li key={x.file}>
            <Link href={x.file}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
