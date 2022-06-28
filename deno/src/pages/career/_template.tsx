import React from 'react';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { DateTime, StringDate } from '../../atoms/DateTime.tsx';
import { Translatable, Lang, i18n } from '../../atoms/Lang.tsx';
import { Tag } from '../../atoms/Tag.tsx';
import { css } from '../../deps/emotion.ts';
import { Container } from '../../atoms/Container.tsx';
import { meta as defaultMeta } from '../../templates/default.tsx';

interface CareerProps {
  title: string;
  org: string;
  link: string;
  role: Translatable;
  from: StringDate;
  to: StringDate;
  labels: Translatable[];
  content: Translatable;
}

export function meta({ org, role }: CareerProps, file: string) {
  const x = defaultMeta({}, file);
  return {
    ...x,
    title: i18n`${role} ${{ en: 'at', es: 'en' }} ${org}`,
  };
}

export default ({ org, title, role, from, to, labels, content }: CareerProps) => {
  const body = css`
    display: grid;
  `;

  const labelsContainer = css`
    // margin: 10px;
  `;

  return (
    <AmqDocument className={body} title={org}>
      <Container>
        <h1>{title}</h1>

        <div className={labelsContainer}>
          {labels.map(x => (
            <Tag>{x}</Tag>
          ))}
        </div>

        <DateTime value={from} />
        <DateTime value={to} />

        <Lang tr={content} />
      </Container>
    </AmqDocument>
  );
};
