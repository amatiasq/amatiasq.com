import axios from 'axios';
import fs from 'fs';
import { load as parseYaml } from 'js-yaml';
import { join } from 'path';
import remark from 'remark';
import html from 'remark-html';
import { promisify } from 'util';

const DATA_DIR = join(process.cwd(), 'src', 'data');
const markdown = remark().use(html);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export default async () => {
  const { data: posts } /* :{ data: Post[] } */ = await axios.get('https://jsonplaceholder.typicode.com/posts');

  return [
    {
      path: '/',

      async getData() {
        return {
          jobPositions: await loadAllMds('jobHistory'),
          talks: await loadAllMds('talks'),
          experiments: await loadAllMds('experiments'),
          projects: await Promise.all([
            loadMd('projects/better-gist'),
            loadMd('projects/lulas'),
            loadMd('projects/mud'),
            loadMd('projects/genara'),
          ]),
        };
      },
    },

    {
      path: '/blog',

      getData: () => ({
        posts,
      }),

      children: posts.map((post /* : Post */) => ({
        path: `/post/${post.id}`,
        template: 'src/containers/Post',
        getData: () => ({
          post,
        }),
      })),
    },
  ];
};

async function loadAllMds(name) {
  const path = join(DATA_DIR, name);
  const files = await readdir(path);
  const promises = files.map(x => loadMd(join(name, x)));
  return Promise.all(promises);
}

async function loadMd(key) {
  const path = join(DATA_DIR, /\.md$/.test(key) ? key : `${key}.md`);
  const content = await readFile(path, 'utf8');
  const [, metadata, enRaw, esRaw] = content.split('---').map(x => x.trim());

  const meta = parseYaml(metadata, {});

  if (!esRaw) {
    return { key, ...meta, content: await markdownToHtml(enRaw) };
  }

  const [en, es] = await Promise.all([markdownToHtml(enRaw), markdownToHtml(esRaw)]);

  return { key, ...meta, content: { en, es } };
}

async function markdownToHtml(text) {
  const result = await markdown.process(text);
  return result.toString().trim();
}
