import styled from '@emotion/styled';
import { Navigation } from './organisms/Navigation';
import { Welcome } from './organisms/Welcome';
import { page } from './page';

const Fullscreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const render = page(
  <Fullscreen>
    <Navigation />
    <Welcome />
  </Fullscreen>,
);
