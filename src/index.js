const CodeMirror = require('codemirror');
require('style-loader!css-loader!codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/hint/javascript-hint');

const editor = new CodeMirror(document.getElementById('editor'), {
  value: localStorage.getItem('value') || ''
});

editor.setOption('mode', 'javascript');
editor.setOption('autoCloseBrackets', true);
editor.setOption('viewportMargin', Infinity);
editor.setSize(null, 'auto');

editor.on('focus', () => {
  const value = editor.getDoc().getValue();
  runCode(value);
})

editor.on('change', () => {
  const value = editor.getDoc().getValue();
  localStorage.setItem('value', value)
  runCode(value);
})


function runCode(code) {
  const id = 'sandbox';

  if (document.getElementById(id))
    document.body.removeChild(document.getElementById(id));

  const iframe = document.createElement('iframe');
  const value = '<head><style>body {font-size: 3em;}</style></head><body><script>' + code + '</script></body>';
  iframe.setAttribute('id', id);
  iframe.setAttribute('src', 'data:text/html,' + value);
  iframe.style.position = 'fixed';
  iframe.style.top = '1em';
  iframe.style.right = '1em';
  iframe.style.border = 'none';
  iframe.style.opacity = '0.5';

  document.body.appendChild(iframe);
}
