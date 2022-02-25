module.exports = eleventyConfig => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addTransform('add-html-doctype', (content, outputPath) => {
    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');

    if (!isHtml) {
      return content;
    }

    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);
    const clean = content.replace(/ data-emotion="css[^"]+"/g, '');

    return startsWithDoctype ? clean : `${doctype}${clean}`;
  });

  return {
    // dataTemplateEngine: 'md',
    dir: {
      // data: '../data',
      input: 'out/js',
      output: 'out/dist',
    },
  };
};
