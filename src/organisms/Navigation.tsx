import './Navigation.scss';

import React from 'react';

import { Link } from '@reach/router';

import { Translatable } from '../atoms/Translatable';
import { runtimeOnly } from '../util/runtimeOnly';

runtimeOnly($ => {
  $('[data-action="toggle-light-mode"]', x =>
    x.addEventListener('click', () => document.body.classList.toggle('light-theme')),
  );
});

export function Navigation() {
  return (
    <nav className="Navigation">
      <div className="Navigation__container">
        <Link className="Navigation__name" to="/">
          <span className="is-abbreviated">Adrián</span> Matías Quezada
        </Link>

        <div className="Navigation__links">
          <Link to="/blog">Blog</Link>
          <Link to="/projects">
            <Translatable en="Projects" es="Projectos" />
          </Link>
          <Link to="/about-me">
            <Translatable en="About me" es="Sobre mi" />
          </Link>
        </div>

        <div className="Navigation__controls">
          <button data-action="toggle-lang">
            <span lang="en">🇪🇸</span>
            <span lang="es">🇬🇧</span>
          </button>

          <button data-action="toggle-light-mode">
            <span className="dark-only">☀️</span>
            <span className="light-only">🌙</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
