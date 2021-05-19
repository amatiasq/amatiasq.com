const { markdownToJs } = require('./md.import');

require.extensions['.md'] = (module, file) => {
  const content = readFileSync(file, 'utf8');
  module._compile(markdownToJs(content, file), file);
};
