const { join, relative, basename, dirname } = require('path');
const { readdirSync, statSync, readFileSync } = require('fs');
const { load: parseYaml } = require('js-yaml');
const remark = require('remark');
const html = require('remark-html');

const markdown = remark().use(html);

module.exports = {
  getPages,
  readAllFiles,
  markdownToJson,
  generateMarkdownList,
};

function getAllFiles(dir, extension) {
  const files = [];

  readdirSync(dir)
    .map(m => join(dir, m))
    .forEach(m => {
      if (statSync(m).isDirectory()) {
        files.push(...getAllFiles(m));
      } else if (statSync(m).isFile() && m.endsWith(extension)) {
        files.push(m);
      }
    });

  return files;
}

function readAllFiles(dir, extension) {
  return getAllFiles(dir, extension).map(path => ({ dir, path, content: readFileSync(path, 'utf8') }));
}

function getPages() {
  const dir = join(__dirname, '..', 'pages');

  const pageDetails = readAllFiles(dir, '.tsx').map(({ path, content }) => {
    const route = /export const route = '(.*)';/.exec(content)[1];
    const defaultRoute = relative(dir, path)
      .replace(/\.tsx$/, '')
      .toLowerCase();

    return {
      path,
      modified: statSync(path).mtime,
      route: route || `/${defaultRoute}`,
      folder: relative(__dirname, dirname(path)),
      name: basename(path).replace(/\.tsx$/, ''),
      content,
    };
  });

  return pageDetails;
}

function generateMarkdownList(dir) {
  const files = parseAllMarkdown(dir);
  return `module.exports = [${files.map(x => JSON.stringify(x)).join(',')}]`;
}

function parseAllMarkdown(dir) {
  const files = readAllFiles(dir, '.md');
  return files.map(x => markdownToJson(x.content, basename(x.path)));
}

function markdownToJson(content, key) {
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
