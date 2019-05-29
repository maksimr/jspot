import { h, Component } from 'preact';
import { Executor } from '../../lib/Executor';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'style-loader!css-loader!codemirror/lib/codemirror.css';

export class Editor extends Component {
  componentDidMount() {
    const editor = new CodeMirror(this.base, {
      value: localStorage.getItem('value') || ''
    });


    editor.setOption('mode', 'javascript');
    editor.setOption('autoCloseBrackets', true);
    editor.setOption('viewportMargin', Infinity);
    editor.setSize(null, 'auto');
    editor.setOption('hintOptions', {
      completeSingle: false,
      extraKeys: {
        Enter: null
      }
    });


    editor.on('focus', () => {
      const value = editor.getDoc().getValue();
      run(value);
    });


    editor.on('keyup', () => {
      editor.execCommand('autocomplete')
    });


    editor.on('change', () => {
      const value = editor.getDoc().getValue();
      localStorage.setItem('value', value)
      run(value);
    });


    function run(code) {
      Executor
        .run(code)
        .map((logEntity) => console[logEntity.level](...logEntity.args));
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return h('div');
  }
};
