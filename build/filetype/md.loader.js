const { markdownToJs } = require('./md.import');

module.exports = function (content) {
  if (this.cacheable) this.cacheable();
  return markdownToJs(content, this.resourcePath);
};
