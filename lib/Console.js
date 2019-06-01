class LogEntry {
  constructor(level, args) {
    this.level = level;
    this.args = args;
  }

  text() {
    return this.args.join(' ');
  }
}


export class Console {
  constructor() {
    this.entries = [];

    Object.keys(console).forEach((it) => {
      if (typeof console[it] === 'function') {
        this[it] = (...args) => {
          this.entries.push(new LogEntry(it, args));
        };
      }
    });
  }

  flush() {
    const data = [].concat(this.entries);
    this.entries.length = 0;
    return data;
  }
}
