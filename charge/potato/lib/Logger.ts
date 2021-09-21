type Params = Parameters<typeof console.log>;

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export class Logger {
  constructor(readonly prefix: string[], public level = LogLevel.INFO) {}

  extend(prefix: string, level = this.level) {
    return new Logger([...this.prefix, prefix], level);
  }

  debug(...args: Params) {
    if (this.level <= LogLevel.DEBUG) {
      console.log(...this.prefix, ...args);
    }
  }

  info(...args: Params) {
    if (this.level <= LogLevel.INFO) {
      console.log(...this.prefix, ...args);
    }
  }

  warn(...args: Params) {
    if (this.level <= LogLevel.WARN) {
      console.warn(...this.prefix, ...args);
    }
  }

  error(...args: Params) {
    if (this.level <= LogLevel.ERROR) {
      console.error(...this.prefix, ...args);
    }
  }
}
