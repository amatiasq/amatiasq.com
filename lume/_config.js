import lume from 'https://deno.land/x/lume@v0.19.0/mod.js';
import jsx from 'https://deno.land/x/lume/plugins/jsx.js';

const site = lume();

site.use(jsx());

export default site;
