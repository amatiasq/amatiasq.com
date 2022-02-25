import styled from '@emotion/styled';
import { Link } from '../atoms/Link';
import { Matias } from '../molecules/Matias';
import { container } from '../styles';

const pages = {
  '/blog': 'Blog',
  '/about': 'About me',
};

const Nav = styled.nav`
  ${container}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const H1 = styled.h1``;

export function Navigation() {
  return (
    <Nav>
      <H1>
        <Matias fixedSize />
      </H1>

      {Object.entries(pages).map(([url, name]) => (
        <Link key={url} href={url}>
          {name}
        </Link>
      ))}
    </Nav>
  );
}
