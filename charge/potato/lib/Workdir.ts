import { expandGlobSync } from 'https://deno.land/std@0.107.0/fs/expand_glob.ts';
import { extname, join } from 'https://deno.land/std@0.107.0/path/mod.ts';

export class Workdir {
  constructor(readonly inputPath: string, readonly outputPath: string) {}

  list() {
    const glob = `${this.inputPath}/**/*`;

    return Array.from(expandGlobSync(glob))
      .filter(x => !x.isDirectory)
      .map(x => new WorkdirFile(x.path));
  }

  read(file: WorkdirFile) {
    return Deno.readTextFile(file.path);
  }

  write(filePath: string, content: string) {
    return Deno.writeTextFile(join(this.outputPath, filePath), content);
  }
}

export class WorkdirFile {
  get ext() {
    return extname(this.path).substr(1);
  }

  constructor(readonly path: string) {}
}

// Mock

export type MockedFs = Record<string, string>;

export class MockedWorkdir implements Workdir {
  readonly output: MockedFs = {};
  readonly inputPath = 'inputPath';
  readonly outputPath = 'outputPath';

  constructor(private readonly files: MockedFs) {}

  list(): WorkdirFile[] {
    return Object.keys(this.files).map(x => new WorkdirFile(x));
  }

  read(file: WorkdirFile): Promise<string> {
    return Promise.resolve(this.files[file.path]);
  }

  write(filePath: string, content: string): Promise<void> {
    this.output[filePath] = content;
    return Promise.resolve();
  }
}
