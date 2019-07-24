import { Syntax } from 'esprima';

export class CallExpression {
  constructor(callee, args) {
    this.type = Syntax.CallExpression;
    this.callee = callee;
    this.arguments = args;
  }
}


export class StaticMemberExpression {
  constructor(object, property) {
    this.type = Syntax.MemberExpression;
    this.computed = false;
    this.object = object;
    this.property = property;
  }
}


export class Literal {
  constructor(value, raw) {
    this.type = Syntax.Literal;
    this.value = value;
    this.raw = raw;
  }
}


export class Identifier {
  constructor(name) {
    this.type = Syntax.Identifier;
    this.name = name;
  }
}


export class ArrayExpression {
  constructor(elements) {
    this.type = Syntax.ArrayExpression;
    this.elements = elements;
  }
}
