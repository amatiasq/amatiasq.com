import React from 'react';
import { Time } from '../../components/atoms/Time.tsx';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { MarkdownPage } from '../../components/templates/MarkdownPage.tsx';
import {
  Lang,
  MarkdownPageMetadata,
  YearMonthDay,
} from '../../generate/mod.ts';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';

export interface BlogPostProps extends MarkdownPageMetadata {
  published: YearMonthDay;
}

export default ({ title, published, content }: BlogPostProps) => {
  return (
    <MarkdownPage title={title} content={content}>
      <ResponsiveHeader as={Heading2}>
        <Lang tr={title} />
        <Time value={published} />
      </ResponsiveHeader>
    </MarkdownPage>
  );
};
