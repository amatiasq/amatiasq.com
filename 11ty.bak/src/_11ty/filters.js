module.exports = function setFilters(eleventyConfig, { lang }) {
  const filters = {
    log: value => console.log(Object.keys(value)),
    tr: text => (typeof text === 'string' ? text : text[lang]),
    limit: (arr, limit = Infinity) => (limit < 0 ? arr.slice(limit) : arr.slice(0, limit)),
  };

  for (const [name, filter] of Object.entries(filters)) {
    eleventyConfig.addFilter(name, filter);
  }
};
