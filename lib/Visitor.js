import { Syntax } from 'esprima';
import { ArrayExpression, CallExpression, Identifier, Literal, StaticMemberExpression } from './Node';

export class LogVisitor {
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
      return new CallExpression(
        new StaticMemberExpression(
          new Identifier('self'),
          new Identifier('postMessage')),
        [new ArrayExpression([
          new Literal(node.callee.property.name, `"${node.callee.property.name}"`)
        ].concat(node.arguments))]
      );
    }
    return node;
  }

  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  leave(node) {
    return node;
  }
}
