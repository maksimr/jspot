import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { App } from './components/App';

var process = null;


doRender();


function doRender() {
  const rootNode = document.getElementById('app');
  const value = getSavedValue();
  render(h(App, {
    value: value,
    onChange: saveValue,
    onRun: doEval
  }), rootNode, rootNode.lastChild);
}


function doEval(code) {
  if (process) process.terminate();
  process = Executor.runAsync(code);
  process.addEventListener('message', (it) => console.log(it.data));
  process.addEventListener('error', (it) => console.error(it.message));
  doRender();
}


function getSavedValue() {
  return localStorage.getItem('value') || '';
}


function saveValue(value) {
  localStorage.setItem('value', value);
}
