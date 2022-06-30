import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../deps/emotion.ts';
import { cssFontSize, cssSpace } from '../theme.ts';

export interface AmqHeaderProps {}

export function AmqHeader({}: React.PropsWithChildren<AmqHeaderProps>) {
  const styles = css`
    font-size: ${cssFontSize.xl};
    margin: ${cssSpace.lg} 0;
  `;

  return (
    <header className={styles}>
      <Container>A. Matías Quezada</Container>
    </header>
  );
}
