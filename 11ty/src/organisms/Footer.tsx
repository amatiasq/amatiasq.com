import styled from '@emotion/styled';
import { Matias } from '../molecules/Matias';
import { container } from '../styles';

const Foot = styled.footer`
  ${container}
  display: flex;
  justify-content: flex-end;
`;

export function Footer() {
  return (
    <Foot>
      {/* &copy;&nbsp; */}
      <Matias />
    </Foot>
  );
}
