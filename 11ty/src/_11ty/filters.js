module.exports = function setFilters(eleventyConfig) {
  eleventyConfig.addFilter('log', value => console.log(Object.keys(value)));
  eleventyConfig.addFilter('tr', text => (typeof text === 'string' ? text : text[lang]));
};
