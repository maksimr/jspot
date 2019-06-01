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
    this.data = [];

    Object.keys(console).forEach((it) => {
      if (typeof console[it] === 'function') {
        this[it] = (...args) => {
          this.data.push(new LogEntry(it, args));
        };
      }
    });
  }

  flush() {
    const data = this.queue();
    this.clear();
    return data;
  }

  queue() {
    return [].concat(this.data);
  }

  clear() {
    this.data.length = 0;
  }
}
