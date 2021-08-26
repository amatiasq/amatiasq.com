module.exports = config => {
  // config.setQuietMode(true);

  config.addFilter('log', value => console.log(Object.keys(value)));
  config.addFilter('tr', text => (typeof text === 'string' ? text : text.en));
  // config.addJavaScriptFunction('map', (data, name, handler) => data.collections[name].map(handler).join(''));

  config.addTransform('add-html-doctype', (content, outputPath) => {
    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');
    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

    return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  });

  return {
    // dataTemplateEngine: 'njk',
    // htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'hbs', '11ty.js'],
    markdownTemplateEngine: 'hbs',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
