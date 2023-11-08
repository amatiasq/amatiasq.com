import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
  base: '/v2',
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
