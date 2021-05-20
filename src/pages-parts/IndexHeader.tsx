import './IndexHeader.scss';

import React from 'react';

export function IndexHeader() {
  return (
    <header className="IndexHeader">
      <div className="container">
        <div>
          <h1>I'm A. Matías Quezada.</h1>

          <p>
            I'm a human who codes. This website is my digital garden — a compendium of the things I've learned and
            created over the years.
          </p>
        </div>

        <div>
          <img src="/foto-cropped.png" alt="Matias" className="avatar" />
        </div>
      </div>
    </header>
  );
}
