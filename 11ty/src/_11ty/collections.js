module.exports = function setCollections(eleventyConfig) {
  eleventyConfig.addCollection('posts', collectionApi => collectionApi.getFilteredByGlob('./src/blog/*.md').reverse());

  eleventyConfig.addCollection('projects', collectionApi =>
    collectionApi.getFilteredByGlob(['./src/projects/*.md', './src/experiments/*.md', './src/talks/*.md']),
  );
};
