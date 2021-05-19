const { load: parseYaml } = require('js-yaml');
const remark = require('remark');
const html = require('remark-html');

const markdown = remark().use(html);

module.exports = { markdownToJs };

function markdownToJs(content, path) {
  const data = parseMarkdown(content, basename(path));
  const json = JSON.stringify(data);
  return `module.exports = ${json}`;
}

function parseMarkdown(content, key) {
  const [, metadata, enRaw, esRaw] = content.split('---').map(x => x.trim());
  const meta = parseYaml(metadata, {});

  if (!esRaw) {
    return { key, ...meta, content: markdownToHtml(enRaw) };
  }

  const en = markdownToHtml(enRaw);
  const es = markdownToHtml(esRaw);

  return { key, ...meta, content: { en, es } };
}

function markdownToHtml(text) {
  const result = markdown.processSync(text);
  return result.toString().trim();
}
