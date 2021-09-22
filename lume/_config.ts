import lume from 'lume/mod.ts';
import basePath from 'lume/plugins/base_path.ts';
import bundler from 'lume/plugins/bundler.ts';
import codeHighlight from 'lume/plugins/code_highlight.ts';
import date from 'lume/plugins/date.ts';
import jsx from 'lume/plugins/jsx.ts';
import postcss from 'lume/plugins/postcss.ts';
import slugifyUrls from 'lume/plugins/slugify_urls.ts';

import mdx from './src/plugins/mdx.ts';

const site = lume();

site.use(basePath());
site.use(bundler());
site.use(codeHighlight());
site.use(date());
site.use(jsx());
site.use(postcss());
site.use(slugifyUrls());

site.use(mdx());

export default site;
