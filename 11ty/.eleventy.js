const { readdirSync } = require('fs');
const { join } = require('path');

const lang = process.env.LOCALE || 'en';

module.exports = config => {
  // config.setQuietMode(true);
  config.setBrowserSyncConfig({ files: './dist/css/**/*.css' });

  config.addFilter('log', value => console.log(Object.keys(value)));
  config.addFilter('tr', text => (typeof text === 'string' ? text : text[lang]));

  loadModules('./src/_helpers').forEach(module => config.addShortcode(module.name, module.handler(lang)));
  loadModules('./src/_widgets').forEach(module => config.addPairedShortcode(module.name, module.handler(lang)));

  // config.addShortcode('shortdate', date => `<time>${date.toLocaleDateString(locales[lang], shortDate)}</time>`);

  config.addTransform('add-html-doctype', (content, outputPath) => {
    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');
    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

    return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  });

  // config.addTransform('mdx', (content, outputPath) => {
  //   const isHtml = outputPath.endsWith('.md');
  //   const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

  //   return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  // });

  return {
    // dataTemplateEngine: 'njk',
    // htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'hbs',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };

  function loadModules(path) {
    const dir = join(__dirname, path);

    config.addWatchTarget(path);

    return readdirSync(dir)
      .map(x => x.replace(/\.js$/, ''))
      .map(x => ({ name: x, ...require(join(dir, x)) }));
  }
};
