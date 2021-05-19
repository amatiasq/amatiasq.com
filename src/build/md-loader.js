const { basename } = require('path');
const { markdownToJson } = require('./helpers');

module.exports = function (content) {
  if (this.cacheable) this.cacheable();
  const data = markdownToJson(content, basename(this.resourcePath));
  const json = JSON.stringify(data);
  return `module.exports = ${json}`;
};
