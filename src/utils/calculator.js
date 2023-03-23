import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand.js";
import NumberCommand from "Commands/numberCommand.js";

import BracketsCalculator from "Utils/bracketsCalculator";

export default class ResultCalculator {
  constructor(expression) {
    this.result = 0;
    this.expression = expression;
  }

  execute() {
    this.expression = this.expression.map((command) => {
      if (command instanceof BracketsCalculator) {
        return new NumberCommand(calculate(command.expression));
      } else if (command.value instanceof BracketsCalculator) {
        command.value = calculate(command.value.expression);
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
  }
}
