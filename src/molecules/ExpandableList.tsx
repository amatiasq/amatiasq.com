import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssFontSize, cssSpace } from '../theme.ts';
import { Lang, Translatable, useTr } from '../atoms/Lang.tsx';
import { HiddenContent } from '../atoms/HiddenContent.tsx';
import { Heading2 } from '../atoms/Heading.tsx';

export interface ExpandableListProps<T> {
  className?: string;
  hideAfter?: number;
  title: Translatable;
  list: T[];
  children: (item: T) => React.ReactNode;
}

export function ExpandableList<T>({
  className = '',
  title,
  list,
  hideAfter = 5,
  children,
}: ExpandableListProps<T>) {
  const viewMore = useTr('View all', 'Ver todo');
  const viewLess = useTr('View less', 'Ver menos');

  const styles = css`
    position: relative;

    details summary::after {
      content: '${viewMore}';
      display: block;
      white-space: nowrap;
      position: absolute;
      list-style: none;
      font-size: ${cssFontSize.xs};
      top: ${cssSpace.md};
      right: 0;
      cursor: pointer;
    }

    details[open] summary::after {
      content: '${viewLess}';
    }
  `;

  const headerStyles = css`
    margin-bottom: ${cssSpace.lg};
  `;

  const viewMoreStyles = css`
    list-style: none;
  `;

  const top = hideAfter ? list.slice(0, hideAfter) : list;
  const bottom = hideAfter ? list.slice(hideAfter) : [];

  return (
    <div className={`${styles} ${className}`}>
      {title ? (
        <Heading2 className={headerStyles}>
          <Lang tr={title} />
        </Heading2>
      ) : null}

      <ul>{top.map(children)}</ul>

      {bottom.length ? (
        <details>
          <summary className={viewMoreStyles}>
            <HiddenContent>{viewMore}</HiddenContent>
          </summary>
          <ul>{bottom.map(children)}</ul>
        </details>
      ) : null}
    </div>
  );
}
