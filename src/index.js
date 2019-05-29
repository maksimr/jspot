import { h, render } from 'preact';
import { Executor } from '../lib/Executor';
import { App } from './components/App';

doRender();

function doRender(entities) {
  const rootNode = document.getElementById('app');
  render(h(App, {
    onChange: doEval,
    entities: entities
  }), rootNode, rootNode.lastChild);
}


function doEval(code) {
  doRender(
    Executor.run(code)
  );
}
