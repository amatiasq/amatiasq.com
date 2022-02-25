module.exports = function setLayoutAliases(eleventyConfig) {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('designed', 'layouts/designed.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
};
