export default class MultiplyCommand {
  constructor(valueToDo) {
    this.value = valueToDo;
  }

  execute(currentValue) {
    console.log(
      "🚀 ~ file: multiplyCommand.js:7 ~ MultiplyCommand ~ execute ~ currentValue:",
      currentValue
    );
    return +currentValue * +this.value;
  }

  undo(currentValue) {
    return currentValue / this.value;
  }
}
