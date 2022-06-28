import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';

const mq = {
  sm: '@media (min-width: 650px)',
  md: '@media (min-width: 50rem)',
  lg: '@media (min-width: 70rem)',
};

export interface ContainerProps {}

export function Container({ children }: PropsWithChildren<ContainerProps>) {
  const styles = css`
    width: 30rem;
    margin: 0 auto;
    padding: 0 1rem;

    ${mq.md} {
      width: 50rem;
      padding: 0 5rem;
    }

    ${mq.lg} {
      width: 60rem;
      padding: 0 5rem;
    }
  `;

  return <div className={styles}>{children}</div>;
}
