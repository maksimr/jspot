export class CodeRunner {
  run(code) {
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
}
