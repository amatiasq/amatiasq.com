import * as esm from '../lib/esm.ts';
import { Workdir, WorkdirFile } from '../lib/Workdir.ts';

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
    return Promise.resolve(this._getFile(file));
  }

  import(file: WorkdirFile): Promise<any> {
    const { ext } = file;

    if (!esm.isValidExtension(ext)) {
      throw new Error(`Invalid module extension: ${ext}`);
    }

    return esm[ext]`${this._getFile(file)}`;
  }

  write(filePath: string, content: string): Promise<void> {
    this.output[filePath] = content;
    return Promise.resolve();
  }

  private _getFile(file: WorkdirFile) {
    return this.files[file.path];
  }
}
