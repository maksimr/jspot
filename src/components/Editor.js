import { Component, h } from 'preact';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'style-loader!css-loader!codemirror/lib/codemirror.css';
import 'style-loader!css-loader!codemirror/addon/hint/show-hint.css';

export class Editor extends Component {
  componentDidMount() {
    const props = this.props;
    const editor = new CodeMirror(this.base, {value: props.value});


    editor.setOption('mode', 'javascript');
    editor.setOption('autoCloseBrackets', true);
    editor.setOption('viewportMargin', Infinity);
    editor.setSize(null, 'auto');
    editor.setOption('hintOptions', {
      completeSingle: false,
      customKeys: {
        Tab: (cm, handle) => handle.pick()
      }
    });


    const javascriptHint = CodeMirror.helpers['hint']['javascript'];
    CodeMirror.registerHelper('hint', 'javascript', (...args) => {
      const hints = javascriptHint(...args);
      if (hints && hints.list && hints.list.length > 3) hints.list.length = 3;
      return hints;
    });


    editor.on('focus', () => {
      const value = editor.getDoc().getValue();
      run(value);
    });


    editor.on('keyup', () => {
      editor.execCommand('autocomplete');
    });


    editor.on('change', () => {
      const value = editor.getDoc().getValue();
      props.onChange && props.onChange(value);
      run(value);
    });


    function run(code) {
      if (props.onRun) props.onRun(code);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return h('div');
  }
}
