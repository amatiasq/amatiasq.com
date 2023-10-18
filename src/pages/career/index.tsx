import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2, Heading3 } from '../../components/atoms/Heading.tsx';
import { IconLink } from '../../components/atoms/IconLink.tsx';
import { PdfIcon } from '../../components/atoms/icons.tsx';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../../components/organisms/AmqPageList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import {
  Lang,
  Markdown,
  PageMetadata,
  css,
  tr,
  useLang,
} from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { cssSpace } from '../../theme.ts';
import { Time } from '../../components/atoms/Time.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';
import { Collapsable } from '../../components/molecules/Collapsable.tsx';
import { BulletList } from '../../components/molecules/BulletList.tsx';

const { career, talks } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const body = css`
    display: flex;
    flex-direction: column;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.xl};
  `;

  const itemStyles = css`
    display: flex;
    flex-direction: column;
    gap: ${cssSpace.lg};
    margin-top: ${cssSpace.xl};
  `;

  const headerStyles = css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${cssSpace.lg};
    margin: 0;
  `;

  return (
    <AmqDocument {...props} title="CV">
      <AmqHeader />

      <Container className={body}>
        <ResponsiveHeader as={Heading2}>
          <Lang en="Career" es="Currículum" />
          <IconLink
            href="/CV.pdf"
            download="A. Matias Quezada CV.pdf"
            icon={
              <PdfIcon
                title={tr(['Download PDF', 'Descargar PDF'], useLang())}
              />
            }
          />
        </ResponsiveHeader>

        <q>This page is under development, please forgive any visual issue.</q>

        {career
          .filter((x) => !x.hide)
          .map((item) => (
            <section key={item.id} className={itemStyles}>
              <Heading3 className={headerStyles}>
                <Time value={item.date} yearOnly />
                <Lang tr={item.title} />
              </Heading3>

              <TagList list={item.labels} />

              <Collapsable collapsedText="Read more...">
                <summary>
                  <BulletList>{item.bullets}</BulletList>
                </summary>

                <Markdown>{item.content}</Markdown>
              </Collapsable>
            </section>
          ))}

        <AmqPageList
          name={{ en: '💬  Talks', es: '💬  Charlas' }}
          list={talks}
        />
      </Container>
    </AmqDocument>
  );
};
