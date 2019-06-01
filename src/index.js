import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { Console } from '../lib/Console';
import { App } from './components/App';

const workerConsole = new Console();
var worker = null;


doRender();


function doRender() {
  const rootNode = document.getElementById('app');
  const value = getSavedValue();
  render(h(App, {
    value: value,
    onChange: saveValue,
    onRun: doEval,
    entities: workerConsole.queue()
  }), rootNode, rootNode.lastChild);
}


function doEval(code) {
  if (worker) worker.terminate();
  workerConsole.clear();
  worker = Executor.runAsync(code);
  worker.addEventListener('message', rerenderAfter((it) => workerConsole.log(it.data)));
  worker.addEventListener('error', rerenderAfter((it) => workerConsole.error(it.message)));
  doRender();
}


function rerenderAfter(fn) {
  return (...args) => {
    fn(...args);
    doRender();
  };
}


function getSavedValue() {
  return localStorage.getItem('value') || '';
}


function saveValue(value) {
  localStorage.setItem('value', value);
}
