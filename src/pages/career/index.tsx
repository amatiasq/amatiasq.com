import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { IconLink } from '../../components/atoms/IconLink.tsx';
import { PdfIcon } from '../../components/atoms/icons.tsx';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../../components/organisms/AmqPageList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { Lang, PageMetadata, tr, useLang } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { JobPosition } from '../../components/organisms/JobPosition.tsx';

const { career, talks } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  return (
    <AmqDocument {...props} title="CV">
      <AmqHeader />

      <Container>
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

        <ol>
          {career
            .filter((x) => !x.hide)
            .map((item) => (
              <li key={item.id}>
                <JobPosition data={item} showDetail showLabels />
              </li>
            ))}
        </ol>

        <AmqPageList
          name={{ en: '💬  Talks', es: '💬  Charlas' }}
          list={talks}
        />
      </Container>
    </AmqDocument>
  );
};
