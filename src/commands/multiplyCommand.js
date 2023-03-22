export default class MultiplyCommand {
  constructor(valueToDo) {
    this.valueToMultiply = valueToDo;
  }

  execute(currentValue) {
    return currentValue * this.valueToMultiply;
  }

  undo(currentValue) {
    return currentValue / this.valueToMultiply;
  }
}
