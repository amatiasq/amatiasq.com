const Nunjucks = require('nunjucks');

module.exports = function configureNunjucks(eleventyConfig) {
  const loader = new Nunjucks.FileSystemLoader('src/_includes');
  const env = new Nunjucks.Environment(loader, {
    // throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true,
  });

  eleventyConfig.setLibrary('njk', env);
};
