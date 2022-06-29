import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../deps/emotion.ts';

export interface AmqHeaderProps {}

export function AmqHeader({}: React.PropsWithChildren<AmqHeaderProps>) {
  const styles = css`
    font-size: 2rem;
    margin: 2rem 0;
  `;

  return (
    <header className={styles}>
      <Container>A. Matías Quezada</Container>
    </header>
  );
}
