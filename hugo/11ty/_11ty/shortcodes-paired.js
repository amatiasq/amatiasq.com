module.exports = function setShortcodes(eleventyConfig, { markdown }) {
  eleventyConfig.addPairedShortcode('markdown', content => markdown.render(content));
};
