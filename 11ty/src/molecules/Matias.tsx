import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Expandable = styled.abbr`
  width: 0.7em;
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  text-overflow: clip;
  transition: width 0.2s ease-out;
`;

const Wrapper = styled.span`
  :hover abbr {
    width: 3em;
  }
`;

export function Matias({ fixedSize = false }: { fixedSize?: boolean }) {
  const fixedWidth = css`
    display: inline-block;
    width: 14em;
  `;

  return (
    <Wrapper css={fixedSize ? fixedWidth : null}>
      <Expandable>Adrián</Expandable> Matías Quezada
    </Wrapper>
  );
}
