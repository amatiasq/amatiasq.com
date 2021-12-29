import React, { PropsWithChildren } from 'https://esm.sh/react';

export function MyComponent({ children }: PropsWithChildren<{}>) {
  return <>[{children}]</>;
}
