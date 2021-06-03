import * as React from 'react';

export function Document({ Html, Head, Body, children }) {
  return (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body className="display-en">{children}</Body>
    </Html>
  );
}
