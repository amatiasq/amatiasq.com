import { React } from '../deps.ts';

export interface AmqDocumentProps {
  title: string;
}

export function AmqDocument({ title, children }: React.PropsWithChildren<AmqDocumentProps>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
