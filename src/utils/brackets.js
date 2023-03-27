import NumberCommand from "Commands/numberCommand.js";

export default class Brackets {
  constructor(parent = null, expression = []) {
    this.expression = expression;
    this._parent = parent;
  }

  get parent() {
    if (!this._parent) return this;

    return this._parent;
  }

  addOperation(operation) {
    this.expression.push(operation);
  }

  removeOperation() {
    return this.expression.pop();
  }
}
