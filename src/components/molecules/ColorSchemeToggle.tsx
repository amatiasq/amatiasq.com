import React from 'react';
import { css } from '../../generate/mod.ts';
import { frontendScript, ScriptWithUtils } from '../atoms/ScriptWithUtils.tsx';

const lightThemeClass = 'light-scheme';
const loadColorScheme = await frontendScript('colorScheme.js');

export interface ColorSchemeToggleProps {
  className?: string;
}

export function ColorSchemeToggle({ className = '' }: ColorSchemeToggleProps) {
  const styles = css`
    ${colorScheme(
      '',
      'span:first-child { display: none; }',
      'span:last-child { display: none; }'
    )}
    appearance: none;
    background: none;
    border: none;
    font-size: inherit;
  `;

  return (
    <>
      <button className={`${styles} ${className}`} data-togglecolorscheme>
        <span>🌒</span>
        <span>☀️</span>
      </button>

      <ScriptWithUtils asap>{loadColorScheme}</ScriptWithUtils>
    </>
  );
}

export function colorScheme(selector: string, dark: string, light: string) {
  const nonRootSelector = selector === ':root' ? '' : selector;

  return `
    :where(html:not(.${lightThemeClass})) ${nonRootSelector} { ${dark} }

    @media (prefers-color-scheme: light) {
      :where(html) ${nonRootSelector} { ${light} }
    }

    :where(html.${lightThemeClass}) ${nonRootSelector} { ${light} }
  `;
}
