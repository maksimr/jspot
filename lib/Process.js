import EventEmitter from 'events';
import { generate } from 'escodegen';
import { replace } from 'estraverse';
import { parse, Syntax } from 'esprima';
import { builders } from 'ast-types';

export class Process {
  static exec(code) {
    const process = new Process(code);
    return process.run();
  }

  constructor(code) {
    this.code = code;
    this.worker = null;
    this.emitter = new EventEmitter();
  }

  run() {
    this.terminate();

    const code = this.code;
    const blob = new Blob([generate(replace(parse(code, {loc: true}), new Visitor()))], {type: 'text/javascript'});
    const worker = this.worker = new Worker(window.URL.createObjectURL(blob));

    worker.addEventListener('message', (it) => {
      const arg = it.data;
      const event = Array.isArray(arg) && arg.length > 1 ? JSON.parse(arg[0]) : null;
      const data = event ? arg[1] : arg;
      this.emit('message', Object.assign(event || {}, {data: data}));
    });

    worker.addEventListener('error', (error) => {
      this.emit('error', error);
    });

    return this;
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  addEventListener(type, listener) {
    return this.emitter.on(type, listener);
  }

  removeEventListener(type, listener) {
    return this.emitter.off(type, listener);
  }

  emit(type, data) {
    return this.emitter.emit(type, data);
  }
}

class Visitor {
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  enter(node) {
    if (
      node.type === Syntax.CallExpression &&
      node.callee.type === Syntax.MemberExpression &&
      node.callee.property.type === Syntax.Identifier &&
      node.callee.object.type === Syntax.Identifier &&
      node.callee.object.name === 'console' &&
      (
        node.callee.property.name === 'log' ||
        node.callee.property.name === 'error' ||
        node.callee.property.name === 'info' ||
        node.callee.property.name === 'clear'
      )
    ) {
      const description = JSON.stringify({
        type: node.callee.property.name,
        loc: node.loc
      });
      return builders.callExpression(
        builders.memberExpression(
          builders.identifier('self'),
          builders.identifier('postMessage')),
        [builders.arrayExpression([
          builders.literal(description),
          builders.arrayExpression(node.arguments)
        ])]
      );
    }
    return node;
  }

  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  leave(node) {
    return node;
  }
}
