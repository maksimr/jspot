import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { App } from './components/App';

var process = null;


doRender();


function doRender() {
  const rootNode = document.getElementById('app');
  const value = localStorage.getItem('value') || '';
  render(h(App, {
    value: value,
    onChange: (value) => localStorage.setItem('value', value),
    onRun: doEval
  }), rootNode, rootNode.lastChild);
}


function doEval(code) {
  if (process) process.terminate();
  process = Executor.runAsync(code);
  process.addEventListener('message', (it) => {
    if (it.loc) {
      const line = it.loc.end.line;
      const linode = document.querySelectorAll('.CodeMirror-line')[line - 1];
      const textNode = lineNode.querySelector('.hint') || document.createElement('span');
      if (!textNode.classList.contains('hint')) textNode.classList.add('hint');
      textNode.innerText = it.data.join(', ');
      lineNode.appendChild(textNode);
    }
  });
  process.addEventListener('error', (it) => console.error(it.message));
  doRender();
}
