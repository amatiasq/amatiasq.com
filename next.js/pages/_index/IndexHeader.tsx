import { Runtime } from '../../src/components/Runtime';

const css = /*css*/ `
  .Header {
    font-size: 3rem;
  }
`;

export function IndexHeader() {
  console.log('IndexHeader');

  return (
    <>
      {/* <Runtime css={css} /> */}
      <style jsx={true}>{css}</style>

      <header className="Header">
        <div className="container">I'm A. Matías Quezada</div>
      </header>
    </>
  );
}
