import { h, Component } from 'preact';
import { CodeRunner } from '../../lib/CodeRunner';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/javascript-hint';
import 'style-loader!css-loader!codemirror/lib/codemirror.css';

export class Editor extends Component {
  componentDidMount() {
    const runner = new CodeRunner();
    const editor = new CodeMirror(this.base, {
      value: localStorage.getItem('value') || ''
    });

    editor.setOption('mode', 'javascript');
    editor.setOption('autoCloseBrackets', true);
    editor.setOption('viewportMargin', Infinity);
    editor.setSize(null, 'auto');

    editor.on('focus', () => {
      const value = editor.getDoc().getValue();
      runner.run(value);
    })

    editor.on('change', () => {
      const value = editor.getDoc().getValue();
      localStorage.setItem('value', value)
      runner.run(value);
    })
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return h("div");
  }
};
