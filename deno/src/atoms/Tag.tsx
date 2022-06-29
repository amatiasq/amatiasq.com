import React from 'react';
import { css } from '../deps/emotion.ts';
import { Lang, Translatable } from './Lang.tsx';

export interface TagProps {
  children: Translatable;
}

export function Tag({ children }: TagProps) {
  const styles = css`
    border: 1px solid blue;
    background-color: rgba(255 255 255 / 10%);
    border-radius: 1rem;
    padding: 0.2rem 0.5rem;
    margin: 0.1rem 0.5rem;
    display: inline-block;
  `;

  return (
    <span className={styles}>
      <Lang tr={children} />
    </span>
  );
}
