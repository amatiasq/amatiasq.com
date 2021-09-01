module.exports = function setFilters(eleventyConfig, { lang }) {
  eleventyConfig.addFilter('log', value => console.log(Object.keys(value)));

  eleventyConfig.addFilter('tr', text => (typeof text === 'string' ? text : text[lang]));

  eleventyConfig.addFilter('limit', (arr, limit = Infinity) => (limit < 0 ? arr.slice(limit) : arr.slice(0, limit)));
};
