module.exports = function addTransforms(eleventyConfig) {
  eleventyConfig.addTransform('add-html-doctype', (content, outputPath) => {
    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');
    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

    return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  });
};
