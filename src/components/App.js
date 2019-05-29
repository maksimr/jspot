import { h } from 'preact';
import { Editor } from './Editor';
import { Console } from './Console';

export function App(props) {
  return h('div', null,
    h(Editor, { onChange: props.onChange }),
    h(Console, { entities: props.entities })
  );
};
