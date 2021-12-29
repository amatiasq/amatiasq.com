import React, { PropsWithChildren } from 'https://esm.sh/react';

import { Third } from './Thid.tsx';

type ButtonProps = Record<string, unknown>;

export function Button({ children }: PropsWithChildren<ButtonProps>) {
  return <Third>FAAA{children}</Third>;
}
