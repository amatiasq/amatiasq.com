import React, { PropsWithChildren } from 'https://esm.sh/react';

type ThirdProps = Record<string, unknown>;

export function Third({ children }: PropsWithChildren<ThirdProps>) {
  return <div>{children}-FOROFORO</div>;
}
