import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';

export interface ContainerProps {}

export function Container({ children }: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={css`
        width: 60rem;
        margin: 0 auto;

        @media (max-width: 60rem) {
          width: 30rem;
        }
      `}
    >
      {children}
    </div>
  );
}
