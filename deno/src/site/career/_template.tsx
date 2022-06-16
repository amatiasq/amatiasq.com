import React from 'react';
import { AmqDocument } from '../../components/AmqDocument.tsx';
import { DateTime, StringDate } from '../../components/DateTime.tsx';
import { Translatable, Lang } from '../../components/Lang.tsx';
import { Tag } from '../../components/Tag.tsx';
import { css } from '../../deps/emotion.ts';

interface CareerProps {
  org: string;
  link: string;
  role: Translatable;
  from: StringDate;
  to: StringDate;
  labels: Translatable[];
  content: Translatable;
}

export default ({ org, link, role, from, to, labels, content }: CareerProps) => {
  const body = css`
    display: grid;
  `;

  const labelsContainer = css`
    // margin: 10px;
  `;

  return (
    <AmqDocument className={body} title={org}>
      <h1>
        <Lang tr={role} />
        <Lang en=" at " es=" en " />
        <Lang tr={org} />
      </h1>

      <div className={labelsContainer}>
        {labels.map(x => (
          <Tag>{x}</Tag>
        ))}
      </div>

      <DateTime value={from} />
      <DateTime value={to} />

      <Lang tr={content} />
    </AmqDocument>
  );
};
