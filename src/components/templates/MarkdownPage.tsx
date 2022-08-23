import React, { PropsWithChildren } from 'react';
import { Container } from '../atoms/Container.tsx';
import { css, Translatable, Markdown, Img } from '../../generate/mod.ts';
import { TagList } from '../molecules/TagList.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { cssColor, cssSpace } from '../../theme.ts';
import { AmqDocument } from './AmqDocument.tsx';

type ImageData = undefined | null | string | { src: string; alt: string };

export interface MarkdownPageProps extends PropsWithChildren<{}> {
  className?: string;
  title: Translatable;
  labels?: Translatable[];
  content: Translatable;
  footer?: JSX.Element | null;
  image?: ImageData;
}

export function MarkdownPage({
  className = '',
  title,
  labels,
  image,
  content,
  children,
  footer = null,
}: MarkdownPageProps) {
  const body = css`
    display: grid;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.md};
  `;

  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={`${body} ${className}`}>
        {children}
        {labels ? <TagList list={labels} /> : null}
        {renderImgIfNeeded(image)}
        <Markdown>{content}</Markdown>
        {footer}
      </Container>
    </AmqDocument>
  );
}

function renderImgIfNeeded(data: ImageData) {
  if (!data) return null;

  if (typeof data === 'string') {
    return <Img src={data} alt="" />;
  }

  return <Img {...data} />;
}
