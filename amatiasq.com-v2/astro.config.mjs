import { defineConfig } from 'astro/config';
import { basePath } from './package.json';

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
  base: basePath,
  // trailingSlash: 'always',
  scopedStyleStrategy: 'class',
  integrations: [],
  vite: {
    plugins: [
      {
        name: "Watch content files",
        buildStart() {
          this.addWatchFile('src/content/**/*.md');
        }
      }
    ]
  }
});
