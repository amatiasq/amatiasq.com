import { colorScheme } from './components/molecules/ColorSchemeToggle.tsx';
import { bouncyLinkStyles } from './util/bouncyLinkTransition.ts';
import { externalLinkStyles } from './util/externalLinkStyles.ts';

const primaryColor = '#00FBFF';

const dark = `
  --brand: ${primaryColor};
  --text1: #FDFBF8;
  --text2: ${primaryColor};
  // --text3: var(--);
  --text4: #FFFFFF;
  --surface1: #263238;
  --surface2: #161b22;
  --surface3: ${primaryColor};
  --border: #586369;
`;

const light = `
  --brand: #0006B0;
  --text1: #3a3a3a;
  --text2: #0006B0;
  // --text3: var(--);
  --text4: #000000;
  --surface1: #dae2e7;
  --surface2: #e3e7ed;
  --surface3: #0006B0;
  --border: gray;
`;

export const cssColor = {
  brand: 'var(--brand)',
  text1: 'var(--text1)',
  text2: 'var(--text2)',
  text3: 'var(--text3)',
  text4: 'var(--text4)',
  surface1: 'var(--surface1)',
  surface2: 'var(--surface2)',
  surface3: 'var(--surface3)',
  border: 'var(--border)',
};

export const cssFontSize = {
  xs: '14px',
  sm: '18px',
  md: '24px',
  lg: '32px',
  xl: '46px',
};

export const cssFontWeight = {
  regular: 400,
  bold: 700,
};

export const cssBreakpoint = {
  narrow: '@media (min-width: 610px)',
  onlyNarrow: '@media (max-width: 610px)',
  medium: '@media (min-width: 769px)',
  wide: '@media (min-width: 1200px)',
};

export const cssSpace = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '40px',
};

export const cssAnimationSpeed = {
  fastest: '0.05s',
  fast: '0.15s',
  medium: '0.3s',
  slow: '1s',
};

export const cssAnimationFunction = {
  startquick: 'cubic-bezier(0,.5,0,1)',
  bouncy: 'cubic-bezier(0.25, 0.1, 0, 2.05)',
};

const fonts = ['Nunito Sans', 'Nunito', 'Inconsolata'];

export const cssFontFamily = {
  default: `${fonts[0]}, sans-serif`,
  header: `${fonts[1]}, sans-serif`,
  code: `${fonts[2]}, monospace`,
};

export const cssDeps = [
  'https://unpkg.com/open-props@1.4.16/open-props.min.css',
  // 'https://unpkg.com/open-props@1.4.16/normalize.min.css',
  `https://fonts.googleapis.com/css2?display=swap&${fonts
    .map((x) => `family=${x.replace(/\s/g, '+')}:wght@400;700`)
    .join('&')}`,
];

export const cssGlobal = `
  ${colorScheme(':root', dark, light)}

  body {
    background-color: ${cssColor.surface1};
    color: ${cssColor.text1};
    font-family: ${cssFontFamily.default};
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 0.5px;
  }

  header, h1, h2, h3, h4, h5, h6 {
    font-family: ${cssFontFamily.header};
  }

  a {
    color: ${cssColor.brand};
    text-decoration: none;
  }
  ${externalLinkStyles(primaryColor)}
  ${bouncyLinkStyles()}

  ol { padding: 0; }
  li { list-style: none; }

  code {
    font-family: ${cssFontFamily.code};
  }

  svg {
    // TODO: currentColor
    fill: ${cssColor.text1};
  }

  iframe {
    width: var(--available-width);
    height: var(--available-width);
    border: 2px solid ${cssColor.border};
  }

  summary {
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  .md summary {
    list-style: unset;
  }
  .md summary::-webkit-details-marker {
    display: unset;
  }
`;

// Imported from https://github.com/jensimmons/cssremedy/blob/master/css/remedy.css
export const cssReset = `
  *, ::before, ::after { box-sizing: border-box; }

  html { line-sizing: normal; }

  body { margin: 0; }

  [hidden] { display: none; }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.17rem; }
  h4 { font-size: 1.00rem; }
  h5 { font-size: 0.83rem; }
  h6 { font-size: 0.67rem; }

  h1 { margin: 0.67em 0; }

  pre { white-space: pre-wrap; }

  hr {
    border-style: solid;
    border-width: 1px 0 0;
    color: inherit;
    height: 0;
    overflow: visible;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
    max-width: 100%;
  }
  audio:not([controls]) { display:none; }

  picture { display: contents; }
  source { display: none; }

  img, svg, video, canvas {
    height: auto;
  }

  audio { width: 100%; }

  img { border-style: none; }

  svg { overflow: hidden; }

  article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-name: none !important;
      transition: none !important;
    }
  }
`;
