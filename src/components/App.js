import { h } from 'preact';
import { Editor } from './Editor';
import { Console } from './Console';

export function App(props) {
  return h('div', null,
    h(Editor, {onRun: props.onRun, value: props.value, onChange: props.onChange}),
    h(Console, {entities: props.entities})
  );
}
