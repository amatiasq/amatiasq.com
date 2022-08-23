import React from 'react';
import { usePageUtils } from './PageUtils.tsx';
import { tr, Translatable, useLang } from './Lang.tsx';
import { css } from '../mod.ts';
import { cssColor } from '../../theme.ts';

let imgRoot = '/img';

export function setImgRoot(root: string) {
  imgRoot = root;
}

export interface ImgProps {
  className?: string;
  src: Translatable;
  alt: Translatable;
}

export function Img({ className, src, alt }: ImgProps) {
  const { asset } = usePageUtils();
  const lang = useLang();
  const localeSrc = tr(src, lang);

  return (
    <img
      className={`${getStyles()} ${className}`}
      src={asset(`${imgRoot}/${localeSrc}`)}
      alt={tr(alt, lang)}
    />
  );
}

export function renderImage(path: string, asset: (path: string) => string) {
  return `<img class="${getStyles()}" src="${asset(`${imgRoot}/${path}`)}"`;
}

function getStyles() {
  return css`
    border: 3px solid ${cssColor.border};
    border-radius: 3px;
  `;
}
