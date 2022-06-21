import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';

const mq = {
  narrow: '@media (min-width: 650px)',
  md: '@media (min-width: 800px)',
};

export interface ContainerProps {}

export function Container({ children }: PropsWithChildren<ContainerProps>) {
  const styles = css`
    width: 60rem;
    margin: 0 auto;

    ${mq.narrow} {
      width: 30rem;
    }
  `;

  return <div className={styles}>{children}</div>;
}
