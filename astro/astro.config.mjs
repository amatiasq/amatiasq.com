import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

globalThis._astroGlobalDebug = (...args) => console.log(...args);

export default defineConfig({
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [react()],
  vite: { ssr: false },
  experimental: { ssr: false },
});
