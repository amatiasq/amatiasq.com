// @ts-check
import { defineConfig } from 'astro/config';
import { languages } from './src/i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://amatiasq.com',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: false,
  scopedStyleStrategy: 'where',
  i18n: {
    defaultLocale: 'en',
    locales: [...languages],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
