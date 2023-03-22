export default class AddCommand {
  constructor(valueToDo) {
    this.value = valueToDo;
  }

  execute(currentValue) {
    return Number(currentValue) + Number(this.value);
  }

  undo(currentValue) {
    return currentValue - this.value;
  }
}
