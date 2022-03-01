import styled from '@emotion/styled';
import { Footer } from './organisms/Footer';
import { Navigation } from './organisms/Navigation';
import { Welcome } from './organisms/Welcome';
import { page } from './page';

const Fullscreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;

  background: linear-gradient(to bottom, #f27254 0%, #f06457 100%);
  color: white;
`;

export const render = page(
  <Fullscreen>
    <Navigation />
    <Welcome />
    <Footer />
  </Fullscreen>,
);
