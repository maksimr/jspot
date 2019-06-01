import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { Console } from '../lib/Console';
import { App } from './components/App';
const workerConsole = new Console();


doRender();


function doRender() {
  const rootNode = document.getElementById('app');
  render(h(App, {
    onRun: doEval,
    entities: workerConsole.queue()
  }), rootNode, rootNode.lastChild);
}


function doEval(code) {
  workerConsole.clear();
  const worker = Executor.runAsync(code);
  worker.addEventListener('message', rerenderAfter((it) => workerConsole.log(it.data)));
  worker.addEventListener('error', rerenderAfter((it) => workerConsole.error(it.message)));
  doRender();
}


function rerenderAfter(fn) {
  return (...args) => {
    fn(...args);
    doRender();
  }
}
