import { colorScheme } from '../components/molecules/ColorSchemeToggle.tsx';
import { svgToUrl } from './svgToUrl.ts';

const svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="COLOR_PLACEHOLDER"
    stroke="COLOR_PLACEHOLDER"
    viewBox="0 0 24 24"
  >
    <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"/>
  </svg>
`;

const getExternalLinkBackground = (color: string) =>
  svgToUrl(svg.replace(/COLOR_PLACEHOLDER/g, color));

type LinkColors = { default: string; visited: string };

export function linkStyles(colors: { dark: LinkColors; light: LinkColors }) {
  return `
    a { text-decoration: none; }

    ${colorScheme(
      'a[href]',
      `color: ${colors.dark.default}`,
      `color: ${colors.light.default}`
    )}

    ${colorScheme(
      'a[href]:visited',
      `color: ${colors.dark.visited}`,
      `color: ${colors.light.visited}`
    )}

    ${externalLinkStyles(colors)}
  `;
}

function externalLinkStyles(colors: { dark: LinkColors; light: LinkColors }) {
  const bg = (x: string) =>
    `background-image: ${getExternalLinkBackground(x)};`;

  const selector = [
    'a',
    '[href^="http"]',
    ':not([href^="https://amatiasq.com"])',
    ':not([href^="https://repos.amatiasq.com"])',
    ':not(.no-external)',
  ].join('');

  return `
    ${selector}::after {
      content: '';
      margin-left: 0.5em;
      width: 0.8em;
      height: 0.8em;
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    ${colorScheme(
      `${selector}::after`,
      bg(colors.dark.default),
      bg(colors.light.default)
    )}

    ${colorScheme(
      `${selector}:visited::after`,
      bg(colors.dark.visited),
      bg(colors.light.visited)
    )}
  `;
}
