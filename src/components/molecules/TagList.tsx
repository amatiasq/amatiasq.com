import React from 'react';
import { css, Lang, tr, Translatable } from '../../generate/mod.ts';
import { cssColor, cssFontFamily, cssSpace } from '../../theme.ts';

interface TagListProps {
  className?: string;
  list: Translatable[] | undefined;
}

export function TagList({ className = '', list }: TagListProps) {
  if (!list) return null;

  const containerStyles = css`
    display: flex;
    flex-wrap: wrap;
    column-gap: ${cssSpace.md};
  `;

  const tagStyles = css`
    padding-left: 0.6em;
    color: ${cssColor.primary};
    font-family: ${cssFontFamily.code} !important;
    position: relative;
    overflow: hidden;

    &::before {
      content: '#';
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0.5;
    }
  `;

  return (
    <div className={`${containerStyles} ${className}`}>
      {list.map((x) => (
        <span key={tr(x, 'en')} className={`tag ${tagStyles}`}>
          <Lang tr={x} />
        </span>
      ))}
    </div>
  );
}
