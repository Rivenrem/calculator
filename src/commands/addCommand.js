export default class AddCommand {
  constructor(valueToDo) {
    this.valueToAdd = valueToDo;
  }

  execute(currentValue) {
    return Number(currentValue) + Number(this.valueToAdd);
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}
