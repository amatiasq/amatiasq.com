import React from 'react';
import { AmqDocument } from '../templates/AmqDocument.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { getAllPages, getPagesBySection } from '../generate/pages.ts';
import { createPageUtils, UtilsProvider } from '../atoms/PageUtils.tsx';
import { AmqPageList } from '../organisms/AmqPageList.tsx';
import { Container } from '../atoms/Container.tsx';

const utils = createPageUtils(import.meta.url);
const sections = getPagesBySection(await getAllPages());

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <UtilsProvider value={utils}>
      <AmqDocument title="A. Matías Quezada" {...props}>
        <AmqHeader />
        <Container>
          <AmqPageList name="Blog" list={sections.blog} />
          <AmqPageList name="Career" list={sections.career} />
          <AmqPageList name="Experiments" list={sections.experiments} />
          <AmqPageList name="Projects" list={sections.projects} />
          <AmqPageList name="Talks" list={sections.talks} />
        </Container>
      </AmqDocument>
    </UtilsProvider>
  );
};
