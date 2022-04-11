import styled from '@emotion/styled';
import { Link } from '../atoms/Link';
import { Matias } from '../molecules/Matias';
import { container } from '../styles';

const pages = {
  '/blog': 'Blog',
  '/about': 'About me',
};

const Background = styled.header`
  background-color: hsla(240, 17%, 99%, 0.97);
  border-bottom: 0.0625em solid #fff;
  box-shadow: 0 0.25em 0 hsl(0deg 0% 0% / 5%);
  color: black;

  @media (min-width: 600px) {
  }
`;

const Nav = styled.nav`
  ${container}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const H1 = styled.h1``;

export function Navigation() {
  return (
    <Background>
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
    </Background>
  );
}
