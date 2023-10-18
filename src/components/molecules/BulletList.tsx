import React from 'react';
import { Lang, Translatable, css, tr } from '../../generate/mod.ts';

export interface BulletListProps {
  children: Translatable[] | undefined;
}

export function BulletList({ children }: BulletListProps) {
  if (!children) return null;

  const styles = css`
    padding-left: 2em;

    li {
      list-style: disc;
    }

    li + li {
      margin-top: 0.5em;
    }
  `;

  return (
    <ul className={styles}>
      {children.map((x) => (
        <li key={tr(x, 'en')}>
          <Lang tr={x} />
        </li>
      ))}
    </ul>
  );
}
