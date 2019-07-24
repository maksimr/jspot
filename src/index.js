import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { Console } from '../lib/Console';
import { App } from './components/App';

const workerConsole = new Console();
var process = null;


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
  if (process) process.terminate();
  workerConsole.clear();
  process = Executor.runAsync(code);
  process.addEventListener('message', rerenderAfter((it) => workerConsole.log(it.data)));
  process.addEventListener('error', rerenderAfter((it) => workerConsole.error(it.message)));
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
