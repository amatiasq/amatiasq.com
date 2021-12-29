import mdx from 'https://esm.sh/@mdx-js/mdx@2.0.0-ci.53';
import { Data } from 'lume/core.ts';
import JsxEngine from 'lume/core/engines/jsx.ts';
import Site from 'lume/core/site.ts';
import { isPlainObject } from 'lume/core/utils.ts';

async function mdxLoader(path: string) {
  const content = await Deno.readTextFile(path);
  const jsx = await mdx(content);
  const mod = await loadModuleFromString(path, jsx);
  const data: Data = {};

  for (const [name, value] of Object.entries(mod)) {
    if (name === 'default') {
      if (isPlainObject(value)) {
        Object.assign(data, value);
      } else {
        data.content = value;
      }
      continue;
    }

    data[name] = value;
  }

  return data;
}

export default function () {
  return (site: Site) => {
    const processor = new JsxEngine();
    site.loadPages(['.mdx'], mdxLoader, processor);
  };
}

async function loadModuleFromString(path: string, module: string) {
  const random = Math.round(Math.random() * 1_000_000);
  const tmpPath = `${path}.${random}.tsx`;
  await Deno.writeTextFile(tmpPath, module);
  const mod = import(tmpPath);
  // await Deno.remove(tmpPath);
  return mod;
}
