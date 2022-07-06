import React, { PropsWithChildren } from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../../deps/emotion.ts';
import { Translatable, useLang, tr, RawHtml } from '../../generate/mod.ts';
import { TagList } from '../molecules/TagList.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { cssSpace } from '../../theme.ts';
import { AmqDocument } from './AmqDocument.tsx';

export interface AmqMarkdownPageProps extends PropsWithChildren<{}> {
  title: Translatable;
  labels?: Translatable[];
  content: Translatable;
  footer?: JSX.Element | null;
}

export function AmqMarkdownPage({
  title,
  labels,
  content,
  children,
  footer = null,
}: AmqMarkdownPageProps) {
  const body = css`
    display: grid;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.md};
  `;

  const lang = useLang();
  const localContent = tr(content, lang);
  const styles = localContent.includes(`shj`) ? highlightTheme() : '';

  return (
    <AmqDocument title={title} styles={styles}>
      <AmqHeader />
      <Container className={body}>
        {children}

        {labels ? <TagList list={labels} /> : null}

        <article>
          <RawHtml html={localContent} />
        </article>

        {footer}
      </Container>
    </AmqDocument>
  );
}

export function highlightTheme() {
  return `
    [class*=shj-lang-]{white-space:pre;margin:10px 0;border-radius:10px;padding:30px 20px;background:white;color:#112;box-shadow:0 0 5px #0001;text-shadow:none;font: 18px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;line-height:24px;box-sizing:border-box;max-width:min(100%,100vw)}
    .shj-inline{margin:0;padding:2px 5px;display:inline-block;border-radius:5px}
    [class*=shj-lang-]::selection,
    [class*=shj-lang-] ::selection{background:#bdf5}
    [class*=shj-lang-]>div{display:flex;overflow:auto}
    [class*=shj-lang-]>div :last-child{flex:1;outline:none}
    .shj-numbers{padding-left:5px;counter-reset:line}
    .shj-numbers div{padding-right:5px}
    .shj-numbers div:before{color:#999;display:block;content:counter(line);opacity:.5;text-align:right;margin-right:5px;counter-increment:line}
    .shj-syn-cmnt{font-style:italic}
    .shj-syn-err,
    .shj-syn-kwd{color:#e16}
    .shj-syn-num,
    .shj-syn-class{color:#f60}
    .shj-numbers,
    .shj-syn-cmnt{color:#999}
    .shj-syn-insert,
    .shj-syn-str{color:#7d8}
    .shj-syn-bool{color:#3bf}
    .shj-syn-type,
    .shj-syn-oper{color:#5af}
    .shj-syn-section,
    .shj-syn-func{color:#84f}
    .shj-syn-deleted,
    .shj-syn-var{color:#f44}
    .shj-oneline{padding:12px 10px}
    .shj-lang-http.shj-oneline .shj-syn-kwd{background:#25f;color:#fff;padding:5px 7px;border-radius:5px}
    .shj-multiline.shj-mode-header{padding:20px}
    .shj-multiline.shj-mode-header:before{content:attr(data-lang);color:#58f;display:block;padding:10px 20px;background:#58f3;border-radius:5px;margin-bottom:20px}
    [class*=shj-lang-]{color:#abb2bf;background:#161b22}
    [class*=shj-lang-]:before{color:#6f9aff}
    .shj-syn-deleted,
    .shj-syn-err,
    .shj-syn-var{color:#e06c75}
    .shj-syn-section,
    .shj-syn-oper,
    .shj-syn-kwd{color:#c678dd}
    .shj-syn-class{color:#e5c07b}
    .shj-numbers,
    .shj-syn-cmnt{color:#76839a}
    .shj-syn-insert{color:#98c379}
    .shj-syn-type{color:#56b6c2}
    .shj-syn-num,
    .shj-syn-bool{color:#d19a66}
    .shj-syn-str,
    .shj-syn-func{color:#61afef}
    `;
}