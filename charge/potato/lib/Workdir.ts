import { expandGlobSync } from 'https://deno.land/std@0.107.0/fs/expand_glob.ts';
import {
  dirname,
  extname,
  join
} from 'https://deno.land/std@0.107.0/path/mod.ts';

export class Workdir {
  constructor(readonly inputPath: string, readonly outputPath: string) {}

  list() {
    const glob = `${this.inputPath}/**/*`;

    return Array.from(expandGlobSync(glob))
      .filter(x => !x.isDirectory)
      .map(x => new WorkdirFile(x.path, () => Deno.readTextFile(x.path)));
  }

  write(filePath: string, content: string) {
    return Deno.writeTextFile(join(this.outputPath, filePath), content);
  }
}

export class WorkdirFile {
  get ext() {
    return extname(this.path).substr(1);
  }

  get dir() {
    return dirname(this.path);
  }

  constructor(readonly path: string, readonly read: () => Promise<string>) {}

  removeExtension() {
    return this.path.substr(0, this.path.length - this.ext.length);
  }
}
