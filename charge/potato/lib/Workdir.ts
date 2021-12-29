import { expandGlobSync } from 'https://deno.land/std@0.107.0/fs/expand_glob.ts';
import { copy } from 'https://deno.land/std@0.107.0/fs/mod.ts';
import {
  dirname,
  extname,
  join
} from 'https://deno.land/std@0.107.0/path/mod.ts';

export class Workdir {
  static async createFrom(inputPath: string, outputPath: string) {
    const tmp = await Deno.makeTempDir({ prefix: 'ssg' });
    await copy(inputPath, tmp);
    return new Workdir(tmp, outputPath);
  }

  constructor(readonly inputPath: string, readonly outputPath: string) {}

  list() {
    const glob = `${this.inputPath}/**/*`;

    return Array.from(expandGlobSync(glob))
      .filter(x => !x.isDirectory)
      .map(x => {
        return new WorkdirFile(x.path);
      });
  }

  read(file: WorkdirFile) {
    return Deno.readTextFile(file.path);
  }

  import(file: WorkdirFile) {
    return import(file.path);
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

  constructor(readonly path: string) {}

  removeExtension() {
    return this.path.substr(0, this.path.length - this.ext.length - 1);
  }
}
