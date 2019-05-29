import { Console } from './Console';

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
