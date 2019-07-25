import { h } from 'preact';
import { Editor } from './Editor';

export function App(props) {
  return h('div', null,
    h(Editor, {onRun: props.onRun, value: props.value, onChange: props.onChange})
  );
}
