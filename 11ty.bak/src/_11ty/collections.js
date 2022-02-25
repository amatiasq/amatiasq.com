module.exports = function setCollections(eleventyConfig) {
  const globs = {
    posts: './src/blog/*.md',
    projects: ['./src/projects/*.md', './src/experiments/*.md', './src/talks/*.md'],
  };

  for (const [name, filter] of Object.entries(globs)) {
    eleventyConfig.addCollection(name, collectionApi => collectionApi.getFilteredByGlob(filter).reverse());
  }
};
