module.exports = function addTransforms(eleventyConfig) {
  eleventyConfig.addTransform('add-html-doctype', (content, outputPath) => {
    if (!outputPath) return;

    const doctype = '<!doctype html>';
    const isHtml = outputPath.endsWith('.html');
    const startsWithDoctype = content.trim().toLowerCase().startsWith(doctype);

    return isHtml && !startsWithDoctype ? `${doctype}${content}` : content;
  });
};
