import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand.js";
import NumberCommand from "Commands/numberCommand.js";

export default class ResultCalculator {
  constructor(expression) {
    this.result = 0;
    this.expression = expression;
    console.log(expression);
  }

  execute() {
    this.expression = this.expression.map((command) => {
      if (command instanceof ResultCalculator) {
        command.execute();
        return new NumberCommand(command.value);
      } else if (command.value instanceof ResultCalculator) {
        command.value.execute();
        command.value = command.value.value;
      }

      return command;
    });
    this.expression = this.expression
      .map((command, index) => {
        if (
          [MultiplyCommand, DivideCommand].some(
            (creator) => command instanceof creator
          )
        ) {
          const previousCommand = this.expression.findLast(
            (el, prevIndex) =>
              prevIndex < index &&
              ![MultiplyCommand, DivideCommand].some(
                (creator) => el instanceof creator
              )
          );
          previousCommand.value = command.execute(previousCommand.value);

          return null;
        }

        return command;
      })
      .filter(Boolean);
    this.expression = this.expression.map((command) => {
      this.result = command.execute(this.result);

      return null;
    });
    console.log(this.result);
  }
}
