import { useState } from 'react';

const scripts = registry();
const styles = registry();

let refreshStyles = () => null;
let refreshScripts = () => null;

export type RuntimeProps = {
  css?: string;
  js?: string;
};

export function Runtime({ css, js }: RuntimeProps) {
  if (scripts.touch(js)) {
    refreshScripts();
  }

  console.log(css);
  if (styles.touch(css)) {
    console.log('new styles detected');
    refreshStyles();
  }

  return null;
}

export function RuntimeStyles() {
  const [x, set] = useState(0);
  refreshStyles = () => set(x + 1);
  console.log('RENDERING STYLES');

  const css = styles.dump();
  return <style id="runtime-styles" dangerouslySetInnerHTML={{ __html: css.join('\n') }} />;
}

export function RuntimeScripts() {
  const [x, set] = useState(0);
  refreshScripts = () => set(x + 1);

  const js = scripts.dump(x => x.replace(/  +/g, ' ').trim());
  return <script id="runtime-scripts" dangerouslySetInnerHTML={{ __html: js.join(';\n') }} />;
}

function registry() {
  const entries = new Set<string>();

  return {
    touch(value: string) {
      if (value == null) {
        return false;
      }

      const had = entries.has(value);

      if (!had) {
        entries.add(value);
      }

      return !had;
    },

    dump(iterator?: (x: string) => string) {
      const list = Array.from(entries);
      // entries.clear();
      return iterator ? list.map(iterator) : list;
    },
  };
}
