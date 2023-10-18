import React from 'react';
import { meta as defaultMeta } from '../../components/templates/default.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { cssSpace } from '../../theme.ts';
import {
  css,
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
  i18n,
  Lang,
  Markdown,
  useLang,
  tr,
} from '../../generate/mod.ts';
import { bouncyLinkClass } from '../../util/bouncyLinkTransition.ts';
import { BulletList } from '../../components/molecules/BulletList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { Container } from '../../components/atoms/Container.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';

export interface CareerProps extends MarkdownPageMetadata {
  from: YearMonthDay;
  to: YearMonthDay;
  org: Translatable;
  link: Translatable;
  role: Translatable;
  labels: Translatable[];
  bullets?: Translatable[];
  hide?: true;
}

export function meta({ org, role }: CareerProps, file: string) {
  return {
    ...defaultMeta({}, file),
    title: i18n`${role ?? ''} ${{ en: 'at', es: 'en' }} ${org ?? ''}`,
  };
}

export default ({
  from,
  to,
  title,
  link,
  org,
  role,
  labels,
  bullets,
  content,
}: CareerProps) => {
  const body = css`
    display: flex;
    flex-direction: column;
    margin-top: ${cssSpace.xl};
    padding-top: ${cssSpace.xl};
    gap: ${cssSpace.xl};
  `;

  // const timeSpanStyles = css`
  //   display: flex;
  //   align-items: center;
  //   gap: ${cssSpace.md};

  //   time {
  //     font-size: ${cssFontSize.md};
  //   }
  // `;

  const atStyles = css`
    font-size: 0.8em;
  `;

  const lang = useLang();

  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={body}>
        <Heading3>
          <Lang tr={role} />{' '}
          <small className={atStyles}>
            <Lang en="at" es="en" />
          </small>{' '}
          {link ? (
            <a
              href={tr(link, lang)}
              className={bouncyLinkClass}
              target="_blank"
            >
              <Lang tr={org} />
            </a>
          ) : (
            <Lang tr={org} />
          )}
        </Heading3>

        {/*
          <div className={timeSpanStyles}>
            <Time value={from} omitDay /> - <Time value={to} omitDay />
          </div>
        */}

        <TagList list={labels} />
        <BulletList>{bullets}</BulletList>
        <Markdown>{content}</Markdown>
      </Container>
    </AmqDocument>
  );
};
