import { Workdir, WorkdirFile } from '../lib/Workdir.ts';

export type MockedFs = Record<string, string>;

export class MockedWorkdir implements Workdir {
  readonly output: MockedFs = {};
  readonly inputPath = 'inputPath';
  readonly outputPath = 'outputPath';

  constructor(private readonly files: MockedFs) {}

  list(): WorkdirFile[] {
    return Object.entries(this.files).map(([path, content]) => new WorkdirFile(path, () => Promise.resolve(content)));
  }

  write(filePath: string, content: string): Promise<void> {
    this.output[filePath] = content;
    return Promise.resolve();
  }
}
