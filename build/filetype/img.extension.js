['.png', '.svg', '.jpg', '.jpeg', '.mp4', '.mp3', '.woff', '.tiff', '.tif', '.xml'].forEach(extension => {
  require.extensions[extension] = (module, file) => {
    const parts = basename(file).split('.');
    const ext = parts.pop();
    const front = parts.join('.');
    const ref = files.filter(m => m.startsWith(front) && m.endsWith(ext)).pop() || '';
    module.exports = '/' + ref;
  };
});
