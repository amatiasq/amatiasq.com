import React from 'react';
import {
  css,
  Markdown,
  PageMetadata,
  usePageUtils,
} from '../../generate/mod.ts';
import { Container } from '../../components/atoms/Container.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { cssBreakpoint } from '../../theme.ts';
import { ExpandableList } from '../../components/organisms/ExpandableList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';

const { projects } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  `;

  const listStyles = css`
    display: grid;
    grid-gap: 3rem;

    ${cssBreakpoint.medium} {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

  const articleStyles = css`
    h2 {
      font-size: 1.5rem;
    }
  `;

  return (
    <AmqDocument {...props} title={{ en: 'Projects', es: 'Projectos' }}>
      <AmqHeader />

      <Container>
        <ExpandableList list={projects} listClassName={listStyles}>
          {(item) => (
            <li key={item.id}>
              <Heading3 className={headerStyles}>
                <Link page={item.file}>{item.title}</Link>
              </Heading3>

              <Markdown className={articleStyles} readMore={item.file}>
                {item.content}
              </Markdown>
            </li>
          )}
        </ExpandableList>
      </Container>
    </AmqDocument>
  );
};
