import NumberCommand from "Commands/numberCommand.js";

export default class BracketsCalculator {
  constructor(parent = null) {
    this.expression = [];
    this._parent = parent;
  }

  get parent() {
    if (!this._parent) return this;

    return this._parent;
  }

  addOperation(operation) {
    if (!this.expression.length && !(operation instanceof NumberCommand)) {
      this.expression.push(new NumberCommand());
    }

    this.expression.push(operation);
  }
}
