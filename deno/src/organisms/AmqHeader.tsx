import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../deps/emotion.ts';

export interface AmqHeaderProps {}

export function AmqHeader({}: React.PropsWithChildren<AmqHeaderProps>) {
  const styles = css`
    font-size: 2rem;
  `;

  return (
    <header className={styles}>
      <Container>A. Matías Quezada</Container>
    </header>
  );
}
