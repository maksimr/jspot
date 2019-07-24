export class Executor {
  static runAsync(code) {
    const blob = new Blob([code], {type: 'text/javascript'});
    return new Worker(window.URL.createObjectURL(blob));
  }
}
