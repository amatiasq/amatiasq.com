const { readdirSync } = require('fs');
const { join } = require('path');

const lang = process.env.LOCALE || 'en';

module.exports = eleventyConfig => {
  // eleventyConfig.setQuietMode(true);
  eleventyConfig.setBrowserSyncConfig({ files: './dist/css/**/*.css' });
  eleventyConfig.setLibrary('md', createFullMarkdownLibrary());

  const markdown = createMarkdownLibrary();
  const params = { lang, markdown };

  loadModules('./src/_11ty').forEach(x => x(eleventyConfig, params));

  return {
    templateFormats: ['md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};

function loadModules(path) {
  const dir = join(__dirname, path);
  return readdirSync(dir)
    .map(x => x.replace(/\.js$/, ''))
    .map(x => require(join(dir, x)));
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
      // ::: container to <div class="container">
      .use(require('markdown-it-container'), 'container')
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
