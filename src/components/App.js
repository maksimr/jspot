import { h } from 'preact';
import { Editor } from './Editor';
import { Console } from './Console';

export function App(props) {
  return h('div', null,
    h(Editor, { onRun: props.onRun }),
    h(Console, { entities: props.entities })
  );
};
