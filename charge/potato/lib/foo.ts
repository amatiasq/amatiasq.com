// @deno/types="https://esm.sh/@mdx-js/mdx"
import mdx from 'https://esm.sh/@mdx-js/mdx';

const result = await mdx(`
# Title
`);

console.log(result);
