const extensions = {
  js: 'application/javascript',
  ts: 'application/typescript',
  jsx: 'text/jsx',
  tsx: 'text/tsx',
} as const;

type Extensions = typeof extensions;
type ValidExtension = keyof Extensions;
type ValidMediaType = Extensions[ValidExtension];

export default function esm(mime: ValidMediaType) {
  return (text: TemplateStringsArray, ...rest: string[]) => {
    const code = String.raw(text, rest);
    const encoded = `data:${mime};charset=utf-8,${encodeURIComponent(code)}`;
    return import(encoded);
  };
}

export const js = esm(extensions.js);
export const ts = esm(extensions.ts);
export const jsx = esm(extensions.jsx);
export const tsx = esm(extensions.tsx);

export function isValidExtension(ext: string): ext is ValidExtension {
  return ext in extensions;
}
