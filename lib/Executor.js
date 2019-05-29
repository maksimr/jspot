class LogEntry {
  constructor(level, args) {
    this.level = level;
    this.args = args;
  }

  text() {
    return this.args.join(' ');
  }
}

class Console {
  constructor() {
    this.entries = [];

    Object.keys(console).forEach((it) => {
      if (typeof console[it] === 'function') {
        this[it] = (...args) => {
          this.entries.push(new LogEntry(it, args))
        }
      }
    });
  }

  flush() {
    const data = [].concat(this.entries);
    this.entries.length = 0;
    return data;
  }
}

export class Executor {
  static run(code) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const window = iframe.contentWindow;
    const doEval = window.eval;
    const console = new Console();

    try {
      window.console = console;
      doEval(code);
    } catch (error) {
      console.error(error);
    }

    document.body.removeChild(iframe);

    return console.flush();
  }
}
