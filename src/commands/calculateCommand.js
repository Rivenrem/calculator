import MultiplyCommand from "./multiplyCommand.js";
import DivideCommand from "./divideCommand.js";
import RemainderCommand from "./remainderCommand.js";

import Brackets from "Utils/brackets.js";

export default class CalculateCommand {
  constructor(expression) {
    this.expression = expression;
  }

  execute(expression) {
    let previousCommand = null;

    return expression
      .map((command) => {
        if (command.value instanceof Brackets) {
          return new command.constructor(
            this.execute(command.value.expression)
          );
        }

        return command;
      })
      .map((command, index, brackets) => {
        const nextCommand = brackets[index + 1];
        let currentCommand = command;

        if (previousCommand) {
          currentCommand = new previousCommand.constructor(
            currentCommand.execute(previousCommand.value)
          );

          previousCommand = null;
        }

        if (
          [MultiplyCommand, DivideCommand, RemainderCommand].some(
            (Creator) => nextCommand instanceof Creator
          )
        ) {
          previousCommand = currentCommand;

          return null;
        }

        return currentCommand;
      })
      .filter(Boolean)
      .reduce((initialValue, command) => command.execute(initialValue), 0);
  }
}
