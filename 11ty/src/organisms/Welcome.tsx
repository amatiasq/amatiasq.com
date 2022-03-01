import styled from '@emotion/styled';
import { Link } from '../atoms/Link';
import { Paragraph } from '../atoms/Paragraph';
import { Matias } from '../molecules/Matias';
import { container } from '../styles';

const Header = styled.header`
  ${container}
  margin-top: 3em;
  width: auto;
`;

export function Welcome() {
  return (
    <Header>
      <Paragraph>
        Welcome! I'm <Matias /> and this is my grove.
      </Paragraph>
      <Paragraph>
        You can find my <Link href="/blog">blog</Link> and some <Link href="/projects">projects</Link> I do for fun.
      </Paragraph>
    </Header>
  );
}
