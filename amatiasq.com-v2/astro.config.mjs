import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
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
