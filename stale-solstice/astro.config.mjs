import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
  // trailingSlash: 'always',
  scopedStyleStrategy: 'class',
  integrations: [solidJs(), mdx()]
});