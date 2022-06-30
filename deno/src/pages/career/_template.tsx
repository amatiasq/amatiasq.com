import React from 'react';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { Translatable, Lang, i18n } from '../../atoms/Lang.tsx';
import { css } from '../../deps/emotion.ts';
import { Container } from '../../atoms/Container.tsx';
import { meta as defaultMeta } from '../../templates/default.tsx';
import { Time, YearMonthDay } from '../../atoms/Time.tsx';
import { TagList } from '../../molecules/TagList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';

interface CareerProps {
  title: string;
  org: string;
  link: string;
  role: Translatable;
  from: YearMonthDay;
  to: YearMonthDay;
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

  return (
    <AmqDocument title={org}>
      <AmqHeader />
      <Container className={body}>
        <h1>
          <Lang tr={title} />
        </h1>
        <TagList list={labels} />
        <div>
          <Time value={from} omitDay /> to <Time value={to} omitDay />
        </div>
        <Lang tr={content} />
      </Container>
    </AmqDocument>
  );
};
