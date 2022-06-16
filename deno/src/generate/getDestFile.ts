import { basename, extname } from 'path';

export function getDestFile(source: string, target: string, file: string) {
  const extension = extname(file);
  const filename = basename(file);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';
  return file.replace(source, target).replace(extension, newExtension);
}
