import React, { IframeHTMLAttributes } from 'react';
import { cssBreakpoint } from '../../theme.ts';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import {
  MarkdownPage,
  MarkdownPageProps,
} from '../../components/templates/MarkdownPage.tsx';
import {
  RelatedLinks,
  RelatedLinksProps,
} from '../../components/molecules/RelatedLinks.tsx';
import { css, Translatable, Lang, useLang, tr } from '../../generate/mod.ts';

export interface ShowcaseProps extends MarkdownPageProps {
  image?: string;
  links?: RelatedLinksProps['links'];
  iframe?: (IframeHTMLAttributes<unknown> & { src: Translatable }) | true;
}

export default ({
  title,
  image,
  links,
  labels,
  iframe,
  content,
}: ShowcaseProps) => {
  const headingStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    ${cssBreakpoint.medium} {
      flex-direction: row;
    }
  `;

  return (
    <MarkdownPage
      title={title}
      labels={labels}
      content={content}
      footer={getFooter(iframe, links?.live)}
    >
      <Heading2 className={headingStyles}>
        <Lang tr={title} />
      </Heading2>
      <RelatedLinks links={links} />

      {/* {image ? <Image src={image} /> : null} */}
    </MarkdownPage>
  );
};

function getFooter(
  iframe: ShowcaseProps['iframe'],
  fallback: string | undefined
) {
  if (!iframe) {
    return null;
  }

  if (iframe === true) {
    return <iframe src={fallback} />;
  }

  const src = iframe.src ? tr(iframe.src, useLang()) : fallback;

  if (!src) {
    return null;
  }

  return (
    <iframe
      {...iframe}
      src={src}
      style={undefined}
      className={css`
        ${(iframe.style as string) || ''}
      `}
    />
  );
}
