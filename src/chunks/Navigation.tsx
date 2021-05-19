import * as React from 'react';

import { Translatable } from '../components/Translatable';

const js = /*js*/ `
  $('[data-toggle-light-mode]').addEventListener('click', () =>
    document.body.classList.toggle('light-theme')
  );
`;

export function Navigation() {
  return (
    <nav className="Navigation">
      <div className="Navigation__container">
        <a className="Navigation__name" href="/">
          <span className="is-abbreviated">Adrián</span> Matías Quezada
        </a>

        <div className="Navigation__links">
          <a href="/blog">Blog</a>
          <a href="/projects">
            <Translatable en="Projects" es="Projectos" />
          </a>
          <a href="/about-me">
            <Translatable en="About me" es="Sobre mi" />
          </a>
        </div>

        <div className="Navigation__controls">
          <button data-toggle-lang>
            <span lang="en">🇪🇸</span>
            <span lang="es">🇬🇧</span>
          </button>

          <button data-toggle-light-mode>
            <span className="dark-only">☀️</span>
            <span className="light-only">🌙</span>
          </button>

          {/* <Runtime js={js} /> */}
        </div>
      </div>
    </nav>
  );
}
