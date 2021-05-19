require.extensions['.codegen'] = (module, file) => {
  const content = readFileSync(file, 'utf8');
  module._compile(content, file);
  const code = module.exports();
  module._compile(code, file);
};
