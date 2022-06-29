export const cssColor = {
  background: '#1B2430',
  foreground: '#FDFBF8',
  link: '#A8E0FF',
  primary: '#FFC670',
};

export const cssFontSize = {
  xs: '14px',
  sm: '18px',
  md: '24px',
  lg: '32px',
  xl: '42px',
};

export const cssFontWeight = {
  regular: 400,
  bold: 700,
};

export const cssBreakpoint = {
  narrow: '@media (min-width: 375px)',
  medium: '@media (min-width: 769px)',
  wide: '@media (min-width: 1200px)',
};

export const cssSpace = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '40px',
};

export const cssGlobal = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  :root {
    background-color: ${cssColor.background};
    color: ${cssColor.foreground};
    font-family: Inter, Helvetica;
    font-size: 18px;
  }

  a {
    color: ${cssColor.link};
  }
`;

export const cssReset = `
  /* Box sizing rules */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul, ol {
    padding: 0;
  }

  /* Remove default margin */
  body, h1, h2, h3, h4, p, ul, ol, li, figure, figcaption, blockquote, dl, dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul, ol {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input, button, textarea, select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
