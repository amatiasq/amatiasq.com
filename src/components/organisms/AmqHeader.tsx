import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css, usePageUtils, pagesDir, Lang } from '../../generate/mod.ts';
import {
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
  cssSpace,
} from '../../theme.ts';
import { ScrollWisle } from '../atoms/ScrollWisle.tsx';
import { AMatiasQuezada } from '../molecules/AMatiasQuezada.tsx';
import { ColorSchemeToggle } from '../molecules/ColorSchemeToggle.tsx';
import { LangSelector } from '../molecules/LangSelector.tsx';

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    --emoji-size: 1.5rem;

    background-color: ${cssColor.backgroundStrong};
    color: ${cssColor.foreground};
    border-bottom: 2px solid ${cssColor.border};
    padding: ${cssSpace.xl} 0;
    font-size: 1.2em;

    ${cssBreakpoint.medium} {
      --emoji-size: 2rem;

      position: sticky;
      top: 0;
      z-index: 1;

      transition: padding ${cssAnimationSpeed.fast} ease-in-out,
        font-size ${cssAnimationSpeed.fast} ease-in-out;

      &.scrolled {
        --emoji-size: 1.5rem;
        padding: ${cssSpace.md} 0;
        font-size: inherit;
      }
    }
  `;

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
    gap: ${cssSpace.lg};

    .not-priority {
      display: none;
    }

    ${cssBreakpoint.medium} {
      flex-direction: row;
    }

    ${cssBreakpoint.wide} {
      .not-priority {
        display: block;
      }
    }
  `;

  const navStyles = css`
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: ${cssSpace.md};
  `;

  const pageLinkStyles = css`
    color: ${cssColor.link};
    margin-right: ${cssSpace.md};
    border-bottom: 1px solid transparent;
    transform: translate(0px, 0px);

    &.parent {
      border-bottom: 1px solid ${cssColor.border};
    }

    &:hover {
      border-bottom: 1px solid ${cssColor.link};
      transition: transform ${cssAnimationSpeed.slow} ease;
      transform: translate(0px, -3px);
    }
  `;

  const emojiButtonStyles = css`
    cursor: pointer;
    font-size: var(--emoji-size);
    transition: font-size ${cssAnimationSpeed.fast} ease-in-out;
  `;

  const colorSchemeStyles = css`
    ${emojiButtonStyles};
    margin-top: -5px;
  `;

  return (
    <ScrollWisle
      as="header"
      className={`${styles} ${className}`}
      scrollClass="scrolled"
      scrollOffset={50}
      scrollTolerance={50}
    >
      <Container className={containerStyles}>
        <AMatiasQuezada />
        <Eyes />

        <nav className={navStyles}>
          <Link
            className={pageLinkStyles}
            page={pagesDir.resolve('blog')}
            isParent
          >
            Blog
          </Link>
          <Link
            className={`${pageLinkStyles} not-priority`}
            page={pagesDir.resolve('projects')}
            isParent
          >
            <Lang en="Projects" es="Proyectos" />
          </Link>
          <Link
            className={pageLinkStyles}
            page={pagesDir.resolve('career')}
            isParent
          >
            CV
          </Link>
          <LangSelector className={emojiButtonStyles} />
          <ColorSchemeToggle className={colorSchemeStyles} />
        </nav>
      </Container>
    </ScrollWisle>
  );
}

function Eyes() {
  return null;
}
