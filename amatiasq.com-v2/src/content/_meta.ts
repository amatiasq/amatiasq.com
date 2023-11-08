import type { Translatable } from '../internals/i18n';

export interface ImageDeclaration {
  src: Translatable;
  en: string;
  es: string;
  center?: `${number}% ${number}%`;
}

export interface BaseMetadata {
  labels?: Translatable[];
  pinned: true;
}

// Metadata of most collections
export interface Showcaseable extends BaseMetadata {
  title: Translatable;
  image: ImageDeclaration;
  tags?: Translatable[];
  iframe?: true | { src?: Translatable; style: string };

  links?: {
    live?: string;
    github?: string;
    video?: string | string[];
    wikipedia: Translatable;
  };
}
