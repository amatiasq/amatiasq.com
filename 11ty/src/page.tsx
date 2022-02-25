import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const globalStyles = css`
  ${emotionReset}
  body {
    font-family: 'Source Sans Pro', 'Arial', sans-serif;
  }
`;

export function page(jsx: JSX.Element) {
  return () =>
    renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <Global styles={globalStyles} />
          {jsx}
        </body>
      </html>,
    );
}
