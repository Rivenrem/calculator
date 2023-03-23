export default class DivideCommand {
  constructor(valueToDo) {
    this.value = valueToDo;
  }

  execute(currentValue) {
    return currentValue / this.value;
  }

  undo(currentValue) {
    return currentValue * this.value;
  }
}
