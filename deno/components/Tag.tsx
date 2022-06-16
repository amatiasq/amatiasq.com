import React from 'react';
import { css } from '@emotion/css';
import { Lang, Translatable } from './Lang.tsx';

export interface TagProps {
  children: Translatable;
}

export function Tag({ children }: TagProps) {
  const styles = css`
    border: 1px solid red;
  `;

  return (
    <span className={styles}>
      <Lang tr={children} />
    </span>
  );
}
