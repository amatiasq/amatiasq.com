import React from 'react';
import { Translatable } from '../atoms/Lang.tsx';
import { Tag } from '../atoms/Tag.tsx';
import { css } from '../deps/emotion.ts';
import { cssSpace } from '../theme.ts';

interface TagListProps {
  list: Translatable[];
}

export function TagList({ list }: TagListProps) {
  const labelsContainer = css`
    display: flex;
    gap: ${cssSpace.lg};
    margin: ${cssSpace.lg} 0;
  `;

  return (
    <div className={labelsContainer}>
      {list.map(x => (
        <Tag>{x}</Tag>
      ))}
    </div>
  );
}
