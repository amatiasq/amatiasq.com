const { readdirSync } = require('fs');
const { join } = require('path');

const lang = process.env.LOCALE || 'en';

module.exports = eleventyConfig => {
  const markdown = createMarkdownLibrary();

  loadConfigDir(eleventyConfig, './src/_11ty', { lang, markdown });

  eleventyConfig.setQuietMode(true);
  eleventyConfig.setBrowserSyncConfig({ files: './dist/css/**/*.css' });
  eleventyConfig.setLibrary('md', markdown);

  return {
    templateFormats: ['md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};

function loadConfigDir(eleventyConfig, path, params) {
  const dir = join(__dirname, path);

  eleventyConfig.on('beforeWatch', modified => {
    if (modified.some(filePath => filePath.startsWith(path))) {
      modified.push('./.eleventy.js');
    }
  });

  return readdirSync(dir)
    .map(x => x.replace(/\.js$/, ''))
    .map(x => requireFromDisk(join(dir, x)))
    .forEach(x => x(eleventyConfig, params));

  function requireFromDisk(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
  }
}

function createMarkdownLibrary() {
  const markdownIt = require('markdown-it');

  return (
    markdownIt({
      html: true, // html tag inside source
      breaks: true, // use '\n' as <br>
      linkify: true, // Autoconvert URL-like text to links
    })
      // ==mark==   to   <mark>mark<mark>
      .use(require('markdown-it-mark'))
      // # header {.my-class}   to   <h1 class="my-class">header</h1>
      .use(require('markdown-it-attrs'), {
        // use {:} options
        leftDelimiter: '{:',
        rightDelimiter: '}',
      })
      // [[toc]] generates Table Of Contents
      .use(require('markdown-it-table-of-contents'))
      // [ ] or [x] to checkbox
      .use(require('markdown-it-task-lists'))
      // [[Ctrl]] to <kbd>Ctrl</kdb>
      .use(require('markdown-it-kbd'))
      // ^[Inlines footnotes]
      .use(require('markdown-it-footnote'))
  );

  // .use(require('@gerhobbelt/markdown-it-inline-text-color'));
  // .use(require('markdown-it-emoji'))
  // .use(require('@iktakahiro/markdown-it-katex'))
}

function createFullMarkdownLibrary() {
  // Add anchor links to headers
  return createMarkdownLibrary();
  // .use(require('markdown-it-anchor'), {
  //   permalink: true,
  //   permalinkClass: 'direct-link',
  //   permalinkSymbol: '#',
  // });
}
