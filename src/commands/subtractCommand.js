export default class SubtractCommand {
  constructor(valueToDo) {
    this.valueToSubtract = valueToDo;
  }

  execute(currentValue) {
    return Number(currentValue) - Number(this.valueToSubtract);
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract;
  }
}
