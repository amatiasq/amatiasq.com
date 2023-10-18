import React from 'react';
import { Lang, Markdown, css, tr } from '../../generate/mod.ts';
import { CareerProps } from '../../pages/career/_template.tsx';
import { cssSpace } from '../../theme.ts';
import { Heading3 } from '../atoms/Heading.tsx';
import { Time } from '../atoms/Time.tsx';
import { TagList } from '../molecules/TagList.tsx';

export interface JobPositionProps {
  data: CareerProps;
  showDetail?: true;
  showLabels?: true;
}

export function JobPosition({
  data,
  showDetail,
  showLabels,
}: JobPositionProps) {
  const itemStyles = css`
    margin: 3rem 0;
  `;

  const headerStyles = css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${cssSpace.lg};
    margin: 0;
  `;

  const detailsStyles = css`
    &:not([open]) summary::after {
      content: 'Read more...';
      display: block;
    }

    &[open] summary::after {
      content: 'Collapse';
      display: block;
    }
  `;

  const bullets = data.bullets ? (
    <ul className="bullet">
      {data.bullets.map((x) => (
        <li key={tr(x, 'en')}>
          <Lang tr={x} />
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <article className={itemStyles}>
      <Heading3 className={headerStyles}>
        <Time value={data.date} yearOnly />
        <Lang tr={data.title} />
      </Heading3>

      {showLabels && data.labels ? <TagList list={data.labels} /> : null}

      {showDetail ? (
        <details className={detailsStyles}>
          <summary>{bullets}</summary>
          <Markdown>{data.content}</Markdown>
        </details>
      ) : (
        bullets
      )}
    </article>
  );
}
