import solidJs from "@astrojs/solid-js";
import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://amatiasq.com',
  // trailingSlash: 'always',
  scopedStyleStrategy: 'class',
  integrations: [solidJs(), mdx()],
  markdown: {
    // remarkPlugins: [testRemarkPlugin],
    // rehypePlugins: [testRehypePlugin],
  }
});

// function testRemarkPlugin() {
//   /**
//    * @param {import('mdast').Root} tree
//    */
//   return function (tree) {
//     console.log(tree)
//   }
// }

// function testRehypePlugin() {
//   /**
//    * @param {import('hast').Root}
//    */
//   return function (tree) {
//     console.log({ tree })
//   }
// }