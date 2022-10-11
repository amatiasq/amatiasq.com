import React from 'react';
import { css, Translatable, useLang, RawHtml, tr } from '../../generate/mod.ts';
import { fetchAndCache } from '../../generate/util/fetchAndCache.ts';
import { cssDeps, cssGlobal, cssReset } from '../../theme.ts';

export interface AmqDocumentProps {
  className?: string;
  styles?: string;
  title: Translatable;
}

const thirdPartyCss = await fetchAndCache(cssDeps);

export function AmqDocument({
  className = '',
  styles,
  title,
  children,
}: React.PropsWithChildren<AmqDocumentProps>) {
  const titleSufix = 'A. Matías Quezada';
  const lang = useLang();

  const bodyStyles = css`
    padding-bottom: 4rem;
  `;

  return (
    <html lang={lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A. Matías Quezada's personal website"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title ? `${tr(title, lang)} | ${titleSufix}` : titleSufix}
        </title>
        {injectStyle(cssReset)}
        {injectStyle(thirdPartyCss.join('\n'))}
        {injectStyle(cssGlobal)}
        {injectStyle(styles)}
        {injectStyle('STYLES_PLACEHOLDER')}
        SCRIPTS_PLACEHOLDER
      </head>
      <body className={`${className} ${bodyStyles}`}>
        {children}
        {/* <PrimaryColorPicker /> */}
      </body>
    </html>
  );
}

function injectStyle(styles: string | null | undefined) {
  if (!styles) return null;

  return (
    <style>
      <RawHtml html={styles.replace(/\s+/g, ' ')} />
    </style>
  );
}
