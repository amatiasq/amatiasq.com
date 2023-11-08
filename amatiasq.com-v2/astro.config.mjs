import solidJs from "@astrojs/solid-js";
import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
  // trailingSlash: 'always',
  scopedStyleStrategy: 'class',
  integrations: [solidJs(), mdx()],
  vite: {
    plugins: [
      {
        name: "Watch content files",
        buildStart() {
          this.addWatchFile('src/content');
        }
      }
    ]
  }
});
