import { Process } from './Process';

export class Executor {
  static runAsync(code) {
    return Process.exec(code);
  }
}
