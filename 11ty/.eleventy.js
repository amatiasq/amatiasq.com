const { readdirSync } = require('fs');
const { join } = require('path');
const Nunjucks = require('nunjucks');

const lang = process.env.LOCALE || 'en';
const config = {
  // dataTemplateEngine: 'njk',
  // htmlTemplateEngine: 'njk',
  templateFormats: ['md', 'njk', '11ty.js'],
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'src',
    output: 'dist',
  },
};

module.exports = eleventyConfig => {
  // eleventyConfig.setQuietMode(true);
  eleventyConfig.setBrowserSyncConfig({ files: './dist/css/**/*.css' });

  configureNunjucks(eleventyConfig);
  setLayoutAliases(eleventyConfig);
  setFiltersAndShortcodes(eleventyConfig);
  addHtmlTransform(eleventyConfig);

  return config;
};

function configureNunjucks(eleventyConfig) {
  const loader = new Nunjucks.FileSystemLoader('src/_includes');
  const env = new Nunjucks.Environment(loader, {
    // throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true,
  });

  eleventyConfig.setLibrary('njk', env);
}

function setLayoutAliases(eleventyConfig) {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('designed', 'layouts/designed.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
}

function setFiltersAndShortcodes(eleventyConfig) {
  eleventyConfig.addFilter('log', value => console.log(Object.keys(value)));
  eleventyConfig.addFilter('tr', text => (typeof text === 'string' ? text : text[lang]));

  loadModules('./src/_helpers').forEach(x => eleventyConfig.addShortcode(x.name, x.handler(lang)));
  loadModules('./src/_widgets').forEach(x => eleventyConfig.addPairedShortcode(x.name, x.handler(lang)));

  function loadModules(path) {
    const dir = join(__dirname, path);

    eleventyConfig.addWatchTarget(path);

    return readdirSync(dir)
      .map(x => x.replace(/\.js$/, ''))
      .map(x => ({ name: x, ...require(join(dir, x)) }));
  }
}

function addHtmlTransform(eleventyConfig) {
  eleventyConfig.addTransform('add-html-doctype', (content, outputPath) => {
    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');
    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

    return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  });
}
