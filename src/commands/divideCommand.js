export default class DivideCommand {
  constructor(valueToDo) {
    this.valueToDivide = valueToDo;
  }

  execute(currentValue) {
    return currentValue / this.valueToDivide;
  }

  undo(currentValue) {
    return currentValue * this.valueToDivide;
  }
}
