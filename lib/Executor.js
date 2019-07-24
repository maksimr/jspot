import { parse } from 'esprima';
import { generate } from 'escodegen';
import { replace } from 'estraverse';
import { LogVisitor } from './Visitor';

export class Executor {
  static runAsync(code) {
    const blob = new Blob([generate(replace(parse(code), new LogVisitor()))], {type: 'text/javascript'});
    return new Worker(window.URL.createObjectURL(blob));
  }
}
